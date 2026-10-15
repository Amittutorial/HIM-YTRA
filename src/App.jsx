import React, { useState, useEffect } from 'react';
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
import { TOUR_PACKAGES } from './data/travelData';

export default function App() {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
  };

  const handleSelectDestination = (destName) => {
    setSearchTerm(destName);
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
          className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out transform scale-105 animate-in fade-in"
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
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section (framed card with matching region background) */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreClick={() => {
            const el = document.getElementById('destinations');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          theme={theme}
          activeRegion={activeRegion}
          onSelectRegion={(reg) => {
            setActiveRegion(reg);
            if (reg === 'himachal') {
              setSelectedState('Himachal Pradesh');
              setDestTab('Himachal Pradesh');
            } else if (reg === 'uttarakhand') {
              setSelectedState('Uttarakhand');
              setDestTab('Uttarakhand');
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
        />

        {/* Why Choose HimYatra & Trust Credibility */}
        <TrustStats />

        {/* Destinations: Himachal Pradesh & Uttarakhand */}
        <DestinationsSection
          activeTab={destTab}
          setActiveTab={(tab) => {
            setDestTab(tab);
            setSelectedState(tab);
            if (tab === 'Himachal Pradesh') setActiveRegion('himachal');
            else if (tab === 'Uttarakhand') setActiveRegion('uttarakhand');
          }}
          onSelectDestination={handleSelectDestination}
          onOpenBooking={(dest) => {
            // Find a matching package for this destination or default
            const match = TOUR_PACKAGES.find(p => p.state === dest.state) || TOUR_PACKAGES[0];
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

        {/* Seasonal Offers & Promo Codes */}
        <SeasonalDeals
          onApplyOffer={handleApplyOffer}
        />

        {/* Interactive Month-by-Month Weather & Road Guide */}
        <MountainGuide />

        {/* Real Traveler Reviews */}
        <ReviewsSection />

        {/* FAQs */}
        <FAQSection />

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
        onOpenBooking={() => handleOpenBooking()}
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
        />
      )}
    </div>
  );
}
