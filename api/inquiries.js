// Vercel Serverless Function — /api/inquiries
// Validated Inquiry & Custom Trip Processor with Honeypot Spam Filtering,
// Supabase Database Storage, and Dual Email Notifications.

import { createClient } from '@supabase/supabase-js';
import { sendEmail, buildEmailContainer } from './send-email.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://mpayvadcboknyznedmze.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYXl2YWRjYm9rbnl6bmVkbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTUxODQsImV4cCI6MjEwNzQ3MTE4NH0.u-Y7vUFPGjX1sQhowHabq83dQCt8kYECAEDP0LT2HrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: Fetch inquiries for admin or customer
  if (req.method === 'GET') {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const email = searchParams.get('email') || req.query?.email;
    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(50);
    if (email) query = query.eq('email', email.trim().toLowerCase());
    const { data, error } = await query;
    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.status(200).json({ success: true, inquiries: data || [] });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};

    // 1. Honeypot check (anti-bot)
    if (body.bot_trap || body.honeypot || body._gotcha) {
      console.warn('Bot submission caught via honeypot field');
      return res.status(200).json({ success: true, message: 'Inquiry received' });
    }

    const name = (body.name || '').trim();
    const phone = (body.phone || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const destination = (body.destination || 'Himachal & Uttarakhand').trim();
    const travelDate = body.travelDate || body.travel_date || 'Flexible';
    const travelersCount = body.travelersCount || body.travelers_count || '1-2 Travelers';
    const pickupCity = body.fromCity || body.pickup_city || 'Delhi / Chandigarh';
    const message = (body.message || 'Customer requested tour package quotation & itinerary.').trim();
    const source = body.source || 'Website Contact Form';

    // 2. Validation
    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your name.' });
    }
    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit mobile number.' });
    }

    // 3. Save to Supabase
    const record = {
      name,
      phone,
      email: email || null,
      customer_username: body.customerUsername || null,
      destination,
      travel_date: travelDate,
      travelers_count: travelersCount,
      pickup_city: pickupCity,
      message,
      source,
      created_at: new Date().toISOString()
    };

    const { data: savedData, error: dbErr } = await supabase
      .from('inquiries')
      .insert([record])
      .select();

    if (dbErr) {
      console.warn('Supabase inquiry insert note:', dbErr.message);
    }

    // 4. Send notification emails (Admin Alert + Customer Acknowledgment)
    const ownerEmail = process.env.OWNER_EMAIL || 'amitpatel42203@gmail.com';

    const adminSubject = `📬 [NEW INQUIRY] ${name} | 📞 ${phone} | ${destination}`;
    const adminHtml = buildEmailContainer(
      'New Customer Travel Inquiry',
      'Direct Travel Desk Callback Request',
      `
      <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 4px 0; font-size: 16px; color: #0f766e;">🔔 New Traveler Inquiry Received</h2>
        <p style="margin: 0; font-size: 13px; color: #115e59;">
          A traveler has contacted the desk via <strong>${source}</strong>.
        </p>
      </div>

      <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
        <tr><td width="36%" style="color: #64748b;">Customer Name:</td><td style="font-weight: 700; color: #0f172a;">${name}</td></tr>
        <tr><td style="color: #64748b;">Mobile:</td><td style="font-weight: 700;"><a href="tel:${phone}" style="color: #1F6B55; text-decoration: none;">${phone}</a></td></tr>
        <tr><td style="color: #64748b;">Email:</td><td>${email || 'Not provided'}</td></tr>
        <tr><td style="color: #64748b;">Destination:</td><td style="font-weight: 600; color: #12372F;">${destination}</td></tr>
        <tr><td style="color: #64748b;">Travel Date:</td><td>${travelDate}</td></tr>
        <tr><td style="color: #64748b;">Guests:</td><td>${travelersCount}</td></tr>
        <tr><td style="color: #64748b;" valign="top">Message:</td><td style="color: #334155;">${message}</td></tr>
      </table>

      <div style="margin-top: 20px; text-align: center;">
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)}!%20Thank%20you%20for%20contacting%20Valley%20Vista.%20I%20am%20Amit%20Verma,%20how%20can%20I%20help%20you%20with%20your%20${encodeURIComponent(destination)}%20trip?" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none;">
          📲 Reply to Customer on WhatsApp
        </a>
      </div>
      `
    );

    sendEmail({ to: ownerEmail, subject: adminSubject, html: adminHtml, fromName: 'Valley Vista Inquiries' }).catch(() => {});

    if (email) {
      const custHtml = buildEmailContainer(
        'Inquiry Received',
        'Valley Vista Travel Desk',
        `
        <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 14px; line-height: 22px; color: #334155;">
          Thank you for reaching out to <strong>Valley Vista</strong>! We have received your inquiry for <strong>${destination}</strong>. Our senior travel consultant will connect with you shortly with customized quotes and itinerary options.
        </p>
        <p style="font-size: 13px; color: #64748b;">
          Direct 24/7 Helpline: <strong>+91 76199 17057</strong> (Founder Amit Verma).
        </p>
        `
      );
      sendEmail({ to: email, subject: `Inquiry Received: ${destination} Tours | Valley Vista`, html: custHtml, fromName: 'Valley Vista Concierge' }).catch(() => {});
    }

    return res.status(201).json({
      success: true,
      inquiry: savedData?.[0] || record,
      message: 'Thank you! Your inquiry has been received. We will contact you shortly.'
    });

  } catch (err) {
    console.error('Inquiries API error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

