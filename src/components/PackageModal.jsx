import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Calendar,
  MapPin,
  Car,
  Hotel,
  Utensils,
  Shield,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  PhoneCall,
  Printer,
  Download,
  HeartPulse,
  AlertTriangle,
  MessageSquare,
  ShieldCheck,
  Clock,
  ArrowLeft,
  Mail,
  Building
} from 'lucide-react';

export default function PackageModal({ pkg, onClose, onBookNow, lang = 'en', t = (k) => k }) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [expandedDay, setExpandedDay] = useState(0);

  // Keyboard shortcut: Esc to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pkg) return null;

  // Print & Save as Official PDF
  const handlePrint = () => {
    const origTitle = document.title;
    const cleanPkgTitle = (pkg.title || 'Package').replace(/[^a-zA-Z0-9]/g, '_');
    document.title = `ValleyVista_Official_Itinerary_${cleanPkgTitle}_Voucher`;
    window.print();
    setTimeout(() => {
      document.title = origTitle;
    }, 1500);
  };

  const todayDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[10000] overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-start sm:items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200 print:p-0 print:bg-white print:static"
    >
      {/* Floating Global Escape/Close Button for Laptop & Mobile — Never scrolls away */}
      <button
        onClick={onClose}
        type="button"
        aria-label="Close modal"
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[10002] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white flex items-center justify-center border border-white/20 shadow-2xl transition cursor-pointer active:scale-90 print:hidden"
        title="Close (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-4xl bg-slate-900 border border-teal-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90 my-2 sm:my-8 print:border-none print:shadow-none print:bg-white print:text-slate-900 print:my-0 print:p-0 print:max-w-none">

        {/* ══════════════════════════════════════════════════════════════════
            1. ON-SCREEN INTERACTIVE MODAL (Hidden in Print / PDF export)
           ══════════════════════════════════════════════════════════════════ */}

        {/* Sticky Top Navigation Bar */}
        <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shadow-md print:hidden">
          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 hover:text-white text-xs font-bold transition cursor-pointer active:scale-95 shrink-0"
            title="Go back to packages"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'hi' ? '← वापस पैकेज पर जाएं' : '← Back to Packages'}</span>
          </button>

          <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-md hidden xs:inline">
            {pkg.title}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 text-xs font-bold transition cursor-pointer shadow-md shadow-teal-500/20"
              title="Download or Print PDF with Company Letterhead & Signature"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'पीडीएफ डाउनलोड' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white text-xs font-bold transition cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'hi' ? 'बंद करें' : 'Close'}</span>
            </button>
          </div>
        </div>

        {/* Modal Hero Banner (Screen Only) */}
        <div className="relative h-64 sm:h-80 overflow-hidden print:hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-teal-500 text-slate-950 shadow-lg">
              {pkg.badge}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
              {pkg.state}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-teal-300">
              ⏱️ {pkg.duration}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{pkg.rating} Rating ({pkg.reviewsCount} verified traveler reviews)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
              {pkg.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="line-clamp-1">{pkg.route}</span>
            </p>
          </div>
        </div>

        {/* Quick Inclusions Bar (Screen Only) */}
        <div className="bg-slate-950/70 border-y border-white/10 px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs print:hidden">
          <div className="flex items-center gap-2 text-slate-300">
            <Car className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="truncate">{pkg.transport}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Hotel className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="truncate">{pkg.hotelStay}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Utensils className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="truncate">{pkg.meals}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Shield className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="truncate">24/7 Mountain Support</span>
          </div>
        </div>

        {/* Modal Navigation Tabs (Screen Only) */}
        <div className="print:hidden px-6 pt-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'itinerary'
                  ? 'border-teal-400 text-teal-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Day-by-Day Plan ({pkg.days || pkg.itinerary?.length || 5} {lang === 'hi' ? 'दिन' : 'Days'})
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`pb-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'inclusions'
                  ? 'border-teal-400 text-teal-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Inclusions & Exclusions
            </button>
            <button
              onClick={() => setActiveTab('altitude')}
              className={`pb-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'altitude'
                  ? 'border-teal-400 text-teal-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Altitude & Safety
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`pb-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'policy'
                  ? 'border-teal-400 text-teal-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Pickup & Cancellation
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-white/10 transition cursor-pointer"
            title="Download PDF or Print Itinerary"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'hi' ? 'प्रिंट / पीडीएफ' : 'Print / PDF Itinerary'}</span>
          </button>
        </div>

        {/* Modal Tab Content (Screen Only) */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-6 print:hidden">
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {/* Route Timeline Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Route Stops & Highlights Timeline</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  {pkg.itinerary &&
                    pkg.itinerary.map((d, i) => (
                      <React.Fragment key={i}>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 font-medium">
                          {d.day}: {d.title}
                        </span>
                        {i < pkg.itinerary.length - 1 && <span className="text-teal-400">➔</span>}
                      </React.Fragment>
                    ))}
                </div>
              </div>

              {/* Day by Day Accordion */}
              <div className="space-y-3">
                {pkg.itinerary &&
                  pkg.itinerary.map((day, idx) => (
                    <div
                      key={idx}
                      className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/40"
                    >
                      <button
                        onClick={() => setExpandedDay(expandedDay === idx ? -1 : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-14 text-center px-2 py-1 rounded-lg bg-teal-500/10 text-teal-300 font-bold text-xs border border-teal-500/20">
                            {day.day}
                          </span>
                          <h4 className="font-bold text-white text-sm sm:text-base">
                            {day.title}
                          </h4>
                        </div>
                        {expandedDay === idx ? (
                          <ChevronUp className="w-4 h-4 text-teal-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {expandedDay === idx && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-slate-900/40">
                          {day.details}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Package Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {pkg.inclusions &&
                    pkg.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <h4 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  <span>Package Exclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {pkg.exclusions &&
                    pkg.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'altitude' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/40 space-y-2">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                  <HeartPulse className="w-4 h-4" />
                  <span>High Altitude Health & Acclimatization Advice</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This tour covers altitudes up to {pkg.altitude || '3,000m+'}. Keep yourself hydrated with at least 3 liters of water daily. Avoid smoking and alcohol on day 1. If you experience headache or nausea, inform your ValleyVista travel pilot immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Recommended Rest Day</div>
                  <div className="text-sm font-bold text-white">Day 1 & Day 2 Leisure</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Risk Level</div>
                  <div className="text-sm font-bold text-emerald-400">Low to Moderate</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Emergency Kit Included</div>
                  <div className="text-sm font-bold text-teal-300">First-Aid in Cab</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policy' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                <div className="font-bold text-white text-sm">Pickup & Drop Details</div>
                <p>• <strong>Pickup Point:</strong> {pkg.pickupDrop || 'Delhi Airport / Chandigarh / Haridwar'}</p>
                <p>• <strong>Vehicle:</strong> {pkg.transport || 'Dedicated Sanitized Private Cab with Local Mountain Driver'}</p>
                <p>• <strong>Luggage Allowance:</strong> 1 large suitcase + 1 handbag per traveler with roof luggage carrier.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                <div className="font-bold text-white text-sm">Transparent Cancellation & Refund Policy</div>
                <ul className="space-y-1 text-slate-400">
                  <li>• <strong>100% Full Refund:</strong> If cancelled 15 or more days before departure.</li>
                  <li>• <strong>75% Refund:</strong> If cancelled 7 to 14 days before departure.</li>
                  <li>• <strong>50% Refund:</strong> If cancelled 3 to 6 days prior to departure.</li>
                  <li>• <strong>Mountain Weather Protection:</strong> If a route is blocked by government weather advisory, 100% of your deposit rolls over to any future date with zero penalty.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing, WhatsApp, Back & Booking Actions (Screen Only — Sticky at Bottom) */}
        <div className="sticky bottom-0 z-50 p-3.5 sm:p-5 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 line-through">
                ₹{(pkg.originalPrice || 19999).toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Save ₹{((pkg.originalPrice || 19999) - (pkg.discountedPrice || pkg.price || 14999)).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
              ₹{(pkg.discountedPrice || pkg.price || 14999).toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-normal"> / person (All Taxes Incl.)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-end">
            {/* Back Button in Footer (Always visible!) */}
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-white/10 transition cursor-pointer active:scale-95 shadow-md"
              title="Go back to packages"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? '← वापस पैकेज पर' : '← Back to Packages'}</span>
            </button>

            {/* WhatsApp Inquiry */}
            <a
              href={`https://wa.me/917619917057?text=${encodeURIComponent(
                `Hi ValleyVista! I want to inquire about "${pkg.title}" (₹${pkg.discountedPrice || pkg.price}/person). Please share available dates and itinerary!`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/25 transition cursor-pointer active:scale-95"
            >
              {lang === 'hi' ? 'अभी बुक करें' : 'Book / Reserve Now'}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            2. OFFICIAL EXECUTIVE PRINT & PDF VOUCHER
            (Visible ONLY during Print / Download PDF export. Contains
             Company Logo, Letterhead, Registration, Full Itinerary,
             Inclusions, Founder Signature & Official Seal)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="hidden print:block bg-white text-slate-900 p-8 space-y-6 max-w-4xl mx-auto font-sans leading-relaxed">

          {/* Top Letterhead Header */}
          <div className="border-b-2 border-teal-700 pb-5 flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-600 shrink-0">
                <img
                  src="/mountain-logo.jpg"
                  alt="ValleyVista Logo"
                  className="w-full h-full object-cover scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=256&h=256&q=85';
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight font-['Outfit']">
                  VALLEYVISTA WORLDWIDE JOURNEYS
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Worldwide Travel, Tours & Holiday Experiences
                </p>
                <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap items-center gap-x-3">
                  <span><strong>Tourism Reg. No:</strong> VV/TOUR/2026/891</span>
                  <span>•</span>
                  <span><strong>GSTIN:</strong> 02AAACH7891M1Z5</span>
                  <span>•</span>
                  <span><strong>Certified Tour Operator</strong></span>
                </div>
              </div>
            </div>

            {/* Official Contact Box */}
            <div className="text-right text-xs space-y-1 text-slate-700 shrink-0">
              <div className="font-bold text-slate-900">ValleyVista Central Operations Desk</div>
              <div>📞 <strong>Helpline:</strong> +91 76199 17057</div>
              <div>💬 <strong>WhatsApp:</strong> +91 76199 17057</div>
              <div>✉️ <strong>Official Email:</strong> amitpatel42203@gmail.com</div>
              <div>🌐 <strong>Web:</strong> https://him-ytra.vercel.app</div>
              <div className="text-[10px] text-slate-500 pt-0.5">The Mall Road, Shimla (HP) & Tapovan, Rishikesh (UK)</div>
            </div>
          </div>

          {/* Official Document Banner */}
          <div className="bg-teal-800 text-white px-5 py-2.5 rounded-lg flex items-center justify-between text-xs font-bold tracking-wide">
            <span>OFFICIAL TOUR ITINERARY & RESERVATION VOUCHER</span>
            <span>
              Ref: VV-VCH-2026-{(pkg.id || 'TOUR').toUpperCase().replace('PKG-', '')} | Date: {todayDate}
            </span>
          </div>

          {/* Package Overview Box */}
          <div className="border border-slate-300 rounded-xl p-5 bg-slate-50 space-y-3 break-inside-avoid">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full border border-teal-300">
                  {pkg.badge || 'Bestseller Package'}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {pkg.title}
                </h2>
                <div className="text-xs text-slate-600 mt-0.5">
                  <strong>Route:</strong> {pkg.route}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-500 block">Package Fare</span>
                <span className="text-xl font-black text-teal-800">
                  ₹{(pkg.discountedPrice || pkg.price || 14999).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-500 block">/ person (All Taxes Incl.)</span>
              </div>
            </div>

            {/* Snapshot Row */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Duration</span>
                <span className="font-semibold text-slate-800">{pkg.duration}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Private Vehicle</span>
                <span className="font-semibold text-slate-800 truncate block">{pkg.transport}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Hotel Category</span>
                <span className="font-semibold text-slate-800 truncate block">{pkg.hotelStay}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Meals Provided</span>
                <span className="font-semibold text-slate-800 truncate block">{pkg.meals}</span>
              </div>
            </div>
          </div>

          {/* Full Day-by-Day Itinerary (Uncollapsed for PDF) */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 flex items-center justify-between">
              <span>Day-by-Day Complete Itinerary</span>
              <span className="text-xs font-normal text-slate-500 lowercase">
                (all transfers, sightseeing & stays confirmed)
              </span>
            </h3>

            <div className="space-y-3">
              {pkg.itinerary &&
                pkg.itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-3.5 bg-white break-inside-avoid shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-teal-800 text-white font-bold text-xs">
                        {day.day}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{day.title}</h4>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-1">
                      {day.details}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Inclusions & Exclusions Side-by-Side Table */}
          <div className="grid grid-cols-2 gap-4 break-inside-avoid">
            <div className="border border-emerald-300 bg-emerald-50/50 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 border-b border-emerald-200 pb-1">
                <span>✓ Official Inclusions</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {pkg.inclusions &&
                  pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border border-rose-300 bg-rose-50/50 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-900 flex items-center gap-1.5 border-b border-rose-200 pb-1">
                <span>✕ Package Exclusions</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {pkg.exclusions &&
                  pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-700 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Mountain Health, Altitude & Safety Notes */}
          <div className="border border-amber-300 bg-amber-50 rounded-xl p-4 text-xs text-slate-800 space-y-1 break-inside-avoid">
            <div className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
              ⚠️ Mountain Travel & Altitude Advisory:
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              ValleyVista dedicated vehicles carry certified mountain first-aid kits and emergency assistance contacts. Travelers are advised to drink adequate water, carry layered warm woolens, and follow the pilot’s guidance on mountain passes.
            </p>
          </div>

          {/* Transparent Cancellation & Refund Policy */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs text-slate-700 space-y-1.5 break-inside-avoid">
            <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
              ValleyVista Standard Booking & Refund Policy:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>• <strong>Booking Token:</strong> 30% advance deposit confirms private cab & hotel vouchers.</div>
              <div>• <strong>15+ Days Notice:</strong> 100% Full Refund (Zero cancellation charges).</div>
              <div>• <strong>7 to 14 Days Notice:</strong> 75% Refund of total booking.</div>
              <div>• <strong>Weather Protection:</strong> Free date rollover if routes are blocked by weather advisories.</div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              OFFICIAL AUTHENTICATION, CORPORATE SEAL & FOUNDER SIGNATURE
             ══════════════════════════════════════════════════════════════════ */}
          <div className="border-t-2 border-slate-300 pt-5 mt-6 grid grid-cols-3 gap-6 items-end break-inside-avoid">
            
            {/* Column 1: Corporate Seal / Stamp */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-teal-800 p-1 flex items-center justify-center relative shadow-inner">
                <div className="w-full h-full rounded-full border border-teal-700 flex flex-col items-center justify-center p-1 bg-teal-50/40">
                  <span className="text-[7.5px] font-black uppercase tracking-tight text-teal-900">
                    ★ VALLEYVISTA ★
                  </span>
                  <span className="text-[6.5px] font-extrabold uppercase text-slate-700 leading-tight">
                    WORLDWIDE TRAVEL
                  </span>
                  <span className="text-[6px] font-bold text-teal-800 border-t border-b border-teal-600 my-0.5 px-1">
                    VERIFIED & CERTIFIED
                  </span>
                  <span className="text-[6px] font-mono text-slate-600">
                    REG: VV/TOUR/2026
                  </span>
                </div>
              </div>
              <span className="text-[9px] uppercase font-bold text-slate-500 mt-1.5 tracking-wider">
                Official Corporate Seal
              </span>
            </div>

            {/* Column 2: Company Verification & Direct Support */}
            <div className="text-center text-xs space-y-1">
              <div className="font-extrabold text-slate-900">ValleyVista Worldwide Journeys</div>
              <div className="text-[11px] text-slate-600">Tourism Reg. VV/TOUR/2026/891</div>
              <div className="text-[11px] text-slate-600">
                Direct Help: <strong>+91 76199 17057</strong>
              </div>
              <div className="text-[11px] text-teal-800 font-semibold">
                amitpatel42203@gmail.com
              </div>
              <div className="text-[9px] text-slate-500 mt-1">
                Issued for traveler confirmation • All rights reserved
              </div>
            </div>

            {/* Column 3: Founder & Managing Director Signature */}
            <div className="flex flex-col items-center justify-center text-center">
              {/* Calligraphic Blue Fountain-Pen SVG Signature */}
              <div className="h-12 w-48 flex items-center justify-center">
                <svg viewBox="0 0 220 65" className="w-full h-full">
                  <path
                    d="M 14 46 C 24 16, 30 8, 40 42 C 46 22, 52 14, 58 36 L 68 36 C 74 30, 80 22, 86 42 M 98 18 L 98 44 C 102 40, 108 32, 116 40 L 126 36 M 136 16 C 142 36, 148 50, 158 26 C 164 42, 176 32, 192 36"
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 10 54 C 52 49, 132 47, 210 51"
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Signature Metadata */}
              <div className="border-t border-slate-400 pt-1 w-full text-center">
                <div className="font-extrabold text-sm text-slate-900 leading-tight">
                  Amit Verma
                </div>
                <div className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                  Founder & Managing Director
                </div>
                <div className="text-[9px] text-slate-500">
                  ValleyVista Worldwide Travels Pvt. Ltd.
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Verification Notice */}
          <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500">
            This document is a certified itinerary voucher issued by ValleyVista Worldwide Journeys. To re-verify your booking, email <strong>amitpatel42203@gmail.com</strong> or call <strong>+91 76199 17057</strong>.
          </div>

        </div>

      </div>
    </div>
  );
}
