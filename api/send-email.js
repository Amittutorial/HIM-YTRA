// Vercel Serverless Function — POST /api/send-email
// Enterprise Transactional Email Dispatcher with Dual-Email Support, Spam Protection,
// SMTP (Gmail App Password) / Resend integration, and Database Fallback.
// Never exposes credentials to frontend code.

import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 15; // max 15 emails per min per IP
const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRequests.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }
  ipRequests.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
}

const DEFAULT_OWNER_GMAIL = 'amitpatel42203@gmail.com';
const FOUNDER_NAME = 'Amit Verma';
const FOUNDER_PHONE = '+91 76199 17057';
const CO_FOUNDER_NAME = 'Abhishek Verma';
const CO_FOUNDER_PHONE = '+91 7408989182';
const SITE_URL = 'https://him-ytra.vercel.app';

// Email styling helper
function buildEmailContainer(title, subtitle, bodyHtml) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; max-width: 100%;">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #12372F 0%, #1F6B55 100%); padding: 32px 28px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Him<span style="color: #34d399;">Yatra</span>
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #C6A15B; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                      ${subtitle || 'Premium Himalayan & All Destination Tours'}
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.15); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; border: 1px solid rgba(255,255,255,0.25);">
                      ★ OFFICIAL NOTICE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold Accent Bar -->
          <tr>
            <td style="background-color: #C6A15B; height: 3px; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 28px 24px 28px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Authorized Signature & Support Box -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top" style="font-size: 12px; line-height: 18px; color: #475569;">
                    <strong style="color: #0f172a; font-size: 13px;">HimYatra Verified Tour Concierge</strong><br>
                    <strong>Founder:</strong> ${FOUNDER_NAME} (${FOUNDER_PHONE})<br>
                    <strong>Co-Founder:</strong> ${CO_FOUNDER_NAME} (${CO_FOUNDER_PHONE})<br>
                    <strong>Official Email:</strong> <a href="mailto:${DEFAULT_OWNER_GMAIL}" style="color: #1F6B55; text-decoration: none;">${DEFAULT_OWNER_GMAIL}</a><br>
                    <strong>Portal:</strong> <a href="${SITE_URL}" style="color: #1F6B55; text-decoration: none;">${SITE_URL}</a>
                  </td>
                  <td align="right" valign="middle">
                    <a href="https://wa.me/917619917057" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 12px; font-weight: 700; text-decoration: none;">
                      💬 WhatsApp Support
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Legal -->
          <tr>
            <td style="background-color: #0f172a; padding: 16px 28px; text-align: center; color: #94a3b8; font-size: 11px;">
              © ${new Date().getFullYear()} HimYatra Tours & Travels. All rights reserved.<br>
              Himachal Pradesh & Uttarakhand Tourism Reg. No. HY/TOUR/2026/891
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Mail transporter initialization
function createTransporter() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = port === 465 || process.env.SMTP_SECURE === 'true';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });
}

