// Vercel Serverless Function — /api/auth
// Real Backend OTP Generation, Verification, Password Hashing, Rate Limiting,
// and Session Profile Management. Never trusts frontend-generated OTPs.

import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from './send-email.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://mpayvadcboknyznedmze.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYXl2YWRjYm9rbnl6bmVkbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTUxODQsImV4cCI6MjEwNzQ3MTE4NH0.u-Y7vUFPGjX1sQhowHabq83dQCt8kYECAEDP0LT2HrE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// In-memory rate limiting and cooldown store
const RATE_LIMIT_WINDOW = 60 * 1000;
const rateLimitMap = new Map();
const cooldownMap = new Map(); // email -> timestamp of last OTP send

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }
  rateLimitMap.set(ip, entry);
  return entry.count > 15; // max 15 auth calls per min
}

// Cryptographically secure 6-digit OTP generator
function generateSecureOtp() {
  const num = crypto.randomInt(100000, 999999);
  return num.toString();
}

// Secure SHA-256 hash
function hashSecret(secret, salt) {
  return crypto.createHash('sha256').update(`${secret}:${salt}`).digest('hex');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (checkRateLimit(ip)) {
    return res.status(429).json({ success: false, error: 'Too many auth requests. Please wait a minute.' });
  }

  const { searchParams } = new URL(req.url, 'http://localhost');
  const action = req.query?.action || searchParams.get('action') || req.body?.action;

  try {
    // ══════════════════════════════════════════════════════════════════
    // ACTION 1: SEND REAL EMAIL OTP
    // ══════════════════════════════════════════════════════════════════
    if (action === 'send-otp') {
      const email = (req.body?.email || '').trim().toLowerCase();
      const username = (req.body?.username || '').trim().toLowerCase();
      const purpose = req.body?.purpose || 'Login & Verification';

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ success: false, error: 'Valid email address is required.' });
      }

      // 60-second Resend Cooldown
      const lastSent = cooldownMap.get(email);
      if (lastSent && Date.now() - lastSent < 60 * 1000) {
        const remaining = Math.ceil((60000 - (Date.now() - lastSent)) / 1000);
        return res.status(429).json({
          success: false,
          error: `Please wait ${remaining} seconds before requesting another code.`
        });
      }

      // Generate cryptographically secure OTP
      const otpCode = generateSecureOtp();
      const salt = crypto.randomBytes(16).toString('hex');
      const otpHash = hashSecret(otpCode, salt);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

      // Invalidate any existing unused OTPs for this email
      await supabase
        .from('auth_otps')
        .update({ verified: true })
        .eq('email', email)
        .eq('verified', false);

      // Save to Supabase
      const { error: insertErr } = await supabase.from('auth_otps').insert([{
        email,
        username: username || email.split('@')[0],
        otp_code: otpCode, // stored for verification; can also store salt
        expires_at: expiresAt,
        verified: false
      }]);

      if (insertErr) {
        console.warn('Supabase auth_otps insert error:', insertErr.message);
      }

      cooldownMap.set(email, Date.now());

      // Send actual email to customer's Gmail
      const emailRes = await sendEmail({
        to: email,
        subject: `🔐 Valley Vista Security Code: ${otpCode} (Expires in 5 Mins)`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #12372F; margin-top: 0;">Valley Vista Security Passcode</h2>
          <p style="color: #475569; font-size: 14px;">Your one-time verification code for <strong>${purpose}</strong> is:</p>
          <div style="background-color: #12372F; color: #ffffff; padding: 18px; text-align: center; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 6px; font-family: monospace;">
            ${otpCode}
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 16px;">
            ⏱️ This passcode is valid for <strong>5 minutes</strong>. Do not share this code with anyone.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">
            Valley Vista Tours & Travels • Founder Amit Verma (+91 76199 17057)
          </p>
        </div>
        `,
        fromName: 'Valley Vista Security'
      });

      return res.status(200).json({
        success: true,
        message: `OTP dispatched to ${email}`,
        delivered: emailRes.success,
        expiresInSeconds: 300
      });
    }

    // ══════════════════════════════════════════════════════════════════
    // ACTION 2: VERIFY EMAIL OTP
    // ══════════════════════════════════════════════════════════════════
    if (action === 'verify-otp') {
      const email = (req.body?.email || '').trim().toLowerCase();
      const enteredOtp = (req.body?.otp || req.body?.otpCode || '').trim();
      const username = (req.body?.username || '').trim().toLowerCase();

      if (!email || !enteredOtp) {
        return res.status(400).json({ success: false, error: 'Email and OTP code are required.' });
      }

      // Query latest active OTP for this email
      const { data, error } = await supabase
        .from('auth_otps')
        .select('*')
        .eq('email', email)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) {
        return res.status(400).json({ success: false, error: 'OTP has expired or does not exist. Please request a new code.' });
      }

      const record = data[0];

      // Check max attempts
      const attempts = (record.attempts || 0) + 1;
      if (attempts > 5) {
        await supabase.from('auth_otps').update({ verified: true }).eq('id', record.id);
        return res.status(400).json({ success: false, error: 'Maximum verification attempts exceeded. Please request a new code.' });
      }

      if (record.otp_code !== enteredOtp) {
        await supabase.from('auth_otps').update({ attempts }).eq('id', record.id);
        return res.status(400).json({ success: false, error: `Invalid OTP code. (${5 - attempts} attempts remaining)` });
      }

      // Invalidate OTP (prevent replay)
      await supabase.from('auth_otps').update({ verified: true }).eq('id', record.id);

      // Find or create user profile
      const cleanUsername = username || record.username || email.split('@')[0];
      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('*')
        .or(`email.eq.${email},username.eq.${cleanUsername}`)
        .limit(1);

      let user = profiles?.[0];

      if (!user) {
        const { data: created, error: crErr } = await supabase.from('user_profiles').insert([{
          username: cleanUsername,
          email,
          full_name: cleanUsername.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          total_bookings: 0,
          total_inquiries: 0,
          total_spent: 0,
          last_login: new Date().toISOString()
        }]).select();

        user = created?.[0];
      } else {
        await supabase.from('user_profiles').update({ last_login: new Date().toISOString() }).eq('id', user.id);
      }

      const safeUser = {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        full_name: user?.full_name,
        phone: user?.phone,
        total_bookings: user?.total_bookings || 0
      };

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        user: safeUser
      });
    }

    // ══════════════════════════════════════════════════════════════════
    // ACTION 3: USER REGISTRATION (Password + Verified OTP)
    // ══════════════════════════════════════════════════════════════════
    if (action === 'register') {
      const email = (req.body?.email || '').trim().toLowerCase();
      const username = (req.body?.username || '').trim().toLowerCase().replace(/\s+/g, '_');
      const password = req.body?.password;
      const otpCode = (req.body?.otp || '').trim();

      if (!email || !username || !password || !otpCode) {
        return res.status(400).json({ success: false, error: 'All fields (email, username, password, OTP) are required.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });
      }

      // Verify OTP server-side
      const { data: otpRecords } = await supabase
        .from('auth_otps')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otpCode)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .limit(1);

      if (!otpRecords || otpRecords.length === 0) {
        return res.status(400).json({ success: false, error: 'Invalid or expired verification code.' });
      }

      // Mark OTP as used
      await supabase.from('auth_otps').update({ verified: true }).eq('id', otpRecords[0].id);

      // Check existing user
      const { data: existing } = await supabase
        .from('user_profiles')
        .select('id, username, email')
        .or(`username.eq.${username},email.eq.${email}`)
        .limit(1);

      if (existing && existing.length > 0) {
        return res.status(400).json({ success: false, error: 'An account with this username or email already exists.' });
      }

      // Hash password
      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashSecret(password, salt);

      const { data: newUser, error: insErr } = await supabase.from('user_profiles').insert([{
        username,
        email,
        full_name: username.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        password_hash: passwordHash,
        password_salt: salt,
        total_bookings: 0,
        total_inquiries: 0,
        total_spent: 0,
        last_login: new Date().toISOString()
      }]).select();

      if (insErr) {
        return res.status(500).json({ success: false, error: insErr.message });
      }

      // Send welcome email
      sendEmail({
        to: email,
        subject: `🎉 Welcome to Valley Vista, @${username}!`,
        html: `<h2>Welcome to Valley Vista!</h2><p>Your travel account @${username} is now verified and active.</p>`,
        fromName: 'Valley Vista'
      }).catch(() => {});

      return res.status(200).json({
        success: true,
        user: {
          id: newUser[0].id,
          username: newUser[0].username,
          email: newUser[0].email,
          full_name: newUser[0].full_name
        }
      });
    }

    // ══════════════════════════════════════════════════════════════════
    // ACTION 4: PASSWORD LOGIN
    // ══════════════════════════════════════════════════════════════════
    if (action === 'login') {
      const identifier = (req.body?.identifier || '').trim().toLowerCase();
      const password = req.body?.password;

      if (!identifier || !password) {
        return res.status(400).json({ success: false, error: 'Username/Email and password are required.' });
      }

      const { data: users, error } = await supabase
        .from('user_profiles')
        .select('*')
        .or(`username.eq.${identifier},email.eq.${identifier}`)
        .limit(1);

      if (error || !users || users.length === 0) {
        return res.status(401).json({ success: false, error: 'No account found with these credentials.' });
      }

      const user = users[0];
      if (!user.password_hash || !user.password_salt) {
        return res.status(400).json({ success: false, error: 'This account was created via OTP. Please sign in using Email OTP.' });
      }

      const computedHash = hashSecret(password, user.password_salt);
      if (computedHash !== user.password_hash) {
        return res.status(401).json({ success: false, error: 'Incorrect password. Please try again.' });
      }

      await supabase.from('user_profiles').update({ last_login: new Date().toISOString() }).eq('id', user.id);

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          total_bookings: user.total_bookings || 0
        }
      });
    }

    // ══════════════════════════════════════════════════════════════════
    // ACTION 5: FORGOT & RESET PASSWORD
    // ══════════════════════════════════════════════════════════════════
    if (action === 'reset-password') {
      const email = (req.body?.email || '').trim().toLowerCase();
      const otpCode = (req.body?.otp || '').trim();
      const newPassword = req.body?.newPassword;

      if (!email || !otpCode || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ success: false, error: 'Valid email, OTP, and 6+ character new password are required.' });
      }

      // Verify OTP
      const { data: otps } = await supabase
        .from('auth_otps')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otpCode)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .limit(1);

      if (!otps || otps.length === 0) {
        return res.status(400).json({ success: false, error: 'Invalid or expired OTP code.' });
      }

      await supabase.from('auth_otps').update({ verified: true }).eq('id', otps[0].id);

      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashSecret(newPassword, salt);

      const { error: updErr } = await supabase
        .from('user_profiles')
        .update({ password_hash: passwordHash, password_salt: salt })
        .eq('email', email);

      if (updErr) {
        return res.status(500).json({ success: false, error: updErr.message });
      }

      return res.status(200).json({ success: true, message: 'Password has been reset successfully. Please log in.' });
    }

    return res.status(400).json({ success: false, error: `Unknown action: ${action}` });

  } catch (err) {
    console.error('Auth API fatal error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

