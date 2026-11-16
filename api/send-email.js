// Vercel Serverless Function — POST /api/send-email
// Enterprise Transactional Email System with Dual Delivery (Resend / SMTP Nodemailer),
// 10 Full Transactional Templates, Rate Limiting, Spam Honeypot, and Fallback Logging.
// Never exposes secrets to frontend.

import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 20; // max 20 emails per min per IP
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

// Primary Email Shell with Luxury HimYatra / Valley Vista Styling
export function buildEmailContainer(title, subtitle, bodyHtml) {
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
            <td style="background: linear-gradient(135deg, #12372F 0%, #1F6B55 100%); padding: 30px 28px; text-align: left;">
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
    tls: { rejectUnauthorized: false }
  });
}

// Send via Resend SDK if key exists
export async function sendViaResend({ to, subject, html, fromName }) {
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

// Universal Sender: Attempts Resend first, then SMTP Nodemailer, then guaranteed FormSubmit direct delivery
export async function sendEmail({ to, subject, html, fromName = 'HimYatra' }) {
  if (!to || !/^\S+@\S+\.\S+$/.test(to)) {
    return { success: false, error: 'Invalid recipient email' };
  }

  // 1. Try Resend API if key is present
  const resendResult = await sendViaResend({ to, subject, html, fromName });
  if (resendResult?.success) {
    return resendResult;
  }

  // 2. Try SMTP Nodemailer (Gmail App Password)
  const transporter = createTransporter();
  if (transporter) {
    try {
      const fromAddress = process.env.SMTP_FROM || `"${fromName}" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`;
      const info = await transporter.sendMail({
        from: fromAddress,
        to,
        subject,
        html
      });
      return { success: true, provider: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('SMTP sendMail error:', err.message);
    }
  }

  // 3. Direct HTTP Transactional Fallback: Delivers directly into recipient Gmail
  try {
    const plainTextSummary = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'box',
        _captcha: 'false',
        'Sender': fromName,
        'Notice': 'Official Travel Communication from HimYatra & Valley Vista',
        'Details': plainTextSummary.slice(0, 1200)
      })
    });

    if (response.ok) {
      return { success: true, provider: 'formsubmit-direct' };
    }
  } catch (fsErr) {
    console.warn('Direct HTTP fallback notice:', fsErr?.message);
  }

  console.warn(`[EMAIL LOGGED] To: ${to} | Subject: ${subject}`);
  return {
    success: false,
    simulated: true,
    error: 'No email credentials configured. Please set RESEND_API_KEY or SMTP_USER/SMTP_PASS in Vercel environment variables.'
  };
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN SERVERLESS HANDLER
// ═══════════════════════════════════════════════════════════════════════
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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

    // Spam honeypot detection
    if (body.bot_trap || body.honeypot || body._gotcha) {
      console.warn('Spam bot detected via honeypot field');
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    const type = body.type || 'inquiry';
    const ownerEmail = process.env.OWNER_EMAIL || DEFAULT_OWNER_GMAIL;

    // ──────────────────────────────────────────────────────────────────
    // 1. WELCOME EMAIL (After registration)
    // ──────────────────────────────────────────────────────────────────
    if (type === 'welcome') {
      const email = body.email;
      const username = body.username || 'Traveler';
      const subject = `🎉 Welcome to HimYatra, @${username}! Your Himalayan Adventures Await`;
      const html = buildEmailContainer(
        'Welcome to HimYatra Family',
        'Official Account Registration',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>@${username}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          Welcome to <strong>HimYatra</strong>! Your verified travel account has been successfully created. You can now effortlessly browse handpicked tour packages, book dedicated hill cabs, customize itineraries, and manage reservations directly from your personal dashboard.
        </p>
        <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 18px; margin: 20px 0;">
          <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 15px;">🌟 Your Member Benefits:</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #15803d; line-height: 20px;">
            <li>Priority access to peak season snow and Char Dham permits.</li>
            <li>Direct 24/7 mountain support line with Founder Amit Verma.</li>
            <li>Instant booking voucher & official itinerary PDF downloads.</li>
            <li>Flat 15% promotional coupon for your first trip: <strong style="color: #0f172a;">HIMPEAKS15</strong></li>
          </ul>
        </div>
        <p style="text-align: center; margin: 25px 0 10px 0;">
          <a href="${SITE_URL}" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none;">
            Explore Tour Packages →
          </a>
        </p>
        `
      );

      const result = await sendEmail({ to: email, subject, html, fromName: 'HimYatra Team' });
      return res.status(200).json({ success: true, delivered: result.success, provider: result.provider });
    }

    // ──────────────────────────────────────────────────────────────────
    // 2. EMAIL OTP VERIFICATION
    // ──────────────────────────────────────────────────────────────────
    if (type === 'otp') {
      const { email, username, otpCode, purpose = 'Account Verification' } = body;
      const subject = `🔐 HimYatra Security Code: ${otpCode} (Valid for 5 Mins)`;
      const html = buildEmailContainer(
        'One-Time Security Passcode',
        'Email Verification & Authentication',
        `
        <p style="font-size: 14px; color: #334155; margin-top: 0;">Hello <strong>${username || 'Valued Traveler'}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          Use the one-time passcode below to complete your <strong>${purpose}</strong> on HimYatra:
        </p>
        <div style="background: linear-gradient(135deg, #12372F 0%, #1F6B55 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 22px 0;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C6A15B; font-weight: 700; display: block; margin-bottom: 6px;">
            ONE-TIME PASSCODE (OTP)
          </span>
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #ffffff; font-family: monospace;">
            ${otpCode}
          </span>
          <span style="display: block; font-size: 12px; color: #a7f3d0; margin-top: 8px;">
            ⏱️ Expires in 5 minutes • Single use only
          </span>
        </div>
        <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #713f12;">
          🛡️ <strong>Security Tip:</strong> Never share this OTP with anyone. HimYatra representatives will never call or ask for your password or verification code.
        </div>
        `
      );

      const result = await sendEmail({ to: email, subject, html, fromName: 'HimYatra Security' });
      return res.status(200).json({ success: true, delivered: result.success, provider: result.provider });
    }

    // ──────────────────────────────────────────────────────────────────
    // 3. PASSWORD RESET EMAIL
    // ──────────────────────────────────────────────────────────────────
    if (type === 'password_reset') {
      const { email, username, resetOtp } = body;
      const subject = `🔑 HimYatra Password Reset Code: ${resetOtp}`;
      const html = buildEmailContainer(
        'Password Reset Request',
        'Account Security Center',
        `
        <p style="font-size: 14px; color: #334155; margin-top: 0;">Dear <strong>@${username || 'Traveler'}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          We received a request to reset the password for your HimYatra account. Enter this 6-digit verification code to choose a new password:
        </p>
        <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #12372F; font-family: monospace;">
            ${resetOtp}
          </span>
          <div style="font-size: 12px; color: #64748b; margin-top: 6px;">Valid for 10 minutes</div>
        </div>
        <p style="font-size: 12px; color: #94a3b8;">
          If you did not request a password reset, please ignore this email or reach out to our team at +91 76199 17057 immediately.
        </p>
        `
      );

      const result = await sendEmail({ to: email, subject, html, fromName: 'HimYatra Security' });
      return res.status(200).json({ success: true, delivered: result.success, provider: result.provider });
    }

    // ──────────────────────────────────────────────────────────────────
    // 4. BOOKING CONFIRMATION EMAIL (Dual: Owner + Customer)
    // ──────────────────────────────────────────────────────────────────
    if (type === 'booking') {
      const booking = body.booking || body;
      const bookingRef = booking.bookingId || booking.booking_reference || `HY-${Date.now().toString().slice(-6)}`;
      const pkgTitle = booking.packageTitle || booking.package_title || 'Himalayan Tour Package';
      const custName = booking.name || booking.customer_name || 'Traveler';
      const custPhone = booking.phone || booking.customer_phone || 'Not provided';
      const custEmail = (booking.email || booking.customer_email || '').trim();
      const travelDate = booking.travelDate || booking.travel_date || 'Flexible / To be confirmed';
      const travelers = `${booking.adults || booking.adults_count || 1} Adults, ${booking.children || booking.children_count || 0} Children`;
      const pickup = booking.pickupCity || booking.pickup_city || 'Delhi / Chandigarh';
      const vehicle = booking.vehicleTier || booking.vehicle_tier || 'Private Dedicated Cab';
      const hotel = booking.hotelTier || booking.hotel_tier || 'Handpicked Mountain View Hotel';
      const totalAmount = parseFloat(booking.finalTotal || booking.total_price) || 0;
      const advancePaid = parseFloat(booking.advanceToken || booking.advance_token) || 0;
      const remainingBalance = Math.max(0, totalAmount - advancePaid);
      const isPaid = Boolean(booking.utr || booking.utr_reference || booking.paymentId);
      const utr = booking.utr || booking.utr_reference || booking.paymentId || 'Pending Token Verification';

      // 1. Owner Admin Notification Email
      const ownerSubject = `🔔 [NEW BOOKING] ${pkgTitle} | Ref: ${bookingRef} | Advance: ₹${advancePaid.toLocaleString('en-IN')} | ${custName}`;
      const ownerHtml = buildEmailContainer(
        'New Confirmed Booking Alert',
        'Customer Booking & Advance Payment Notification',
        `
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 6px 0; font-size: 16px; color: #065f46;">🎉 New Reservation Received!</h2>
          <p style="margin: 0; font-size: 13px; color: #047857;">
            ${custName} has submitted a booking reservation for <strong>${pkgTitle}</strong> (Ref: <strong>${bookingRef}</strong>).
          </p>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; color: #12372F; margin: 18px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          1. Customer Contact Information
        </h3>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
          <tr><td width="38%" style="color: #64748b;">Customer Full Name:</td><td style="font-weight: 700; color: #0f172a;">${custName}</td></tr>
          <tr><td style="color: #64748b;">Mobile / WhatsApp:</td><td style="font-weight: 700;"><a href="tel:${custPhone}" style="color: #1F6B55; text-decoration: none;">${custPhone}</a></td></tr>
          <tr><td style="color: #64748b;">Email Address:</td><td style="font-weight: 600;"><a href="mailto:${custEmail || DEFAULT_OWNER_GMAIL}" style="color: #1F6B55; text-decoration: none;">${custEmail || 'Not provided'}</a></td></tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; color: #12372F; margin: 20px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          2. Vacation Itinerary Details
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

        <h3 style="font-size: 14px; text-transform: uppercase; color: #12372F; margin: 20px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          3. Payment Breakdown & Verification
        </h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <tr><td width="50%" style="color: #475569;">Total Package Tariff:</td><td style="font-weight: 800; font-size: 15px; color: #0f172a;">₹${totalAmount.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #047857; font-weight: 600;">20% Advance Token Paid:</td><td style="font-weight: 800; font-size: 15px; color: #047857;">₹${advancePaid.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #b45309; font-weight: 600;">Balance Due on Arrival:</td><td style="font-weight: 800; font-size: 15px; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #475569;">Payment Status:</td><td style="font-weight: 700; color: ${isPaid ? '#047857' : '#d97706'};">${isPaid ? '✅ Advance Verified' : '⏳ Token Payment Pending'}</td></tr>
          <tr><td style="color: #475569;">UTR / Gateway ID:</td><td style="font-family: monospace; font-weight: 700;">${utr}</td></tr>
        </table>
        `
      );

      // 2. Customer Confirmation Email
      const custSubject = `🏔️ Booking Confirmed: Ref ${bookingRef} — ${pkgTitle} | HimYatra`;
      const custHtml = buildEmailContainer(
        'Your Booking is Confirmed',
        'Official E-Ticket & Vacation Confirmation Voucher',
        `
        <p style="font-size: 15px; line-height: 22px; color: #0f172a; margin-top: 0;">
          Dear <strong>${custName}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          Thank you for choosing <strong>HimYatra</strong>! We are delighted to confirm your mountain vacation reservation for <strong>${pkgTitle}</strong>. Your dedicated private cab, verified stays, and sightseeing plan are secured.
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
              <a href="${SITE_URL}/?track=${encodeURIComponent(bookingRef)}" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none;">
                View Live Trip Status →
              </a>
            </td>
          </tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; color: #12372F; margin: 20px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
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

        <h3 style="font-size: 14px; text-transform: uppercase; color: #12372F; margin: 20px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          Payment Summary
        </h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <tr><td width="55%" style="color: #475569;">Total Tour Cost:</td><td style="font-weight: 800; font-size: 15px; color: #0f172a;">₹${totalAmount.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #047857; font-weight: 600;">Advance Token Paid:</td><td style="font-weight: 800; font-size: 15px; color: #047857;">₹${advancePaid.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #b45309; font-weight: 600;">Balance Due on Arrival:</td><td style="font-weight: 800; font-size: 15px; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #475569;">Transaction Reference / UTR:</td><td style="font-family: monospace; font-weight: 600;">${utr}</td></tr>
        </table>

        <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px 16px; border-radius: 8px; margin-top: 18px; font-size: 12px; color: #713f12; line-height: 18px;">
          📌 <strong>Important Instructions:</strong>
          <ul style="margin: 6px 0 0 0; padding-left: 18px;">
            <li>Please carry valid Govt Photo ID proof (Aadhaar / Passport) for all guests.</li>
            <li>Driver contact details will be shared on WhatsApp 24 hours prior to travel.</li>
            <li>Direct Helpline: Founder <strong>${FOUNDER_NAME}</strong> at <strong>${FOUNDER_PHONE}</strong>.</li>
          </ul>
        </div>
        `
      );

      // Send to Owner
      const ownerRes = await sendEmail({ to: ownerEmail, subject: ownerSubject, html: ownerHtml, fromName: 'HimYatra Bookings' });
      // Send to Customer
      let custRes = null;
      if (custEmail) {
        custRes = await sendEmail({ to: custEmail, subject: custSubject, html: custHtml, fromName: 'HimYatra Travel Desk' });
      }

      return res.status(200).json({
        success: true,
        bookingRef,
        ownerSent: Boolean(ownerRes?.success),
        customerSent: Boolean(custRes?.success)
      });
    }

    // ──────────────────────────────────────────────────────────────────
    // 5. BOOKING CANCELLATION EMAIL
    // ──────────────────────────────────────────────────────────────────
    if (type === 'booking_cancellation') {
      const { bookingRef, customerName, customerEmail, packageTitle, refundAmount = 0, reason = 'Customer requested' } = body;
      const subject = `⚠️ Booking Cancelled: Ref ${bookingRef} | HimYatra`;
      const html = buildEmailContainer(
        'Booking Cancellation Notice',
        'Official Refund & Status Update',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${customerName || 'Traveler'}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          This is to confirm that your booking reservation <strong>${bookingRef}</strong> for <strong>${packageTitle || 'Tour Package'}</strong> has been cancelled as per your request.
        </p>
        <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <h4 style="margin: 0 0 6px 0; color: #9f1239; font-size: 14px;">Cancellation Details:</h4>
          <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px;">
            <tr><td width="40%" style="color: #64748b;">Booking Reference:</td><td style="font-weight: 700;">${bookingRef}</td></tr>
            <tr><td style="color: #64748b;">Cancellation Reason:</td><td>${reason}</td></tr>
            <tr><td style="color: #64748b;">Refund Eligible Amount:</td><td style="font-weight: 700; color: #047857;">₹${refundAmount.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color: #64748b;">Refund Processing:</td><td>3–5 business days to original payment method</td></tr>
          </table>
        </div>
        <p style="font-size: 13px; color: #64748b;">
          If this cancellation was made in error or if you wish to reschedule your dates with ZERO cancellation fee, please contact Founder Amit Verma at +91 76199 17057 immediately.
        </p>
        `
      );

      // Notify customer
      if (customerEmail) {
        await sendEmail({ to: customerEmail, subject, html, fromName: 'HimYatra Support' });
      }
      // Notify admin
      await sendEmail({
        to: ownerEmail,
        subject: `⚠️ [CANCELLATION ALERT] ${bookingRef} cancelled by ${customerName}`,
        html,
        fromName: 'HimYatra Alerts'
      });

      return res.status(200).json({ success: true, message: 'Cancellation notifications dispatched' });
    }

    // ──────────────────────────────────────────────────────────────────
    // 6. PAYMENT CONFIRMATION RECEIPT EMAIL
    // ──────────────────────────────────────────────────────────────────
    if (type === 'payment_confirmation') {
      const { bookingRef, customerName, customerEmail, packageTitle, amountPaid, paymentId, remainingBalance = 0 } = body;
      const subject = `💳 Payment Receipt: ₹${amountPaid.toLocaleString('en-IN')} Received for Ref ${bookingRef} | HimYatra`;
      const html = buildEmailContainer(
        'Payment Receipt & Voucher',
        'Official Financial Confirmation',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${customerName}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          We have successfully received your payment of <strong>₹${amountPaid.toLocaleString('en-IN')}</strong> for booking reference <strong>${bookingRef}</strong> (${packageTitle}).
        </p>
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #166534; font-size: 14px;">Transaction Receipt:</h4>
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
            <tr><td width="45%" style="color: #64748b;">Amount Received:</td><td style="font-weight: 800; font-size: 16px; color: #15803d;">₹${amountPaid.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color: #64748b;">Transaction / Payment ID:</td><td style="font-family: monospace; font-weight: 700;">${paymentId}</td></tr>
            <tr><td style="color: #64748b;">Remaining Due on Arrival:</td><td style="font-weight: 700; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color: #64748b;">Payment Status:</td><td style="color: #15803d; font-weight: 700;">VERIFIED & ACTIVE</td></tr>
          </table>
        </div>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${SITE_URL}/?track=${encodeURIComponent(bookingRef)}" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">
            Download Official PDF Voucher →
          </a>
        </p>
        `
      );

      if (customerEmail) {
        await sendEmail({ to: customerEmail, subject, html, fromName: 'HimYatra Billing' });
      }
      return res.status(200).json({ success: true, message: 'Payment receipt dispatched' });
    }

    // ──────────────────────────────────────────────────────────────────
    // 7. BOOKING STATUS UPDATE EMAIL
    // ──────────────────────────────────────────────────────────────────
    if (type === 'status_update') {
      const { bookingRef, customerName, customerEmail, packageTitle, oldStatus, newStatus, adminNote } = body;
      const subject = `📍 Status Update: Ref ${bookingRef} is now "${newStatus.toUpperCase()}" | HimYatra`;
      const html = buildEmailContainer(
        'Tour Status Update',
        'Real-Time Reservation Progress',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${customerName}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          The status of your tour booking <strong>${bookingRef}</strong> (${packageTitle}) has been updated by our operations desk:
        </p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; text-align: center;">
          <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; display: block; margin-bottom: 6px;">
            NEW CURRENT STATUS
          </span>
          <span style="display: inline-block; background: #12372F; color: #34d399; padding: 8px 24px; border-radius: 30px; font-size: 16px; font-weight: 800;">
            ${newStatus.toUpperCase()}
          </span>
          ${adminNote ? `<p style="margin: 14px 0 0 0; font-size: 13px; color: #475569;"><strong>Note from Tour Operations:</strong> ${adminNote}</p>` : ''}
        </div>
        <p style="text-align: center;">
          <a href="${SITE_URL}/?track=${encodeURIComponent(bookingRef)}" style="display: inline-block; background-color: #1F6B55; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;">
            Track Booking Live Online →
          </a>
        </p>
        `
      );

      if (customerEmail) {
        await sendEmail({ to: customerEmail, subject, html, fromName: 'HimYatra Operations' });
      }
      return res.status(200).json({ success: true, message: 'Status update email dispatched' });
    }

    // ──────────────────────────────────────────────────────────────────
    // 8. CUSTOM TRIP INQUIRY CONFIRMATION EMAIL
    // ──────────────────────────────────────────────────────────────────
    if (type === 'custom_trip') {
      const trip = body.trip || body;
      const name = trip.contactName || trip.name || 'Traveler';
      const phone = trip.contactPhone || trip.phone || 'Not provided';
      const email = trip.email || '';
      const region = trip.selectedRegion || trip.region || 'Himalayas';
      const spots = Array.isArray(trip.selectedSpots) ? trip.selectedSpots.join(', ') : 'Custom Route';
      const duration = trip.durationDays || 5;
      const guests = trip.travelersCount || 2;
      const budget = trip.estimatedPrice || 'Custom Quote';

      const subject = `✨ Custom Trip Request: ${name} (${region} - ${duration} Days) | HimYatra`;
      const html = buildEmailContainer(
        'Custom Trip Itinerary Request',
        'Bespoke Vacation Planning Desk',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          We have received your custom tour requirements for <strong>${region}</strong>. Our holiday designer will review your preferences and share a personalized day-by-day plan with cab and hotel quotes on WhatsApp within 2 hours.
        </p>
        <div style="background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 16px; margin: 18px 0;">
          <h4 style="margin: 0 0 8px 0; color: #115e59; font-size: 14px;">Your Trip Preferences:</h4>
          <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px;">
            <tr><td width="40%" style="color: #64748b;">Target Region:</td><td style="font-weight: 700;">${region}</td></tr>
            <tr><td style="color: #64748b;">Places to Visit:</td><td>${spots}</td></tr>
            <tr><td style="color: #64748b;">Duration:</td><td>${duration} Days</td></tr>
            <tr><td style="color: #64748b;">Guests:</td><td>${guests} Travelers</td></tr>
            <tr><td style="color: #64748b;">Estimated Budget:</td><td style="font-weight: 700; color: #047857;">₹${budget}</td></tr>
            <tr><td style="color: #64748b;">Contact Mobile:</td><td>${phone}</td></tr>
          </table>
        </div>
        `
      );

      // Customer acknowledgment
      if (email) {
        await sendEmail({ to: email, subject: `Trip Plan Received: ${region} (${duration} Days) | HimYatra`, html, fromName: 'HimYatra Custom Desk' });
      }
      // Admin notification
      await sendEmail({
        to: ownerEmail,
        subject: `🔔 [CUSTOM TRIP INQUIRY] ${name} | ${region} | 📞 ${phone}`,
        html,
        fromName: 'HimYatra Leads'
      });

      return res.status(200).json({ success: true, message: 'Custom trip inquiry registered' });
    }

    // ──────────────────────────────────────────────────────────────────
    // 9 & 10. GENERAL INQUIRY / CALLBACK REQUEST (Customer + Admin)
    // ──────────────────────────────────────────────────────────────────
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

    const adminSubject = `📬 [NEW INQUIRY] ${name} | 📞 ${phone} | ${destination}`;
    const adminHtml = buildEmailContainer(
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
      </table>

      <div style="margin-top: 20px; padding: 12px; background-color: #f1f5f9; border-radius: 8px; text-align: center;">
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)}!%20Thank%20you%20for%20contacting%20HimYatra.%20I%20am%20Amit%20Verma,%20how%20can%20I%20help%20you%20with%20your%20${encodeURIComponent(destination)}%20trip?" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 8px 18px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none;">
          📲 Reply on WhatsApp to Customer
        </a>
      </div>
      `
    );

    // Customer confirmation
    if (email) {
      const custAckHtml = buildEmailContainer(
        'We Have Received Your Inquiry',
        'HimYatra Travel Desk',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          Thank you for inquiring about travels to <strong>${destination}</strong>. Our holiday concierge has logged your message. Founder Amit Verma or our senior travel desk will contact you via WhatsApp / call shortly with package options and cab quotes.
        </p>
        <p style="font-size: 13px; color: #64748b;">
          Need immediate assistance? Call or WhatsApp us anytime at <strong>+91 76199 17057</strong>.
        </p>
        `
      );
      await sendEmail({ to: email, subject: `Inquiry Received: ${destination} Tours | HimYatra`, html: custAckHtml, fromName: 'HimYatra Concierge' });
    }

    const adminRes = await sendEmail({ to: ownerEmail, subject: adminSubject, html: adminHtml, fromName: 'HimYatra Inquiries' });

    return res.status(200).json({
      success: true,
      delivered: Boolean(adminRes?.success),
      provider: adminRes?.provider,
      message: 'Inquiry processed successfully'
    });

  } catch (err) {
    console.error('Fatal email API error:', err);
    return res.status(500).json({
      success: false,
      error: 'Email handler error: ' + err.message
    });
  }
}
