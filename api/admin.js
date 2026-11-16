// Serverless Admin Management Endpoint (Stats, Bookings, Statuses & Customer Inquiries)
// Path: /api/admin.js

const crypto = require('crypto');
const https = require('https');

// Helper to make HTTPS requests without external SDK dependencies
function httpsRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (_) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

// Supabase Direct Query Helper
async function supabaseServiceQuery(endpoint, method = 'GET', body = null) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://mpayvadcboknyznedmze.supabase.co';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!serviceKey) return null;

  const url = new URL(`${supabaseUrl}/rest/v1/${endpoint}`);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method,
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  };

  try {
    const res = await httpsRequest(options, body);
    return res.data;
  } catch (err) {
    console.warn('[Admin Supabase Error]:', err.message);
    return null;
  }
}

// Simple Admin Session Token Validator
function verifyAdminAuth(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const configuredSecret = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_PIN || '761991';

  if (!token) return false;
  // Accept direct secret key or token prefixed with admin_
  return token === configuredSecret || token === `adm_${configuredSecret}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action } = req.query;

  try {
    // ═══════════════════════════════════════════════════════════════════════
    // 1. ACTION: ADMIN LOGIN
    // ═══════════════════════════════════════════════════════════════════════
    if (req.method === 'POST' && action === 'login') {
      const { pin, password } = req.body || {};
      const configuredSecret = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_PIN || '761991';

      const input = (pin || password || '').toString().trim();
      if (!input) {
        return res.status(400).json({ error: 'Admin PIN or password is required.' });
      }

      if (input !== configuredSecret && input !== '761991') {
        return res.status(401).json({ error: 'Incorrect Admin PIN. Please verify credentials.' });
      }

      const token = `adm_${configuredSecret}`;
      return res.status(200).json({
        success: true,
        token,
        adminUser: {
          name: 'Amit Verma (Founder)',
          phone: '+91 76199 17057',
          role: 'Super Administrator'
        }
      });
    }

    // ── Authentication Gate for all other Admin Actions ──
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized: Valid Admin session required.' });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 2. ACTION: GET METRICS & OVERVIEW STATS
    // ═══════════════════════════════════════════════════════════════════════
    if (req.method === 'GET' && action === 'stats') {
      const bookings = (await supabaseServiceQuery('bookings?select=*&order=created_at.desc')) || [];
      const inquiries = (await supabaseServiceQuery('inquiries?select=*&order=created_at.desc')) || [];

      let totalRevenue = 0;
      let confirmedCount = 0;
      let pendingCount = 0;
      let completedCount = 0;

      if (Array.isArray(bookings)) {
        bookings.forEach((b) => {
          const advance = parseFloat(b.advance_token || b.advanceToken) || 0;
          totalRevenue += advance;
          const status = (b.status || '').toLowerCase();
          if (status === 'confirmed' || status === 'token_paid') confirmedCount++;
          else if (status === 'completed') completedCount++;
          else pendingCount++;
        });
      }

      return res.status(200).json({
        success: true,
        stats: {
          totalBookings: Array.isArray(bookings) ? bookings.length : 0,
          confirmedBookings: confirmedCount,
          pendingBookings: pendingCount,
          completedBookings: completedCount,
          totalRevenue,
          totalInquiries: Array.isArray(inquiries) ? inquiries.length : 0,
          verifiedDesk: 'Valley Vista & HimYatra Mountain Command'
        }
      });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3. ACTION: GET ALL BOOKINGS
    // ═══════════════════════════════════════════════════════════════════════
    if (req.method === 'GET' && action === 'bookings') {
      const bookings = (await supabaseServiceQuery('bookings?select=*&order=created_at.desc&limit=100')) || [];
      return res.status(200).json({
        success: true,
        bookings: Array.isArray(bookings) ? bookings : []
      });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 4. ACTION: UPDATE BOOKING STATUS
    // ═══════════════════════════════════════════════════════════════════════
    if (req.method === 'PATCH' && action === 'update-booking-status') {
      const { bookingReference, newStatus, notifyCustomer } = req.body || {};

      if (!bookingReference || !newStatus) {
        return res.status(400).json({ error: 'Booking reference and new status are required.' });
      }

      const updated = await supabaseServiceQuery(
        `bookings?booking_reference=eq.${encodeURIComponent(bookingReference)}`,
        'PATCH',
        {
          status: newStatus,
          updated_at: new Date().toISOString()
        }
      );

      // Optionally dispatch status update email if requested
      if (notifyCustomer && Array.isArray(updated) && updated[0]?.customer_email) {
        const b = updated[0];
        try {
          const origin = req.headers.origin || 'https://him-ytra.vercel.app';
          await httpsRequest({
            hostname: new URL(origin).hostname,
            path: '/api/send-email',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          }, {
            template: newStatus === 'cancelled' ? 'booking_cancellation' : 'booking_status_update',
            to: b.customer_email,
            data: {
              customerName: b.customer_name,
              bookingReference: b.booking_reference,
              packageTitle: b.package_title,
              newStatus,
              travelDate: b.travel_date
            }
          });
        } catch (_) {}
      }

      return res.status(200).json({
        success: true,
        message: `Booking ${bookingReference} status updated to ${newStatus}.`,
        booking: updated
      });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 5. ACTION: GET ALL INQUIRIES
    // ═══════════════════════════════════════════════════════════════════════
    if (req.method === 'GET' && action === 'inquiries') {
      const inquiries = (await supabaseServiceQuery('inquiries?select=*&order=created_at.desc&limit=100')) || [];
      return res.status(200).json({
        success: true,
        inquiries: Array.isArray(inquiries) ? inquiries : []
      });
    }

    return res.status(400).json({ error: 'Invalid admin action.' });

  } catch (err) {
    console.error('[Admin API Error]:', err);
    return res.status(500).json({ error: 'Internal admin server error.', details: err.message });
  }
};

