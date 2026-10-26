import React, { useState, useEffect } from 'react';
import { Mountain, Phone, Menu, X, Compass, MapPin, ChevronDown, Sparkles, HelpCircle, Sun, Moon, User } from 'lucide-react';
import { getCurrentUser } from '../lib/supabaseClient';

export default function Navbar({ 
  onOpenBooking, 
  onSelectState, 
  onOpenInquire, 
  onOpenPayment, 
  onOpenHelpCenter, 
  onOpenAuth, 
  onOpenTripQuiz, 
  onOpenLiveTracking, 
  onOpenCompare, 
  theme = 'dark', 
  onToggleTheme, 
  lang = 'en', 
  onToggleLang 
}) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);

  useEffect(() => {
    const handleAuth = (e) => setCurrentUser(e.detail);
    window.addEventListener('himyatra-auth-changed', handleAuth);
    return () => window.removeEventListener('himyatra-auth-changed', handleAuth);
  }, []);

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

  // Keyboard navigation: Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDestDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLight = theme === 'light';

  return (
    <>
      {/* Top Banner Notice */}
      <div className={`text-xs py-2 px-4 text-center border-b font-medium hidden sm:flex items-center justify-center gap-2.5 transition-colors duration-300 ${
        isLight
          ? 'bg-gradient-to-r from-teal-50 via-sky-50 to-emerald-50 border-teal-200/80 text-teal-900'
          : 'bg-gradient-to-r from-teal-900/80 via-slate-900 to-emerald-950/80 border-teal-500/20 text-teal-200/90'
      }`}>
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] ${
          isLight
            ? 'bg-teal-100 text-teal-800 border-teal-300'
            : 'bg-teal-500/20 text-teal-300 border-teal-400/30'
        }`}>
          <Sparkles className="w-3 h-3 text-teal-500" /> Season Special
        </span>
        <span>Summer & Snowfall 2026 Bookings Open | Flat 15% Off: <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white font-semibold'}>HIMPEAKS15</strong></span>
        <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>|</span>
        <button
          type="button"
          onClick={() => onOpenTripQuiz?.()}
          className="font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
        >
          <span>✨ Find My Trip Quiz</span>
        </button>
        <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>|</span>
        <button
          type="button"
          onClick={() => onOpenLiveTracking?.()}
          className="font-bold text-teal-300 hover:text-teal-200 transition flex items-center gap-1 cursor-pointer"
        >
          <span>📍 Live Tracking</span>
        </button>
        <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>|</span>
        <a href="tel:+917619917057" className={`transition flex items-center gap-1 ${isLight ? 'text-slate-700 hover:text-teal-700' : 'text-slate-300 hover:text-white'}`}>
          <Phone className="w-3 h-3" /> +91 76199 17057
        </a>
        <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>|</span>
        <button
          type="button"
          onClick={() => onOpenAuth?.()}
          className={`font-bold transition flex items-center gap-1.5 cursor-pointer px-3 py-0.5 rounded-full border ${
            currentUser
              ? isLight
                ? 'bg-teal-100 text-teal-900 border-teal-400 font-extrabold'
                : 'bg-teal-500/20 text-teal-300 border-teal-400/40 font-extrabold'
              : isLight
                ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          <User className="w-3 h-3 text-teal-500" />
          <span>{currentUser ? `@${currentUser.username} (${currentUser.total_bookings || 0} Bookings)` : 'Customer Login / My Trips'}</span>
        </button>
      </div>

      {/* Floating Pill Navigation Bar (matching reference style) */}
      <header className={`fixed z-50 transition-all duration-300 w-full left-0 ${
        isScrolled ? 'top-3 px-4 sm:px-8' : 'top-5 sm:top-10 px-4 sm:px-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <nav className={`backdrop-blur-2xl rounded-full px-4 sm:px-7 py-3 flex items-center justify-between shadow-2xl transition-all duration-300 ${
            isLight
              ? 'bg-white/85 border border-slate-200/90 shadow-slate-300/40 text-slate-800 hover:border-teal-400/50'
              : 'bg-slate-950/75 border border-white/15 shadow-black/60 text-slate-100 hover:border-teal-500/30'
          }`}>
            {/* Logo with Mountain Photo */}
            <a href="#" className="flex items-center gap-2.5 group shrink-0 mr-2 sm:mr-4 xl:mr-6">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full overflow-hidden border-2 border-teal-400/70 shadow-lg shadow-teal-500/25 group-hover:scale-105 group-hover:border-teal-300 transition shrink-0 bg-slate-900 relative">
                <img
                  src="/mountain-logo.jpg"
                  alt="HimYatra Mountains"
                  className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=256&h=256&q=85';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg sm:text-xl xl:text-2xl font-black tracking-tight font-['Outfit'] flex items-center gap-1 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Him<span className="text-teal-500">Yatra</span>
                </span>
                <span className={`text-[9px] sm:text-[10px] -mt-1 tracking-widest uppercase font-semibold ${
                  isLight ? 'text-teal-700' : 'text-teal-300/80'
                }`}>Himalayan Journeys</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className={`hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-4.5 text-xs xl:text-sm font-semibold transition-colors ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}>
              <a href="#about" className={`hidden xl:inline-block transition-colors py-1 ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}>About</a>

              {/* Destinations Dropdown */}
              <div className="relative" onMouseLeave={() => setDestDropdownOpen(false)}>
                <button
                  onMouseEnter={() => setDestDropdownOpen(true)}
                  onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                  className={`flex items-center gap-1 transition-colors py-1 cursor-pointer ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}
                >
                  <span>Destinations</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${destDropdownOpen ? 'rotate-180 text-teal-400' : ''}`} />
                </button>

                {destDropdownOpen && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl backdrop-blur-2xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 border ${
                    isLight ? 'bg-white/95 border-slate-200 shadow-slate-300/60 text-slate-800' : 'bg-slate-950/95 border-teal-500/30 shadow-black/80 text-white'
                  }`}>
                    <div className="p-2 border-b border-white/10 mb-2">
                      <p className="text-[11px] font-semibold text-teal-500 uppercase tracking-wider">Explore by State</p>
                    </div>
                    <button
                      onClick={() => {
                        onSelectState?.('Himachal Pradesh');
                        setDestDropdownOpen(false);
                        const el = document.getElementById('destinations');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-500 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Mountain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isLight ? 'text-slate-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-300'}`}>Himachal Pradesh</div>
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
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group mt-1 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-500 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isLight ? 'text-slate-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-300'}`}>Uttarakhand (Devbhoomi)</div>
                        <div className="text-xs text-slate-400">Rishikesh, Kedarnath, Auli, Nainital</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectState?.('Uttar Pradesh');
                        setDestDropdownOpen(false);
                        const el = document.getElementById('destinations');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group mt-1 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-500 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isLight ? 'text-slate-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-300'}`}>Ayodhya & Kashi (UP)</div>
                        <div className="text-xs text-slate-400">Ram Mandir, Saryu Aarti, Varanasi</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onSelectState?.('Kashmir');
                        setDestDropdownOpen(false);
                        const el = document.getElementById('destinations');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group mt-1 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-500 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Mountain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isLight ? 'text-slate-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-300'}`}>Kashmir (Paradise)</div>
                        <div className="text-xs text-slate-400">Srinagar, Gulmarg, Dal Lake, Pahalgam</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectState?.('Rajasthan');
                        setDestDropdownOpen(false);
                        const el = document.getElementById('destinations');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 border border-transparent transition flex items-start gap-3 group mt-1 cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-500 group-hover:bg-teal-500 group-hover:text-slate-950 transition">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isLight ? 'text-slate-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-300'}`}>Rajasthan (Royal Forts)</div>
                        <div className="text-xs text-slate-400">Jaipur, Amber Fort, Udaipur Lakes</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <a href="#packages" className={`transition-colors py-1 ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}>Packages</a>
              <a href="#chardham" className={`transition-colors py-1 font-bold ${isLight ? 'text-amber-700 hover:text-amber-800' : 'text-amber-300 hover:text-amber-200'}`}>Char Dham</a>
              <a href="#cabs" className={`transition-colors py-1 ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}>Cabs & Fares</a>
              <a href="#weather-alerts" className={`hidden 2xl:inline-block transition-colors py-1 ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}>Road Status</a>
              <a href="#custom-planner" className={`transition-colors py-1 ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}>Custom Trip</a>
              <button
                type="button"
                onClick={() => onOpenCompare?.()}
                className={`transition-colors py-1 text-teal-300 font-semibold cursor-pointer hidden xl:inline-block hover:text-white`}
              >
                Compare (3)
              </button>
              <a href="#contact" className={`transition-colors py-1 ${isLight ? 'hover:text-teal-700' : 'hover:text-teal-400'}`}>Contact</a>
            </div>

            {/* Right Action Buttons with distinct gap from nav links */}
            <div className={`flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-4 border-l shrink-0 ${isLight ? 'border-slate-300' : 'border-white/10'}`}>
              {/* Hindi / English Language Toggle */}
              <button
                type="button"
                onClick={onToggleLang}
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  isLight
                    ? 'bg-teal-50 border-teal-300 text-teal-900 hover:bg-teal-100 shadow-sm'
                    : 'bg-teal-950/80 border-teal-500/40 text-teal-300 hover:bg-teal-900/80 shadow-md'
                }`}
                title="Change Language (English / हिंदी)"
              >
                <span>{lang === 'hi' ? 'EN' : 'हिंदी'}</span>
              </button>

              {/* Dark / Light Mode Toggle Button */}
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 group ${
                  isLight
                    ? 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100 shadow-sm'
                    : 'bg-slate-900 border-white/20 text-sky-300 hover:bg-slate-800 hover:border-sky-400/40'
                }`}
                title={isLight ? 'Switch to Dark Mode (Mountain Night)' : 'Switch to Light Mode (Mountain Daylight)'}
                aria-label="Toggle theme"
              >
                {isLight ? (
                  <Sun className="w-4 h-4 text-amber-500 fill-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-300 fill-sky-400/30 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Inquire Button */}
              <button
                type="button"
                onClick={() => onOpenInquire?.()}
                className={`hidden xl:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer shrink-0 ${
                  isLight
                    ? 'border-teal-500/50 bg-teal-50 text-teal-800 hover:bg-teal-600 hover:text-white hover:border-teal-600 shadow-sm'
                    : 'border-teal-400/40 bg-teal-950/60 text-teal-300 hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 shadow-lg shadow-teal-500/10 hover:shadow-teal-400/25'
                }`}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Inquire</span>
              </button>

              {/* Customer Account / Sign In Pill (Hidden on mobile < sm; mobile users use sticky bottom bar & drawer) */}
              <button
                type="button"
                onClick={() => onOpenAuth?.()}
                className={`hidden sm:inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition-all duration-200 cursor-pointer shrink-0 ${
                  currentUser
                    ? isLight
                      ? 'border-teal-500 bg-teal-50 text-teal-900 hover:bg-teal-100 shadow-sm'
                      : 'border-teal-400/50 bg-teal-950/80 text-teal-200 hover:bg-teal-900/90 shadow-md shadow-teal-500/20'
                    : isLight
                      ? 'border-slate-300 bg-white text-slate-700 hover:text-teal-700 hover:border-teal-400 shadow-sm'
                      : 'border-white/15 bg-white/5 text-slate-200 hover:text-white hover:border-white/30'
                }`}
                title={currentUser ? `Logged in as @${currentUser.username} (${currentUser.total_bookings || 0} Bookings)` : 'Customer Login / My Trips'}
              >
                {currentUser ? (
                  <>
                    <span className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-teal-400 text-slate-950 text-[9px] sm:text-[10px] font-black flex items-center justify-center shrink-0">
                      {currentUser.username.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="max-w-[60px] sm:max-w-[100px] truncate">@{currentUser.username}</span>
                    <span className="text-[9px] sm:text-[10px] bg-teal-500/20 text-teal-300 border border-teal-400/30 px-1.5 py-0.2 rounded-full font-black">
                      {currentUser.total_bookings || 0}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Login</span>
                  </>
                )}
              </button>

              {/* Book Now Button (Shown on tablets, laptops and desktops; mobile uses sticky bottom bar) */}
              <button
                onClick={() => onOpenBooking?.(null)}
                className={`hidden sm:inline-flex whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight shrink-0 shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer ${
                  isLight
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                    : 'bg-white hover:bg-slate-100 text-slate-950 shadow-white/10 hover:shadow-teal-400/20'
                }`}
              >
                Book Now
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition shrink-0 ${
                  isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
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
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl pt-28 px-6 pb-12 flex flex-col justify-between lg:hidden animate-in fade-in duration-200 overflow-y-auto">
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
              🏷️ Seasonal Deals & Offers
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTripQuiz?.();
              }}
              className="w-full text-left text-lg font-bold text-amber-300 hover:text-amber-200 py-2 border-b border-white/5 flex items-center gap-2 cursor-pointer"
            >
              <span>✨ Find My Trip Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLiveTracking?.();
              }}
              className="w-full text-left text-lg font-bold text-teal-300 hover:text-teal-200 py-2 border-b border-white/5 flex items-center gap-2 cursor-pointer"
            >
              <span>📍 Live Trip Tracking</span>
            </button>
            <a
              href="#chardham"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-bold text-amber-400 hover:text-amber-300 py-2 border-b border-white/5"
            >
              🕉️ Char Dham Yatra 2026
            </a>
            <a
              href="#cabs"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              🚗 Cab Rentals & Fixed Fares
            </a>
            <a
              href="#weather-alerts"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-white hover:text-teal-400 py-2 border-b border-white/5"
            >
              🌦️ Road & Weather Updates
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompare?.();
              }}
              className="w-full text-left text-lg font-semibold text-teal-300 hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              ⚖️ Compare 3 Packages
            </button>
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
            {/* Customer Account in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/40 text-teal-300 font-bold text-sm flex items-center justify-center gap-2.5 transition shadow-lg shadow-teal-500/10"
            >
              <User className="w-4 h-4 text-teal-400" />
              <span>
                {currentUser ? `Account: @${currentUser.username} (${currentUser.total_bookings || 0} Bookings)` : 'Customer Login / My Trips'}
              </span>
            </button>

            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={() => onToggleTheme?.()}
              className={`w-full py-3 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 border transition-all cursor-pointer ${
                isLight
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm'
                  : 'bg-slate-900 border-white/10 text-amber-300 hover:bg-slate-800'
              }`}
            >
              {isLight ? (
                <>
                  <Moon className="w-4 h-4 text-sky-600 fill-sky-600/30" />
                  <span>Switch to Dark Mode (Himalayan Night)</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Switch to Light Mode (Mountain Daylight)</span>
                </>
              )}
            </button>
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpCenter?.();
              }}
              className="w-full bg-sky-900/40 border border-sky-500/40 text-sky-300 hover:bg-sky-900/60 font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help Center & FAQs</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
