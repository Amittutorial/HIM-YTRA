// Vercel Serverless Function — /api/bookings
// Server-side Booking Creation, Validation, Status Tracking, Cancellation,
// and Dual Email Notification Engine.

import { createClient } from '@supabase/supabase-js';
import { sendEmail, buildEmailContainer } from './send-email.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://mpayvadcboknyznedmze.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYXl2YWRjYm9rbnl6bmVkbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTUxODQsImV4cCI6MjEwNzQ3MTE4NH0.u-Y7vUFPGjX1sQhowHabq83dQCt8kYECAEDP0LT2HrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function generateBookingReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'HY-';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // ══════════════════════════════════════════════════════════════════
    // GET /api/bookings (Fetch single by reference, or list by user email)
    // ══════════════════════════════════════════════════════════════════
    if (req.method === 'GET') {
      const { searchParams } = new URL(req.url, 'http://localhost');
      const ref = searchParams.get('ref') || req.query?.ref;
      const email = searchParams.get('email') || req.query?.email;
      const username = searchParams.get('username') || req.query?.username;

      // 1. Single booking tracking by reference
      if (ref) {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('booking_reference', ref.trim().toUpperCase())
          .limit(1);

        if (error || !data || data.length === 0) {
          return res.status(404).json({ success: false, error: 'Booking reference not found.' });
        }
        return res.status(200).json({ success: true, booking: data[0] });
      }

      // 2. User booking history
      if (email || username) {
        let query = supabase.from('bookings').select('*');
        if (email && username) {
          query = query.or(`customer_email.eq.${email.trim().toLowerCase()},customer_username.eq.${username.trim().toLowerCase()}`);
        } else if (email) {
          query = query.eq('customer_email', email.trim().toLowerCase());
        } else {
          query = query.eq('customer_username', username.trim().toLowerCase());
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) {
          return res.status(500).json({ success: false, error: error.message });
        }
        return res.status(200).json({ success: true, bookings: data || [] });
      }

      return res.status(400).json({ success: false, error: 'Provide ref or email parameter.' });
    }

    // ══════════════════════════════════════════════════════════════════
    // POST /api/bookings (Create validated booking & dispatch emails)
    // ══════════════════════════════════════════════════════════════════
    if (req.method === 'POST') {
      const b = req.body || {};

      // 1. Server-side Validation
      const customerName = (b.name || b.customer_name || '').trim();
      const customerPhone = (b.phone || b.customer_phone || '').trim();
      const customerEmail = (b.email || b.customer_email || '').trim().toLowerCase();
      const packageTitle = (b.packageTitle || b.package_title || 'Himalayan Holiday Package').trim();
      const packageId = (b.packageId || b.package_id || 'pkg-custom').trim();
      const travelDate = b.travelDate || b.travel_date;
      const adultsCount = parseInt(b.adults || b.adults_count || '1', 10);
      const childrenCount = parseInt(b.children || b.children_count || '0', 10);
      const pickupCity = (b.pickupCity || b.pickup_city || 'Delhi / Chandigarh').trim();
      const vehicleTier = b.vehicleTier || b.vehicle_tier || 'Private Dedicated Cab';
      const hotelTier = b.hotelTier || b.hotel_tier || 'Deluxe Mountain Resort';
      const rawPrice = parseFloat(b.finalTotal || b.total_price) || 0;
      const advanceToken = parseFloat(b.advanceToken || b.advance_token) || Math.round(rawPrice * 0.2);
      const couponApplied = (b.couponCode || b.coupon_applied || 'None').trim();
      const specialRequests = b.specialRequests || b.special_requests || '';
      const utrRef = b.utr || b.utr_reference || '';

      if (!customerName || customerName.length < 2) {
        return res.status(400).json({ success: false, error: 'Customer name is required.' });
      }
      if (!customerPhone || customerPhone.length < 10) {
        return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number is required.' });
      }
      if (rawPrice <= 0) {
        return res.status(400).json({ success: false, error: 'Invalid booking package price calculation.' });
      }

      // 2. Generate Unique Reference (e.g. HY-892147)
      const bookingRef = b.bookingId || b.booking_reference || generateBookingReference();

      // 3. Save Record in Supabase
      const newRecord = {
        booking_reference: bookingRef,
        package_id: packageId,
        package_title: packageTitle,
        state: b.state || 'Himachal Pradesh & Uttarakhand',
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || null,
        customer_username: b.customerUsername || b.customer_username || null,
        travel_date: travelDate || null,
        adults_count: adultsCount,
        children_count: childrenCount,
        pickup_city: pickupCity,
        vehicle_tier: vehicleTier,
        hotel_tier: hotelTier,
        total_price: rawPrice,
        advance_token: advanceToken,
        coupon_applied: couponApplied,
        special_requests: specialRequests,
        utr_reference: utrRef || null,
        status: utrRef ? 'token_paid' : 'pending_payment',
        created_at: new Date().toISOString()
      };

      const { data: savedData, error: dbErr } = await supabase
        .from('bookings')
        .insert([newRecord])
        .select();

      if (dbErr) {
        console.error('Supabase booking insert error:', dbErr.message);
        return res.status(500).json({ success: false, error: 'Database error: ' + dbErr.message });
      }

      // 4. Update user profile total_bookings count if customer is logged in
      if (customerEmail || b.customerUsername) {
        supabase
          .from('user_profiles')
          .select('id, total_bookings')
          .or(`email.eq.${customerEmail},username.eq.${b.customerUsername}`)
          .limit(1)
          .then(({ data: profs }) => {
            if (profs && profs[0]) {
              supabase
                .from('user_profiles')
                .update({ total_bookings: (profs[0].total_bookings || 0) + 1 })
                .eq('id', profs[0].id)
                .catch(() => {});
            }
          });
      }

      // 5. Trigger Dual Email Dispatch (Owner Alert + Customer Confirmation)
      // Call local sendEmail helper directly
      const ownerEmail = process.env.OWNER_EMAIL || 'amitpatel42203@gmail.com';
      const remainingBalance = Math.max(0, rawPrice - advanceToken);

      const ownerSubject = `🔔 [NEW BOOKING] ${packageTitle} | Ref: ${bookingRef} | Advance: ₹${advanceToken.toLocaleString('en-IN')} | ${customerName}`;
      const ownerHtml = buildEmailContainer(
        'New Confirmed Booking Alert',
        'Customer Booking & Advance Payment Notification',
        `
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 6px 0; font-size: 16px; color: #065f46;">🎉 New Reservation Received!</h2>
          <p style="margin: 0; font-size: 13px; color: #047857;">
            ${customerName} has reserved <strong>${packageTitle}</strong> with Reference <strong>${bookingRef}</strong>.
          </p>
        </div>
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
          <tr><td width="38%" style="color: #64748b;">Customer Full Name:</td><td style="font-weight: 700;">${customerName}</td></tr>
          <tr><td style="color: #64748b;">Mobile:</td><td style="font-weight: 700;">${customerPhone}</td></tr>
          <tr><td style="color: #64748b;">Email:</td><td>${customerEmail || 'Not provided'}</td></tr>
          <tr><td style="color: #64748b;">Travel Date:</td><td>${travelDate}</td></tr>
          <tr><td style="color: #64748b;">Guests:</td><td>${adultsCount} Adults, ${childrenCount} Children</td></tr>
          <tr><td style="color: #64748b;">Total Price:</td><td style="font-weight: 800; color: #0f172a;">₹${rawPrice.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #64748b;">Advance Token:</td><td style="font-weight: 800; color: #047857;">₹${advanceToken.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #64748b;">Due on Arrival:</td><td style="font-weight: 800; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
          <tr><td style="color: #64748b;">UTR / Payment ID:</td><td style="font-family: monospace;">${utrRef || 'Pending Token'}</td></tr>
        </table>
        `
      );

      sendEmail({ to: ownerEmail, subject: ownerSubject, html: ownerHtml, fromName: 'HimYatra Bookings' }).catch(() => {});

      if (customerEmail) {
        const custSubject = `🏔️ Booking Confirmed: Ref ${bookingRef} — ${packageTitle} | HimYatra`;
        const custHtml = buildEmailContainer(
          'Your Booking is Confirmed',
          'Official E-Ticket & Vacation Confirmation Voucher',
          `
          <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${customerName}</strong>,</p>
          <p style="font-size: 14px; line-height: 22px; color: #334155;">
            Thank you for choosing <strong>HimYatra</strong>! Your booking reservation for <strong>${packageTitle}</strong> is confirmed.
          </p>
          <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 16px; margin: 18px 0;">
            <div style="font-size: 11px; text-transform: uppercase; color: #166534; font-weight: 700;">Booking Reference ID</div>
            <div style="font-size: 24px; font-weight: 900; color: #12372F; letter-spacing: 1px; margin-top: 4px;">${bookingRef}</div>
          </div>
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px;">
            <tr><td width="40%" style="color: #64748b;">Travel Date:</td><td style="font-weight: 600;">${travelDate}</td></tr>
            <tr><td style="color: #64748b;">Total Tour Cost:</td><td style="font-weight: 800;">₹${rawPrice.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color: #64748b;">Advance Paid:</td><td style="font-weight: 800; color: #047857;">₹${advancePaid.toLocaleString('en-IN')}</td></tr>
            <tr><td style="color: #64748b;">Balance Due on Arrival:</td><td style="font-weight: 800; color: #b45309;">₹${remainingBalance.toLocaleString('en-IN')}</td></tr>
          </table>
          <p style="text-align: center; margin-top: 24px;">
            <a href="https://him-ytra.vercel.app/?track=${encodeURIComponent(bookingRef)}" style="display: inline-block; background-color: #12372F; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none;">
              Track Booking & Download Voucher →
            </a>
          </p>
          `
        );
        sendEmail({ to: customerEmail, subject: custSubject, html: custHtml, fromName: 'HimYatra Travel Desk' }).catch(() => {});
      }

      return res.status(201).json({
        success: true,
        booking: savedData?.[0] || newRecord,
        bookingRef,
        message: 'Booking created and confirmed successfully.'
      });
    }

    // ══════════════════════════════════════════════════════════════════
    // PATCH /api/bookings (Update Status, Cancellation, Payment Info)
    // ══════════════════════════════════════════════════════════════════
    if (req.method === 'PATCH') {
      const { id, bookingRef, newStatus, utr, adminNote } = req.body || {};

      if (!id && !bookingRef) {
        return res.status(400).json({ success: false, error: 'Booking ID or Reference is required.' });
      }

      const updates = {};
      if (newStatus) updates.status = newStatus;
      if (utr) updates.utr_reference = utr;

      let query = supabase.from('bookings').update(updates);
      if (id) {
        query = query.eq('id', id);
      } else {
        query = query.eq('booking_reference', bookingRef);
      }

      const { data: updatedData, error: patchErr } = await query.select();

      if (patchErr) {
        return res.status(500).json({ success: false, error: patchErr.message });
      }

      const updatedBooking = updatedData?.[0];

      // If status changed, notify customer via email
      if (updatedBooking && updatedBooking.customer_email && newStatus) {
        const custSubject = `📍 Tour Update: Ref ${updatedBooking.booking_reference} is now "${newStatus.toUpperCase()}" | HimYatra`;
        const custHtml = buildEmailContainer(
          'Booking Status Update',
          'Live Reservation Tracking',
          `
          <p style="font-size: 15px; color: #0f172a; margin-top: 0;">Dear <strong>${updatedBooking.customer_name}</strong>,</p>
          <p style="font-size: 14px; line-height: 22px; color: #334155;">
            The status of your booking <strong>${updatedBooking.booking_reference}</strong> (${updatedBooking.package_title}) has been updated:
          </p>
          <div style="background-color: #12372F; color: #34d399; padding: 14px 20px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: 800; margin: 18px 0;">
            ${newStatus.toUpperCase()}
          </div>
          ${adminNote ? `<p style="font-size: 13px; color: #475569;"><strong>Operations Note:</strong> ${adminNote}</p>` : ''}
          `
        );
        sendEmail({ to: updatedBooking.customer_email, subject: custSubject, html: custHtml, fromName: 'HimYatra Operations' }).catch(() => {});
      }

      return res.status(200).json({
        success: true,
        booking: updatedBooking,
        message: 'Booking updated successfully.'
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });

  } catch (err) {
    console.error('Bookings API fatal error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
