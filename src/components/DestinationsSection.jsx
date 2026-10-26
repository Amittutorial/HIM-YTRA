import React, { useState } from 'react';
import { DESTINATIONS } from '../data/travelData';
import { MapPin, Thermometer, Calendar, ArrowRight, Mountain, Compass, Sparkles } from 'lucide-react';

export default function DestinationsSection({ activeTab, setActiveTab, onSelectDestination, onOpenBooking }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredDestinations = activeTab === 'All'
    ? DESTINATIONS
    : activeTab === 'Sikkim'
    ? DESTINATIONS.filter(d => d.state === 'Sikkim')
    : activeTab === 'Meghalaya'
    ? DESTINATIONS.filter(d => d.state === 'Meghalaya')
    : DESTINATIONS.filter(d => d.state === activeTab);

  return (
    <section id="destinations" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Iconic Travel Escapes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Explore Featured Destinations <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
              Across India & The Himalayas
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            From sacred Ram Janmabhoomi in Ayodhya and holy Ganga ghats to snow-clad Kashmir valleys, high-altitude Ladakh, royal Rajasthan forts, and Kerala backwaters.
          </p>
        </div>

        {/* State Filter Tabs */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-white/10 backdrop-blur-xl self-start md:self-auto max-w-full overflow-x-auto scrollbar-none">
          {[
            { id: 'All', label: 'All Spots (27+)' },
            { id: 'Himachal Pradesh', label: '🏔️ Himachal' },
            { id: 'Uttarakhand', label: '🕉️ Uttarakhand' },
            { id: 'Uttar Pradesh', label: '🚩 Ayodhya & UP' },
            { id: 'Kashmir', label: '❄️ Kashmir' },
            { id: 'Ladakh', label: '⛺ Ladakh' },
            { id: 'Punjab', label: '🪔 Amritsar' },
            { id: 'Meghalaya', label: '🌿 Meghalaya' },
            { id: 'Rajasthan', label: '🏰 Rajasthan' },
            { id: 'Kerala', label: '🌴 Kerala' },
            { id: 'Goa', label: '🏖️ Goa' },
            { id: 'Sikkim', label: '🪷 Sikkim' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            onMouseEnter={() => setHoveredCard(dest.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => {
              onSelectDestination(dest);
              const el = document.getElementById('packages');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10 hover:border-teal-500/40 transition-all duration-500 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 flex flex-col justify-between cursor-pointer"
          >
            {/* Image Header with Badges */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* State & Trip Length Pill */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-1.5">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                  dest.state === 'Himachal Pradesh'
                    ? 'bg-sky-950/80 text-sky-300 border-sky-400/30'
                    : 'bg-amber-950/80 text-amber-300 border-amber-400/30'
                }`}>
                  {dest.state}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md bg-teal-950/80 text-teal-300 border border-teal-400/30">
                  ⏱️ {dest.tripLength || '5 Days / 4 Nights'}
                </span>
              </div>

              {/* Altitude & Weather pill */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-slate-950/80 border border-white/15 text-slate-200">
                <Thermometer className="w-3.5 h-3.5 text-teal-400" />
                <span>{dest.weather}</span>
              </div>

              {/* Title & Tagline overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 destination-image-overlay">
                <h3 className="text-2xl font-black text-white font-['Outfit'] tracking-tight group-hover:text-teal-300 transition-colors drop-shadow-md">
                  {dest.name}
                </h3>
                <p className="text-xs text-teal-300 font-semibold mt-0.5 line-clamp-1 drop-shadow">
                  {dest.tagline}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {dest.description}
              </p>

              {/* Highlights tags */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Top Highlights:</div>
                <div className="flex flex-wrap gap-1.5">
                  {dest.highlights.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Meta: Best time & Altitude */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>{dest.bestTime}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <Mountain className="w-3.5 h-3.5 text-teal-400" />
                  <span>{dest.altitude}</span>
                </div>
              </div>

              {/* Footer Price & Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase text-teal-400 font-bold tracking-wide">
                    Starting ₹{dest.startingPrice.toLocaleString('en-IN')} per person
                  </div>
                  <div className="text-xl font-extrabold text-white font-['Outfit'] flex items-baseline gap-1">
                    ₹{dest.startingPrice.toLocaleString('en-IN')}
                    <span className="text-xs text-slate-400 font-normal">/ person</span>
                    <span className="text-[10px] text-teal-300 font-bold bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full ml-1">
                      {dest.tripLength || '5D/4N'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDestination(dest);
                      const el = document.getElementById('packages');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-teal-500/20 text-slate-200 hover:text-teal-300 border border-white/10 transition cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                    title="View packages for this destination"
                  >
                    <span>Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking?.(dest);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
