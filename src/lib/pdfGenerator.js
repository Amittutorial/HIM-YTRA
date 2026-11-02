import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

/**
 * ══════════════════════════════════════════════════════════════════════════
 * VALLEYVISTA LUXURY BOOKING CONFIRMATION & E-TICKET PDF GENERATOR
 * ══════════════════════════════════════════════════════════════════════════
 * Visual Style:
 * - A4 Portrait (210mm x 297mm)
 * - Dark Forest Green (#12372F) branding
 * - Emerald Green (#1F6B55) accents
 * - Elegant Warm Gold (#C6A15B) highlights
 * - White and light-grey (#F8FAFC) backgrounds
 * - Multi-page support with clean headers/footers
 * - Two side-by-side authorized signatures (Founder & Co-Founder)
 * - Unique QR code linking to secure booking verification page
 */

// Color Palette Constants in RGB
const COLOR_PRIMARY = [18, 55, 47];       // Dark Forest Green #12372F
const COLOR_EMERALD = [31, 107, 85];      // Emerald Green #1F6B55
const COLOR_GOLD = [198, 161, 91];        // Warm Gold #C6A15B
const COLOR_BG_LIGHT = [248, 250, 252];   // Light Grey #F8FAFC
const COLOR_CARD_BG = [255, 255, 255];    // Pure White
const COLOR_BORDER = [226, 232, 240];     // Slate 200 #E2E8F0
const COLOR_TEXT_DARK = [15, 23, 42];     // Slate 900 #0F172A
const COLOR_TEXT_MUTED = [71, 85, 105];   // Slate 600 #475569
const COLOR_TEXT_LIGHT = [148, 163, 184]; // Slate 400 #94A3B8

// Verified Authorized Personnel
const FOUNDER_INFO = {
  name: 'Amit Verma',
  title: 'Founder & Managing Director',
  contact: '+91 76199 17057',
  email: 'amitpatel42203@gmail.com'
};

const CO_FOUNDER_INFO = {
  name: 'Abhishek Verma',
  title: 'Co-Founder & Operations Director',
  contact: '+91 7408989182',
  email: 'amitpatel42203@gmail.com'
};

/**
 * Generate calligraphic signature image data URL using high-res HTML5 Canvas
 */
function createSignatureDataUrl(signerName) {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 460;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calligraphic Blue Fountain Pen Ink
    ctx.strokeStyle = '#1d4ed8';
    ctx.fillStyle = '#1d4ed8';
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (signerName.toLowerCase().includes('abhishek')) {
      // Artistic cursive stroke for "Abhishek Verma"
      ctx.moveTo(30, 85);
      ctx.bezierCurveTo(50, 20, 70, 10, 85, 95);
      ctx.bezierCurveTo(95, 45, 110, 30, 125, 75);
      ctx.bezierCurveTo(140, 50, 155, 40, 175, 80);
      ctx.bezierCurveTo(190, 45, 215, 35, 240, 85);
      ctx.bezierCurveTo(270, 40, 310, 30, 350, 75);
      ctx.stroke();

      // Flourish loop and baseline underline
      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.moveTo(350, 75);
      ctx.bezierCurveTo(390, 60, 420, 80, 380, 110);
      ctx.bezierCurveTo(300, 120, 150, 115, 25, 110);
      ctx.stroke();
    } else {
      // Artistic cursive stroke for "Amit Verma"
      ctx.moveTo(35, 95);
      ctx.bezierCurveTo(55, 25, 75, 15, 95, 90);
      ctx.bezierCurveTo(105, 40, 120, 35, 140, 80);
      ctx.bezierCurveTo(160, 40, 180, 35, 200, 85);
      ctx.bezierCurveTo(230, 30, 270, 25, 310, 70);
      ctx.bezierCurveTo(330, 40, 360, 45, 390, 75);
      ctx.stroke();

      // Flourish baseline underline with dynamic taper
      ctx.beginPath();
      ctx.lineWidth = 2.6;
      ctx.moveTo(30, 115);
      ctx.bezierCurveTo(130, 105, 270, 100, 420, 110);
      ctx.stroke();
    }

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.warn('Signature rendering fallback:', err);
    return null;
  }
}

