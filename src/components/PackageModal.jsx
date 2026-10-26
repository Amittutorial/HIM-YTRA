import React, { useState } from 'react';
import { X, Check, Calendar, MapPin, Car, Hotel, Utensils, Shield, Star, Sparkles, ChevronDown, ChevronUp, Share2, PhoneCall, Printer, Download, HeartPulse, AlertTriangle, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

export default function PackageModal({ pkg, onClose, onBookNow }) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [expandedDay, setExpandedDay] = useState(0);

  if (!pkg) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-teal-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90 my-3 sm:my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close package details"
          className="print:hidden absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
              {pkg.state}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-teal-300">
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
              Day-by-Day Plan ({pkg.days} Days)
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
              onClick={() => setActiveTab('safety')}
              className={`pb-2.5 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'safety'
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

          {/* Download / Print Itinerary Button */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-white/10 transition cursor-pointer"
            title="Download or Print Itinerary as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Print / PDF Itinerary</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 max-h-[52vh] overflow-y-auto space-y-4">
          {/* Day-by-Day Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {/* Interactive Route Stops Map Pill Row */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-teal-500/20 text-xs">
                <div className="text-[11px] font-bold uppercase text-teal-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Route Stops & Highlights Timeline</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {pkg.itinerary.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-200 font-semibold text-[11px]">
                        {d.day}: {d.title.split('-')[0].trim()}
                      </span>
                      {i < pkg.itinerary.length - 1 && (
                        <span className="text-teal-400 font-bold">➔</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Accordions */}
              <div className="space-y-2.5">
                {pkg.itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden transition"
                  >
                    <button
                      onClick={() => setExpandedDay(expandedDay === idx ? -1 : idx)}
                      className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/30">
                          {day.day}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          {day.title}
                        </span>
                      </div>
                      {expandedDay === idx ? (
                        <ChevronUp className="w-4 h-4 text-teal-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {expandedDay === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                        {day.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions Tab */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3 bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/20">
                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> What's 100% Included:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>Dedicated local Pahadi driver with mountain route permits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>All toll taxes, state border permits & fuel included</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 bg-rose-950/20 p-5 rounded-2xl border border-rose-500/20">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-400" /> What's Excluded:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">✕</span>
                    <span>Personal adventure rides (Paragliding, River Rafting tickets)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">✕</span>
                    <span>Any personal tips or laundry expenses</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Altitude & Safety Card Tab */}
          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-amber-400" />
                    <span>Altitude & Acclimatization Profile</span>
                  </span>
                  <span className="text-xs bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30 font-bold">
                    Max Elevation: {pkg.title.includes('Kedarnath') || pkg.title.includes('Dham') ? '3,583 m (11,755 ft)' : pkg.title.includes('Spiti') ? '4,300 m (14,100 ft)' : '2,050 m (6,725 ft)'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mountain altitudes can feel cooler and have lower oxygen density than the plains. Our drivers and mountain teams ensure a smooth experience with gradual elevation gains.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
                  <strong className="text-white block">💧 Acclimatization Tips</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Drink plenty of water and warm fluids. Avoid rapid ascents and carry ginger or camphor for high passes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
                  <strong className="text-white block">🛌 Recommended Rest Day</strong>
                  <p className="text-slate-400 leading-relaxed">
                    First evening is always kept light for acclimatization. Enjoy hot tea and scenic terrace views without exhaustion.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
                  <strong className="text-white block">🫁 Emergency Oxygen</strong>
                  <p className="text-slate-400 leading-relaxed">
                    Portable oxygen canisters and complete first aid kits are standard in all HimYatra cabs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pickup & Cancellation Policy Tab */}
          {activeTab === 'policy' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Car className="w-4 h-4 text-teal-400" /> Included Pickup & Drop Points
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  We provide door-to-door private cab pickups from any of the following locations without extra surcharge:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-200">
                  <div className="flex items-center gap-1.5">✓ Delhi NCR (IGI Airport T1/T2/T3 or Railway Stns)</div>
                  <div className="flex items-center gap-1.5">✓ Chandigarh (Airport / Station)</div>
                  <div className="flex items-center gap-1.5">✓ Dehradun / Jolly Grant Airport</div>
                  <div className="flex items-center gap-1.5">✓ Haridwar / Rishikesh Railway Station</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> Flexible Cancellation & Roadblock Protection
                </h4>
                <ul className="space-y-1.5 text-slate-400">
                  <li>• <strong>100% Full Refund:</strong> If cancelled 7 or more days prior to departure date.</li>
                  <li>• <strong>50% Refund:</strong> If cancelled 3 to 6 days prior to departure.</li>
                  <li>• <strong>Mountain Weather / Landslide Protection:</strong> If a route is blocked by government weather advisory, 100% of your deposit rolls over to any future date with zero penalty.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing, WhatsApp & Booking Actions */}
        <div className="p-5 sm:p-6 bg-slate-950/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 line-through">
                ₹{pkg.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Save ₹{(pkg.originalPrice - pkg.discountedPrice).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              ₹{pkg.discountedPrice.toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-normal"> / person (All Taxes Incl.)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* WhatsApp Inquiry with Pre-filled Package Name */}
            <a
              href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I want to inquire about "${pkg.title}" (₹${pkg.discountedPrice}/person). Please share available dates and itinerary!`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950/20" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+917619917057"
              className="px-3.5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-white/10 transition"
              title="Call Helpline"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">Call +91 76199 17057</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 transition cursor-pointer"
            >
              Book / Reserve Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
