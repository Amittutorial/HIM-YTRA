import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
import { TOUR_PACKAGES } from './data/travelData';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [inquireModalOpen, setInquireModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [activeBookingPackage, setActiveBookingPackage] = useState(null);
  const [preAppliedCoupon, setPreAppliedCoupon] = useState('');

  // Global filters
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [destTab, setDestTab] = useState('All');

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
  };

  const handleSelectDestination = (destName) => {
    setSearchTerm(destName);
  };

  const handleApplyOffer = (code) => {
    handleOpenBooking(null, code);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation */}
      <Navbar
        onOpenBooking={(pkg) => handleOpenBooking(pkg)}
        onSelectState={handleSelectState}
        onOpenInquire={() => setInquireModalOpen(true)}
        onOpenPayment={() => setPaymentModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section (framed card matching reference image) */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreClick={() => {
            const el = document.getElementById('destinations');
            el?.scrollIntoView({ behavior: 'smooth' });
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
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectState={handleSelectState}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPayment={() => setPaymentModalOpen(true)}
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
        />
      )}

      {/* Direct Contact & Inquiry Modal */}
      {inquireModalOpen && (
        <InquireModal
          onClose={() => setInquireModalOpen(false)}
        />
      )}

      {/* Instant Online UPI Payment Modal */}
      {paymentModalOpen && (
        <PaymentModal
          onClose={() => setPaymentModalOpen(false)}
        />
      )}
    </div>
  );
}
