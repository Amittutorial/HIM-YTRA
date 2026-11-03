import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

/**
 * ══════════════════════════════════════════════════════════════════════════
 * HIMYATRA LUXURY BOOKING CONFIRMATION & E-TICKET PDF GENERATOR
 * ══════════════════════════════════════════════════════════════════════════
 * Visual Style:
 * - A4 Portrait (210mm x 297mm)
 * - Dark Forest Green (#12372F) branding
 * - Emerald Green (#1F6B55) accents
 * - Elegant Warm Gold (#C6A15B) highlights
 * - White and light-grey (#F8FAFC) backgrounds
 * - Two side-by-side authorized signatures (Founder & Co-Founder)
 * - Official corporate seal stamp & live QR verification code
 * - Zero overlap, precision millimeter geometry for perfect A4 printing
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
export const FOUNDER_INFO = {
  name: 'Amit Verma',
  title: 'Founder & Managing Director',
  contact: '+91 76199 17057',
  email: 'amitpatel42203@gmail.com'
};

export const CO_FOUNDER_INFO = {
  name: 'Abhishek Verma',
  title: 'Co-Founder & Operations Director',
  contact: '+91 7408989182',
  email: 'amitpatel42203@gmail.com'
};

/**
 * Generate realistic, executive handwritten calligraphic signature image data URL
 * Uses authentic fountain pen ink curves, natural slant, pen pressure & flourish underline.
 */
