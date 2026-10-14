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
      _subject: `🔔 [NEW INQUIRY] ${inquiry.name || 'Traveler'} | Phone: ${inquiry.phone} - HimYatra`,
      _template: 'table',
      _captcha: 'false',
      _next: SITE_URL,
      '--- LEAD OVERVIEW ---': '----------------------------------------',
      'Inquiry Type': 'General Tour Inquiry / Instant Callback Request',
      'Customer Full Name': inquiry.name || 'Not provided',
      'Customer WhatsApp / Phone': inquiry.phone || 'Not provided',
      'Customer Email Address': inquiry.email || 'Not provided',
      'Inquiry Message / Request': inquiry.message || 'Interested in Himalayan travel packages & custom quote',
      'Website Section Source': inquiry.source || 'Website Inquire Modal',
      'Website': SITE_URL,
      '--- COMPANY & FOUNDER DETAILS ---': '----------------------------------------',
      'Agency Name': 'HimYatra Holidays Private Limited',
      'Founder': `${FOUNDER_NAME} (${FOUNDER_PHONE})`,
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
      'Pickup Location': booking.pickupCity || 'Delhi / Chandigarh',
      'Vehicle Tier': booking.vehicleTier || 'Private Dedicated Cab',
      'Hotel Accommodation Category': booking.hotelTier || '3★ / 4★ Hill View',
      '--- PAYMENT & FINANCIALS ---': '----------------------------------------',
      'Payment Status': isPaid ? '✅ PAYMENT SUCCESSFUL & VERIFIED VIA UPI' : '⏳ Token Payment Pending Verification',
      '12-Digit UPI Transaction / UTR No': booking.utr || 'Pending Screenshot Verification',
      '20% Advance Token Paid': `₹${Number(booking.advanceToken || booking.advance_token || 0).toLocaleString('en-IN')}`,
      'Total Package Amount': `₹${Number(booking.finalTotal || booking.total_price || 0).toLocaleString('en-IN')}`,
      'Remaining Balance Due on Arrival': `₹${Number((booking.finalTotal || 0) - (booking.advanceToken || 0)).toLocaleString('en-IN')}`,
      'Coupon Applied': booking.couponCode || 'None',
      '--- CUSTOMER CONTACT ---': '----------------------------------------',
      'Customer Full Name': booking.name,
      'Customer Mobile / WhatsApp': booking.phone,
      'Customer Email': booking.email || 'Not provided',
      'Special Requests & Notes': booking.specialRequests || 'None',
      '--- COMPANY & FOUNDER DETAILS ---': '----------------------------------------',
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
