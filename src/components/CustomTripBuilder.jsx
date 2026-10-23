import React, { useState } from 'react';
import { Sparkles, Check, Car, Calendar, MapPin, Users, Compass, Send, CheckCircle2, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveCustomTripToSupabase, getCurrentUser } from '../lib/supabaseClient';
import { sendInquiryEmail } from '../lib/emailService';
import FormFounderBadge from './FormFounderBadge';

export default function CustomTripBuilder({ onOpenBookingWithCustom, onOpenHelpCenter }) {
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('Himachal Pradesh');
  const [selectedSpots, setSelectedSpots] = useState(['Manali', 'Solang & Atal Tunnel']);
  const [travelStyle, setTravelStyle] = useState('Family');
  const [durationDays, setDurationDays] = useState(6);
  const [travelersCount, setTravelersCount] = useState(4);
  const [pickupCity, setPickupCity] = useState('Delhi NCR');
  const [vehicle, setVehicle] = useState('Toyota Innova Crysta');
  const [hotelType, setHotelType] = useState('3-Star Deluxe Valley View');
  const loggedInUser = getCurrentUser();
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState(loggedInUser?.full_name || loggedInUser?.username || '');
  const [contactPhone, setContactPhone] = useState(loggedInUser?.phone || '');

  const himachalSpots = ['Manali', 'Solang & Atal Tunnel', 'Shimla & Kufri', 'Spiti Valley', 'Kasol & Parvati', 'Jibhi & Tirthan', 'Dharamshala', 'Dalhousie'];
  const uttarakhandSpots = ['Rishikesh', 'Kedarnath Dham', 'Badrinath Dham', 'Auli Ski Slopes', 'Mussoorie', 'Nainital Lake', 'Jim Corbett Safari', 'Chopta Tungnath'];

  const availableSpots = selectedRegion === 'Himachal Pradesh' 
    ? himachalSpots 
    : selectedRegion === 'Uttarakhand' 
    ? uttarakhandSpots 
    : [...himachalSpots.slice(0, 4), ...uttarakhandSpots.slice(0, 4)];

  const toggleSpot = (spot) => {
    if (selectedSpots.includes(spot)) {
      if (selectedSpots.length > 1) {
        setSelectedSpots(selectedSpots.filter(s => s !== spot));
      }
    } else {
      setSelectedSpots([...selectedSpots, spot]);
    }
  };

  // Base dynamic estimation logic
  const calculateEstimatedPrice = () => {
    let basePerDay = 2400;
    if (vehicle.includes('Innova')) basePerDay += 400;
    if (vehicle.includes('Tempo')) basePerDay += 200;
    if (hotelType.includes('4-Star')) basePerDay += 800;
    if (hotelType.includes('Luxury')) basePerDay += 1500;
    return basePerDay * durationDays;
  };

  const estimatedPrice = calculateEstimatedPrice();

  const handleFinishCustom = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const customPayload = {
      selectedRegion,
      selectedSpots,
      travelStyle,
      durationDays,
      travelersCount,
      vehicle,
      pickupCity,
      hotelType,
      estimatedPrice,
      contactName,
      contactPhone,
      customer_username: loggedInUser?.username || null
    };

    saveCustomTripToSupabase(customPayload);

    // Send automated email to amitpatel42203@gmail.com with complete details
    sendInquiryEmail({
      name: contactName,
      phone: contactPhone,
      destination: `${selectedRegion} (${selectedSpots.join(', ')})`,
      fromCity: pickupCity,
      travelDate: `${durationDays} Days Itinerary`,
      travelersCount: `${travelersCount} Persons`,
      message: `Custom ${durationDays}D Plan for ${selectedSpots.join(', ')} (${selectedRegion}). Vehicle: ${vehicle}, Pickup: ${pickupCity}, Hotel: ${hotelType}, Est. Budget: ₹${estimatedPrice}/person (${travelersCount} travelers).`,
      source: 'Custom Trip Wizard'
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="custom-planner" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/60 border border-teal-500/30 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Customized Himalayan Itineraries
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Design Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Himalayan Yatra</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-base">
            Choose your preferred destinations, vehicle, and pace. Get an instant budget estimation and dedicated itinerary crafted by our local Pahadi travel experts.
          </p>
        </div>

        {submitted ? (
          <div className="relative z-10 max-w-xl mx-auto p-8 rounded-3xl bg-slate-900/90 border border-teal-500/40 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white font-['Outfit']">
              Custom Itinerary Request Received!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Thank you, <strong className="text-white">{contactName || 'Traveler'}</strong>! Our senior Himalayan trip planner is compiling your day-by-day plan for <span className="text-teal-300 font-semibold">{selectedSpots.join(', ')}</span> ({durationDays} Days / {travelersCount} Guests). We will call you on <strong className="text-white">{contactPhone}</strong> within 15 minutes.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-left space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Estimated Budget:</span>
                <span className="font-bold text-white">₹{estimatedPrice.toLocaleString('en-IN')} / person</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Selected Vehicle:</span>
                <span className="font-semibold text-teal-300">{vehicle}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pickup Location:</span>
                <span className="font-semibold text-white">{pickupCity}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I just created a custom ${durationDays}-day trip for ${selectedSpots.join(', ')} with ${travelersCount} travelers starting from ${pickupCity}. Please share the itinerary!`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <span>Instant WhatsApp Share</span>
              </a>

              <button
                onClick={() => setSubmitted(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
              >
                Customize Another
              </button>
            </div>
            <FormFounderBadge onOpenHelpCenter={onOpenHelpCenter} />
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps Form (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Choose Region */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <span>1. Select Himalayan State / Region</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Himachal Pradesh', label: '🏔️ Himachal Pradesh', sub: 'Manali, Shimla, Spiti' },
                    { id: 'Uttarakhand', label: '🕉️ Uttarakhand', sub: 'Kedarnath, Rishikesh, Auli' },
                    { id: 'Both States', label: '🌄 Grand Himalayan Combo', sub: 'Both Himachal & Uttarakhand' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedRegion(r.id);
                        if (r.id === 'Himachal Pradesh') setSelectedSpots(['Manali', 'Solang & Atal Tunnel']);
                        else if (r.id === 'Uttarakhand') setSelectedSpots(['Kedarnath Dham', 'Rishikesh']);
                        else setSelectedSpots(['Manali', 'Rishikesh']);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition cursor-pointer ${
                        selectedRegion === r.id
                          ? 'bg-teal-500/20 border-teal-400 text-white'
                          : 'bg-slate-900 border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-sm">{r.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{r.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose Spots of interest */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    2. Select Destinations to Include ({selectedSpots.length} selected)
                  </label>
                  <span className="text-[11px] text-slate-400">Click to add/remove</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSpots.map((spot) => {
                    const isSelected = selectedSpots.includes(spot);
                    return (
                      <button
                        key={spot}
                        type="button"
                        onClick={() => toggleSpot(spot)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/5'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{spot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Travel Style & Logistics */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Travel Style</label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Family">Family with Kids & Elders</option>
                    <option value="Honeymoon">Honeymoon / Couple</option>
                    <option value="Friends">Friends Group / Adventurers</option>
                    <option value="Spiritual">Spiritual / Senior Citizens</option>
                    <option value="Solo">Solo Traveler</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Duration: {durationDays} Days</label>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>3 Days (Short)</span>
                    <span>14 Days (Grand)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">No. of Guests</label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 4: Vehicle & Pickup point */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Preferred Vehicle</label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Swift Dzire / Etios (Sedan)">Swift Dzire / Etios (Sedan)</option>
                    <option value="Toyota Innova Crysta">Toyota Innova Crysta (SUV Comfort)</option>
                    <option value="Mahindra Thar / 4x4 Camper">Mahindra Thar 4x4 (Extreme Offroad)</option>
                    <option value="Force Urbania / Tempo 12-Seater">Force Urbania / Tempo 12-Seater</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Pickup City</label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Delhi NCR (Airport / Railway Station)">Delhi NCR (Airport / Stn)</option>
                    <option value="Chandigarh (Airport / Station)">Chandigarh (Airport / Stn)</option>
                    <option value="Dehradun / Jolly Grant Airport">Dehradun / Jolly Grant Airport</option>
                    <option value="Haridwar / Rishikesh">Haridwar / Rishikesh</option>
                    <option value="Ambala Cantt">Ambala Cantt</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Stay Category</label>
                  <select
                    value={hotelType}
                    onChange={(e) => setHotelType(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="3-Star Deluxe Valley View">3★ Deluxe Valley View</option>
                    <option value="4-Star Premium Resorts">4★ Premium Mountain Resorts</option>
                    <option value="Luxury Cottages & Boutique Treehouses">Luxury Cottages & Treehouses</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Right Summary & Instant Callback Form (4 cols) */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950/90 border border-teal-500/30 shadow-xl space-y-5">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">Live Quotation Preview</span>
                  <div className="text-3xl font-black text-white font-['Outfit'] mt-1">
                    ₹{estimatedPrice.toLocaleString('en-IN')}
                    <span className="text-xs text-slate-400 font-normal"> / person</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Includes Cab, Fuel, Stay & Meals
                  </div>
                </div>

                {/* Quick Spec List */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold text-white">{durationDays} Days / {durationDays - 1} Nights</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Destinations:</span>
                    <span className="font-semibold text-teal-300 truncate max-w-[170px]">{selectedSpots.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className="font-semibold text-white truncate max-w-[170px]">{vehicle.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Total Travelers:</span>
                    <span className="font-semibold text-white">{travelersCount} Persons</span>
                  </div>
                </div>

                {/* Form to submit */}
                <form onSubmit={handleFinishCustom} className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-semibold block mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Detailed Custom Quote</span>
                  </button>
                </form>

                <p className="text-[10px] text-slate-400 text-center leading-tight">
                  🔒 We respect your privacy. No spam. Pure Pahadi travel advice.
                </p>
                <FormFounderBadge onOpenHelpCenter={onOpenHelpCenter} />
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
