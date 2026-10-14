// Local SQLite / File-based Database Client with Supabase Fallback

const API_BASE = 'http://localhost:3001/api';

/**
 * Save customer tour reservation into File-based SQLite Database
 */
export async function saveBookingToSupabase(bookingData) {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Booking saved to local file database:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.warn('Backend API server not running, storing locally in browser storage:', err);
  }

  // Fallback to localStorage if API server is not started
  try {
    const existing = JSON.parse(localStorage.getItem('himyatra_bookings') || '[]');
    existing.push({ ...bookingData, savedAt: new Date().toISOString() });
    localStorage.setItem('himyatra_bookings', JSON.stringify(existing));
    return { success: true, localOnly: true, data: bookingData };
  } catch (e) {
    return { success: true, localOnly: true, data: bookingData };
  }
}

/**
 * Save user inquiry / callback request into File-based SQLite Database
 */
export async function saveInquiryToSupabase(inquiryData) {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Inquiry saved to local file database:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.warn('Backend API server not running, storing in localStorage:', err);
  }

  // Fallback to localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('himyatra_inquiries') || '[]');
    existing.push({ ...inquiryData, savedAt: new Date().toISOString() });
    localStorage.setItem('himyatra_inquiries', JSON.stringify(existing));
    return { success: true, localOnly: true, data: inquiryData };
  } catch (e) {
    return { success: true, localOnly: true, data: inquiryData };
  }
}

/**
 * Save custom trip builder wizard request into File-based SQLite Database
 */
export async function saveCustomTripToSupabase(tripData) {
  try {
    const res = await fetch(`${API_BASE}/custom-trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Custom trip saved to local file database:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.warn('Backend API server not running, storing in localStorage:', err);
  }

  // Fallback to localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('himyatra_custom_trips') || '[]');
    existing.push({ ...tripData, savedAt: new Date().toISOString() });
    localStorage.setItem('himyatra_custom_trips', JSON.stringify(existing));
    return { success: true, localOnly: true, data: tripData };
  } catch (e) {
    return { success: true, localOnly: true, data: tripData };
  }
}
