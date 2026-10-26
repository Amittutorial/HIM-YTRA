import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Sparkles, User } from 'lucide-react';
import { getCurrentUser } from '../lib/supabaseClient';

export default function MobileBottomBar({ onOpenBooking, onOpenAuth, theme = 'dark' }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleAuth = (e) => setCurrentUser(e.detail);
    window.addEventListener('himyatra-auth-changed', handleAuth);
    return () => window.removeEventListener('himyatra-auth-changed', handleAuth);
  }, []);

  const isLight = theme === 'light';

  return (
    <div
      id="mobile-bottom-bar"
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl border-t px-2 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 lg:hidden shadow-2xl transition-colors duration-300 ${
        isLight
          ? 'bg-white/95 border-slate-200/90 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]'
          : 'bg-slate-950/95 border-white/10 shadow-black/80'
      }`}
    >
      {/* Call button */}
      <a
        href="tel:+917619917057"
        className={`flex-1 py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition border ${
          isLight
            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300/80 text-slate-800'
            : 'bg-slate-900 border-white/15 text-slate-200 hover:bg-slate-800'
        }`}
      >
        <Phone className="w-3.5 h-3.5 text-teal-500 shrink-0" />
        <span>Call</span>
      </a>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/917619917057?text=Hi%20HimYatra!%20I%20want%20to%20plan%20a%20Himalayan%20trip."
        target="_blank"
        rel="noreferrer"
        className={`flex-1 py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition border ${
          isLight
            ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
            : 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/80'
        }`}
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Chat</span>
      </a>

      {/* Customer Account / Login button */}
      <button
        type="button"
        onClick={() => onOpenAuth?.()}
        className={`flex-1 py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition cursor-pointer border ${
          isLight
            ? currentUser
              ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-900 font-extrabold'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300/80 text-slate-800'
            : currentUser
              ? 'bg-teal-950/90 border-teal-500/50 text-teal-300 hover:bg-teal-900/90'
              : 'bg-slate-900 border-white/15 text-slate-200 hover:bg-slate-800'
        }`}
      >
        <User className="w-3.5 h-3.5 text-teal-500 shrink-0" />
        <span className="truncate max-w-[62px]">{currentUser ? `@${currentUser.username}` : 'Login'}</span>
      </button>

      {/* Book Now button */}
      <button
        type="button"
        onClick={() => onOpenBooking(null)}
        className={`flex-1 py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-black flex items-center justify-center gap-1 active:scale-95 transition cursor-pointer shadow-lg ${
          isLight
            ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-teal-500/25'
            : 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-teal-500/20'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span>Book</span>
      </button>
    </div>
  );
}
