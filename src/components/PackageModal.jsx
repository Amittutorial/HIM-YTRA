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
  ArrowLeft
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[10000] overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-teal-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90 my-3 sm:my-8 print:border-none print:shadow-none print:bg-white print:text-black">

        {/* ── Sticky Top Navigation Bar (Always Visible While Scrolling!) ── */}
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

        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-80 overflow-hidden print:h-48">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent print:hidden" />

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

        {/* Quick Inclusions Bar */}
        <div className="bg-slate-950/70 border-y border-white/10 px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
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

        {/* Modal Navigation Tabs */}
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
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition cursor-pointer"
            title="Download PDF or Print Itinerary"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Print / PDF Itinerary</span>
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-6">
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {/* Route Timeline Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Route Stops & Highlights Timeline</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  {pkg.itinerary && pkg.itinerary.map((d, i) => (
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
                {pkg.itinerary && pkg.itinerary.map((day, idx) => (
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
                  {pkg.inclusions && pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
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
                  {pkg.exclusions && pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
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
                  This tour covers altitudes up to {pkg.altitude || '3,000m+'}. Keep yourself hydrated with at least 3 liters of water daily. Avoid smoking and alcohol on day 1. If you experience headache or nausea, inform your HimYatra mountain driver immediately.
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
                  <li>• <strong>Mountain Weather / Landslide Protection:</strong> If a route is blocked by government weather advisory, 100% of your deposit rolls over to any future date with zero penalty.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing, WhatsApp, Back & Booking Actions */}
        <div className="p-4 sm:p-6 bg-slate-950/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 line-through">
                ₹{(pkg.originalPrice || 19999).toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Save ₹{((pkg.originalPrice || 19999) - (pkg.discountedPrice || pkg.price || 14999)).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              ₹{(pkg.discountedPrice || pkg.price || 14999).toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-normal"> / person (All Taxes Incl.)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Back Button in Footer */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-white/10 transition cursor-pointer"
              title="Go back to packages"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'वापस जाएं' : 'Back'}</span>
            </button>

            {/* WhatsApp Inquiry */}
            <a
              href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I want to inquire about "${pkg.title}" (₹${pkg.discountedPrice || pkg.price}/person). Please share available dates and itinerary!`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950/20" />
              <span>{lang === 'hi' ? 'व्हाट्सएप करें' : 'WhatsApp Us'}</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 transition cursor-pointer"
            >
              {lang === 'hi' ? 'अभी बुक करें' : 'Book / Reserve Now'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