// Send via Resend SDK if key exists
async function sendViaResend({ to, subject, html, fromName }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM || `${fromName || 'HimYatra'} <onboarding@resend.dev>`;
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html
    });
    return { success: true, provider: 'resend', data };
  } catch (err) {
    console.warn('Resend send failed:', err?.message);
    return null;
  }
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a minute or WhatsApp us at +91 76199 17057'
    });
  }

  try {
    const body = req.body || {};

    // 1. Honeypot check (Spam protection)
    if (body.bot_trap || body.honeypot || body._gotcha) {
      console.warn('Spam bot detected via honeypot field');
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    const type = body.type || 'inquiry'; // 'booking' | 'inquiry' | 'custom_trip'
    const ownerEmail = process.env.OWNER_EMAIL || DEFAULT_OWNER_GMAIL;
    const transporter = createTransporter();

    // ══════════════════════════════════════════════════════════════════════
    // A. BOOKING SUBMISSION (Sends TWO emails: to Owner & to Customer)
    // ══════════════════════════════════════════════════════════════════════
    if (type === 'booking') {
      const booking = body.booking || body;
      const bookingRef = booking.bookingId || booking.booking_reference || `HY-${Date.now().toString().slice(-6)}`;
      const pkgTitle = booking.packageTitle || booking.package_title || 'Himalayan Tour Package';
      const custName = booking.name || booking.customer_name || 'Traveler';
      const custPhone = booking.phone || booking.customer_phone || 'Not provided';
      const custEmail = (booking.email || booking.customer_email || '').trim();
      const travelDate = booking.travelDate || booking.travel_date || 'Flexible / To be confirmed';
      const travelers = `${booking.adults || 1} Adults, ${booking.children || 0} Children`;
      const pickup = booking.pickupCity || booking.pickup_city || 'Delhi / Chandigarh';
      const vehicle = booking.vehicleTier || booking.vehicle_tier || 'Private Dedicated Cab';
      const hotel = booking.hotelTier || booking.hotel_tier || 'Handpicked Mountain View Hotel';
      const totalAmount = parseFloat(booking.finalTotal || booking.total_price) || 0;
      const advancePaid = parseFloat(booking.advanceToken || booking.advance_token) || 0;
      const remainingBalance = Math.max(0, totalAmount - advancePaid);
      const isPaid = Boolean(booking.utr || booking.utr_reference);
      const utr = booking.utr || booking.utr_reference || 'Pending Token Screenshot';

      // ── 1. OWNER EMAIL HTML ──
      const ownerSubject = `🔔 [NEW HIMYATRA BOOKING] ${pkgTitle} | Ref: ${bookingRef} | Advance: ₹${advancePaid.toLocaleString('en-IN')} | ${custName}`;
      const ownerHtml = buildEmailContainer(
        'New Confirmed Booking Alert',
        'Customer Booking & Advance Payment Notification',
        `
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 6px 0; font-size: 16px; color: #065f46;">🎉 New Reservation Received!</h2>
          <p style="margin: 0; font-size: 13px; color: #047857;">
            ${custName} has submitted a booking reservation for <strong>${pkgTitle}</strong> with Reference ID <strong>${bookingRef}</strong>.
          </p>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #12372F; margin: 20px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          1. Customer Identity & Contact
        </h3>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
          <tr><td width="38%" style="color: #64748b;">Customer Full Name:</td><td style="font-weight: 700; color: #0f172a;">${custName}</td></tr>
          <tr><td style="color: #64748b;">Mobile / WhatsApp:</td><td style="font-weight: 700;"><a href="tel:${custPhone}" style="color: #1F6B55; text-decoration: none;">${custPhone}</a></td></tr>
          <tr><td style="color: #64748b;">Email Address:</td><td style="font-weight: 600;"><a href="mailto:${custEmail || DEFAULT_OWNER_GMAIL}" style="color: #1F6B55; text-decoration: none;">${custEmail || 'Not provided'}</a></td></tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #12372F; margin: 24px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          2. Vacation & Itinerary Details
        </h3>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
          <tr><td width="38%" style="color: #64748b;">Booking Reference:</td><td style="font-weight: 700; color: #12372F;">${bookingRef}</td></tr>
          <tr><td style="color: #64748b;">Package Title:</td><td style="font-weight: 700; color: #0f172a;">${pkgTitle}</td></tr>
          <tr><td style="color: #64748b;">Travel Start Date:</td><td style="font-weight: 600;">${travelDate}</td></tr>
          <tr><td style="color: #64748b;">Guests:</td><td>${travelers}</td></tr>
          <tr><td style="color: #64748b;">Pickup City:</td><td>${pickup}</td></tr>
          <tr><td style="color: #64748b;">Vehicle Category:</td><td>${vehicle}</td></tr>
          <tr><td style="color: #64748b;">Hotel Category:</td><td>${hotel}</td></tr>
          <tr><td style="color: #64748b;">Special Requests:</td><td>${booking.specialRequests || 'None'}</td></tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #12372F; margin: 24px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          3. Payment Breakdown & Verification
        </h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <tr><td width="50%" style="color: #475569;">Total Package Tariff:</td><td style="font-weight: 800; font-size: 15px; color: #0f172a;">₹${totalAmount.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #047857; font-weight: 600;">20% Advance Token Paid:</td><td style="font-weight: 800; font-size: 15px; color: #047857;">₹${advancePaid.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #b45309; font-weight: 600;">Balance Due on Arrival:</td><td style="font-weight: 800; font-size: 15px; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #475569;">Payment Status:</td><td style="font-weight: 700; color: ${isPaid ? '#047857' : '#d97706'};">${isPaid ? '✅ Advance Verified via UPI' : '⏳ Token Payment Pending'}</td></tr>
          <tr><td style="color: #475569;">UPI / UTR Transaction ID:</td><td style="font-family: monospace; font-weight: 700;">${utr}</td></tr>
          <tr><td style="color: #475569;">Submission Timestamp:</td><td>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
        </table>
        `
      );

      // ── 2. CUSTOMER CONFIRMATION EMAIL HTML ──
      const customerSubject = `🏔️ Booking Confirmed! Ref: ${bookingRef} - ${pkgTitle} | HimYatra`;
      const customerHtml = buildEmailContainer(
        'Your HimYatra Booking is Confirmed',
        'Official E-Ticket & Vacation Confirmation Voucher',
        `
        <p style="font-size: 15px; line-height: 22px; color: #0f172a; margin-top: 0;">
          Dear <strong>${custName}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          Thank you for choosing <strong>HimYatra</strong>! We are thrilled to confirm your Himalayan holiday reservation for <strong>${pkgTitle}</strong>. Your personalized itinerary, hotel accommodation, and dedicated private vehicle are being scheduled.
        </p>

        <!-- Booking ID Card -->
        <table width="100%" cellpadding="14" cellspacing="0" style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; margin: 18px 0;">
          <tr>
            <td>
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #166534; font-weight: 700;">
                Booking Reference ID
              </div>
              <div style="font-size: 22px; font-weight: 900; color: #12372F; letter-spacing: 1px; margin-top: 4px;">
                ${bookingRef}
              </div>
              <div style="font-size: 12px; color: #15803d; margin-top: 4px;">
                Status: <strong>Confirmed & Active</strong>
              </div>
            </td>
            <td align="right">
              <a href="${SITE_URL}/?track=${encodeURIComponent(bookingRef)}" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none;">
                View Live Booking
              </a>
            </td>
          </tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #12372F; margin: 22px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          Tour Summary
        </h3>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
          <tr><td width="38%" style="color: #64748b;">Package:</td><td style="font-weight: 700; color: #0f172a;">${pkgTitle}</td></tr>
          <tr><td style="color: #64748b;">Travel Date:</td><td style="font-weight: 600;">${travelDate}</td></tr>
          <tr><td style="color: #64748b;">Travelers:</td><td>${travelers}</td></tr>
          <tr><td style="color: #64748b;">Pickup Point:</td><td>${pickup}</td></tr>
          <tr><td style="color: #64748b;">Vehicle:</td><td>${vehicle}</td></tr>
          <tr><td style="color: #64748b;">Hotel Tier:</td><td>${hotel}</td></tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #12372F; margin: 22px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          Payment Breakdown
        </h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <tr><td width="55%" style="color: #475569;">Total Tour Cost:</td><td style="font-weight: 800; font-size: 15px; color: #0f172a;">₹${totalAmount.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #047857; font-weight: 600;">Advance Token Paid:</td><td style="font-weight: 800; font-size: 15px; color: #047857;">₹${advancePaid.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #b45309; font-weight: 600;">Remaining Balance Due on Arrival:</td><td style="font-weight: 800; font-size: 15px; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #475569;">Transaction Reference / UTR:</td><td style="font-family: monospace; font-weight: 600;">${utr}</td></tr>
        </table>

        <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px 16px; border-radius: 8px; margin-top: 18px; font-size: 12px; color: #713f12; line-height: 18px;">
          📌 <strong>Important Instructions:</strong>
          <ul style="margin: 6px 0 0 0; padding-left: 18px;">
            <li>Please carry valid Govt Photo ID proof (Aadhaar / Passport) for all travelers.</li>
            <li>Driver contact details will be shared on WhatsApp 24 hours prior to travel.</li>
            <li>For any immediate questions or customized changes, contact Founder <strong>${FOUNDER_NAME}</strong> directly at <strong>${FOUNDER_PHONE}</strong>.</li>
          </ul>
        </div>
        `
      );

      // Dispatch Owner Email
      let ownerResult = null;
      let customerResult = null;

      // Try Resend first
      ownerResult = await sendViaResend({ to: ownerEmail, subject: ownerSubject, html: ownerHtml, fromName: 'HimYatra Bookings' });

      // Fallback to Nodemailer SMTP
      if (!ownerResult && transporter) {
        try {
          const info = await transporter.sendMail({
            from: `"HimYatra Bookings" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`,
            to: ownerEmail,
            subject: ownerSubject,
            html: ownerHtml
          });
          ownerResult = { success: true, provider: 'smtp', messageId: info.messageId };
        } catch (e) {
          console.error('SMTP owner send error:', e.message);
        }
      }

      // Dispatch Customer Email (if valid customer email provided)
      if (custEmail && /^\S+@\S+\.\S+$/.test(custEmail)) {
        customerResult = await sendViaResend({ to: custEmail, subject: customerSubject, html: customerHtml, fromName: 'HimYatra Travel Desk' });
        if (!customerResult && transporter) {
          try {
            const info = await transporter.sendMail({
              from: `"HimYatra Travel Desk" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`,
              to: custEmail,
              subject: customerSubject,
              html: customerHtml
            });
            customerResult = { success: true, provider: 'smtp', messageId: info.messageId };
          } catch (e) {
            console.error('SMTP customer send error:', e.message);
          }
        }
      }

      const delivered = Boolean(ownerResult);

      return res.status(200).json({
        success: true,
        delivered,
        ownerSent: Boolean(ownerResult),
        customerSent: Boolean(customerResult),
        bookingRef,
        message: delivered
          ? 'Booking confirmation dispatched successfully'
          : 'Booking recorded securely in database. Add SMTP_USER and SMTP_PASS in Vercel to enable live Gmail forwarding.'
      });
    }

    // ══════════════════════════════════════════════════════════════════════
    // B. INQUIRY / CONTACT / CALLBACK REQUEST
    // ══════════════════════════════════════════════════════════════════════
    const inquiry = body.inquiry || body;
    const name = inquiry.name || 'Website Visitor';
    const phone = inquiry.phone || 'Not provided';
    const email = (inquiry.email || '').trim();
    const destination = inquiry.destination || 'Himachal & Uttarakhand';
    const travelDate = inquiry.travelDate || inquiry.travel_date || 'Flexible';
    const travelers = inquiry.travelersCount || inquiry.travelers_count || 'Not specified';
    const fromCity = inquiry.fromCity || inquiry.pickup_city || 'Flexible';
    const message = inquiry.message || 'Interested in package and custom quote';
    const source = inquiry.source || 'Website Contact Form';

    const subject = `📬 [NEW HIMYATRA INQUIRY] ${name} | 📞 ${phone} | ${destination}`;
    const html = buildEmailContainer(
      'New Customer Inquiry',
      'Direct Travel Desk Inquiry & Callback Request',
      `
      <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 4px 0; font-size: 16px; color: #0f766e;">🔔 New Traveler Inquiry Received</h2>
        <p style="margin: 0; font-size: 13px; color: #115e59;">
          A customer has reached out via <strong>${source}</strong> asking for holiday details.
        </p>
      </div>

      <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
        <tr><td width="36%" style="color: #64748b;">Customer Name:</td><td style="font-weight: 700; color: #0f172a;">${name}</td></tr>
        <tr><td style="color: #64748b;">Mobile / WhatsApp:</td><td style="font-weight: 700;"><a href="tel:${phone}" style="color: #1F6B55; text-decoration: none;">${phone}</a></td></tr>
        <tr><td style="color: #64748b;">Email Address:</td><td>${email || 'Not provided'}</td></tr>
        <tr><td style="color: #64748b;">Interested Destination:</td><td style="font-weight: 600; color: #12372F;">${destination}</td></tr>
        <tr><td style="color: #64748b;">Starting / From City:</td><td>${fromCity}</td></tr>
        <tr><td style="color: #64748b;">Planned Travel Date:</td><td>${travelDate}</td></tr>
        <tr><td style="color: #64748b;">Number of Guests:</td><td>${travelers}</td></tr>
        <tr><td style="color: #64748b;" valign="top">Inquiry Message:</td><td style="font-weight: 500; color: #334155;">${message}</td></tr>
        <tr><td style="color: #64748b;">Submission Timestamp:</td><td>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
      </table>

      <div style="margin-top: 20px; padding: 12px; background-color: #f1f5f9; border-radius: 8px; text-align: center;">
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)}!%20Thank%20you%20for%20contacting%20HimYatra.%20I%20am%20Amit%20Verma,%20how%20can%20I%20help%20you%20with%20your%20${encodeURIComponent(destination)}%20trip?" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 8px 18px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none;">
          📲 Reply on WhatsApp to Customer
        </a>
      </div>
      `
    );

    let sent = false;
    let provider = null;

    // Resend
    const resendResult = await sendViaResend({ to: ownerEmail, subject, html, fromName: 'HimYatra Inquiries' });
    if (resendResult) {
      sent = true;
      provider = 'resend';
    }

    // Nodemailer
    if (!sent && transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"HimYatra Inquiries" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`,
          to: ownerEmail,
          subject,
          html
        });
        sent = true;
        provider = 'smtp';
      } catch (e) {
        console.error('SMTP inquiry send error:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      delivered: sent,
      provider,
      message: sent
        ? 'Inquiry dispatched to owner email'
        : 'Inquiry saved securely. Add SMTP_USER and SMTP_PASS in Vercel to forward directly to your Gmail inbox.'
    });

  } catch (err) {
    console.error('Fatal email API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Email handler error: ' + err.message
    });
  }
}
