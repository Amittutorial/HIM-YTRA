import React from 'react';
import { ShieldCheck, Phone, HelpCircle } from 'lucide-react';

export default function FormFounderBadge({ onOpenHelpCenter }) {
  return (
    <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-950/70 p-3 rounded-2xl border border-white/10 shadow-inner">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 font-black flex items-center justify-center text-xs shadow-md shrink-0">
          AV
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Founder:</span>
            <strong className="text-white font-bold text-xs">Amit Verma</strong>
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          </div>
          <p className="text-[10px] text-teal-300/80">HimYatra Himalayan Tour Specialist</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <a
          href="tel:+917619917057"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10 transition"
        >
          <Phone className="w-3 h-3 text-teal-400" />
          <span>+91 76199 17057</span>
        </a>

        {onOpenHelpCenter && (
          <button
            type="button"
            onClick={onOpenHelpCenter}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-300 hover:text-teal-200 bg-teal-500/15 hover:bg-teal-500/25 px-2.5 py-1.5 rounded-lg border border-teal-500/30 transition cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-teal-400" />
            <span>Help Center</span>
          </button>
        )}
      </div>
    </div>
  );
}
