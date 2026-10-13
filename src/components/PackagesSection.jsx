import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../data/travelData';
import { Star, Clock, MapPin, Car, Hotel, Utensils, Check, ArrowRight, Sparkles, Filter, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import PackageModal from './PackageModal';

export default function PackagesSection({ 
  selectedState, 
  setSelectedState, 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm,
  onOpenBooking 
}) {
  const [selectedPackageForModal, setSelectedPackageForModal] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'All', label: 'All Packages' },
    { id: 'Bestseller', label: '🔥 Bestsellers' },
    { id: 'Honeymoon', label: '❤️ Honeymoon' },
    { id: 'Family', label: '👨‍👩‍👧 Family' },
    { id: 'Spiritual', label: '🕉️ Sacred Devbhoomi' },
    { id: 'Adventure', label: '🧗 Adventure & Snow' },
    { id: 'Offbeat', label: '🌲 Offbeat Serenity' }
  ];

  // Filtering
  let filtered = TOUR_PACKAGES.filter((pkg) => {
    // State match
    if (selectedState !== 'All' && pkg.state !== selectedState) {
      return false;
    }
    // Category match
    if (selectedCategory !== 'All' && pkg.category !== selectedCategory) {
      return false;
    }
    // Search match
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchTitle = pkg.title.toLowerCase().includes(q);
      const matchRoute = pkg.route.toLowerCase().includes(q);
      const matchState = pkg.state.toLowerCase().includes(q);
      if (!matchTitle && !matchRoute && !matchState) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="packages" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Himalayan Tours</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Handcrafted Tour Packages for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">
            Every Indian Traveler
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          All packages include dedicated private mountain cab, verified valley-view hotels, daily breakfast & dinner, and 24x7 local Pahadi assistance.
        </p>
      </div>

      {/* Filter and Category Pills Controls */}
      <div className="space-y-4 mb-10">
        {/* Category horizontal scrolling bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar: State switch, Active filters, and Sort selector */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-teal-400" /> Filter Region:
            </span>
            {['All', 'Himachal Pradesh', 'Uttarakhand'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                  selectedState === st
                    ? 'bg-white/15 text-white border border-teal-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {st === 'All' ? 'Both States' : st}
              </button>
            ))}

            {(selectedCategory !== 'All' || selectedState !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedState('All');
                  setSearchTerm('');
                }}
                className="text-teal-400 hover:underline ml-2 font-bold cursor-pointer"
              >
                Reset Filters ✕
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-white font-medium px-3 py-1.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Count indicator */}
      <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-white">{filtered.length}</strong> holiday packages</span>
        <span className="hidden sm:inline">⚡ Instant confirmation & 20% advance token reservation</span>
      </div>

      {/* Packages Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-white/10 space-y-4">
          <p className="text-slate-300 text-lg">No tour packages match your current search criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedState('All');
              setSearchTerm('');
            }}
            className="px-6 py-2.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-sm"
          >
            Show All Tour Packages
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((pkg) => {
            const savings = pkg.originalPrice - pkg.discountedPrice;
            return (
              <div
                key={pkg.id}
                className="group rounded-3xl overflow-hidden bg-slate-900/80 border border-white/10 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 flex flex-col justify-between"
              >
                {/* Image and Badges */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Ribbon Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-400 text-slate-950 shadow-lg">
                      {pkg.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-200">
                      {pkg.state}
                    </span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-slate-950/85 border border-white/15 text-teal-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </div>

                  {/* Rating on Image */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md bg-slate-950/70 border border-white/10 text-xs text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{pkg.rating} ({pkg.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white font-['Outfit'] leading-snug group-hover:text-teal-300 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Route line */}
                    <div className="flex items-start gap-1.5 text-xs text-slate-300 mt-2 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{pkg.route}</span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Car className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{pkg.transport.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Hotel className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{pkg.hotelStay.split(' ')[0]} Valley Stays</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Utensils className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">Breakfast & Dinner</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">Pahadi Driver Safety</span>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400 line-through">
                            ₹{pkg.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            Save ₹{savings.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-2xl font-black text-white font-['Outfit']">
                          ₹{pkg.discountedPrice.toLocaleString('en-IN')}
                          <span className="text-[11px] text-slate-400 font-normal"> / person</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-teal-300 font-semibold block">GST & Taxes Incl.</span>
                        <span className="text-[10px] text-slate-400">Book with 20% advance</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedPackageForModal(pkg)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-white/10 transition text-center cursor-pointer"
                      >
                        Itinerary & Details
                      </button>

                      <button
                        onClick={() => onOpenBooking(pkg)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs shadow-md shadow-teal-500/20 transition text-center cursor-pointer"
                      >
                        Reserve Now
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Package Details Modal */}
      {selectedPackageForModal && (
        <PackageModal
          pkg={selectedPackageForModal}
          onClose={() => setSelectedPackageForModal(null)}
          onBookNow={(pkg) => {
            setSelectedPackageForModal(null);
            onOpenBooking(pkg);
          }}
        />
      )}
    </section>
  );
}
