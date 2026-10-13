import React, { useState, useEffect } from 'react';
import { Mountain, Phone, Menu, X, Compass, MapPin, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenBooking, onSelectState, onOpenInquire, onOpenPayment }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-teal-900/80 via-slate-900 to-emerald-950/80 text-xs py-2 px-4 text-center border-b border-teal-500/20 text-teal-200/90 font-medium hidden sm:flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 bg-teal-500/20 px-2 py-0.5 rounded-full text-teal-300 border border-teal-400/30">
          <Sparkles className="w-3 h-3 text-teal-400" /> Season Special
        </span>
        <span>Summer & Snowfall 2026 Bookings Open | Flat 15% Off code: <strong className="text-white font-semibold">HIMPEAKS15</strong></span>
        <span className="text-slate-400">|</span>
        <button
          type="button"
          onClick={() => onOpenPayment?.()}
          className="hover:text-white text-emerald-300 font-bold transition flex items-center gap-1 cursor-pointer bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30"
        >
          <span>💳 Scan & Pay via UPI QR</span>
        </button>
        <span className="text-slate-400">|</span>
        <a href="tel:+917619917057" className="hover:text-white transition flex items-center gap-1">
          <Phone className="w-3 h-3" /> 24/7 Helpline: +91 76199 17057
        </a>
      </div>

      {/* Floating Pill Navigation Bar (matching reference style) */}
      <header className={`fixed z-50 transition-all duration-300 w-full left-0 ${
        isScrolled ? 'top-3 px-4 sm:px-8' : 'top-5 sm:top-10 px-4 sm:px-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <nav className="backdrop-blur-2xl bg-slate-950/75 border border-white/15 rounded-full px-4 sm:px-7 py-3 flex items-center justify-between shadow-2xl shadow-black/60 transition-all hover:border-teal-500/30">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition">
                <Mountain className="w-5 h-5 text-slate-950 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit'] flex items-center gap-1">
                  Him<span className="text-teal-400">Yatra</span>
                </span>
                <span className="text-[10px] -mt-1 tracking-widest text-teal-300/80 uppercase font-semibold">Himalayan Journeys</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
              <a href="#about" className="hover:text-teal-400 transition-colors py-1">About Us</a>

              {/* Destinations Dropdown */}
              <div className="relative" onMouseLeave={() => setDestDropdownOpen(false)}>
                <button
                  onMouseEnter={() => setDestDropdownOpen(true)}
                  onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                  className="flex items-center gap-1 hover:text-teal-400 transition-colors py-1"
                >
                  <span>Destinations</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${destDropdownOpen ? 'rotate-180 text-teal-400' : ''}`} />
                </button>

                {destDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl backdrop-blur-2xl bg-slate-950/95 border border-teal-500/30 p-3 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-white/10 mb-2">
                      <p className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">Explore by State</p>
                    </div>
                    <button
                      onClick={() => {
                        onSelectState?.('Himachal Pradesh');
                        setDestDropdownOpen(false);
                        const el = document.getElementById('destinations');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Mountain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-teal-300">Himachal Pradesh</div>
                        <div className="text-xs text-slate-400">Manali, Shimla, Spiti, Kasol, Jibhi</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectState?.('Uttarakhand');
                        setDestDropdownOpen(false);
                        const el = document.getElementById('destinations');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group mt-1"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-teal-300">Uttarakhand (Devbhoomi)</div>
                        <div className="text-xs text-slate-400">Rishikesh, Kedarnath, Auli, Nainital</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <a href="#packages" className="hover:text-teal-400 transition-colors py-1">Travel Packages</a>
              <a href="#custom-planner" className="hover:text-teal-400 transition-colors py-1">Custom Trip</a>
              <a href="#offers" className="hover:text-teal-400 transition-colors py-1 flex items-center gap-1.5">
                <span>Offers</span>
                <span className="text-[10px] bg-teal-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">15% OFF</span>
              </a>
              <a href="#fleet" className="hover:text-teal-400 transition-colors py-1">Vehicles & Cabs</a>
              <a href="#contact" className="hover:text-teal-400 transition-colors py-1">Contact</a>
            </div>

            {/* Right Action Buttons with distinct gap from nav links */}
            <div className="flex items-center gap-3 sm:gap-4 pl-4 sm:pl-6 border-l border-white/10">
              {/* Inquire Button */}
              <button
                type="button"
                onClick={() => onOpenInquire?.()}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full border border-teal-400/40 bg-teal-950/60 text-teal-300 hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 shadow-lg shadow-teal-500/10 hover:shadow-teal-400/25 transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Inquire</span>
              </button>

              {/* Book Now Button (White Pill matching reference) */}
              <button
                onClick={() => onOpenBooking?.(null)}
                className="bg-white hover:bg-slate-100 text-slate-950 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight shadow-lg shadow-white/10 hover:shadow-teal-400/20 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              >
                Book Now
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl pt-28 px-6 pb-12 flex flex-col justify-between lg:hidden animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 border-b border-white/10 pb-2">
              Menu Navigation
            </div>
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              🏔️ Destinations (Himachal & Uttarakhand)
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              🎒 Tour Packages
            </a>
            <a
              href="#custom-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              ✨ Customize Your Yatra
            </a>
            <a
              href="#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              🔥 Special Offers & Discounts
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              🚗 Mountain Fleet & Cabs
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              ⭐ Traveler Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              📞 Contact & Offices
            </a>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquire?.();
              }}
              className="w-full bg-slate-900 border border-teal-500/40 text-teal-300 hover:bg-teal-950 font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Inquire & View Contact Details</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking?.(null);
              }}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold py-3.5 rounded-2xl text-base shadow-lg shadow-teal-500/20 text-center transition"
            >
              Book Your Journey Now
            </button>
            <a
              href="tel:+917619917057"
              className="w-full bg-slate-950 border border-white/10 text-slate-300 font-semibold py-2.5 rounded-2xl text-center block text-xs"
            >
              Direct Call: +91 76199 17057
            </a>
          </div>
        </div>
      )}
    </>
  );
}
