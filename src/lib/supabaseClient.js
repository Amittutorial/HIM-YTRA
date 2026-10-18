import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://mpayvadcboknyznedmze.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYXl2YWRjYm9rbnl6bmVkbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTUxODQsImV4cCI6MjEwNzQ3MTE4NH0.u-Y7vUFPGjX1sQhowHabq83dQCt8kYECAEDP0LT2HrE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save customer tour reservation directly into Supabase PostgreSQL backend
 */
export async function saveBookingToSupabase(bookingData) {
  try {
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
      customer_name: bookingData.name || bookingData.customer_name || 'Valued Guest',
      customer_phone: bookingData.phone || bookingData.customer_phone || '',
      customer_email: bookingData.email || bookingData.customer_email || '',
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
    const payload = {
      name: inquiryData.name || 'Website Visitor',
      phone: inquiryData.phone || '',
      email: inquiryData.email && inquiryData.email !== 'Not provided' ? inquiryData.email : null,
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

    // Also backup to localStorage
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
      customer_name: tripData.contactName || tripData.customer_name || tripData.name || 'Traveler',
      customer_phone: tripData.contactPhone || tripData.customer_phone || tripData.phone || ''
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

    // Also backup to localStorage
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
