/**
 * Automated Email & Notification Service for HimYatra
 * Delivers customer inquiries, bookings, and custom trips directly to amitpatel42203@gmail.com
 */

const TARGET_GMAIL = 'amitpatel42203@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_GMAIL}`;

/**
 * Send automated email alert for an Inquiry / Callback Request
 */
export async function sendInquiryEmail(inquiry) {
  try {
    const payload = {
      _subject: `🏔️ New HimYatra Tour Inquiry from ${inquiry.name || 'Traveler'}`,
      _template: 'table',
      _captcha: 'false',
      'Lead Type': 'General Tour Inquiry / Callback Request',
      'Customer Name': inquiry.name,
      'Contact Phone': inquiry.phone,
      'Customer Email': inquiry.email || 'Not provided',
      'Inquiry Message': inquiry.message || 'Customer requested a callback for tour packages.',
      'Source': inquiry.source || 'Website Inquire Modal',
      'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const res = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('📬 Inquiry email dispatch status:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send automated email via FormSubmit:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Send automated email alert for a Confirmed Tour Booking / Payment
 */
export async function sendBookingEmail(booking) {
  try {
    const payload = {
      _subject: `🎟️ New Booking Confirmed: ${booking.bookingId || booking.booking_reference} - ${booking.name}`,
      _template: 'table',
      _captcha: 'false',
      'Booking Reference': booking.bookingId || booking.booking_reference,
      'Package Title': booking.packageTitle || booking.package_title,
      'Destination Region': booking.state,
      'Customer Name': booking.name,
      'Phone Number': booking.phone,
      'Customer Email': booking.email || 'Not provided',
      'Travel Date': booking.travelDate,
      'Total Travelers': `${booking.adults || 1} Adults, ${booking.children || 0} Children`,
      'Pickup City': booking.pickupCity,
      'Vehicle Tier': booking.vehicleTier || 'Standard',
      'Hotel Tier': booking.hotelTier || 'Standard',
      'Final Total': `₹${Number(booking.finalTotal || booking.total_price || 0).toLocaleString('en-IN')}`,
      '20% Advance Token': `₹${Number(booking.advanceToken || booking.advance_token || 0).toLocaleString('en-IN')}`,
      'UTR / Transaction Ref': booking.utr || 'Pending Screenshot Verification',
      'Special Requests': booking.specialRequests || 'None',
      'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const res = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('📬 Booking email dispatch status:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send booking email:', err);
    return { success: false, error: err.message };
  }
}
