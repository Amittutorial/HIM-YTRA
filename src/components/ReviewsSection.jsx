import React from 'react';
import { TESTIMONIALS } from '../data/travelData';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Real Traveler Stories</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Loved by Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">15,000+ Indian Families</span> & Explorers
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Read genuine experiences from travelers across Mumbai, Bengaluru, Delhi, Kolkata, and Gujarat who trusted HimYatra with their precious Himalayan holidays.
        </p>

        {/* Google Reviews Trust Badge & Link */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.google.com/search?q=HimYatra+Tours+and+Travels+Himachal+Uttarakhand+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 border border-white/20 hover:border-amber-400/50 text-white text-xs font-bold transition shadow-lg hover:scale-102"
          >
            <div className="flex items-center gap-1">
              <span className="text-blue-400 font-black">G</span>
              <span className="text-red-400 font-black">o</span>
              <span className="text-amber-400 font-black">o</span>
              <span className="text-blue-400 font-black">g</span>
              <span className="text-green-400 font-black">l</span>
              <span className="text-red-400 font-black">e</span>
            </div>
            <span className="text-slate-300">Reviews</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-slate-400 font-normal">(2,400+ Indian Travelers)</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((rev, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-slate-900/80 border border-white/10 hover:border-teal-500/30 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl relative"
          >
            <div>
              {/* Star rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Package Tag */}
              <div className="text-[11px] font-bold text-teal-300 bg-teal-950/60 border border-teal-500/30 px-2.5 py-1 rounded-lg inline-block mb-3">
                {rev.package}
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover border border-teal-400/50"
              />
              <div className="overflow-hidden">
                <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1 truncate">
                  <span className="truncate">{rev.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {rev.city} • {rev.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
