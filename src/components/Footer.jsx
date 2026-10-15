import React from 'react';
import { Mountain, Phone, Mail, MapPin, Heart, ShieldCheck, Award, HelpCircle } from 'lucide-react';

export default function Footer({ onSelectState, onOpenBooking, onOpenPayment, onOpenHelpCenter }) {
  return (
    <footer className="relative z-10 bg-slate-950 border-t border-white/10 pt-16 pb-28 lg:pb-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-400/60 shadow-md shadow-teal-500/20 shrink-0 bg-slate-900">
                <img
                  src="/mountain-logo.jpg"
                  alt="HimYatra Mountains"
                  className="w-full h-full object-cover object-center scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=256&h=256&q=85';
                  }}
                />
              </div>
              <span className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
                Him<span className="text-teal-400">Yatra</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              HimYatra is Himachal’s premier homegrown mountain travel specialist. Dedicated to crafting memorable, safe, and authentic journeys across Himachal Pradesh and Uttarakhand Devbhoomi.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> HP Tourism Reg. No. HP/TOUR/2026/891
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Devbhoomi Certified
              </span>
            </div>
          </div>

          {/* Himachal Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-['Outfit'] uppercase tracking-wider text-teal-400">
              Himachal Pradesh
            </h4>
            <ul className="space-y-2">
              {['Manali & Solang Valley', 'Shimla & Kufri', 'Spiti Valley & Chandratal', 'Dharamshala & McLeodganj', 'Kasol & Parvati Valley', 'Jibhi & Tirthan Valley', 'Dalhousie & Khajjiar', 'Kinnaur & Chitkul'].map((item) => (
                <li key={item}>
                  <a
                    href="#destinations"
                    onClick={() => onSelectState?.('Himachal Pradesh')}
                    className="hover:text-teal-300 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Uttarakhand Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-['Outfit'] uppercase tracking-wider text-teal-400">
              Uttarakhand Devbhoomi
            </h4>
            <ul className="space-y-2">
              {['Kedarnath & Badrinath', 'Rishikesh & Haridwar', 'Mussoorie & Dhanaulti', 'Nainital & Bhimtal', 'Jim Corbett Tiger Safari', 'Auli Skiing Resort', 'Chopta & Tungnath', 'Valley of Flowers'].map((item) => (
                <li key={item}>
                  <a
                    href="#destinations"
                    onClick={() => onSelectState?.('Uttarakhand')}
                    className="hover:text-teal-300 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Support & Payment */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-['Outfit'] uppercase tracking-wider text-teal-400">
              24/7 Helpline
            </h4>
            <div className="space-y-2 text-slate-300">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Toll-Free Assistance</span>
                <a href="tel:+917619917057" className="text-sm font-bold text-white hover:text-teal-300">
                  +91 76199 17057
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">WhatsApp Desk</span>
                <a href="https://wa.me/917619917057" className="text-sm font-bold text-emerald-400">
                  +91 76199 17057
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Email Bookings</span>
                <a href="mailto:amitpatel42203@gmail.com" className="text-xs text-slate-200 hover:text-white">
                  amitpatel42203@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold mb-1">Accepted Payment Modes</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300">
                <button
                  type="button"
                  onClick={() => onOpenPayment?.()}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 cursor-pointer transition flex items-center gap-1"
                >
                  <span>⚡ Scan UPI QR Code</span>
                </button>
                <span className="px-2 py-1 rounded-lg bg-slate-900 border border-white/10">Net Banking</span>
                <span className="px-2 py-1 rounded-lg bg-slate-900 border border-white/10">Credit Cards (EMI)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and heartfelt note */}
        <div className="pt-8 space-y-4">
          {/* Founder Credit Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-sm">A</div>
              <div>
                <div className="text-white font-bold">Amit Verma</div>
                <div className="text-slate-400 text-[11px]">Founder & CEO, HimYatra Travels | +91 76199 17057</div>
              </div>
            </div>
            <button
              onClick={() => onOpenHelpCenter?.()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 text-xs font-bold transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              24/7 Help Center
            </button>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <div>
              © {new Date().getFullYear()} HimYatra Travels Private Limited. All Rights Reserved. Made with ❤️ in Himachal.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="#about" className="hover:text-white transition">About Us</a>
              <span>•</span>
              <a href="#packages" className="hover:text-white transition">All Packages</a>
              <span>•</span>
              <a href="#offers" className="hover:text-white transition">Offers & Coupons</a>
              <span>•</span>
              <button onClick={() => onOpenBooking(null)} className="text-teal-400 font-bold hover:underline cursor-pointer">
                Book a Tour
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
