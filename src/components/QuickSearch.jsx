import React from 'react';
import { Search, MapPin, Calendar, Users, Sparkles, Filter } from 'lucide-react';

export default function QuickSearch({ 
  selectedState, 
  setSelectedState, 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm,
  onSearchSubmit
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit?.();
    const el = document.getElementById('packages');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="quick-search" className="max-w-6xl mx-auto px-4 -mt-6 sm:-mt-8 relative z-20">
      <div className="backdrop-blur-2xl bg-slate-900/90 border border-teal-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/80">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* State / Region Selector */}
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/10 hover:border-teal-500/40 transition">
            <label className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5" /> Destination Region
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Himalayas (Himachal & Uttarakhand)</option>
              <option value="Himachal Pradesh" className="bg-slate-900 text-white">Himachal Pradesh (Manali, Shimla, Spiti)</option>
              <option value="Uttarakhand" className="bg-slate-900 text-white">Uttarakhand (Kedarnath, Rishikesh, Auli)</option>
            </select>
          </div>

          {/* Travel Theme / Style */}
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/10 hover:border-teal-500/40 transition">
            <label className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Tour Experience
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Tour Themes</option>
              <option value="Bestseller" className="bg-slate-900 text-white">Popular Bestsellers</option>
              <option value="Honeymoon" className="bg-slate-900 text-white">Romantic Honeymoon</option>
              <option value="Family" className="bg-slate-900 text-white">Family Holiday</option>
              <option value="Spiritual" className="bg-slate-900 text-white">Spiritual Pilgrimage (Devbhoomi)</option>
              <option value="Adventure" className="bg-slate-900 text-white">Adventure & High Altitude Treks</option>
              <option value="Offbeat" className="bg-slate-900 text-white">Offbeat & Quiet Valleys</option>
            </select>
          </div>

          {/* Search Keywords */}
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/10 hover:border-teal-500/40 transition">
            <label className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Search className="w-3.5 h-3.5" /> Search Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Manali, Kedarnath, Spiti, Auli..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-500 font-medium text-sm focus:outline-none"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search Packages</span>
            </button>
          </div>

        </form>

        {/* Popular Quick Filter Chips */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3 text-teal-400" /> Quick tags:
          </span>
          {['Manali & Atal Tunnel', 'Kedarnath Dham', 'Spiti 4x4', 'Auli Skiing', 'Jibhi Treehouses', 'Rishikesh Rafting', 'Nainital Lake'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchTerm(tag.split(' ')[0]);
                const el = document.getElementById('packages');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-teal-500/20 hover:text-teal-300 text-slate-300 border border-white/5 transition cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
