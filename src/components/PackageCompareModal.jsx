import React, { useState } from 'react';
import { X, Check, Minus, Sparkles, MessageSquare, ArrowRight, Plus } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';

export default function PackageCompareModal({ isOpen, onClose, onBookPackage, initialSelectedIds = [], lang = 'en', t = (k) => k }) {
  const [selectedIds, setSelectedIds] = useState(() => {
    if (initialSelectedIds && initialSelectedIds.length > 0) return initialSelectedIds.slice(0, 3);
    return ['pkg-himachal-magic', 'pkg-chardham-complete', 'pkg-spiti-circuit'];
  });

  if (!isOpen) return null;

  const selectedPackages = selectedIds.map(id => TOUR_PACKAGES.find(p => p.id === id)).filter(Boolean);

  const handleAddPackage = (id) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemovePackage = (id) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-4 text-white space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <span className="text-[11px] font-bold uppercase text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Side-by-Side Package Comparison
          </span>
          <h3 className="text-xl sm:text-3xl font-black font-['Outfit'] mt-1">
            {lang === 'hi' ? '3 हिमालय टूर की तुलना करें' : 'Compare Up to 3 Himalayan Tours'}
          </h3>
          <p className="text-xs text-slate-400">
            Compare prices, inclusions, altitude, hotel categories, and vehicles to find your best trip.
          </p>
        </div>

        {/* Package Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Change Packages:</span>
          {TOUR_PACKAGES.slice(0, 8).map(p => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  if (isSelected) handleRemovePackage(p.id);
                  else handleAddPackage(p.id);
                }}
                className={`px-3 py-1 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-400 text-slate-950'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-white/10'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                <span>{p.title.split('(')[0].trim().slice(0, 20)}...</span>
              </button>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-slate-400 font-semibold w-40">{lang === 'hi' ? 'विशेषताएं' : 'Features'}</th>
                {selectedPackages.map(pkg => (
                  <th key={pkg.id} className="p-3 min-w-[200px]">
                    <div className="h-28 rounded-xl overflow-hidden relative mb-2">
                      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] font-bold bg-teal-500 text-slate-950 px-2 py-0.5 rounded-full">
                        {pkg.state}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-white line-clamp-1">{pkg.title}</div>
                    <div className="text-[10px] text-teal-300 font-semibold">{pkg.badge}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'शुरुआती कीमत' : 'Starting Price'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 font-black text-lg text-white font-['Outfit']">
                    ₹{pkg.price.toLocaleString('en-IN')}
                    <span className="text-[10px] text-slate-400 font-normal"> / person</span>
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-950/40">
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'यात्रा अवधि' : 'Trip Duration'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 text-white font-semibold">
                    ⏱️ {pkg.duration}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'रूट' : 'Route Covered'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 text-slate-300 leading-relaxed">
                    {pkg.route}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-950/40">
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'वाहन' : 'Vehicle Transport'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 text-teal-300 font-medium">
                    🚗 {pkg.transport}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'होटल श्रेणी' : 'Hotel Category'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 text-slate-300">
                    🏨 {pkg.hotelStay}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-950/40">
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'भोजन योजना' : 'Meals Plan'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 text-slate-300">
                    🍳 {pkg.meals}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'यात्रा शैली' : 'Travel Style / Best For'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 text-slate-300">
                    {pkg.category} • {pkg.idealFor || 'Families & Couples'}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-950/40">
                <td className="p-3 text-slate-400 font-semibold">{lang === 'hi' ? 'कार्रवाई' : 'Actions'}</td>
                {selectedPackages.map(pkg => (
                  <td key={pkg.id} className="p-3 space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onBookPackage(pkg);
                      }}
                      className="w-full py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition cursor-pointer"
                    >
                      {lang === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                    </button>
                    <a
                      href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I am comparing "${pkg.title}" (₹${pkg.price}). Please share full details.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