function createSignatureDataUrl(signerName) {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 520;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Deep Executive Fountain Pen Blue Ink
    ctx.strokeStyle = '#0e3a8a';
    ctx.fillStyle = '#0e3a8a';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const isAbhishek = signerName.toLowerCase().includes('abhishek');

    if (isAbhishek) {
      // ── ABHISHEK VERMA EXECUTIVE CALLIGRAPHIC SIGNATURE ──
      // 1. Capital 'A' with stylish upward flourish
      ctx.beginPath();
      ctx.lineWidth = 3.2;
      ctx.moveTo(35, 105);
      ctx.bezierCurveTo(45, 80, 60, 30, 75, 22);
      ctx.bezierCurveTo(80, 20, 88, 55, 95, 115);
      ctx.stroke();

      // Inner crossbar looping into 'b'
      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.moveTo(60, 75);
      ctx.bezierCurveTo(75, 68, 98, 70, 112, 32);
      ctx.bezierCurveTo(118, 18, 126, 45, 122, 105);
      // 'b' bowl
      ctx.bezierCurveTo(126, 85, 138, 80, 145, 95);
      // 'h' ascender & shoulder
      ctx.bezierCurveTo(148, 45, 155, 32, 160, 40);
      ctx.bezierCurveTo(162, 70, 160, 105, 168, 85);
      ctx.bezierCurveTo(175, 75, 182, 85, 185, 102);
      // 'i' + 'sh'
      ctx.bezierCurveTo(192, 85, 200, 78, 208, 98);
      ctx.bezierCurveTo(215, 80, 222, 75, 230, 95);
      // 'e' + 'k'
      ctx.bezierCurveTo(238, 82, 245, 80, 250, 92);
      ctx.bezierCurveTo(258, 45, 265, 30, 270, 42);
      ctx.bezierCurveTo(272, 70, 270, 102, 278, 88);
      ctx.stroke();

      // Pen dot for 'i'
      ctx.beginPath();
      ctx.arc(196, 62, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Bold Executive 'V' for Verma
      ctx.beginPath();
      ctx.lineWidth = 3.4;
      ctx.moveTo(295, 45);
      ctx.bezierCurveTo(305, 40, 315, 90, 328, 118);
      ctx.bezierCurveTo(335, 115, 355, 55, 370, 38);
      // Fluid cursive finish 'erma'
      ctx.lineWidth = 2.4;
      ctx.bezierCurveTo(378, 55, 385, 92, 395, 82);
      ctx.bezierCurveTo(405, 75, 415, 85, 425, 80);
      ctx.bezierCurveTo(435, 75, 445, 85, 455, 78);
      ctx.stroke();

      // 3. Dynamic Executive Underscore Flourish with Taper
      ctx.beginPath();
      ctx.lineWidth = 2.6;
      ctx.moveTo(40, 128);
      ctx.bezierCurveTo(140, 138, 300, 135, 465, 105);
      ctx.stroke();

      // Double dot accent
      ctx.beginPath();
      ctx.arc(445, 125, 2, 0, Math.PI * 2);
      ctx.arc(458, 122, 2, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // ── AMIT VERMA EXECUTIVE CALLIGRAPHIC SIGNATURE ──
      // 1. Grand Swash & Capital 'A'
      ctx.beginPath();
      ctx.lineWidth = 3.2;
      ctx.moveTo(35, 110);
      ctx.bezierCurveTo(50, 85, 68, 35, 82, 22);
      ctx.bezierCurveTo(88, 18, 96, 48, 102, 115);
      ctx.stroke();

      // Inner flourish cross-loop transitioning into 'mit'
      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.moveTo(70, 78);
      ctx.bezierCurveTo(85, 70, 105, 72, 118, 92);
      // 'm' arches
      ctx.bezierCurveTo(126, 75, 136, 72, 142, 95);
      ctx.bezierCurveTo(150, 75, 160, 72, 168, 95);
      // 'i' stroke
      ctx.bezierCurveTo(176, 78, 184, 75, 190, 95);
      // 't' ascender
      ctx.bezierCurveTo(198, 70, 206, 38, 212, 42);
      ctx.bezierCurveTo(214, 55, 212, 95, 224, 92);
      ctx.stroke();

      // 'i' dot
      ctx.beginPath();
      ctx.arc(186, 60, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 't' dynamic crossbar
      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.moveTo(200, 56);
      ctx.bezierCurveTo(212, 54, 228, 52, 238, 50);
      ctx.stroke();

      // 2. Bold Executive 'V' for Verma
      ctx.beginPath();
      ctx.lineWidth = 3.6;
      ctx.moveTo(252, 42);
      ctx.bezierCurveTo(262, 38, 275, 95, 290, 118);
      ctx.bezierCurveTo(298, 116, 320, 52, 335, 34);
      // Cursive 'erma' terminal flourish
      ctx.lineWidth = 2.4;
      ctx.bezierCurveTo(342, 52, 352, 90, 362, 80);
      ctx.bezierCurveTo(372, 72, 382, 85, 395, 82);
      ctx.bezierCurveTo(408, 75, 420, 82, 435, 76);
      ctx.stroke();

      // 3. Elegant Executive Underline Flourish
      ctx.beginPath();
      ctx.lineWidth = 2.8;
      ctx.moveTo(40, 126);
      ctx.bezierCurveTo(150, 138, 310, 134, 455, 108);
      ctx.stroke();

      // Double dot accent
      ctx.beginPath();
      ctx.arc(435, 125, 2.2, 0, Math.PI * 2);
      ctx.arc(450, 122, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.warn('Signature rendering fallback:', err);
    return null;
  }
}

/**
 * Generate official corporate seal stamp data URL for HimYatra
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
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★ HIMYATRA ★', cx, cy - 36);

    ctx.fillStyle = '#C6A15B';
    ctx.font = 'bold 10px Arial, sans-serif';
    ctx.fillText('PREMIUM TRAVEL EXPERIENCES', cx, cy - 16);

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
    ctx.fillText('REG: HY/TOUR/2026/891', cx, cy + 38);
    ctx.fillText('GSTIN: 02AAACH7891M1Z5', cx, cy + 52);

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.warn('Seal rendering notice:', err);
    return null;
  }
}

/**
 * Primary Export 1: Generate & Download Official Booking Confirmation PDF
 */
export async function generateBookingConfirmationPDF(bookingData, returnType = 'save') {
  if (!bookingData) {
    throw new Error('Booking data is required to generate confirmation PDF.');
  }

  // 1. Initialize A4 PDF document (210mm x 297mm)
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
  let currentY = 11;

  // Normalized Booking Fields
  const rawRef = bookingData.booking_reference || bookingData.bookingId || `HY-${Date.now().toString().slice(-6)}`;
  const bookingRef = rawRef;
  const pkgTitle = bookingData.package_title || bookingData.packageTitle || 'Himalayan Tour Experience';
  const destination = bookingData.state || bookingData.destination || 'Himachal & Uttarakhand';
  const customerName = bookingData.customer_name || bookingData.name || 'Valued Guest';
  const customerPhone = bookingData.customer_phone || bookingData.phone || '+91 76199 17057';
  const customerEmail = bookingData.customer_email || bookingData.email || 'amitpatel42203@gmail.com';
  const travelDate = bookingData.travel_date || bookingData.travelDate || 'Flexible / Confirmed with Desk';
  const adults = parseInt(bookingData.adults_count || bookingData.adults, 10) || 1;
  const children = parseInt(bookingData.children_count || bookingData.children, 10) || 0;
  const pickupCity = bookingData.pickup_city || bookingData.pickupCity || 'Delhi / Chandigarh';
  const vehicleTier = bookingData.vehicle_tier || bookingData.vehicleTier || 'Private Dedicated Premium Cab';
  const hotelTier = bookingData.hotel_tier || bookingData.hotelTier || 'Handpicked Mountain View Hotel';
  const totalPrice = parseFloat(bookingData.total_price || bookingData.finalTotal) || 0;
  const advanceToken = parseFloat(bookingData.advance_token || bookingData.advanceToken) || 0;
  const couponApplied = bookingData.coupon_applied || bookingData.couponCode || 'None';
  const utrRef = bookingData.utr_reference || bookingData.utr || 'amitpatel42203@okhdfcbank';
  const isPaid = Boolean(bookingData.utr_reference || bookingData.utr || bookingData.status === 'token_paid' || bookingData.status === 'confirmed');
  const remainingBalance = Math.max(0, totalPrice - advanceToken);

  const bookingDate = bookingData.created_at 
    ? new Date(bookingData.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Compute end date if start date is valid
  let travelEndDate = 'As per confirmed itinerary';
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

  // Pre-generate signatures & seal
  const founderSigImg = createSignatureDataUrl(FOUNDER_INFO.name);
  const coFounderSigImg = createSignatureDataUrl(CO_FOUNDER_INFO.name);
  const corporateSealImg = createCorporateSealDataUrl();

  // Draw Page Borders & Page Numbering
  const drawPageBorderAndDecor = (pageNum, totalPages) => {
    // Outer emerald / gold border
    doc.setDrawColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.setLineWidth(0.35);
    doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

    // Inner primary border
    doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.setLineWidth(0.6);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    // Page footer note (Strictly at Y = 287mm)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_TEXT_LIGHT[0], COLOR_TEXT_LIGHT[1], COLOR_TEXT_LIGHT[2]);
    doc.text(
      `HimYatra Premium Himalayan & All Destination Tours • Official E-Ticket Voucher • Ref: ${bookingRef} • Page ${pageNum} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  };

  // Section Header Helper (Prevents ANY text collision dynamically)
  const drawSectionHeader = (number, title, y) => {
    doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.roundedRect(marginX, y, contentWidth, 5.5, 1.2, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    const numWidth = doc.getTextWidth(number);
    doc.text(number, marginX + 3.5, y + 4);

    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX + 3.5 + numWidth + 2.5, y + 4);

    return y + 6.8;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // PAGE 1: HEADER & EXECUTIVE BRANDING
  // ═══════════════════════════════════════════════════════════════════════

  // Header Banner Background (#12372F Dark Forest Green)
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 26, 2.5, 2.5, 'F');

  // Gold accent line under header
  doc.setFillColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.rect(marginX, currentY + 25.2, contentWidth, 0.8, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('HIMYATRA', marginX + 5, currentY + 8.5);

  // Brand Category & Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('PREMIUM HIMALAYAN & ALL DESTINATION EXPERIENCES', marginX + 5, currentY + 13.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 225, 218);
  doc.text('Govt Reg: HY/TOUR/2026/891 • 24/7 Helpline: +91 76199 17057 • Email: amitpatel42203@gmail.com', marginX + 5, currentY + 18.5);
  doc.text('Official Portal: https://him-ytra.vercel.app • Desks: The Mall Road, Shimla & Rishikesh', marginX + 5, currentY + 22.8);

  // Document Badge on Right Side
  doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.roundedRect(marginX + contentWidth - 58, currentY + 4, 53, 9, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('BOOKING CONFIRMATION', marginX + contentWidth - 31.5, currentY + 9.5, { align: 'center' });

  // Booking Status Badge
  const statusBadgeText = isPaid ? 'CONFIRMED & VERIFIED' : 'ADVANCE HOLD CONFIRMED';
  doc.setFillColor(isPaid ? 22 : 180, isPaid ? 101 : 130, isPaid ? 52 : 30);
  doc.roundedRect(marginX + contentWidth - 58, currentY + 14.5, 53, 7, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text(statusBadgeText, marginX + contentWidth - 31.5, currentY + 19, { align: 'center' });

  currentY += 28.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 01. CUSTOMER DETAILS
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('01.', 'Customer Identity & Contact Information', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 14.5, 1.5, 1.5, 'FD');

  const colWidth = contentWidth / 4;
  const labelY = currentY + 4.5;
  const valY = currentY + 10.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('CUSTOMER FULL NAME', marginX + 3.5, labelY);
  doc.text('MOBILE / WHATSAPP', marginX + colWidth + 3.5, labelY);
  doc.text('REGISTERED EMAIL', marginX + (colWidth * 2) + 3.5, labelY);
  doc.text('BOOKING DATE', marginX + (colWidth * 3) + 3.5, labelY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(customerName.slice(0, 26), marginX + 3.5, valY);
  doc.text(customerPhone, marginX + colWidth + 3.5, valY);
  doc.text(customerEmail.slice(0, 28), marginX + (colWidth * 2) + 3.5, valY);
  doc.text(bookingDate, marginX + (colWidth * 3) + 3.5, valY);

  currentY += 16.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 02. TOUR & TRAVEL DETAILS
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('02.', 'Tour Package & Itinerary Specifications', currentY);

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 28.5, 1.5, 1.5, 'FD');

  const tourColW = contentWidth / 4;

  // Row 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('PACKAGE NAME', marginX + 3.5, currentY + 4.5);
  doc.text('DESTINATION REGION', marginX + (tourColW * 2) + 3.5, currentY + 4.5);
  doc.text('TRAVEL COMMENCEMENT', marginX + (tourColW * 3) + 3.5, currentY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(doc.splitTextToSize(pkgTitle, (tourColW * 2) - 6), marginX + 3.5, currentY + 9.5);

  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(destination, marginX + (tourColW * 2) + 3.5, currentY + 9.5);
  doc.text(travelDate, marginX + (tourColW * 3) + 3.5, currentY + 9.5);

  // Line separator
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + 3.5, currentY + 15, marginX + contentWidth - 3.5, currentY + 15);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('DURATION / TRAVEL DATES', marginX + 3.5, currentY + 19);
  doc.text('TRAVELERS', marginX + tourColW + 3.5, currentY + 19);
  doc.text('PICKUP & DROP CITY', marginX + (tourColW * 2) + 3.5, currentY + 19);
  doc.text('VEHICLE & HOTEL CLASS', marginX + (tourColW * 3) + 3.5, currentY + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(`${bookingData.durationDays || 6} Days • Ends: ${travelEndDate}`, marginX + 3.5, currentY + 24.5);
  doc.text(`${adults} Adults, ${children} Children`, marginX + tourColW + 3.5, currentY + 24.5);
  doc.text(pickupCity.slice(0, 24), marginX + (tourColW * 2) + 3.5, currentY + 24.5);
  doc.text(`${vehicleTier.slice(0, 16)} • ${hotelTier.slice(0, 14)}`, marginX + (tourColW * 3) + 3.5, currentY + 24.5);

  currentY += 30.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 03. PAYMENT SUMMARY & VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('03.', 'Financial Summary & Payment Breakdown', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 26.5, 1.5, 1.5, 'FD');

  const payColW = contentWidth / 4;

  // Row 1: Price Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('TOTAL PACKAGE PRICE', marginX + 3.5, currentY + 4.5);
  doc.text('DISCOUNT / COUPON', marginX + payColW + 3.5, currentY + 4.5);
  doc.text('AMOUNT PAID (ADVANCE)', marginX + (payColW * 2) + 3.5, currentY + 4.5);
  doc.text('BALANCE DUE ON ARRIVAL', marginX + (payColW * 3) + 3.5, currentY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(`INR ${totalPrice.toLocaleString('en-IN')}`, marginX + 3.5, currentY + 10);

  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text(couponApplied !== 'None' ? `${couponApplied} (Applied)` : 'Nil / Direct Tariff', marginX + payColW + 3.5, currentY + 10);

  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text(`INR ${advanceToken.toLocaleString('en-IN')}`, marginX + (payColW * 2) + 3.5, currentY + 10);

  doc.setTextColor(remainingBalance > 0 ? 180 : 22, remainingBalance > 0 ? 83 : 101, remainingBalance > 0 ? 9 : 52);
  doc.text(`INR ${remainingBalance.toLocaleString('en-IN')}`, marginX + (payColW * 3) + 3.5, currentY + 10);

  // Line separator
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + 3.5, currentY + 13.5, marginX + contentWidth - 3.5, currentY + 13.5);

  // Row 2: 3 Spacious Non-Overlapping Columns for Status, UTR & Date
  const colStatusX = marginX + 3.5;
  const colUtrX = marginX + 68;
  const colDateX = marginX + 148;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('PAYMENT STATUS', colStatusX, currentY + 18);
  doc.text('GATEWAY / UTR REFERENCE NUMBER', colUtrX, currentY + 18);
  doc.text('VERIFICATION DATE', colDateX, currentY + 18);

  // Payment Status (Col 1)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(isPaid ? 22 : 180, isPaid ? 101 : 120, isPaid ? 52 : 20);
  doc.text(isPaid ? 'PAID & VERIFIED (20% Advance Token)' : 'PENDING PAYMENT', colStatusX, currentY + 23);

  // Gateway / UTR Number (Col 2 — wrapped cleanly up to 74mm so it NEVER collides)
  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(doc.splitTextToSize(utrRef, 74), colUtrX, currentY + 23);

  // Verification Date (Col 3)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(bookingDate, colDateX, currentY + 23);

  currentY += 28.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 04. PACKAGE INCLUSIONS & TRAVEL NOTES
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('04.', 'Package Inclusions & Important Travel Notes', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 27, 1.5, 1.5, 'FD');

  const incColW = (contentWidth - 6) / 2;

  // Left Column: What is Included
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text('CONFIRMED INCLUSIONS (SERVICES DELIVERED):', marginX + 3.5, currentY + 4);

  const inclusions = [
    `Hotel Stay: Verified handpicked accommodation (${hotelTier})`,
    `Private Cab: Dedicated sanitized vehicle (${vehicleTier})`,
    'Sightseeing: All point-to-point tours as per confirmed itinerary',
    'Meal Plan: Daily buffet breakfast & hot delicious dinner included',
    'Charges: Fuel, toll taxes, state permits, parking & driver allowance'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  let incY = currentY + 8;
  inclusions.forEach((item) => {
    doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.text('✓', marginX + 3.5, incY);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(doc.splitTextToSize(item, incColW - 8), marginX + 7.5, incY);
    incY += 4;
  });

  // Vertical divider
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + incColW + 3, currentY + 3, marginX + incColW + 3, currentY + 24);

  // Right Column: Important Notes & Required Documents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('ESSENTIAL TRAVEL INSTRUCTIONS & ID PROOF:', marginX + incColW + 6, currentY + 4);

  const notes = [
    'Govt Photo ID (Aadhaar / Passport) mandatory for all guests at check-in.',
    'Early morning starts recommended to avoid tourist traffic on mountain routes.',
    'Keep warm layered clothing, comfortable walking shoes & medicines ready.',
    'Dedicated vehicle operates strictly with experienced local hill drivers.',
    '24/7 dedicated support desk reachable anytime at +91 76199 17057.'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  let noteY = currentY + 8;
  notes.forEach((item) => {
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.text('•', marginX + incColW + 6, noteY);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(doc.splitTextToSize(item, incColW - 10), marginX + incColW + 10, noteY);
    noteY += 4;
  });

  currentY += 29.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 05. CANCELLATION & OFFICIAL SUPPORT
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('05.', 'Cancellation Terms & Direct Support Helpline', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 16.5, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('TRANSPARENT REFUND SCHEDULE:', marginX + 3.5, currentY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('• 15+ Days Before: 100% Full Refund (Zero Cancellation Fee)', marginX + 3.5, currentY + 7.8);
  doc.text('• 7 to 14 Days Prior: 75% Refund of total booking tariff', marginX + 3.5, currentY + 11.2);
  doc.text('• 3 to 6 Days: 50% Refund • Weather Guarantee: Date change with zero extra fee', marginX + 3.5, currentY + 14.5);

  // Support Contacts on right
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + (contentWidth * 0.58), currentY + 2, marginX + (contentWidth * 0.58), currentY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('24/7 DEDICATED CONCIERGE:', marginX + (contentWidth * 0.58) + 3.5, currentY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text('• Direct Call & WhatsApp: +91 76199 17057', marginX + (contentWidth * 0.58) + 3.5, currentY + 7.8);
  doc.text('• Founder Verified Email: amitpatel42203@gmail.com', marginX + (contentWidth * 0.58) + 3.5, currentY + 11.2);
  doc.text('• Official Portal: https://him-ytra.vercel.app', marginX + (contentWidth * 0.58) + 3.5, currentY + 14.5);

  currentY += 19;

  // ═══════════════════════════════════════════════════════════════════════
  // 06 & 07. AUTHORIZED REPRESENTATIVES & INSTANT QR VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('06 & 07.', 'Authorized Signatures & Instant QR Verification', currentY);

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 38, 1.5, 1.5, 'FD');

  const authW = 54; // Width for Founder and Co-Founder columns

  // 1. FOUNDER (Left Column)
  if (founderSigImg) {
    doc.addImage(founderSigImg, 'PNG', marginX + 3.5, currentY + 1.5, authW - 6, 13);
  }

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.setLineWidth(0.3);
  doc.line(marginX + 3.5, currentY + 16, marginX + authW - 2, currentY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(FOUNDER_INFO.name, marginX + 3.5, currentY + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(FOUNDER_INFO.title.toUpperCase(), marginX + 3.5, currentY + 23.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Direct: ${FOUNDER_INFO.contact} • Verified Email`, marginX + 3.5, currentY + 27);
  doc.text(FOUNDER_INFO.email, marginX + 3.5, currentY + 30.5);
  doc.setFontSize(5.2);
  doc.text('HimYatra Tours & Travels Private Limited', marginX + 3.5, currentY + 34);

  // 2. CO-FOUNDER (Center Column)
  const coFounderX = marginX + authW + 3;
  if (coFounderSigImg) {
    doc.addImage(coFounderSigImg, 'PNG', coFounderX + 3.5, currentY + 1.5, authW - 6, 13);
  }

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.setLineWidth(0.3);
  doc.line(coFounderX + 3.5, currentY + 16, coFounderX + authW - 2, currentY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(CO_FOUNDER_INFO.name, coFounderX + 3.5, currentY + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(CO_FOUNDER_INFO.title.toUpperCase(), coFounderX + 3.5, currentY + 23.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Direct: ${CO_FOUNDER_INFO.contact} • Verified Exec`, coFounderX + 3.5, currentY + 27);
  doc.text('Operations Desk, HimYatra HQ', coFounderX + 3.5, currentY + 30.5);
  doc.setFontSize(5.2);
  doc.text('Executive Management Board Verified', coFounderX + 3.5, currentY + 34);

  // Vertical divider before Seal & QR
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + (authW * 2) + 6, currentY + 3, marginX + (authW * 2) + 6, currentY + 35);

  // 3. CORPORATE SEAL & QR CODE (Right Column)
  const rightColX = marginX + (authW * 2) + 9;
  
  // Corporate Seal Stamp
  if (corporateSealImg) {
    doc.addImage(corporateSealImg, 'PNG', rightColX + 2, currentY + 2.5, 27, 27);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('OFFICIAL CORPORATE SEAL', rightColX + 15.5, currentY + 32, { align: 'center' });
  doc.setFontSize(4.8);
  doc.text('REG: HY/TOUR/2026/891', rightColX + 15.5, currentY + 35, { align: 'center' });

  // QR Code Verification
  const qrX = rightColX + 37;
  if (qrCodeDataUrl) {
    doc.addImage(qrCodeDataUrl, 'PNG', qrX, currentY + 2.5, 27, 27);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('SCAN TO VERIFY', qrX + 13.5, currentY + 32, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(bookingRef, qrX + 13.5, currentY + 35.5, { align: 'center' });

  currentY += 40.5;

  // ═══════════════════════════════════════════════════════════════════════
  // FOOTER BANNER (Finishes safely at Y = ~248mm, leaving 39mm buffer)
  // ═══════════════════════════════════════════════════════════════════════
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 9, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('THANK YOU FOR CHOOSING HIMYATRA!', pageWidth / 2, currentY + 4, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(255, 255, 255);
  doc.text('Explore the mountains. Create unforgettable memories. • Himachal, Uttarakhand & Worldwide', pageWidth / 2, currentY + 7.2, { align: 'center' });

  // Draw Page border & footer numbering (strictly at Y = 287mm)
  drawPageBorderAndDecor(1, 1);

  // 3. Return requested format
  const cleanFileName = `HimYatra_Booking_Confirmation_${bookingRef}.pdf`;

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

/**
 * Primary Export 2: Generate & Download Official Tour Package Itinerary PDF
 * Designed specifically for AI Chatbot "View Details" & Package Modal instant downloads.
 */
export async function generatePackageItineraryPDF(pkg, returnType = 'save') {
  if (!pkg) {
    throw new Error('Package data is required to generate itinerary PDF.');
  }

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
  let currentY = 11;

  const pkgTitle = pkg.title || 'Himalayan Tour Package';
  const duration = pkg.duration || '6D / 5N';
  const price = pkg.discountedPrice ? `INR ${pkg.discountedPrice.toLocaleString('en-IN')}` : pkg.price || 'INR 13,999';
  const state = pkg.state || 'Himachal Pradesh & Uttarakhand';
  const cleanTitle = pkgTitle.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  const cleanFileName = `HimYatra_Itinerary_${cleanTitle}.pdf`;

  // Draw Border Helper
  const drawPageBorder = (pageNum, totalPages) => {
    doc.setDrawColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.setLineWidth(0.35);
    doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

    doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.setLineWidth(0.6);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_TEXT_LIGHT[0], COLOR_TEXT_LIGHT[1], COLOR_TEXT_LIGHT[2]);
    doc.text(
      `HimYatra Official Tour Itinerary & Vacation Guide • Page ${pageNum} of ${totalPages} • 24/7 Helpline: +91 76199 17057`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  };

  const drawSectionHeader = (number, title, y) => {
    doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.roundedRect(marginX, y, contentWidth, 5.5, 1.2, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    const numWidth = doc.getTextWidth(number);
    doc.text(number, marginX + 3.5, y + 4);

    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX + 3.5 + numWidth + 2.5, y + 4);

    return y + 6.8;
  };

  // Header Banner Background (#12372F)
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 26, 2.5, 2.5, 'F');

  // Gold accent bar
  doc.setFillColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.rect(marginX, currentY + 25.2, contentWidth, 0.8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('HIMYATRA', marginX + 5, currentY + 8.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('OFFICIAL VACATION ITINERARY & DESTINATION GUIDE', marginX + 5, currentY + 13.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 225, 218);
  doc.text('Govt Reg: HY/TOUR/2026/891 • Founder Direct: +91 76199 17057 • Email: amitpatel42203@gmail.com', marginX + 5, currentY + 18.5);
  doc.text('Live Portal: https://him-ytra.vercel.app • Shimla & Rishikesh Desks', marginX + 5, currentY + 22.8);

  // Badge on right
  doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.roundedRect(marginX + contentWidth - 56, currentY + 5, 51, 16, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('VERIFIED PACKAGE', marginX + contentWidth - 30.5, currentY + 11.5, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('4.96 ★ (340+ Reviews)', marginX + contentWidth - 30.5, currentY + 16.5, { align: 'center' });

  currentY += 28.5;

  // Package Overview Card
  currentY = drawSectionHeader('01.', 'Package Specifications & Starting Tariff', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(doc.splitTextToSize(pkgTitle, contentWidth - 55), marginX + 4, currentY + 6.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Duration: ${duration}  •  Destination: ${state}  •  Private Dedicated Cab & Deluxe Stays`, marginX + 4, currentY + 13.5);

  // Price box on right
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX + contentWidth - 48, currentY + 3.5, 44, 11, 1.2, 1.2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('STARTING FROM', marginX + contentWidth - 26, currentY + 7.5, { align: 'center' });
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`${price} / person`, marginX + contentWidth - 26, currentY + 12, { align: 'center' });

  currentY += 21;

  // Day-by-Day Plan
  currentY = drawSectionHeader('02.', 'Day-by-Day Comprehensive Travel Plan', currentY);

  const itineraryDays = pkg.itinerary || [
    { day: 'Day 1', title: 'Arrival & Welcome to Mountain Paradise', desc: 'Scenic mountain drive, hotel check-in, evening stroll on local Mall Road and hot dinner.' },
    { day: 'Day 2', title: 'Local Sightseeing & Valley Exploration', desc: 'Visit historic temples, waterfalls, panoramic viewpoints and pine forest trails.' },
    { day: 'Day 3', title: 'High Altitude Excursion & Snow Slopes', desc: 'Excursion to snow point / passes, photography, and thrilling mountain activities.' },
    { day: 'Day 4', title: 'Scenic Transfer & Cultural Heritage', desc: 'Transfer through rivers and valleys, local handicraft exploration and cozy bonfire night.' },
    { day: 'Day 5', title: 'Nature Walks & Leisure Experience', desc: 'Relaxing walks, café visits, and sunset views over the majestic snow-capped peaks.' },
    { day: 'Day 6', title: 'Departure with Sweet Memories', desc: 'Breakfast, check-out and drop at airport / railway station for your onward journey.' }
  ];

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  const itinBoxHeight = Math.min(84, itineraryDays.length * 13.5 + 4);
  doc.roundedRect(marginX, currentY, contentWidth, itinBoxHeight, 1.5, 1.5, 'FD');

  let dayY = currentY + 4;
  itineraryDays.slice(0, 6).forEach((item, index) => {
    // Day pill
    doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.roundedRect(marginX + 3.5, dayY - 2.5, 13, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(item.day || `Day ${index + 1}`, marginX + 10, dayY + 1, { align: 'center' });

    // Day title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(item.title || 'Sightseeing Tour', marginX + 19, dayY + 1);

    // Day desc
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    const descText = item.desc || item.activities || 'Full day guided exploration and comfortable stay.';
    doc.text(doc.splitTextToSize(descText, contentWidth - 24), marginX + 19, dayY + 5.5);

    dayY += 13.5;
  });

  currentY += itinBoxHeight + 3;

  // Inclusions & Exclusions
  currentY = drawSectionHeader('03.', 'Inclusions, Exclusions & Cancellation Policy', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 1.5, 1.5, 'FD');

  const halfW = (contentWidth - 6) / 2;

  // Inclusions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text('PACKAGE INCLUSIONS:', marginX + 3.5, currentY + 4.5);

  const incList = [
    'Hotel: 3★ / 4★ sanitized mountain view accommodation',
    'Private Cab: Dedicated sanitized vehicle throughout tour',
    'Meals: Daily buffet breakfast and hot delicious dinner',
    'All driver allowances, fuel, tolls, permits & parking'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  let incCurY = currentY + 8.5;
  incList.forEach((text) => {
    doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.text('✓', marginX + 3.5, incCurY);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(text, marginX + 7.5, incCurY);
    incCurY += 4.5;
  });

  // Vertical divider
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + halfW + 3, currentY + 3, marginX + halfW + 3, currentY + 31);

  // Cancellation & Support
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('REFUND POLICY & SUPPORT DESK:', marginX + halfW + 6, currentY + 4.5);

  const policyList = [
    '100% Full Refund if cancelled 15+ days prior to travel',
    '75% Refund if cancelled 7 to 14 days before start date',
    'Weather Guarantee: Zero fees for mountain date rescheduling',
    'Founder Direct Support: +91 76199 17057 (Call/WhatsApp)'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  let polCurY = currentY + 8.5;
  policyList.forEach((text) => {
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.text('•', marginX + halfW + 6, polCurY);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(text, marginX + halfW + 10, polCurY);
    polCurY += 4.5;
  });

  currentY += 37;

  // Signatures & QR Section
  currentY = drawSectionHeader('04.', 'Authorized Representative & Quick Booking QR', currentY);

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 36, 1.5, 1.5, 'FD');

  const founderSigImg = createSignatureDataUrl(FOUNDER_INFO.name);
  if (founderSigImg) {
    doc.addImage(founderSigImg, 'PNG', marginX + 4, currentY + 1.5, 48, 12);
  }

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.setLineWidth(0.3);
  doc.line(marginX + 4, currentY + 15, marginX + 54, currentY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(FOUNDER_INFO.name, marginX + 4, currentY + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text(FOUNDER_INFO.title.toUpperCase(), marginX + 4, currentY + 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.8);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text(`Direct Helpline: ${FOUNDER_INFO.contact}`, marginX + 4, currentY + 26);
  doc.text(FOUNDER_INFO.email, marginX + 4, currentY + 29.5);
  doc.text('HimYatra Tours & Travels Private Limited', marginX + 4, currentY + 33);

  // Corporate Seal in Center
  const corporateSealImg = createCorporateSealDataUrl();
  if (corporateSealImg) {
    doc.addImage(corporateSealImg, 'PNG', marginX + (contentWidth / 2) - 13, currentY + 2, 26, 26);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.2);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('OFFICIAL CORPORATE SEAL', marginX + (contentWidth / 2), currentY + 31, { align: 'center' });
  doc.setFontSize(4.8);
  doc.text('REG: HY/TOUR/2026/891', marginX + (contentWidth / 2), currentY + 34, { align: 'center' });

  // QR Code on Right
  let qrCodeDataUrl = null;
  const liveUrl = `https://him-ytra.vercel.app/?pkg=${encodeURIComponent(pkg.id || 'himachal')}`;
  try {
    qrCodeDataUrl = await QRCode.toDataURL(liveUrl, {
      margin: 1,
      width: 260,
      color: { dark: '#12372F', light: '#FFFFFF' }
    });
  } catch (_) {}

  const qrX = marginX + contentWidth - 36;
  if (qrCodeDataUrl) {
    doc.addImage(qrCodeDataUrl, 'PNG', qrX, currentY + 2, 26, 26);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('SCAN TO BOOK', qrX + 13, currentY + 31, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.2);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('20% Advance Token', qrX + 13, currentY + 34, { align: 'center' });

  currentY += 38.5;

  // Footer Banner
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 9, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('THANK YOU FOR CHOOSING HIMYATRA!', pageWidth / 2, currentY + 4, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(255, 255, 255);
  doc.text('Explore the mountains. Create unforgettable memories. • Call/WhatsApp: +91 76199 17057', pageWidth / 2, currentY + 7.2, { align: 'center' });

  drawPageBorder(1, 1);

  if (returnType === 'blob') {
    return { success: true, fileName: cleanFileName, blob: doc.output('blob') };
  }

  doc.save(cleanFileName);
  return { success: true, fileName: cleanFileName };
}
