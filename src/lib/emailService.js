/**
 * Automated Professional Email & Notification Service for HimYatra
 * Delivers customer inquiries, vacation reservations, and successful payment details
 * directly to amitpatel42203@gmail.com
 *
 * Founder: Amit Verma (+91 76199 17057)
 */

const TARGET_GMAIL = 'amitpatel42203@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_GMAIL}`;
const FOUNDER_NAME = 'Amit Verma';
const FOUNDER_PHONE = '+91 76199 17057';
const SITE_URL = 'https://him-ytra.vercel.app/';

/**
 * Send automated professional email alert for a Customer Inquiry / Callback Request
 */
export async function sendInquiryEmail(inquiry) {
  try {
    const payload = {
      _subject: `🔔 [NEW INQUIRY] ${inquiry.name || 'Traveler'} | 📞 ${inquiry.phone} | ${inquiry.destination || 'Himalayan Tour'} - HimYatra`,
      _template: 'table',
      _captcha: 'false',
      _next: SITE_URL,
      '--- CUSTOMER CONTACT & IDENTITY ---': '----------------------------------------',
      'Customer Full Name': inquiry.name || 'Not provided',
      'Customer Mobile / WhatsApp': inquiry.phone || 'Not provided',
      'Customer Email Address': inquiry.email || 'Not provided',
      '--- VACATION & TRIP INQUIRY DETAILS ---': '----------------------------------------',
      'Interested Destination / Region': inquiry.destination || 'Himachal Pradesh / Uttarakhand',
      'Departure / Starting City': inquiry.fromCity || 'Delhi NCR / Chandigarh',
      'Planned Travel Date / Month': inquiry.travelDate || 'Flexible / To be confirmed',
      'Number of Travelers / Guests': inquiry.travelersCount || 'Not specified',
      'Inquiry Message / Special Requests': inquiry.message || 'Interested in Himalayan travel packages & custom quote',
      'Form Submission Source': inquiry.source || 'Website Inquire Modal',
      'Website URL': SITE_URL,
      '--- COMPANY & FOUNDER CREDENTIALS ---': '----------------------------------------',
      'Agency Name': 'HimYatra Holidays Private Limited',
      'Founder': `${FOUNDER_NAME} (${FOUNDER_PHONE})`,
      'Founder Helpline': FOUNDER_PHONE,
      'Official Email': TARGET_GMAIL,
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
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
    console.log('📬 Inquiry automated email dispatch:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Failed to dispatch inquiry email:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Send automated professional email alert for a Confirmed Vacation Reservation & Successful Payment
 */
export async function sendBookingEmail(booking) {
  try {
    const isPaid = Boolean(booking.utr);
    const payload = {
      _subject: isPaid
        ? `🎉 [VACATION RESERVED & PAID] ${booking.packageTitle || 'Tour Package'} | Ref: ${booking.bookingId} - Token: ₹${Number(booking.advanceToken || 0).toLocaleString('en-IN')} | ${booking.name}`
        : `🎟️ [NEW VACATION RESERVATION] ${booking.packageTitle || 'Tour Package'} | Ref: ${booking.bookingId} - ₹${Number(booking.finalTotal || 0).toLocaleString('en-IN')} | ${booking.name}`,
      _template: 'table',
      _captcha: 'false',
      _next: SITE_URL,
      '--- VACATION RESERVATION DETAILS ---': '----------------------------------------',
      'Booking Reference ID': booking.bookingId || booking.booking_reference,
      'Package / Vacation Title': booking.packageTitle || booking.package_title,
      'Destination Region': booking.state || 'Himachal & Uttarakhand',
      'Travel Date': booking.travelDate || 'As confirmed with guest',
      'Total Travelers Count': `${booking.adults || 1} Adults, ${booking.children || 0} Children`,
      'Pickup / Departure Location': booking.pickupCity || 'Delhi / Chandigarh',
      'Vehicle Preference / Tier': booking.vehicleTier || 'Private Dedicated Cab',
      'Hotel Accommodation Category': booking.hotelTier || '3★ / 4★ Hill View Deluxe',
      'Special Preferences & Requests': booking.specialRequests || 'None',
      '--- PAYMENT & FINANCIAL DETAILS ---': '----------------------------------------',
      'Payment Status': isPaid ? '✅ PAYMENT SUCCESSFUL & VERIFIED VIA UPI' : '⏳ Token Payment Pending Verification',
      '12-Digit UPI Transaction / UTR No': booking.utr || 'Pending Screenshot Verification',
      '20% Advance Token Paid': `₹${Number(booking.advanceToken || booking.advance_token || 0).toLocaleString('en-IN')}`,
      'Total Package Amount': `₹${Number(booking.finalTotal || booking.total_price || 0).toLocaleString('en-IN')}`,
      'Remaining Balance Due on Arrival': `₹${Number((booking.finalTotal || 0) - (booking.advanceToken || 0)).toLocaleString('en-IN')}`,
      'Coupon Code Applied': booking.couponCode || 'None',
      '--- CUSTOMER CONTACT & FULL DETAILS ---': '----------------------------------------',
      'Customer Full Name': booking.name,
      'Customer Mobile / WhatsApp': booking.phone,
      'Customer Email Address': booking.email || 'Not provided',
      '--- COMPANY & FOUNDER CREDENTIALS ---': '----------------------------------------',
      'Agency Name': 'HimYatra Holidays Private Limited',
      'Founder': `${FOUNDER_NAME} (${FOUNDER_PHONE})`,
      'Company Helpline': FOUNDER_PHONE,
      'Company Email': TARGET_GMAIL,
      'Company Website': SITE_URL,
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
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
    console.log('📬 Vacation booking automated email dispatch:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Failed to dispatch vacation reservation email:', err);
    return { success: false, error: err.message };
  }
}
