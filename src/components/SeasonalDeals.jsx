import React, { useState } from 'react';
import { SEASONAL_OFFERS } from '../data/travelData';
import { Tag, Copy, Check, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function SeasonalDeals({ onApplyOffer }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="space-y-4 max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
          <Tag className="w-3.5 h-3.5" />
          <span>Exclusive Seasonal Deals</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Limited-Time Special Offers & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
            Promotional Coupons
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Save extra on your upcoming mountain holiday. Apply coupon codes during booking or quote over the phone with our tour coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEASONAL_OFFERS.map((offer, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-teal-500/25 p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-teal-400 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top decorative stripe */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {offer.badge}
                </span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {offer.validTill}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-1">
                {offer.discount}
              </div>

              <h3 className="text-lg font-bold text-teal-300 mb-2">
                {offer.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {offer.description}
              </p>
            </div>

            {/* Code Box & Action */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between bg-slate-950/80 border border-dashed border-teal-500/40 rounded-xl px-3.5 py-2.5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Promo Code</span>
                  <span className="font-mono font-bold text-white text-sm tracking-wider">{offer.code}</span>
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => onApplyOffer(offer.code)}
                className="w-full py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Apply Code & Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
