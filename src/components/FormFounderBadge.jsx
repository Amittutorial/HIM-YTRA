import React from 'react';
import { ShieldCheck, Phone, HelpCircle } from 'lucide-react';

export default function FormFounderBadge({ onOpenHelpCenter }) {
  return (
    <div className="mt-4 pt-3 border-t border-white/10 bg-slate-950/80 p-3.5 rounded-2xl border border-white/10 shadow-inner space-y-2.5">
      {/* Top Founder Details */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 font-black flex items-center justify-center text-xs shadow-md shrink-0 ring-2 ring-teal-500/30">
          AV
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Founder:</span>
            <strong className="text-white font-bold text-xs truncate">Amit Verma</strong>
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          </div>
          <p className="text-[10px] text-teal-300/80 truncate">HimYatra Himalayan Tour Specialist</p>
        </div>
      </div>

      {/* Action Buttons: Phone & Help Center (2-column grid that never overlaps) */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <a
          href="tel:+917619917057"
          className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-2 rounded-xl border border-white/10 transition text-center"
        >
          <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="truncate">+91 76199 17057</span>
        </a>

        {onOpenHelpCenter && (
          <button
            type="button"
            onClick={onOpenHelpCenter}
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-teal-300 hover:text-teal-200 bg-teal-500/15 hover:bg-teal-500/25 px-2 py-2 rounded-xl border border-teal-500/30 transition cursor-pointer text-center"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">Help Center</span>
          </button>
        )}
      </div>
    </div>
  );
}
