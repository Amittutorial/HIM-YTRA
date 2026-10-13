import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

export default function MobileBottomBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-2 lg:hidden shadow-2xl">
      {/* Call button */}
      <a
        href="tel:+917619917057"
        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-white/15 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition"
      >
        <Phone className="w-3.5 h-3.5 text-teal-400" />
        <span>Call Expert</span>
      </a>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/917619917057?text=Hi%20HimYatra!%20I%20want%20to%20plan%20a%20Himalayan%20trip."
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
        <span>WhatsApp</span>
      </a>

      {/* Book Now button */}
      <button
        onClick={() => onOpenBooking(null)}
        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/20 active:scale-95 transition cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Book Trip</span>
      </button>
    </div>
  );
}
