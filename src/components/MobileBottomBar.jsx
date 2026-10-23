import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Sparkles, User } from 'lucide-react';
import { getCurrentUser } from '../lib/supabaseClient';

export default function MobileBottomBar({ onOpenBooking, onOpenAuth }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleAuth = (e) => setCurrentUser(e.detail);
    window.addEventListener('himyatra-auth-changed', handleAuth);
    return () => window.removeEventListener('himyatra-auth-changed', handleAuth);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 px-2 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 lg:hidden shadow-2xl">
      {/* Call button */}
      <a
        href="tel:+917619917057"
        className="flex-1 py-2 px-1 rounded-xl bg-slate-900 border border-white/15 text-slate-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition"
      >
        <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span>Call</span>
      </a>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/917619917057?text=Hi%20HimYatra!%20I%20want%20to%20plan%20a%20Himalayan%20trip."
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2 px-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Chat</span>
      </a>

      {/* Customer Account / Login button */}
      <button
        type="button"
        onClick={() => onOpenAuth?.()}
        className={`flex-1 py-2 px-1 rounded-xl border text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition cursor-pointer ${
          currentUser
            ? 'bg-teal-950/90 border-teal-500/50 text-teal-300'
            : 'bg-slate-900 border-white/15 text-slate-200'
        }`}
      >
        <User className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span className="truncate max-w-[62px]">{currentUser ? `@${currentUser.username}` : 'Login'}</span>
      </button>

      {/* Book Now button */}
      <button
        type="button"
        onClick={() => onOpenBooking(null)}
        className="flex-1 py-2 px-1.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-[11px] sm:text-xs font-black flex items-center justify-center gap-1 shadow-lg shadow-teal-500/20 active:scale-95 transition cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span>Book</span>
      </button>
    </div>
  );
}
