import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function FloatingWhatsApp({ activePackage = null }) {
  const [openPopup, setOpenPopup] = useState(false);

  const defaultMsg = activePackage
    ? `Hi HimYatra! I am interested in "${activePackage.title}" (₹${activePackage.price || activePackage.discountedPrice}/person). Please share details!`
    : 'Hi HimYatra! I want to plan a tour to Himachal / Uttarakhand. Please guide me!';

  const quickQuestions = [
    'Kedarnath Yatra 2026 dates & helicopter booking?',
    'Manali 5-day package quote for family / couple?',
    'Delhi to Shimla / Manali cab rental fixed fare?',
    'Spiti Valley 4x4 circuit best time to visit?'
  ];

  return (
    <div className="fixed bottom-18 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Questions Popup Card */}
      {openPopup && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl bg-slate-900 border border-emerald-500/40 p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 text-white space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                HY
              </div>
              <div>
                <div className="text-xs font-bold">HimYatra Mountain Desk</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Avg reply: 5 mins</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpenPopup(false)}
              className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300">
            {activePackage ? (
              <>Looking for <strong>{activePackage.title}</strong>? Tap to start instant WhatsApp chat:</>
            ) : (
              'Namaste! How can our local Pahadi travel experts assist you today?'
            )}
          </p>

          <div className="space-y-1.5">
            {quickQuestions.map((q, i) => (
              <a
                key={i}
                href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! ${q}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-left p-2 rounded-xl bg-slate-950/70 hover:bg-emerald-950/40 border border-white/5 hover:border-emerald-500/30 text-[11px] text-slate-200 hover:text-emerald-300 transition block truncate"
              >
                💬 {q}
              </a>
            ))}
          </div>

          <a
            href={`https://wa.me/917619917057?text=${encodeURIComponent(defaultMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-slate-950/20" />
            <span>Open Custom WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating WhatsApp Bubble */}
      <div className="relative group">
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping pointer-events-none" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 pointer-events-none" />

        <button
          onClick={() => setOpenPopup(!openPopup)}
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer group"
        >
          <MessageSquare className="w-7 h-7 fill-slate-950/20 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}
