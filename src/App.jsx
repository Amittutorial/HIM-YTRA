import React, { useState, useEffect, useMemo } from 'react';
import { createTranslator } from './lib/translations';
import Navbar from './components/Navbar';
import Hero, { REGION_BACKGROUNDS } from './components/Hero';
import QuickSearch from './components/QuickSearch';
import TrustStats from './components/TrustStats';
import DestinationsSection from './components/DestinationsSection';
import PackagesSection from './components/PackagesSection';
import CustomTripBuilder from './components/CustomTripBuilder';
import FleetSection from './components/FleetSection';
import SeasonalDeals from './components/SeasonalDeals';
import MountainGuide from './components/MountainGuide';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import BookingModal from './components/BookingModal';
import InquireModal from './components/InquireModal';
import PaymentModal from './components/PaymentModal';
import HelpCenterModal from './components/HelpCenterModal';
import AuthModal from './components/AuthModal';
import CabRentalCalculator from './components/CabRentalCalculator';
import CharDhamSection from './components/CharDhamSection';
import RoadWeatherAlerts from './components/RoadWeatherAlerts';
import FindMyTripQuizModal from './components/FindMyTripQuizModal';
import LiveTripTrackingModal from './components/LiveTripTrackingModal';
import PackageCompareModal from './components/PackageCompareModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PackageModal from './components/PackageModal';
import { TOUR_PACKAGES, DESTINATIONS } from './data/travelData';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('himyatra-theme') || 'dark';
  });

  const [activeRegion, setActiveRegion] = useState('himachal');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [inquireModalOpen, setInquireModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [activeBookingPackage, setActiveBookingPackage] = useState(null);
  const [preAppliedCoupon, setPreAppliedCoupon] = useState('');

  // Modals & Enhanced Features State
  const [lang, setLang] = useState(() => localStorage.getItem('himyatra-lang') || 'en');
  const t = useMemo(() => createTranslator(lang), [lang]);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingTripId, setTrackingTripId] = useState('HY-TRIP-8821');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [viewingPackage, setViewingPackage] = useState(null);

  // Global filters
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [destTab, setDestTab] = useState('All');

  // Synchronize theme with html and body classes
  useEffect(() => {
    localStorage.setItem('himyatra-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [theme]);

  // Handle Deep-linking & URL Query Parameters for SEO & Social Sharing
  useEffect(() => {
    const handleUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      
      const pkgId = params.get('pkg');
      if (pkgId) {
        const match = TOUR_PACKAGES.find(p => p.id === pkgId);
        if (match) {
          setViewingPackage(match);
          document.title = `${match.title} (${match.duration}) — HimYatra Packages`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', match.desc || `Book ${match.title} with HimYatra.`);
        }
      }

      const destId = params.get('dest');
      if (destId) {
        const matchDest = DESTINATIONS.find(d => d.id === destId || d.searchKeyword?.toLowerCase() === destId.toLowerCase());
        if (matchDest) {
          handleSelectDestination(matchDest);
          document.title = `${matchDest.name} Tours & Sightseeing — HimYatra`;
          const el = document.getElementById('destinations');
          setTimeout(() => el?.scrollIntoView({ behavior: 'smooth' }), 300);
        }
      }

      const trackId = params.get('track');
      if (trackId) {
        setTrackingTripId(trackId);
        setTrackingModalOpen(true);
      }

      if (params.get('quiz') === 'true') {
        setQuizModalOpen(true);
      }

      if (params.get('compare') === 'true') {
        setCompareModalOpen(true);
      }

      const section = params.get('section');
      if (section) {
        const target = document.getElementById(section);
        if (target) {
          setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300);
        }
      }
    };

    handleUrlParams();
    window.addEventListener('popstate', handleUrlParams);
    return () => window.removeEventListener('popstate', handleUrlParams);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('himyatra-lang', next);
      return next;
    });
  };

  const handleOpenPackageDetails = (pkg) => {
    setViewingPackage(pkg);
    if (pkg) {
      const newUrl = `${window.location.pathname}?pkg=${encodeURIComponent(pkg.id)}`;
      window.history.pushState({ pkgId: pkg.id }, '', newUrl);
      document.title = `${pkg.title} (${pkg.duration}) — HimYatra Packages`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pkg.desc || `Book ${pkg.title} with HimYatra.`);
    }
  };

  const handleClosePackageDetails = () => {
    setViewingPackage(null);
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has('pkg')) {
      window.history.pushState({}, '', window.location.pathname);
      document.title = 'HimYatra — Premium Himachal & Uttarakhand Tours, Cabs & Char Dham Yatra';
    }
  };

  const handleOpenBooking = (pkg = null, coupon = '') => {
    setActiveBookingPackage(pkg || TOUR_PACKAGES[0]);
    if (coupon) setPreAppliedCoupon(coupon);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setActiveBookingPackage(null);
    setPreAppliedCoupon('');
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setDestTab(state);
    if (state === 'Himachal Pradesh') setActiveRegion('himachal');
    else if (state === 'Uttarakhand') setActiveRegion('uttarakhand');
    else if (state === 'Uttar Pradesh') setActiveRegion('ayodhya');
    else if (state === 'Kashmir') setActiveRegion('kashmir');
    else if (state === 'Ladakh') setActiveRegion('ladakh');
    else if (state === 'Rajasthan') setActiveRegion('rajasthan');
    else if (state === 'Kerala') setActiveRegion('kerala');
    else if (state === 'Goa') setActiveRegion('goa');
    else if (state === 'Sikkim') setActiveRegion('sikkim');
    else if (state === 'Meghalaya') setActiveRegion('meghalaya');
    else if (state === 'Punjab') setActiveRegion('amritsar');
  };

  const handleSelectDestination = (dest, fallbackState = null) => {
    if (typeof dest === 'object' && dest !== null) {
      const state = dest.state;
      const kw = dest.searchKeyword || (dest.name ? dest.name.split('&')[0].trim() : '');
      if (state) {
        handleSelectState(state);
      }
      setSelectedCategory('All');
      setSearchTerm(kw);
    } else {
      const destName = dest;
      setSearchTerm(destName);
      if (fallbackState) {
        handleSelectState(fallbackState);
      }
      setSelectedCategory('All');
    }
  };

  const handleApplyOffer = (code) => {
    handleOpenBooking(null, code);
  };

  const currentRegionObj = REGION_BACKGROUNDS.find((b) => b.id === activeRegion) || REGION_BACKGROUNDS[0];
  const currentGlobalBg = theme === 'light' ? currentRegionObj.light : currentRegionObj.dark;

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative ${
      theme === 'light'
        ? 'text-slate-900 light'
        : 'text-slate-100 dark'
    }`}>
      {/* Global Dynamic Mountain Wallpaper synced with Featured Region & Dark/Light Mode */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          key={`${activeRegion}-${theme}`}
          className={`absolute inset-0 bg-cover ${currentRegionObj.bgPosition || 'bg-center'} bg-fixed transition-all duration-1000 ease-in-out transform scale-105 animate-in fade-in`}
          style={{ backgroundImage: `url(${currentGlobalBg})` }}
        />
        {/* Subtle Atmospheric Overlay: dark mountain night in dark mode, luminous alpine daylight in light mode */}
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            theme === 'light'
              ? 'bg-gradient-to-b from-white/60 via-slate-50/70 to-slate-100/80'
              : 'bg-gradient-to-b from-[#070b14]/82 via-[#070b14]/75 to-[#070b14]/90'
          }`}
        />
      </div>

      {/* Navigation */}
      <Navbar
        onOpenBooking={(pkg) => handleOpenBooking(pkg)}
        onSelectState={handleSelectState}
        onOpenInquire={() => setInquireModalOpen(true)}
        onOpenPayment={() => setPaymentModalOpen(true)}
        onOpenHelpCenter={() => setHelpCenterOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenTripQuiz={() => setQuizModalOpen(true)}
        onOpenLiveTracking={() => setTrackingModalOpen(true)}
        onOpenCompare={() => setCompareModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section (framed card with matching region background) */}
        <Hero
          lang={lang}
          t={t}
          onOpenBooking={() => handleOpenBooking()}
          onExploreClick={() => {
            const el = document.getElementById('destinations');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickSearch={(query, state) => {
            if (state) handleSelectState(state);
            setSelectedCategory('All');
            setSearchTerm(query);
            const el = document.getElementById('packages');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          theme={theme}
          activeRegion={activeRegion}
          onSelectRegion={(reg) => {
            setActiveRegion(reg);
            setSelectedCategory('All');
            setSearchTerm('');
            if (reg === 'himachal' || reg === 'spiti') {
              setSelectedState('Himachal Pradesh');
              setDestTab('Himachal Pradesh');
            } else if (reg === 'uttarakhand' || reg === 'rishikesh') {
              setSelectedState('Uttarakhand');
              setDestTab('Uttarakhand');
            } else if (reg === 'ayodhya' || reg === 'varanasi') {
              setSelectedState('Uttar Pradesh');
              setDestTab('Uttar Pradesh');
            } else if (reg === 'kashmir') {
              setSelectedState('Kashmir');
              setDestTab('Kashmir');
            } else if (reg === 'ladakh') {
              setSelectedState('Ladakh');
              setDestTab('Ladakh');
            } else if (reg === 'rajasthan') {
              setSelectedState('Rajasthan');
              setDestTab('Rajasthan');
            } else if (reg === 'kerala') {
              setSelectedState('Kerala');
              setDestTab('Kerala');
            } else if (reg === 'goa') {
              setSelectedState('Goa');
              setDestTab('Goa');
            } else if (reg === 'sikkim') {
              setSelectedState('Sikkim');
              setDestTab('Sikkim');
            } else if (reg === 'meghalaya') {
              setSelectedState('Meghalaya');
              setDestTab('Meghalaya');
            } else if (reg === 'amritsar') {
              setSelectedState('Punjab');
              setDestTab('Punjab');
            }
          }}
        />

        {/* Quick Search & Filter Bar */}
        <QuickSearch
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchSubmit={() => {}}
          lang={lang}
          t={t}
        />

        {/* Why Choose HimYatra & Trust Credibility */}
        <TrustStats lang={lang} t={t} />

        {/* Destinations: Himachal, Uttarakhand, Ayodhya & More */}
        <DestinationsSection
          activeTab={destTab}
          setActiveTab={(tab) => {
            setDestTab(tab);
            setSelectedState(tab);
            setSelectedCategory('All');
            if (tab === 'Himachal Pradesh') setActiveRegion('himachal');
            else if (tab === 'Uttarakhand') setActiveRegion('uttarakhand');
            else if (tab === 'Uttar Pradesh') setActiveRegion('ayodhya');
            else if (tab === 'Kashmir') setActiveRegion('kashmir');
            else if (tab === 'Ladakh') setActiveRegion('ladakh');
            else if (tab === 'Rajasthan') setActiveRegion('rajasthan');
            else if (tab === 'Kerala') setActiveRegion('kerala');
            else if (tab === 'Goa') setActiveRegion('goa');
            else if (tab === 'Sikkim') setActiveRegion('sikkim');
            else if (tab === 'Meghalaya') setActiveRegion('meghalaya');
            else if (tab === 'Punjab') setActiveRegion('amritsar');
          }}
          onSelectDestination={handleSelectDestination}
          onOpenBooking={(dest) => {
            // Find a matching package for this destination or default
            const match = (dest?.targetPackageId && TOUR_PACKAGES.find(p => p.id === dest.targetPackageId))
              || TOUR_PACKAGES.find(p => p.state === dest?.state)
              || TOUR_PACKAGES[0];
            handleOpenBooking(match);
          }}
        />

        {/* Handpicked Tour Packages */}
        <PackagesSection
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenBooking={(pkg) => handleOpenBooking(pkg)}
          onViewPackage={handleOpenPackageDetails}
          lang={lang}
          t={t}
        />

        {/* Sacred Char Dham Yatra & Devbhoomi Circuits */}
        <CharDhamSection
          onOpenBooking={(circuit) => {
            const match = TOUR_PACKAGES.find(p => p.id === 'pkg-chardham-complete') || TOUR_PACKAGES[0];
            handleOpenBooking(match);
          }}
        />

        {/* Fixed Route Cab Rental Calculator & Pahadi Drivers */}
        <CabRentalCalculator
          onOpenBooking={() => handleOpenBooking(null)}
        />

        {/* Interactive Custom Trip Wizard */}
        <CustomTripBuilder
          onOpenBookingWithCustom={(plan) => handleOpenBooking(null)}
          onOpenHelpCenter={() => setHelpCenterOpen(true)}
        />

        {/* Safe Mountain Fleet & Drivers */}
        <FleetSection
          onOpenBooking={(veh) => handleOpenBooking(null)}
        />

        {/* Live Mountain Road & Weather Status Updates */}
        <RoadWeatherAlerts lang={lang} t={t} />

        {/* Seasonal Offers & Promo Codes */}
        <SeasonalDeals
          onApplyOffer={handleApplyOffer}
        />

        {/* Interactive Month-by-Month Weather & Road Guide */}
        <MountainGuide />

        {/* Real Traveler Reviews */}
        <ReviewsSection lang={lang} t={t} />

        {/* FAQs */}
        <FAQSection lang={lang} t={t} />

        {/* Contact & Mountain Offices */}
        <ContactSection onOpenHelpCenter={() => setHelpCenterOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onSelectState={handleSelectState}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPayment={() => setPaymentModalOpen(true)}
        onOpenHelpCenter={() => setHelpCenterOpen(true)}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar
        theme={theme}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Booking Checkout Modal */}
      {bookingModalOpen && (
        <BookingModal
          initialPackage={activeBookingPackage}
          preAppliedCode={preAppliedCoupon}
          onClose={handleCloseBooking}
          onOpenHelpCenter={() => setHelpCenterOpen(true)}
        />
      )}

      {/* Direct Contact & Inquiry Modal */}
      {inquireModalOpen && (
        <InquireModal
          onClose={() => setInquireModalOpen(false)}
          onOpenHelpCenter={() => setHelpCenterOpen(true)}
        />
      )}

      {/* Instant Online UPI Payment Modal */}
      {paymentModalOpen && (
        <PaymentModal
          onClose={() => setPaymentModalOpen(false)}
          onOpenHelpCenter={() => setHelpCenterOpen(true)}
        />
      )}

      {/* 24/7 Mountain Help Center */}
      {helpCenterOpen && (
        <HelpCenterModal
          onClose={() => setHelpCenterOpen(false)}
          theme={theme}
        />
      )}

      {/* Customer Travel Portal & OTP Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onOpenBooking={(pkg) => handleOpenBooking(pkg)}
        onOpenPayment={() => setPaymentModalOpen(true)}
      />

      {/* Package Itinerary & Full Details Modal (with Shareable URL ?pkg=...) */}
      {viewingPackage && (
        <PackageModal
          pkg={viewingPackage}
          onClose={handleClosePackageDetails}
          onBookNow={(pkg) => {
            handleClosePackageDetails();
            handleOpenBooking(pkg);
          }}
          lang={lang}
          t={t}
        />
      )}

      {/* 5-Question Personalized Himalayan Trip Quiz Modal */}
      {quizModalOpen && (
        <FindMyTripQuizModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
          onSelectPackage={(pkg) => {
            setQuizModalOpen(false);
            handleOpenPackageDetails(pkg);
          }}
          lang={lang}
          t={t}
        />
      )}

      {/* Live Driver & Route Trip Tracking Modal (?track=...) */}
      {trackingModalOpen && (
        <LiveTripTrackingModal
          isOpen={trackingModalOpen}
          onClose={() => setTrackingModalOpen(false)}
          tripId={trackingTripId}
          lang={lang}
          t={t}
        />
      )}

      {/* Side-by-Side Package Comparison Modal (up to 3 packages) */}
      {compareModalOpen && (
        <PackageCompareModal
          isOpen={compareModalOpen}
          onClose={() => setCompareModalOpen(false)}
          onBookPackage={(pkg) => {
            setCompareModalOpen(false);
            handleOpenBooking(pkg);
          }}
          lang={lang}
          t={t}
        />
      )}

      {/* Floating 24/7 WhatsApp Quick Desk with active package context */}
      <FloatingWhatsApp activePackage={viewingPackage || activeBookingPackage} />
    </div>
  );
}
