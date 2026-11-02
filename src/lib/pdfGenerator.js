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
    canvas.height = 130;
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
      ctx.moveTo(30, 80);
      ctx.bezierCurveTo(50, 18, 70, 10, 85, 90);
      ctx.bezierCurveTo(95, 40, 110, 28, 125, 70);
      ctx.bezierCurveTo(140, 45, 155, 36, 175, 75);
      ctx.bezierCurveTo(190, 42, 215, 32, 240, 80);
      ctx.bezierCurveTo(270, 38, 310, 28, 350, 70);
      ctx.stroke();

      // Flourish loop and baseline underline
      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.moveTo(350, 70);
      ctx.bezierCurveTo(390, 55, 420, 75, 380, 105);
      ctx.bezierCurveTo(300, 115, 150, 110, 25, 105);
      ctx.stroke();
    } else {
      // Artistic cursive stroke for "Amit Verma"
      ctx.moveTo(35, 90);
      ctx.bezierCurveTo(55, 22, 75, 14, 95, 85);
      ctx.bezierCurveTo(105, 38, 120, 32, 140, 75);
      ctx.bezierCurveTo(160, 38, 180, 32, 200, 80);
      ctx.bezierCurveTo(230, 28, 270, 24, 310, 68);
      ctx.bezierCurveTo(330, 38, 360, 42, 390, 72);
      ctx.stroke();

      // Flourish baseline underline with dynamic taper
      ctx.beginPath();
      ctx.lineWidth = 2.6;
      ctx.moveTo(30, 110);
      ctx.bezierCurveTo(130, 100, 270, 95, 420, 105);
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
    ctx.fillText('REG: VV/TOUR/2026/891', cx, cy + 38);
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
  const rawRef = bookingData.booking_reference || bookingData.bookingId || `VV-${Date.now().toString().slice(-6)}`;
  const bookingRef = rawRef.startsWith('HY-') ? rawRef.replace('HY-', 'VV-') : rawRef;
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
  const utrRef = bookingData.utr_reference || bookingData.utr || 'amitpatel42203@okhdfcbank';
  const isPaid = Boolean(bookingData.utr_reference || bookingData.utr || bookingData.status === 'token_paid' || bookingData.status === 'confirmed');
  const remainingBalance = Math.max(0, totalPrice - advanceToken);

  const bookingDate = bookingData.created_at 
    ? new Date(bookingData.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Compute end date if start date is valid
  let travelEndDate = 'As per itinerary';
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
      `ValleyVista Worldwide Travel • Official E-Ticket & Confirmation Voucher • Ref: ${bookingRef} • Page ${pageNum} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  };

  // ═══════════════════════════════════════════════════════════════════════
  // SECTION TITLE HELPER
  // ═══════════════════════════════════════════════════════════════════════
  const drawSectionHeader = (number, title, y) => {
    doc.setFillColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
    doc.roundedRect(marginX, y, contentWidth, 5.5, 1.2, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.text(number, marginX + 3.5, y + 4);

    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), marginX + 11.5, y + 4);

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
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('VALLEYVISTA', marginX + 5, currentY + 8.5);

  // Brand Category & Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
  doc.text('WORLDWIDE TRAVEL & TOURS  •  FROM EVERYWHERE. TO EVERYWHERE.', marginX + 5, currentY + 13.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 225, 218);
  doc.text('Govt Reg: VV/TOUR/2026/891 • 24/7 Helpline: +91 76199 17057 • Email: amitpatel42203@gmail.com', marginX + 5, currentY + 18.5);
  doc.text('Official Portal: https://him-ytra.vercel.app / valleyvista.com • Shimla, Rishikesh & Global Desks', marginX + 5, currentY + 22.8);

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
  doc.text(statusBadgeText, marginX + contentWidth - 31.5, currentY + 19.2, { align: 'center' });

  currentY += 29.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 01. CUSTOMER DETAILS
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('01.', 'Customer Details & Identification', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.setLineWidth(0.2);
  doc.roundedRect(marginX, currentY, contentWidth, 14, 1.5, 1.5, 'FD');

  const colW = contentWidth / 4;
  const rowY1 = currentY + 4;
  const rowY2 = currentY + 9.5;

  // Labels
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('CUSTOMER FULL NAME', marginX + 3.5, rowY1);
  doc.text('PRIMARY CONTACT NUMBER', marginX + colW + 3.5, rowY1);
  doc.text('REGISTERED EMAIL ADDRESS', marginX + (colW * 2) + 3.5, rowY1);
  doc.text('BOOKING DATE', marginX + (colW * 3) + 3.5, rowY1);

  // Values
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(doc.splitTextToSize(customerName, colW - 5), marginX + 3.5, rowY2);
  doc.text(customerPhone, marginX + colW + 3.5, rowY2);
  doc.text(doc.splitTextToSize(customerEmail, colW - 5), marginX + (colW * 2) + 3.5, rowY2);
  doc.text(bookingDate, marginX + (colW * 3) + 3.5, rowY2);

  currentY += 16.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 02. TOUR & TRAVEL DETAILS
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('02.', 'Tour Package & Travel Details', currentY);

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 24, 1.5, 1.5, 'FD');

  // Row 1: Package Title & Destination
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('PACKAGE NAME / TOUR CIRCUIT', marginX + 3.5, currentY + 4);
  doc.text('DESTINATION & REGION', marginX + (contentWidth * 0.65) + 3.5, currentY + 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(doc.splitTextToSize(pkgTitle, (contentWidth * 0.65) - 6), marginX + 3.5, currentY + 8.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(destination, marginX + (contentWidth * 0.65) + 3.5, currentY + 8.5);

  // Separator line
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(marginX + 3.5, currentY + 12.5, marginX + contentWidth - 3.5, currentY + 12.5);

  // Row 2: Dates, Duration, Travelers, Pickup
  const subColW = contentWidth / 5;
  const subY1 = currentY + 16;
  const subY2 = currentY + 20.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('START DATE', marginX + 3.5, subY1);
  doc.text('END DATE', marginX + subColW + 3.5, subY1);
  doc.text('DURATION', marginX + (subColW * 2) + 3.5, subY1);
  doc.text('GUESTS COUNT', marginX + (subColW * 3) + 3.5, subY1);
  doc.text('PICKUP LOCATION', marginX + (subColW * 4) + 3.5, subY1);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(travelDate, marginX + 3.5, subY2);
  doc.text(travelEndDate, marginX + subColW + 3.5, subY2);
  doc.text(bookingData.duration || '6D / 5N', marginX + (subColW * 2) + 3.5, subY2);
  doc.text(`${adults} Adults${children > 0 ? `, ${children} Kids` : ''}`, marginX + (subColW * 3) + 3.5, subY2);
  doc.text(doc.splitTextToSize(pickupCity, subColW - 4), marginX + (subColW * 4) + 3.5, subY2);

  currentY += 26.5;

  // ═══════════════════════════════════════════════════════════════════════
  // 03. PAYMENT SUMMARY (ZERO OVERLAP LAYOUT)
  // ═══════════════════════════════════════════════════════════════════════
  currentY = drawSectionHeader('03.', 'Payment Summary & Transaction Ledger', currentY);

  doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(marginX, currentY, contentWidth, 26, 1.5, 1.5, 'FD');

  // Inner Table Grid — Top Row: 4 equal columns
  const payColW = contentWidth / 4;

  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.rect(marginX, currentY, contentWidth, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(COLOR_TEXT_MUTED[0], COLOR_TEXT_MUTED[1], COLOR_TEXT_MUTED[2]);
  doc.text('ORIGINAL PRICE', marginX + 3.5, currentY + 4);
  doc.text('DISCOUNT / COUPON', marginX + payColW + 3.5, currentY + 4);
  doc.text('AMOUNT PAID (ADVANCE)', marginX + (payColW * 2) + 3.5, currentY + 4);
  doc.text('BALANCE DUE ON ARRIVAL', marginX + (payColW * 3) + 3.5, currentY + 4);

  // Values row
  const valY = currentY + 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
  doc.text(`INR ${totalPrice.toLocaleString('en-IN')}`, marginX + 3.5, valY);

  doc.setTextColor(COLOR_EMERALD[0], COLOR_EMERALD[1], COLOR_EMERALD[2]);
  doc.text(couponApplied !== 'None' ? `${couponApplied} (Applied)` : 'Zero Discount', marginX + payColW + 3.5, valY);

  doc.setTextColor(22, 101, 52);
  doc.text(`INR ${advanceToken.toLocaleString('en-IN')}`, marginX + (payColW * 2) + 3.5, valY);

  doc.setTextColor(remainingBalance > 0 ? 180 : 22, remainingBalance > 0 ? 83 : 101, remainingBalance > 0 ? 9 : 52);
  doc.text(`INR ${remainingBalance.toLocaleString('en-IN')}`, marginX + (payColW * 3) + 3.5, valY);

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

  // Gateway / UTR Number (Col 2 — wrapped cleanly up to 74mm so it NEVER collides with Col 1 or Col 3)
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
  doc.text('• Live Portal: https://him-ytra.vercel.app / valleyvista.com', marginX + (contentWidth * 0.58) + 3.5, currentY + 14.5);

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
  doc.text('ValleyVista Worldwide Travels Pvt. Ltd.', marginX + 3.5, currentY + 34);

  // 2. CO-FOUNDER (Center Column)
  const coFounderX = marginX + authW + 3;
  if (coFounderSigImg) {
    doc.addImage(coFounderSigImg, 'PNG', coFounderX + 3.5, currentY + 1.5, authW - 6, 13);
  }

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
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
  doc.text('Operations Desk, ValleyVista HQ', coFounderX + 3.5, currentY + 30.5);
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
  doc.text('REG: VV/TOUR/2026/891', rightColX + 15.5, currentY + 35, { align: 'center' });

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
  doc.text('THANK YOU FOR CHOOSING VALLEYVISTA!', pageWidth / 2, currentY + 4, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(255, 255, 255);
  doc.text('Explore the world. Create unforgettable journeys. • From Everywhere. To Everywhere.', pageWidth / 2, currentY + 7.2, { align: 'center' });

  // Draw Page border & footer numbering (strictly at Y = 287mm)
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
