import React, { useState } from 'react';
import { X, Navigation, Phone, ShieldCheck, Share2, Car, CheckCircle2, Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';

export default function LiveTripTrackingModal({ isOpen, onClose, tripId = 'HY-TRIP-8821' }) {
  const [copied, setCopied] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(tripId || 'HY-TRIP-8821');
  const [searchInput, setSearchInput] = useState('');

  if (!isOpen) return null;

  const tripData = {
    tripId: currentTripId,
    travelerName: 'Suresh Menon & Family (4 Guests)',
    packageTitle: 'Manali, Solang Valley & Atal Tunnel Special',
    vehicleName: 'Toyota Innova Crysta (White SUV)',
    vehicleNumber: 'HP 01 AT 4921',
    driverName: 'Rajesh Thakur (Pahadi Mountain Lead)',
    driverPhone: '+91 76199 17057',
    driverExperience: '12+ Years Hill Driving',
    driverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    currentLocation: 'Mandi to Kullu Highway (Near Pandoh Dam)',
    status: 'En Route on Schedule',
    destination: 'Solang Valley Heights Hotel, Manali',
    expectedArrival: 'Today, 5:30 PM IST',
    todayPlan: 'Scenic drive along Beas River, stop at Pandoh Dam view point & evening check-in with welcome warm kahwa tea.',
    timeline: [
      { time: '06:00 AM', stop: 'Pickup at Delhi IGI Airport Terminal 3', status: 'completed' },
      { time: '10:45 AM', stop: 'Breakfast at Haveli Murthal / Karnal', status: 'completed' },
      { time: '02:15 PM', stop: 'Crossing Pandoh Dam & Beas River Valley', status: 'current' },
      { time: '04:15 PM', stop: 'Kullu Shawl Weaving Center', status: 'upcoming' },
      { time: '05:30 PM', stop: 'Arrival & Check-in at Manali Hotel', status: 'upcoming' }
    ]
  };

  const handleCopyLink = () => {
    const shareableUrl = `${window.location.origin}/?track=${encodeURIComponent(currentTripId)}`;
    navigator.clipboard?.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSearchTrip = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentTripId(searchInput.trim().toUpperCase());
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-4 text-white space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase text-teal-400 bg-teal-500/10 px-3 py-0.5 rounded-full border border-teal-500/20 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Himalayan Trip Tracking</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] mt-1">
              Trip #{currentTripId}
            </h3>
            <p className="text-xs text-slate-400">{tripData.packageTitle}</p>
          </div>

          <button
            onClick={handleCopyLink}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? '✓ Link Copied!' : 'Share Live Tracking Link'}</span>
          </button>
        </div>

        {/* Lookup another Trip ID */}
        <form onSubmit={handleSearchTrip} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Trip ID (e.g. HY-TRIP-8821, HY-78210)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer border border-white/10"
          >
            Lookup
          </button>
        </form>

        {/* Driver & Vehicle Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-3 flex sm:flex-col items-center gap-3">
            <img
              src={tripData.driverImage}
              alt={tripData.driverName}
              className="w-16 h-16 rounded-full object-cover border-2 border-teal-400"
            />
            <div className="text-center sm:text-center">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                ✓ Police Verified
              </span>
            </div>
          </div>

          <div className="sm:col-span-9 space-y-1 text-xs">
            <div className="font-bold text-white text-sm">{tripData.driverName}</div>
            <div className="text-slate-400">Assigned Pahadi Driver • {tripData.driverExperience}</div>
            <div className="text-teal-300 font-semibold pt-1">
              Vehicle: <span className="text-white">{tripData.vehicleName}</span> • <span className="text-amber-300 font-mono font-bold">{tripData.vehicleNumber}</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`tel:${tripData.driverPhone}`}
                className="px-3 py-1.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Driver ({tripData.driverPhone})
              </a>
              <a
                href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! Regarding Trip ${currentTripId}:`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 border border-white/10"
              >
                Mountain Support Desk
              </a>
            </div>
          </div>
        </div>

        {/* Current Position & Status */}
        <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-2 text-xs">
          <div className="flex items-center justify-between text-teal-300 font-bold">
            <div className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-teal-400 animate-bounce" />
              <span>Current Route Position</span>
            </div>
            <span className="text-emerald-400">● {tripData.status}</span>
          </div>
          <div className="text-sm font-black text-white">{tripData.currentLocation}</div>
          <div className="text-slate-400">Expected Arrival at {tripData.destination}: <strong className="text-white">{tripData.expectedArrival}</strong></div>
        </div>

        {/* Timeline Progress */}
        <div className="space-y-3 pt-1">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Today's Journey Progress</div>
          <div className="space-y-2.5">
            {tripData.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="pt-0.5">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : step.status === 'current' ? (
                    <div className="w-4 h-4 rounded-full bg-teal-400 animate-ping shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-600 shrink-0" />
                  )}
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between text-slate-300">
                  <span className={step.status === 'current' ? 'text-teal-300 font-bold' : step.status === 'completed' ? 'line-through text-slate-500' : ''}>
                    {step.stop}
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono">{step.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Evening Plan */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300 space-y-1">
          <strong className="text-teal-400">Today’s Plan & Night Stay:</strong>
          <p className="text-slate-400 leading-relaxed">{tripData.todayPlan}</p>
        </div>

      </div>
    </div>
  );
}
