import React, { useState } from 'react';
import { X, Check, ShieldCheck, Calendar, Users, MapPin, Tag, Phone, Mail, User, Sparkles, CheckCircle2, Download, MessageSquare } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import confetti from 'canvas-confetti';
import { saveBookingToSupabase, updateBookingPaymentToSupabase, getCurrentUser } from '../lib/supabaseClient';
import { sendBookingEmail } from '../lib/emailService';
import FormFounderBadge from './FormFounderBadge';
import { Lock, AlertCircle } from 'lucide-react';

export default function BookingModal({ initialPackage, preAppliedCode, onClose, onOpenHelpCenter }) {
  const [selectedPkgId, setSelectedPkgId] = useState(initialPackage?.id || TOUR_PACKAGES[0].id);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelDate, setTravelDate] = useState('2026-05-15');
  const [pickupCity, setPickupCity] = useState('Delhi NCR (Airport/Railway Station)');
  const [vehicleTier, setVehicleTier] = useState('sedan');
  const [hotelTier, setHotelTier] = useState('3star');
  const [couponCode, setCouponCode] = useState(preAppliedCode || '');
  const [appliedDiscount, setAppliedDiscount] = useState(preAppliedCode ? 15 : 0);
  const [couponMessage, setCouponMessage] = useState(preAppliedCode ? '15% Discount Applied!' : '');

  const loggedInUser = getCurrentUser();

  // Traveler info
  const [name, setName] = useState(loggedInUser?.full_name || loggedInUser?.username || '');
  const [phone, setPhone] = useState(loggedInUser?.phone || '');
  const [email, setEmail] = useState(loggedInUser?.email || '');
  const [specialRequests, setSpecialRequests] = useState('');

  // Booking state
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  // Payment Verification state
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const currentPkg = TOUR_PACKAGES.find(p => p.id === selectedPkgId) || TOUR_PACKAGES[0];

  // Pricing math
  const baseRate = currentPkg.discountedPrice;
  const adultsCost = baseRate * adults;
  const childrenCost = Math.round(baseRate * 0.6 * children);
  const vehicleAddon = vehicleTier === 'innova' ? 3500 : vehicleTier === 'tempo' ? 7000 : 0;
  const hotelAddon = hotelTier === '4star' ? 2400 * adults : hotelTier === 'luxury' ? 4500 * adults : 0;

  const subtotal = adultsCost + childrenCost + vehicleAddon + hotelAddon;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const finalTotal = subtotal - discountAmount;
  const advanceToken = Math.round(finalTotal * 0.20); // 20% token to reserve

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'HIMPEAKS15') {
      setAppliedDiscount(15);
      setCouponMessage('🎉 HIMPEAKS15 applied: 15% Flat Discount!');
    } else if (code === 'CHARDHAM2026') {
      setAppliedDiscount(12);
      setCouponMessage('🕉️ CHARDHAM2026 applied: 12% Devbhoomi Discount!');
    } else if (code === 'HONEYMOONMAGIC') {
      setAppliedDiscount(10);
      setCouponMessage('❤️ HONEYMOONMAGIC applied: 10% Off + Free Candlelight Dinner!');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid coupon code. Try HIMPEAKS15');
    }
  };

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    const id = `HY-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    setIsConfirmed(true);

    // Save to Database
    const bookingPayload = {
      bookingId: id,
      packageId: currentPkg.id,
      packageTitle: currentPkg.title,
      state: currentPkg.state,
      name,
      phone,
      email,
      customer_username: loggedInUser?.username || null,
      travelDate,
      adults,
      children,
      pickupCity,
      vehicleTier,
      hotelTier,
      finalTotal,
      advanceToken,
      couponCode,
      specialRequests
    };

    saveBookingToSupabase(bookingPayload);
    // Send automated email to amitpatel42203@gmail.com
    sendBookingEmail(bookingPayload);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleVerifyBookingPayment = (e) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.trim().length < 4) {
      setVerificationError('Please enter your 12-digit UTR / UPI reference number from your payment app.');
      return;
    }
    setVerificationError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      // Update Supabase booking record with UTR
      updateBookingPaymentToSupabase(bookingId, utrNumber.trim());
      // Send verified update email with ALL details
      sendBookingEmail({
        bookingId,
        packageTitle: currentPkg.title,
        state: currentPkg.state,
        name,
        phone,
        email,
        travelDate,
        adults,
        children,
        pickupCity,
        vehicleTier,
        hotelTier,
        advanceToken,
        finalTotal,
        couponCode,
        specialRequests,
        utr: utrNumber.trim()
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 my-6">
        
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isConfirmed ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-10 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center border border-teal-400/40">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                Reservation Hold Confirmed
              </span>
              <h2 className="text-3xl font-black text-white font-['Outfit'] mt-2">
                Congratulations, {name || 'Traveler'}!
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Your Himalayan holiday booking request is registered under Booking Reference:
              </p>
              <div className="inline-block mt-3 px-5 py-2.5 rounded-2xl bg-teal-950/80 border border-teal-400/50 font-mono text-xl font-bold text-teal-300 tracking-wider">
                {bookingId}
              </div>
            </div>

            {/* Receipt Summary Box */}
            <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Package:</span>
                <span className="font-bold text-white text-right max-w-xs">{currentPkg.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Travel Date:</span>
                <span className="font-semibold text-white">{travelDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Travelers:</span>
                <span className="font-semibold text-white">{adults} Adults {children > 0 ? `, ${children} Kids` : ''}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Pickup Location:</span>
                <span className="font-semibold text-teal-300">{pickupCity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Total Tour Package Cost:</span>
                <span className="font-bold text-white">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5 bg-teal-950/40 px-3 rounded-xl border border-teal-500/20">
                <span className="font-bold text-teal-300">Token Amount to Secure (20%):</span>
                <span className="font-black text-teal-300 text-sm">₹{advanceToken.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Direct UPI QR Code Payment Block */}
            <div className="p-5 rounded-3xl bg-slate-950 border border-teal-500/30 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Pay 20% Token (₹{advanceToken.toLocaleString('en-IN')}) via UPI QR</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM, Cred) to lock your reservation.
              </p>

              {/* QR Image */}
              <div className="mx-auto w-48 sm:w-56 rounded-2xl overflow-hidden border-2 border-teal-400/50 shadow-xl bg-black p-2">
                <img
                  src="/payment-qr.jpg"
                  alt="Amit Patel UPI QR Code"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              <div className="text-xs text-slate-300 font-medium">
                Payee: <strong className="text-white">Amit Patel</strong> • Central Bank of India 3744
              </div>

              {/* UPI ID Copy */}
              <div className="flex items-center justify-between bg-slate-900 border border-white/10 rounded-xl px-3 py-2 max-w-xs mx-auto text-xs">
                <span className="font-mono text-teal-300 font-bold truncate">amitpatel42203@okhdfcbank</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('amitpatel42203@okhdfcbank');
                    alert('UPI ID copied: amitpatel42203@okhdfcbank');
                  }}
                  className="px-2 py-0.5 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[10px] font-bold cursor-pointer ml-2"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Payment Verification Step */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-teal-500/30 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> Verify Token Payment
                </span>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300">
                After scanning and paying via your UPI app, enter your 12-digit UTR / UPI reference number below to verify:
              </p>

              <form onSubmit={handleVerifyBookingPayment} className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter 12-digit UTR No. (e.g. 412389102834)"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  disabled={isVerified}
                  className="w-full bg-slate-900 border border-white/20 focus:border-teal-400 text-white rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder:text-slate-500 focus:outline-none transition disabled:opacity-60"
                />

                {verificationError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{verificationError}</span>
                  </div>
                )}

                {!isVerified ? (
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isVerifying ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Payment...</span>
                      </span>
                    ) : (
                      <span>Confirm & Verify Payment</span>
                    )}
                  </button>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Payment verified! Click below to send screenshot on WhatsApp.</span>
                  </div>
                )}
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {isVerified ? (
                <a
                  href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hello Amit Patel! I have made the token payment of ₹${advanceToken.toLocaleString('en-IN')} for package "${currentPkg.title}".\n\n• Booking Ref: ${bookingId}\n• UTR Number: ${utrNumber || 'Verified'}\n• Traveler Name: ${name}\n\nPlease find my payment screenshot attached to issue my confirmed booking voucher!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition animate-pulse"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Payment Screenshot on WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (!utrNumber) {
                      setVerificationError('Please enter your 12-digit UTR number above and click "Confirm & Verify Payment" first.');
                    } else {
                      handleVerifyBookingPayment({ preventDefault: () => {} });
                    }
                  }}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Verify Payment to Send Screenshot on WhatsApp</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition cursor-pointer"
              >
                Close & Done
              </button>
            </div>

            {/* Founder Details & Help Center */}
            <FormFounderBadge onOpenHelpCenter={onOpenHelpCenter} />
          </div>
        ) : (
          /* Booking / Reservation Form */
          <div>
            <div className="p-6 bg-slate-950/80 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Book / Reserve Tour Package
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mt-1">
                {currentPkg.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">
                  {currentPkg.duration}
                </span>
                <span>{currentPkg.state}</span>
                <span>•</span>
                <span>Breakfast & Dinner Included</span>
              </div>
            </div>

            <form onSubmit={handleConfirmReservation} className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
              
              {/* Package Selector (if user wants to change) */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Selected Package</label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-teal-400"
                >
                  {TOUR_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} — ₹{pkg.discountedPrice.toLocaleString('en-IN')}/person
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Adults (12+ Yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-teal-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Children (5-11 Yrs)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-teal-400"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Children (40% off)</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pickup & Vehicle upgrades */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Pickup City</label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-teal-400"
                  >
                    <option value="Delhi NCR (Airport/Railway Station)">Delhi NCR (Airport / Railway Stn)</option>
                    <option value="Chandigarh (Airport/Railway Station)">Chandigarh (Airport / Railway Stn)</option>
                    <option value="Dehradun / Jolly Grant Airport">Dehradun / Jolly Grant Airport</option>
                    <option value="Haridwar / Rishikesh">Haridwar / Rishikesh</option>
                    <option value="Pathankot / Chakki Bank">Pathankot / Chakki Bank</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Vehicle Preference</label>
                  <select
                    value={vehicleTier}
                    onChange={(e) => setVehicleTier(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-teal-400"
                  >
                    <option value="sedan">Swift Dzire / Etios (Included in package)</option>
                    <option value="innova">Upgrade to Innova Crysta (+₹3,500 total)</option>
                    <option value="tempo">Upgrade to Tempo Traveller (+₹7,000 total)</option>
                  </select>
                </div>
              </div>

              {/* Coupon Code section */}
              <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. HIMPEAKS15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-xs border border-teal-500/30 transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <div className="text-[11px] text-teal-300 font-semibold">{couponMessage}</div>
                )}
              </div>

              {/* Traveler Contact Info */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">Lead Traveler Contact</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address (for booking voucher PDF)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <textarea
                    rows="2"
                    placeholder="Special preferences: e.g. Pure Jain / Veg meals, Ground floor room, Honeymoon setup, Senior citizen assistance..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Cost ({adults} Adults):</span>
                  <span className="font-semibold text-white">₹{adultsCost.toLocaleString('en-IN')}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Child Cost ({children} Kids):</span>
                    <span className="font-semibold text-white">₹{childrenCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {vehicleAddon > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Vehicle Upgrade:</span>
                    <span className="font-semibold text-teal-300">+₹{vehicleAddon.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount Savings ({appliedDiscount}%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Package Price</div>
                    <div className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-teal-300 font-bold uppercase">Reserve Now Token (20%)</div>
                    <div className="text-lg font-black text-teal-300 font-['Outfit']">
                      ₹{advanceToken.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/25 transition cursor-pointer"
              >
                Confirm & Reserve My Trip (₹{advanceToken.toLocaleString('en-IN')} Token)
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> 100% Refundable up to 15 Days
                </span>
                <span>•</span>
                <span>GST Tax Invoice Provided</span>
              </div>

              {/* Founder Information & Help Center Link */}
              <FormFounderBadge onOpenHelpCenter={onOpenHelpCenter} />

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
