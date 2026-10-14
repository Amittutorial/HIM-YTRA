import React, { useState } from 'react';
import { X, Check, Calendar, MapPin, Car, Hotel, Utensils, Shield, Star, Sparkles, ChevronDown, ChevronUp, Share2, PhoneCall } from 'lucide-react';

export default function PackageModal({ pkg, onClose, onBookNow }) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [expandedDay, setExpandedDay] = useState(0);

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
              {pkg.state}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-teal-300">
              {pkg.duration}
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
        <div className="px-6 pt-4 border-b border-white/10 flex items-center gap-4 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-teal-400 text-teal-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Day-by-Day Itinerary ({pkg.days} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-teal-400 text-teal-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Inclusions & Exclusions
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-teal-400 text-teal-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Trip Overview
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-4">
          {activeTab === 'itinerary' && (
            <div className="space-y-3">
              {pkg.itinerary.map((day, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedDay(expandedDay === idx ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition cursor-pointer"
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
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/20">
                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> What's Included:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 bg-rose-950/20 p-5 rounded-2xl border border-rose-500/20">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-400" /> What's Not Included:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>{pkg.overview}</p>
              <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/20 space-y-2">
                <h4 className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Why Choose This HimYatra Package?
                </h4>
                <p className="text-xs text-slate-300">
                  All hotels are pre-audited for cleanliness, heating, hot water, and panoramic mountain balconies. Dedicated private cab remains with you from pickup until drop-off with an experienced local driver fluent in Hindi and local routes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing & Action */}
        <div className="p-6 bg-slate-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
              <span className="text-xs text-slate-400 font-normal"> / person (all taxes incl.)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+917619917057"
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-white/10 transition"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span>Talk to Expert (+91 76199 17057)</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/25 transition cursor-pointer"
            >
              Book / Reserve Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
