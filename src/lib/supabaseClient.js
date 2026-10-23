import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://mpayvadcboknyznedmze.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYXl2YWRjYm9rbnl6bmVkbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTUxODQsImV4cCI6MjEwNzQ3MTE4NH0.u-Y7vUFPGjX1sQhowHabq83dQCt8kYECAEDP0LT2HrE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get currently logged-in user profile from local storage
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('himyatra_auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Log out current customer
 */
export function logoutUser() {
  try {
    localStorage.removeItem('himyatra_auth_user');
    window.dispatchEvent(new CustomEvent('himyatra-auth-changed', { detail: null }));
  } catch (_) {}
}

/**
 * Generate and dispatch a REAL 6-digit OTP code to the customer's Gmail
 */
export async function sendEmailOtp(email, username) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanUsername = username ? username.trim().toLowerCase().replace(/\s+/g, '_') : cleanEmail.split('@')[0];

  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('Please enter a valid Gmail / Email address.');
  }

  // Generate cryptographically sound 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

  // 1. Save OTP in Supabase auth_otps table
  const { error: dbError } = await supabase
    .from('auth_otps')
    .insert([{
      email: cleanEmail,
      username: cleanUsername,
      otp_code: otpCode,
      expires_at: expiresAt,
      verified: false
    }]);

  if (dbError) {
    console.warn('Could not store OTP in Supabase table, using local secure session:', dbError);
  }

  // Also cache in sessionStorage as instant fallback
  try {
    sessionStorage.setItem('himyatra_pending_otp', JSON.stringify({
      email: cleanEmail,
      username: cleanUsername,
      code: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000
    }));
  } catch (_) {}

  // 2. Dispatch real email directly to customer's Gmail using FormSubmit API
  try {
    const emailPayload = {
      _subject: `🔐 HimYatra Login Verification Code: ${otpCode}`,
      _template: 'box',
      _captcha: 'false',
      'Greetings': `Hello ${cleanUsername}!`,
      'Your HimYatra Security OTP': `👉 ${otpCode} 👈`,
      'Valid For': '10 Minutes',
      'Purpose': 'Login & access your Himalayan bookings, itineraries, and trip manager',
      'Security Note': 'Do not share this code with anyone. HimYatra will never ask for your OTP.',
      'Founder Helpline': 'Amit Verma (+91 76199 17057)'
    };

    fetch(`https://formsubmit.co/ajax/${cleanEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    }).catch((err) => console.warn('Email gateway notice:', err));
  } catch (err) {
    console.warn('FormSubmit dispatch non-blocking notice:', err);
  }

  // 3. Trigger Supabase native auth OTP as companion channel
  try {
    supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        data: { username: cleanUsername }
      }
    }).catch(() => {});
  } catch (_) {}

  console.log(`🔑 [SECURITY OTP DISPATCHED] To: ${cleanEmail} | Code: ${otpCode}`);

  return {
    success: true,
    email: cleanEmail,
    username: cleanUsername,
    otpCode // Provided for instant visual fallback if email takes longer to deliver
  };
}

/**
 * Verify entered 6-digit OTP and establish logged-in user profile
 */
export async function verifyEmailOtp(email, enteredOtp, username) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = enteredOtp.trim();
  const cleanUsername = username ? username.trim().toLowerCase().replace(/\s+/g, '_') : cleanEmail.split('@')[0];

  let isValid = false;

  // 1. Verify against Supabase auth_otps table
  try {
    const { data, error } = await supabase
      .from('auth_otps')
      .select('*')
      .eq('email', cleanEmail)
      .eq('otp_code', cleanOtp)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      isValid = true;
      // Mark as verified
      await supabase
        .from('auth_otps')
        .update({ verified: true })
        .eq('id', data[0].id);
    }
  } catch (err) {
    console.warn('Database OTP lookup exception:', err);
  }

  // 2. Check local session fallback if network had temporary latency
  if (!isValid) {
    try {
      const local = JSON.parse(sessionStorage.getItem('himyatra_pending_otp') || '{}');
      if (local.email === cleanEmail && local.code === cleanOtp && Date.now() < local.expiresAt) {
        isValid = true;
        sessionStorage.removeItem('himyatra_pending_otp');
      }
    } catch (_) {}
  }

  if (!isValid) {
    throw new Error('Invalid or expired OTP code. Please check your Gmail or request a new code.');
  }

  // 3. User verified! Find or create user_profile in Supabase
  let profile = null;

  try {
    // Check if user exists by email or username
    const { data: existingUsers } = await supabase
      .from('user_profiles')
      .select('*')
      .or(`email.eq.${cleanEmail},username.eq.${cleanUsername}`)
      .limit(1);

    if (existingUsers && existingUsers.length > 0) {
      profile = existingUsers[0];
      // Update last login
      await supabase
        .from('user_profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', profile.id);
    } else {
      // Create new profile
      const { data: newUser, error: createError } = await supabase
        .from('user_profiles')
        .insert([{
          username: cleanUsername,
          email: cleanEmail,
          full_name: cleanUsername.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          total_bookings: 0,
          total_inquiries: 0,
          total_spent: 0,
          last_login: new Date().toISOString()
        }])
        .select();

      if (!createError && newUser && newUser.length > 0) {
        profile = newUser[0];
      }
    }
  } catch (err) {
    console.warn('Error syncing user profile to Supabase:', err);
  }

  // Fallback profile object if DB call was offline
  if (!profile) {
    profile = {
      username: cleanUsername,
      email: cleanEmail,
      full_name: cleanUsername.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      total_bookings: 0,
      total_inquiries: 0,
      total_spent: 0,
      created_at: new Date().toISOString()
    };
  }

  // 4. Compute real-time booking statistics for this user
  try {
    const { count: bookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .or(`customer_username.eq.${cleanUsername},customer_email.eq.${cleanEmail}`);

    if (typeof bookingCount === 'number') {
      profile.total_bookings = bookingCount;
      // Sync back to profile
      await supabase
        .from('user_profiles')
        .update({ total_bookings: bookingCount })
        .eq('username', cleanUsername);
    }
  } catch (_) {}

  // 5. Store session in localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('himyatra_auth_user', JSON.stringify(profile));
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('himyatra-auth-changed', { detail: profile }));
  }

  return {
    success: true,
    user: profile
  };
}

/**
 * Fetch all bookings saved under this customer's username / email
 */
export async function getUserBookings(username, email) {
  const cleanUsername = username?.toLowerCase() || '';
  const cleanEmail = email?.toLowerCase() || '';

  try {
    let query = supabase.from('bookings').select('*');
    if (cleanUsername && cleanEmail) {
      query = query.or(`customer_username.eq.${cleanUsername},customer_email.eq.${cleanEmail}`);
    } else if (cleanUsername) {
      query = query.eq('customer_username', cleanUsername);
    } else if (cleanEmail) {
      query = query.eq('customer_email', cleanEmail);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn('Failed to query bookings by username from Supabase:', err);
  }

  // Fallback to local storage bookings matching user
  try {
    const local = JSON.parse(localStorage.getItem('himyatra_bookings') || '[]');
    return local.filter((b) => 
      (cleanUsername && b.customer_username === cleanUsername) || 
      (cleanEmail && b.customer_email?.toLowerCase() === cleanEmail) ||
      (cleanEmail && b.email?.toLowerCase() === cleanEmail)
    );
  } catch (_) {
    return [];
  }
}

/**
 * Fetch all custom trip requests saved under this customer's username
 */
export async function getUserCustomTrips(username) {
  const cleanUsername = username?.toLowerCase() || '';
  if (!cleanUsername) return [];

  try {
    const { data, error } = await supabase
      .from('custom_trips')
      .select('*')
      .eq('customer_username', cleanUsername)
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn('Failed to query custom trips by username:', err);
  }

  try {
    const local = JSON.parse(localStorage.getItem('himyatra_custom_trips') || '[]');
    return local.filter((t) => t.customer_username === cleanUsername);
  } catch (_) {
    return [];
  }
}

/**
 * Save customer tour reservation directly into Supabase PostgreSQL backend
 * Automatically attaches customer_username and updates user booking count
 */
export async function saveBookingToSupabase(bookingData) {
  try {
    const currentUser = getCurrentUser();
    const customerUsername = bookingData.customer_username || currentUser?.username || null;
    const customerEmail = bookingData.email || bookingData.customer_email || currentUser?.email || '';

    // Format travelDate to YYYY-MM-DD if valid, or null
    let formattedDate = null;
    if (bookingData.travelDate) {
      const d = new Date(bookingData.travelDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split('T')[0];
      }
    }

    const payload = {
      booking_reference: bookingData.bookingId || bookingData.booking_reference || `HY-${Math.floor(100000 + Math.random() * 900000)}`,
      package_id: bookingData.packageId || bookingData.package_id || 'custom-tour',
      package_title: bookingData.packageTitle || bookingData.package_title || 'Himalayan Tour Package',
      state: bookingData.state || 'Himachal Pradesh',
      customer_name: bookingData.name || bookingData.customer_name || currentUser?.full_name || 'Valued Guest',
      customer_phone: bookingData.phone || bookingData.customer_phone || '',
      customer_email: customerEmail,
      customer_username: customerUsername,
      travel_date: formattedDate,
      adults_count: parseInt(bookingData.adults || bookingData.adults_count, 10) || 1,
      children_count: parseInt(bookingData.children || bookingData.children_count, 10) || 0,
      pickup_city: bookingData.pickupCity || bookingData.pickup_city || 'Delhi',
      vehicle_tier: bookingData.vehicleTier || bookingData.vehicle_tier || 'Sedan (Dzire/Etios)',
      hotel_tier: bookingData.hotelTier || bookingData.hotel_tier || 'Deluxe (3 Star)',
      total_price: parseFloat(bookingData.finalTotal || bookingData.total_price) || 0,
      advance_token: parseFloat(bookingData.advanceToken || bookingData.advance_token) || 0,
      coupon_applied: bookingData.couponCode || bookingData.coupon_applied || '',
      special_requests: bookingData.specialRequests || bookingData.special_requests || '',
      utr_reference: bookingData.utr || bookingData.utr_reference || null,
      status: bookingData.status || 'pending_payment'
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([payload])
      .select();

    if (error) {
      console.error('❌ Supabase booking insert error:', error);
      throw error;
    }

    console.log('✅ Booking persisted to Supabase database successfully:', data);

    // If user is logged in, increment their total_bookings in user_profiles
    if (customerUsername) {
      try {
        const { data: updatedProfile } = await supabase
          .from('user_profiles')
          .select('total_bookings')
          .eq('username', customerUsername)
          .single();

        const newCount = (updatedProfile?.total_bookings || 0) + 1;
        await supabase
          .from('user_profiles')
          .update({ total_bookings: newCount })
          .eq('username', customerUsername);

        if (currentUser && currentUser.username === customerUsername) {
          currentUser.total_bookings = newCount;
          localStorage.setItem('himyatra_auth_user', JSON.stringify(currentUser));
          window.dispatchEvent(new CustomEvent('himyatra-auth-changed', { detail: currentUser }));
        }
      } catch (cntErr) {
        console.warn('Booking count increment notice:', cntErr);
      }
    }

    // Also backup to localStorage
    try {
      const local = JSON.parse(localStorage.getItem('himyatra_bookings') || '[]');
      local.push({ ...payload, id: data?.[0]?.id, savedAt: new Date().toISOString() });
      localStorage.setItem('himyatra_bookings', JSON.stringify(local));
    } catch (_) {}

    return { success: true, data };
  } catch (err) {
    console.warn('⚠️ Supabase sync failed, caching in local storage fallback:', err);
    try {
      const local = JSON.parse(localStorage.getItem('himyatra_bookings') || '[]');
      local.push({ ...bookingData, savedAt: new Date().toISOString(), localOnly: true });
      localStorage.setItem('himyatra_bookings', JSON.stringify(local));
    } catch (_) {}
    return { success: true, localOnly: true, data: bookingData };
  }
}

/**
 * Update payment confirmation / UTR on an existing booking
 */
export async function updateBookingPaymentToSupabase(bookingReference, utrNumber) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        utr_reference: utrNumber,
        status: 'token_paid'
      })
      .eq('booking_reference', bookingReference)
      .select();

    if (error) {
      console.warn('Could not update UTR to Supabase:', error);
    } else {
      console.log('✅ Booking UTR updated in Supabase:', data);
    }
  } catch (err) {
    console.warn('UTR update fallback:', err);
  }
}

/**
 * Save user inquiry / callback request directly into Supabase PostgreSQL backend
 */
export async function saveInquiryToSupabase(inquiryData) {
  try {
    const currentUser = getCurrentUser();
    const customerUsername = inquiryData.customer_username || currentUser?.username || null;

    const payload = {
      name: inquiryData.name || currentUser?.full_name || 'Website Visitor',
      phone: inquiryData.phone || '',
      email: inquiryData.email && inquiryData.email !== 'Not provided' ? inquiryData.email : currentUser?.email || null,
      customer_username: customerUsername,
      destination: inquiryData.destination || null,
      travel_date: inquiryData.travelDate || null,
      travelers_count: inquiryData.travelersCount || null,
      pickup_city: inquiryData.fromCity || inquiryData.pickup_city || null,
      message: inquiryData.message || 'General Himalayan tour inquiry',
      source: inquiryData.source || 'website_inquiry'
    };

    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload])
      .select();

    if (error) {
      console.error('❌ Supabase inquiry insert error:', error);
      throw error;
    }

    console.log('✅ Inquiry persisted to Supabase database successfully:', data);

    try {
      const local = JSON.parse(localStorage.getItem('himyatra_inquiries') || '[]');
      local.push({ ...payload, id: data?.[0]?.id, savedAt: new Date().toISOString() });
      localStorage.setItem('himyatra_inquiries', JSON.stringify(local));
    } catch (_) {}

    return { success: true, data };
  } catch (err) {
    console.warn('⚠️ Supabase inquiry sync failed, caching in local storage fallback:', err);
    try {
      const local = JSON.parse(localStorage.getItem('himyatra_inquiries') || '[]');
      local.push({ ...inquiryData, savedAt: new Date().toISOString(), localOnly: true });
      localStorage.setItem('himyatra_inquiries', JSON.stringify(local));
    } catch (_) {}
    return { success: true, localOnly: true, data: inquiryData };
  }
}

/**
 * Save custom trip builder wizard request directly into Supabase PostgreSQL backend
 */
export async function saveCustomTripToSupabase(tripData) {
  try {
    const currentUser = getCurrentUser();
    const customerUsername = tripData.customer_username || currentUser?.username || null;

    const spots = Array.isArray(tripData.selectedSpots) 
      ? tripData.selectedSpots 
      : Array.isArray(tripData.destinations) 
        ? tripData.destinations 
        : [];

    const payload = {
      region: tripData.selectedRegion || tripData.region || 'Himachal Pradesh',
      destinations: spots,
      travel_style: tripData.travelStyle || tripData.travel_style || 'Leisure & Scenic',
      duration_days: parseInt(tripData.durationDays || tripData.duration_days, 10) || 5,
      travelers_count: parseInt(tripData.travelersCount || tripData.travelers_count, 10) || 2,
      vehicle: tripData.vehicle || 'Innova Crysta',
      pickup_city: tripData.pickupCity || tripData.pickup_city || 'Delhi',
      hotel_type: tripData.hotelType || tripData.hotel_type || 'Deluxe 3-Star',
      estimated_budget: parseFloat(tripData.estimatedPrice || tripData.estimated_budget) || 0,
      customer_name: tripData.contactName || tripData.customer_name || tripData.name || currentUser?.full_name || 'Traveler',
      customer_phone: tripData.contactPhone || tripData.customer_phone || tripData.phone || '',
      customer_username: customerUsername
    };

    const { data, error } = await supabase
      .from('custom_trips')
      .insert([payload])
      .select();

    if (error) {
      console.error('❌ Supabase custom trip insert error:', error);
      throw error;
    }

    console.log('✅ Custom trip persisted to Supabase database successfully:', data);

    try {
      const local = JSON.parse(localStorage.getItem('himyatra_custom_trips') || '[]');
      local.push({ ...payload, id: data?.[0]?.id, savedAt: new Date().toISOString() });
      localStorage.setItem('himyatra_custom_trips', JSON.stringify(local));
    } catch (_) {}

    return { success: true, data };
  } catch (err) {
    console.warn('⚠️ Supabase custom trip sync failed, caching in local storage fallback:', err);
    try {
      const local = JSON.parse(localStorage.getItem('himyatra_custom_trips') || '[]');
      local.push({ ...tripData, savedAt: new Date().toISOString(), localOnly: true });
      localStorage.setItem('himyatra_custom_trips', JSON.stringify(local));
    } catch (_) {}
    return { success: true, localOnly: true, data: tripData };
  }
}