/**
 * Generate official corporate seal stamp data URL
 */
function createCorporateSealDataUrl() {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = 120;
    const cy = 120;

    // Outer double ring
    ctx.strokeStyle = '#12372F';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 108, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#C6A15B';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, 98, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = '#1F6B55';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 88, 0, Math.PI * 2);
    ctx.stroke();

    // Central circular badge
    ctx.fillStyle = '#12372F';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★ VALLEYVISTA ★', cx, cy - 36);

    ctx.fillStyle = '#C6A15B';
    ctx.font = 'bold 11px Arial, sans-serif';
    ctx.fillText('WORLDWIDE TRAVEL', cx, cy - 16);

    ctx.strokeStyle = '#C6A15B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 70, cy - 4);
    ctx.lineTo(cx + 70, cy - 4);
    ctx.stroke();

    ctx.fillStyle = '#1F6B55';
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.fillText('VERIFIED & CERTIFIED', cx, cy + 12);

    ctx.beginPath();
    ctx.moveTo(cx - 70, cy + 24);
    ctx.lineTo(cx + 70, cy + 24);
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 9px Arial, sans-serif';
    ctx.fillText('REG: HP/TOUR/2026/891', cx, cy + 38);
    ctx.fillText('GSTIN: 02AAACH7891M1Z5', cx, cy + 52);

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.warn('Seal rendering notice:', err);
    return null;
  }
}

/**
 * Primary Export: Generate & Download / Output Official Booking Confirmation PDF
 */
