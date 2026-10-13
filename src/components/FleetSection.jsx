import React from 'react';
import { VEHICLE_FLEET } from '../data/travelData';
import { Car, Users, Briefcase, Check, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export default function FleetSection({ onOpenBooking }) {
  return (
    <section id="fleet" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            <Car className="w-3.5 h-3.5" />
            <span>Mountain-Ready Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Safe, Comfortable Mountain Cabs & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Experienced Pahadi Drivers
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Driving in high Himalayas demands verified experience. Every HimYatra vehicle undergoes mandatory mechanical safety audits and is manned by local drivers with 8+ years on hill roads.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/20 max-w-xs">
          <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" /> 100% Hill Permitted Cabs
          </div>
          <p className="text-[11px] text-slate-300 mt-1">
            Valid permits for Rohtang, Atal Tunnel, Spiti Inner Line, and Uttarakhand Chardham circuits.
          </p>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {VEHICLE_FLEET.map((veh, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-slate-900/80 border border-white/10 hover:border-teal-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-xl"
          >
            <div>
              {/* Image */}
              <div className="h-44 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={veh.image}
                  alt={veh.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-white/10">
                  {veh.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-white font-['Outfit'] mb-1">
                {veh.name}
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                {veh.idealFor}
              </p>

              {/* Capacity & Luggage */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">{veh.capacity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">{veh.luggage}</span>
                </div>
              </div>

              {/* Feature list */}
              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                {veh.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-[11px] text-teal-300 font-semibold mb-2">
                {veh.ratePerKm}
              </div>
              <button
                onClick={() => onOpenBooking(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-white font-bold text-xs transition duration-200 cursor-pointer text-center"
              >
                Book with Tour Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
