import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client if keys are provided
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Save customer tour reservation into Supabase 'bookings' table
 */
export async function saveBookingToSupabase(bookingData) {
  if (!supabase) {
    console.info('Supabase not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    return { success: true, localOnly: true, data: bookingData };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          booking_reference: bookingData.bookingId,
          package_id: bookingData.packageId,
          package_title: bookingData.packageTitle,
          state: bookingData.state,
          customer_name: bookingData.name,
          customer_phone: bookingData.phone,
          customer_email: bookingData.email,
          travel_date: bookingData.travelDate,
          adults_count: bookingData.adults,
          children_count: bookingData.children,
          pickup_city: bookingData.pickupCity,
          vehicle_tier: bookingData.vehicleTier,
          hotel_tier: bookingData.hotelTier,
          total_price: bookingData.finalTotal,
          advance_token: bookingData.advanceToken,
          coupon_applied: bookingData.couponCode || null,
          special_requests: bookingData.specialRequests || null,
          status: 'pending_payment',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase booking insert error:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected Supabase error:', err);
    return { success: false, error: err };
  }
}

/**
 * Save user inquiry / callback request into Supabase 'inquiries' table
 */
export async function saveInquiryToSupabase(inquiryData) {
  if (!supabase) {
    return { success: true, localOnly: true, data: inquiryData };
  }

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: inquiryData.name,
          phone: inquiryData.phone,
          message: inquiryData.message,
          source: inquiryData.source || 'website_modal',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase inquiry insert error:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected Supabase inquiry error:', err);
    return { success: false, error: err };
  }
}

/**
 * Save custom trip builder wizard request into Supabase 'custom_trips' table
 */
export async function saveCustomTripToSupabase(tripData) {
  if (!supabase) {
    return { success: true, localOnly: true, data: tripData };
  }

  try {
    const { data, error } = await supabase
      .from('custom_trips')
      .insert([
        {
          region: tripData.selectedRegion,
          destinations: tripData.selectedSpots,
          travel_style: tripData.travelStyle,
          duration_days: tripData.durationDays,
          travelers_count: tripData.travelersCount,
          vehicle: tripData.vehicle,
          pickup_city: tripData.pickupCity,
          hotel_type: tripData.hotelType,
          estimated_budget: tripData.estimatedPrice,
          customer_name: tripData.contactName,
          customer_phone: tripData.contactPhone,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase custom trip insert error:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected Supabase custom trip error:', err);
    return { success: false, error: err };
  }
}