export async function generateBookingConfirmationPDF(bookingData, returnType = 'save') {
  if (!bookingData) {
    throw new Error('Booking data is required to generate confirmation PDF.');
  }

  // 1. Initialize A4 PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 12;
  const contentWidth = pageWidth - (marginX * 2); // 186 mm
  let currentY = 10;

  // Normalized Booking Fields
  const bookingRef = bookingData.booking_reference || bookingData.bookingId || `VV-${Date.now().toString().slice(-6)}`;
  const pkgTitle = bookingData.package_title || bookingData.packageTitle || 'Worldwide Tour Experience';
  const destination = bookingData.state || bookingData.destination || 'Global Destination';
  const customerName = bookingData.customer_name || bookingData.name || 'Valued Guest';
  const customerPhone = bookingData.customer_phone || bookingData.phone || '+91 76199 17057';
  const customerEmail = bookingData.customer_email || bookingData.email || 'amitpatel42203@gmail.com';
  const travelDate = bookingData.travel_date || bookingData.travelDate || 'Flexible / Confirmed with Desk';
  const adults = parseInt(bookingData.adults_count || bookingData.adults, 10) || 1;
  const children = parseInt(bookingData.children_count || bookingData.children, 10) || 0;
  const pickupCity = bookingData.pickup_city || bookingData.pickupCity || 'Delhi NCR / International Airport';
  const vehicleTier = bookingData.vehicle_tier || bookingData.vehicleTier || 'Private Dedicated Premium Cab';
  const hotelTier = bookingData.hotel_tier || bookingData.hotelTier || '4★ / 5★ Deluxe Handpicked Hotels';
  const totalPrice = parseFloat(bookingData.total_price || bookingData.finalTotal) || 0;
  const advanceToken = parseFloat(bookingData.advance_token || bookingData.advanceToken) || 0;
  const couponApplied = bookingData.coupon_applied || bookingData.couponCode || 'None';
  const utrRef = bookingData.utr_reference || bookingData.utr || 'UPI/VERIFIED/TOKEN';
  const isPaid = Boolean(bookingData.utr_reference || bookingData.utr || bookingData.status === 'token_paid' || bookingData.status === 'confirmed');
  const remainingBalance = Math.max(0, totalPrice - advanceToken);

  const bookingDate = bookingData.created_at 
    ? new Date(bookingData.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Compute end date if start date is valid
  let travelEndDate = 'As per tour duration';
  try {
    if (travelDate && !isNaN(new Date(travelDate).getTime())) {
      const start = new Date(travelDate);
      const days = parseInt(bookingData.durationDays, 10) || 6;
      start.setDate(start.getDate() + days - 1);
      travelEndDate = start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  } catch (_) {}

  // 2. Generate Verification QR Code Data URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://him-ytra.vercel.app';
  const verificationUrl = `${origin}/?track=${encodeURIComponent(bookingRef)}`;
  let qrCodeDataUrl = null;
  try {
    qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 280,
      color: {
        dark: '#12372F',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.warn('QR Code generation fallback:', err);
  }

  // Helper function: Add page header and footer
  const drawPageBorderAndDecor = (pageNum, totalPages) => {
    // Outer emerald / gold border
    doc.setDrawColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.setLineWidth(0.4);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.setLineWidth(0.7);
    doc.rect(9, 9, pageWidth - 18, pageHeight - 18);

    // Page footer note
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_TEXT_LIGHT[0], COLOR_TEXT_LIGHT[1], COLOR_TEXT_LIGHT[2]);
    doc.text(
      `ValleyVista Luxury Travel • Official E-Ticket & Confirmation Voucher • Ref: ${bookingRef} • Page ${pageNum} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 11,
      { align: 'center' }
    );
  };

  // ═══════════════════════════════════════════════════════════════════════
  // PAGE 1: HEADER & EXECUTIVE BRANDING
  // ═══════════════════════════════════════════════════════════════════════

  // Header Banner Background (#12372F Dark Forest Green)
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 3, 3, 'F');

  // Gold accent line under header
  doc.setFillColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.rect(marginX, currentY + 33, contentWidth, 1.2, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('VALLEYVISTA', marginX + 6, currentY + 11);

  // Brand Category & Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('WORLDWIDE TRAVEL & TOURS  •  FROM EVERYWHERE. TO EVERYWHERE.', marginX + 6, currentY + 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(200, 225, 218);
  doc.text('Govt. Regd: HP/TOUR/2026/891 • GSTIN: 02AAACH7891M1Z5 • 24/7 Helpline: +91 76199 17057', marginX + 6, currentY + 23);
  doc.text('Official Email: amitpatel42203@gmail.com • Web: valleyvista.com', marginX + 6, currentY + 28);

  // Document Badge on Right Side
  doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.roundedRect(marginX + contentWidth - 62, currentY + 5, 56, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('BOOKING CONFIRMATION', marginX + contentWidth - 34, currentY + 11, { align: 'center' });

  // Booking Status Badge
  const statusText = isPaid ? 'CONFIRMED & VERIFIED' : 'ADVANCE HOLD CONFIRMED';
  doc.setFillColor(isPaid ? 22 : 180, isPaid ? 101 : 130, isPaid ? 52 : 30);
  doc.roundedRect(marginX + contentWidth - 62, currentY + 19, 56, 8, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(statusText, marginX + contentWidth - 34, currentY + 24.5, { align: 'center' });

  currentY += 39;

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION TITLE HELPER
  // ═══════════════════════════════════════════════════════════════════════
  const drawSectionHeader = (number, title, y) => {
    doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.roundedRect(marginX, y, contentWidth, 7, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.text(number, marginX + 4, y + 5);

    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX + 13, y + 5);

    return y + 9;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 01. CUSTOMER DETAILS
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('01.', 'Customer Details & Identification', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.setLineWidth(0.2);
  doc.roundedRect(marginX, currentY, contentWidth, 19, 2, 2, 'FD');

  const colW = contentWidth / 4;
  const rowY1 = currentY + 4.5;
  const rowY2 = currentY + 10;

  // Labels
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('CUSTOMER FULL NAME', marginX + 4, rowY1);
  doc.text('PRIMARY CONTACT NUMBER', marginX + colW + 4, rowY1);
  doc.text('REGISTERED EMAIL ADDRESS', marginX + (colW * 2) + 4, rowY1);
  doc.text('BOOKING REGISTRATION DATE', marginX + (colW * 3) + 4, rowY1);

  // Values
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(doc.splitTextToSize(customerName, colW - 6), marginX + 4, rowY2);
  doc.text(customerPhone, marginX + colW + 4, rowY2);
  doc.text(doc.splitTextToSize(customerEmail, colW - 6), marginX + (colW * 2) + 4, rowY2);
  doc.text(bookingDate, marginX + (colW * 3) + 4, rowY2);

  currentY += 23;

  // ═══════════════════════════════════════════════════════════════════════
  // 02. TOUR & TRAVEL DETAILS
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('02.', 'Tour Package & Travel Details', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 31, 2, 2, 'FD');

  // Row 1: Package Title & Destination
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('PACKAGE NAME / TOUR CIRCUIT', marginX + 4, currentY + 4.5);
  doc.text('DESTINATION & REGION', marginX + (contentWidth * 0.65) + 4, currentY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(doc.splitTextToSize(pkgTitle, (contentWidth * 0.65) - 6), marginX + 4, currentY + 9.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(destination, marginX + (contentWidth * 0.65) + 4, currentY + 9.5);

  // Separator line
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + 4, currentY + 15, marginX + contentWidth - 4, currentY + 15);

  // Row 2: Dates, Duration, Travelers, Pickup
  const subColW = contentWidth / 5;
  const subY1 = currentY + 19;
  const subY2 = currentY + 24.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('START DATE', marginX + 4, subY1);
  doc.text('END DATE', marginX + subColW + 4, subY1);
  doc.text('DURATION', marginX + (subColW * 2) + 4, subY1);
  doc.text('GUESTS COUNT', marginX + (subColW * 3) + 4, subY1);
  doc.text('PICKUP LOCATION', marginX + (subColW * 4) + 4, subY1);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(travelDate, marginX + 4, subY2);
  doc.text(travelEndDate, marginX + subColW + 4, subY2);
  doc.text(bookingData.duration || '6 Days / 5 Nights', marginX + (subColW * 2) + 4, subY2);
  doc.text(`${adults} Adults${children > 0 ? `, ${children} Kids` : ''}`, marginX + (subColW * 3) + 4, subY2);
  doc.text(doc.splitTextToSize(pickupCity, subColW - 4), marginX + (subColW * 4) + 4, subY2);

  currentY += 35;

  // ═══════════════════════════════════════════════════════════════════════
  // 03. PAYMENT SUMMARY
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('03.', 'Payment Summary & Transaction Ledger', currentY);

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 2, 2, 'FD');

  // Inner Table Grid
  const payColW = contentWidth / 4;

  // Header row for table
  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.rect(marginX, currentY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('ORIGINAL PRICE', marginX + 4, currentY + 5);
  doc.text('DISCOUNT / COUPON', marginX + payColW + 4, currentY + 5);
  doc.text('AMOUNT PAID (ADVANCE)', marginX + (payColW * 2) + 4, currentY + 5);
  doc.text('BALANCE DUE ON ARRIVAL', marginX + (payColW * 3) + 4, currentY + 5);

  // Values row
  const valY = currentY + 12.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(`INR ${totalPrice.toLocaleString('en-IN')}`, marginX + 4, valY);

  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text(couponApplied !== 'None' ? `${couponApplied} (Applied)` : 'Zero Discount', marginX + payColW + 4, valY);

  doc.setTextColor(22, 101, 52);
  doc.text(`INR ${advanceToken.toLocaleString('en-IN')}`, marginX + (payColW * 2) + 4, valY);

  doc.setTextColor(remainingBalance > 0 ? 180 : 22, remainingBalance > 0 ? 83 : 101, remainingBalance > 0 ? 9 : 52);
  doc.text(`INR ${remainingBalance.toLocaleString('en-IN')}`, marginX + (payColW * 3) + 4, valY);

  // Line separator
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + 4, currentY + 17, marginX + contentWidth - 4, currentY + 17);

  // Transaction ID & Metadata Row
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('PAYMENT STATUS', marginX + 4, currentY + 22);
  doc.text('GATEWAY / UTR REFERENCE NUMBER', marginX + payColW + 4, currentY + 22);
  doc.text('TRANSACTION VERIFICATION DATE', marginX + (payColW * 2.5) + 4, currentY + 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(isPaid ? 22 : 180, isPaid ? 101 : 120, isPaid ? 52 : 20);
  doc.text(isPaid ? 'PAID & VERIFIED (20% Advance Token)' : 'PENDING PAYMENT', marginX + 4, currentY + 27.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(utrRef, marginX + payColW + 4, currentY + 27.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(bookingDate, marginX + (payColW * 2.5) + 4, currentY + 27.5);

  currentY += 38;

  // ═══════════════════════════════════════════════════════════════════════
  // 04. PACKAGE INCLUSIONS & TRAVEL NOTES
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('04.', 'Package Inclusions & Important Travel Notes', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 36, 2, 2, 'FD');

  const incColW = (contentWidth - 6) / 2;

  // Left Column: What is Included
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text('CONFIRMED INCLUSIONS (SERVICES DELIVERED):', marginX + 4, currentY + 5);

  const inclusions = [
    `Hotel: Handpicked verified accommodation (${hotelTier})`,
    `Transport: Dedicated private sanitized vehicle (${vehicleTier})`,
    'Sightseeing: All point-to-point transfers as per curated itinerary',
    'Meals: Daily breakfast & dinner included with welcome drinks',
    'Driver Allowances: Toll tax, hill parking, fuel charges & driver stay'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  let incY = currentY + 10;
  inclusions.forEach((item) => {
    doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.text('✓', marginX + 4, incY);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(doc.splitTextToSize(item, incColW - 10), marginX + 9, incY);
    incY += 5;
  });

  // Vertical divider
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + incColW + 3, currentY + 3, marginX + incColW + 3, currentY + 33);

  // Right Column: Important Notes & Required Documents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('ESSENTIAL TRAVEL INSTRUCTIONS & ID PROOF:', marginX + incColW + 6, currentY + 5);

  const notes = [
    'Valid Govt Photo ID (Aadhaar / Passport / Voter ID) mandatory for all travelers.',
    'Early morning scenic starts ensure seamless transfers & avoid mountain traffic.',
    'Keep warm woolens, comfortable walking shoes, and personal prescriptions ready.',
    'Vehicle operates strictly on approved itinerary routes with experienced chauffeurs.',
    '24/7 dedicated control desk assistance reachable at +91 76199 17057.'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  let noteY = currentY + 10;
  notes.forEach((item) => {
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.text('•', marginX + incColW + 6, noteY);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(doc.splitTextToSize(item, incColW - 12), marginX + incColW + 11, noteY);
    noteY += 5;
  });

  currentY += 40;

  // ═══════════════════════════════════════════════════════════════════════
  // 05. CANCELLATION & OFFICIAL SUPPORT
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('05.', 'Cancellation Terms & Direct Support Helpline', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('TRANSPARENT REFUND SCHEDULE:', marginX + 4, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('• 15+ Days Before Travel: 100% Full Refund (Zero Cancellation Fee)', marginX + 4, currentY + 10);
  doc.text('• 7 to 14 Days Prior: 75% Refund of total booking tariff', marginX + 4, currentY + 14);
  doc.text('• 3 to 6 Days Prior: 50% Refund • Weather Protection: Reschedule without loss', marginX + 4, currentY + 18);

  // Support Contacts on right
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + (contentWidth * 0.58), currentY + 2, marginX + (contentWidth * 0.58), currentY + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('24/7 DEDICATED CONCIERGE:', marginX + (contentWidth * 0.58) + 4, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('• Official Contact / WhatsApp: +91 76199 17057', marginX + (contentWidth * 0.58) + 4, currentY + 10);
  doc.text('• Founder Verified Email: amitpatel42203@gmail.com', marginX + (contentWidth * 0.58) + 4, currentY + 14);
  doc.text('• Portal: https://him-ytra.vercel.app / valleyvista.com', marginX + (contentWidth * 0.58) + 4, currentY + 18);

  currentY += 26;

  // ═══════════════════════════════════════════════════════════════════════
  // 06. AUTHORIZED REPRESENTATIVES & 07. BOOKING VERIFICATION QR CODE
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('06 & 07.', 'Authorized Signatures & Instant QR Verification', currentY);

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 42, 2, 2, 'FD');

  const authW = (contentWidth - 44) / 2; // Split for Founder, Co-Founder, and QR Code

  // 1. FOUNDER (Left)
  const founderSigImg = createSignatureDataUrl(FOUNDER_INFO.name);
  if (founderSigImg) {
    doc.addImage(founderSigImg, 'PNG', marginX + 4, currentY + 2, authW - 8, 16);
  }

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.setLineWidth(0.3);
  doc.line(marginX + 4, currentY + 21, marginX + authW - 4, currentY + 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(FOUNDER_INFO.name, marginX + 4, currentY + 25.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(FOUNDER_INFO.title.toUpperCase(), marginX + 4, currentY + 29.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Direct: ${FOUNDER_INFO.contact} • Verified Email`, marginX + 4, currentY + 33.5);
  doc.text(FOUNDER_INFO.email, marginX + 4, currentY + 37.5);

  // 2. CO-FOUNDER (Center)
  const coFounderX = marginX + authW + 2;
  const coFounderSigImg = createSignatureDataUrl(CO_FOUNDER_INFO.name);
  if (coFounderSigImg) {
    doc.addImage(coFounderSigImg, 'PNG', coFounderX + 4, currentY + 2, authW - 8, 16);
  }

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.line(coFounderX + 4, currentY + 21, coFounderX + authW - 4, currentY + 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(CO_FOUNDER_INFO.name, coFounderX + 4, currentY + 25.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(CO_FOUNDER_INFO.title.toUpperCase(), coFounderX + 4, currentY + 29.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Direct: ${CO_FOUNDER_INFO.contact} • Verified Exec`, coFounderX + 4, currentY + 33.5);
  doc.text('Operations Desk, ValleyVista HQ', coFounderX + 4, currentY + 37.5);

  // 3. QR CODE & VERIFICATION (Right)
  const qrX = marginX + (authW * 2) + 6;
  if (qrCodeDataUrl) {
    doc.addImage(qrCodeDataUrl, 'PNG', qrX + 3, currentY + 2.5, 30, 30);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('SCAN TO VERIFY', qrX + 18, currentY + 34, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(bookingRef, qrX + 18, currentY + 38, { align: 'center' });

  currentY += 46;

  // ═══════════════════════════════════════════════════════════════════════
  // FOOTER NOTE
  // ═══════════════════════════════════════════════════════════════════════
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 12, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('THANK YOU FOR CHOOSING VALLEYVISTA!', pageWidth / 2, currentY + 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('Explore the world. Create unforgettable journeys. • From Everywhere. To Everywhere.', pageWidth / 2, currentY + 9.5, { align: 'center' });

  // Draw Page border & footer numbering
  drawPageBorderAndDecor(1, 1);

  // 3. Return requested format
  const cleanFileName = `ValleyVista_Booking_Confirmation_${bookingRef}.pdf`;

  if (returnType === 'blob') {
    return {
      success: true,
      fileName: cleanFileName,
      blob: doc.output('blob')
    };
  }

  if (returnType === 'dataurl') {
    return {
      success: true,
      fileName: cleanFileName,
      dataUrl: doc.output('datauristring')
    };
  }

  // Default: download file directly to customer device
  doc.save(cleanFileName);
  return {
    success: true,
    fileName: cleanFileName
  };
}
