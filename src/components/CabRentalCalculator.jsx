import React, { useState } from 'react';
import { Car, MapPin, Calendar, Users, ShieldCheck, CheckCircle2, MessageSquare, Phone, Sparkles, ArrowRight, Award } from 'lucide-react';

export const POPULAR_CAB_ROUTES = [
  {
    id: 'del-manali',
    from: 'Delhi NCR (Airport/Stn)',
    to: 'Manali / Solang Valley',
    distance: '540 km',
    duration: '11-12 hrs',
    sedan: 7499,
    suv: 10999,
    tempo: 16999,
    thar: 13999,
    popular: true
  },
  {
    id: 'del-shimla',
    from: 'Delhi NCR',
    to: 'Shimla & Kufri',
    distance: '350 km',
    duration: '7-8 hrs',
    sedan: 4999,
    suv: 7499,
    tempo: 11999,
    thar: 9999,
    popular: true
  },
  {
    id: 'chd-manali',
    from: 'Chandigarh (Airport/Stn)',
    to: 'Manali & Atal Tunnel',
    distance: '310 km',
    duration: '7 hrs',
    sedan: 4499,
    suv: 6999,
    tempo: 10999,
    thar: 8999,
    popular: false
  },
  {
    id: 'hdw-kedar',
    from: 'Haridwar / Rishikesh',
    to: 'Kedarnath (Sonprayag/Gaurikund)',
    distance: '240 km',
    duration: '8-9 hrs (Hill)',
    sedan: 5999,
    suv: 8499,
    tempo: 13499,
    thar: 10999,
    popular: true
  },
  {
    id: 'hdw-badri',
    from: 'Haridwar / Rishikesh',
    to: 'Badrinath Dham',
    distance: '320 km',
    duration: '10-11 hrs (Hill)',
    sedan: 7499,
    suv: 10499,
    tempo: 15999,
    thar: 12999,
    popular: true
  },
  {
    id: 'dhr-mussoorie',
    from: 'Dehradun (Airport/Stn)',
    to: 'Mussoorie & Dhanaulti',
    distance: '80 km',
    duration: '2.5 hrs',
    sedan: 2199,
    suv: 3499,
    tempo: 5499,
    thar: 4499,
    popular: false
  },
  {
    id: 'del-dharamshala',
    from: 'Delhi NCR',
    to: 'Dharamshala & McLeodganj',
    distance: '490 km',
    duration: '10 hrs',
    sedan: 7199,
    suv: 10499,
    tempo: 15499,
    thar: 13499,
    popular: false
  },
  {
    id: 'shimla-spiti',
    from: 'Shimla',
    to: 'Spiti Valley (Kaza Circuit)',
    distance: '420 km',
    duration: '2 Days Scenic',
    sedan: null, // Sedans not allowed on Spiti road
    suv: 18499,
    tempo: 26999,
    thar: 21999,
    popular: true
  }
];

export const PAHADI_DRIVERS = [
  {
    name: 'Rajesh Thakur',
    location: 'Manali, Himachal Pradesh',
    experience: '12+ Years Hill Driving',
    languages: 'Hindi, Pahadi, English',
    specialty: 'Atal Tunnel, Rohtang & Spiti Pass 4x4',
    rating: 4.95,
    trips: '1,420+ Trips',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: 'HP Police Verified'
  },
  {
    name: 'Surinder Negi',
    location: 'Shimla / Kinnaur, HP',
    experience: '14+ Years Snow Driving',
    languages: 'Hindi, Pahadi, Punjabi',
    specialty: 'Kinnaur Valley & Sangla Roads',
    rating: 4.98,
    trips: '1,890+ Trips',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verified: 'HP Police Verified'
  },
  {
    name: 'Virendra Rawat',
    location: 'Rishikesh, Uttarakhand',
    experience: '11+ Years Char Dham Veteran',
    languages: 'Hindi, Garhwali, English',
    specialty: 'Kedarnath & Badrinath Sacred Circuit',
    rating: 4.96,
    trips: '1,150+ Trips',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    verified: 'UK Police Verified'
  },
  {
    name: 'Pankaj Semwal',
    location: 'Joshimath, Uttarakhand',
    experience: '9+ Years High Altitude',
    languages: 'Hindi, Garhwali',
    specialty: 'Auli Snow Slopes & Mana Village',
    rating: 4.92,
    trips: '980+ Trips',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    verified: 'UK Police Verified'
  }
];

export default function CabRentalCalculator({ onOpenBooking }) {
  const [selectedRouteId, setSelectedRouteId] = useState('del-manali');
  const [vehicleType, setVehicleType] = useState('suv');
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [tripType, setTripType] = useState('oneway'); // 'oneway' or 'round'

  const currentRoute = POPULAR_CAB_ROUTES.find(r => r.id === selectedRouteId) || POPULAR_CAB_ROUTES[0];

  const getFare = () => {
    let base = currentRoute[vehicleType];
    if (!base) base = currentRoute.suv; // fallback if sedan unavailable for terrain
    if (tripType === 'round') {
      return Math.round(base * 1.85); // 15% discount on return round-trip
    }
    return base;
  };

  const currentFare = getFare();

  const vehicleDetails = {
    sedan: { name: 'Swift Dzire / Etios', seats: '4 Guests', bag: '2 Big Bags', icon: '🚗' },
    suv: { name: 'Toyota Innova Crysta / Ertiga', seats: '6-7 Guests', bag: '4 Big Bags', icon: '🚙' },
    thar: { name: 'Mahindra Thar 4x4 Mountain', seats: '4 Guests', bag: '3 Bags', icon: '🛞' },
    tempo: { name: 'Force Urbania / 12-Seater Tempo', seats: '12-16 Guests', bag: '10 Bags', icon: '🚐' }
  };

  return (
    <section id="cabs" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            <Car className="w-3.5 h-3.5" />
            <span>Himachal & Uttarakhand Cab Rentals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Fixed Route Mountain Cabs & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Instant Fare Calculator
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Zero hidden charges. Transparent fixed fares for popular Himachal & Uttarakhand routes including Delhi, Chandigarh, Haridwar, Kedarnath, and Manali with seasoned Pahadi drivers.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/30 max-w-xs space-y-1.5">
          <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Govt. Registered Operator</span>
          </div>
          <p className="text-[11px] text-slate-300">
            HP Tourism Permit: <strong className="text-white">HP-TO-2024-8841</strong> | GSTIN: <strong className="text-white">02AAACH7891K1Z5</strong>
          </p>
        </div>
      </div>

      {/* Main Fare Calculator & Route Chooser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Interactive Calculator (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-teal-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-black text-white font-['Outfit'] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Calculate Fixed Route Fare</span>
            </h3>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  tripType === 'oneway' ? 'bg-teal-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  tripType === 'round' ? 'bg-teal-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Round Trip (15% Off)
              </button>
            </div>
          </div>

          {/* Select Route */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Select Fixed Himalayan Route
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {POPULAR_CAB_ROUTES.map(route => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                    selectedRouteId === route.id
                      ? 'bg-teal-500/15 border-teal-400 shadow-lg shadow-teal-500/10'
                      : 'bg-slate-950/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs sm:text-sm">{route.to.split('/')[0]}</span>
                    {route.popular && (
                      <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-bold">Popular</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">From {route.from}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{route.distance} • ~{route.duration}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Vehicle */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> Choose Mountain-Certified Vehicle
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'sedan', label: 'Sedan Dzire', sub: '4 Seater', available: currentRoute.sedan !== null },
                { id: 'suv', label: 'Innova / SUV', sub: '6-7 Seater', available: true },
                { id: 'thar', label: 'Thar 4x4', sub: 'Offroad 4 Seater', available: currentRoute.thar !== null },
                { id: 'tempo', label: 'Tempo 12S', sub: 'Group 12-16', available: true }
              ].map(v => (
                <button
                  key={v.id}
                  type="button"
                  disabled={!v.available}
                  onClick={() => setVehicleType(v.id)}
                  className={`p-3 rounded-2xl text-center border transition cursor-pointer ${
                    !v.available
                      ? 'opacity-40 cursor-not-allowed bg-slate-950 border-white/5 text-slate-500'
                      : vehicleType === v.id
                      ? 'bg-teal-400 text-slate-950 font-black border-teal-300 shadow-md scale-102'
                      : 'bg-slate-950/70 border-white/10 text-slate-200 hover:border-white/25'
                  }`}
                >
                  <div className="text-sm font-bold">{v.label}</div>
                  <div className={`text-[10px] ${vehicleType === v.id ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    {v.available ? v.sub : 'Not for terrain'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400" /> Travel Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-teal-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" /> Vehicle Capacity
              </label>
              <div className="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-teal-300 font-semibold">
                {vehicleDetails[vehicleType]?.seats} • {vehicleDetails[vehicleType]?.bag}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Fare Breakdown Card & Instant Booking (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/60 rounded-3xl border border-teal-500/40 p-6 sm:p-8 shadow-2xl relative space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-[11px] font-bold uppercase text-teal-400 tracking-wider">All-Inclusive Fixed Fare</span>
            <div className="text-4xl font-black text-white font-['Outfit'] mt-1 flex items-baseline gap-2">
              ₹{currentFare.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-400">({tripType === 'oneway' ? 'One-Way Total' : 'Round-Trip Total'})</span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              <strong>{currentRoute.from}</strong> ➔ <strong>{currentRoute.to}</strong>
            </p>
          </div>

          {/* Inclusions checklist */}
          <div className="space-y-2 text-xs text-slate-300 bg-slate-950/70 p-4 rounded-2xl border border-white/10">
            <div className="text-[11px] font-bold text-teal-300 uppercase tracking-wider mb-1">What’s 100% Included:</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Fuel, State Permits & Green Taxes Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Hill-Trained Driver Allowance & Night Charges</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Atal Tunnel / Hill Highway Tolls Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Vehicle: {vehicleDetails[vehicleType]?.name}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I want to book a cab:
📍 Route: ${currentRoute.from} to ${currentRoute.to}
🚗 Vehicle: ${vehicleDetails[vehicleType]?.name}
📅 Date: ${pickupDate}
🔄 Trip: ${tripType === 'oneway' ? 'One Way' : 'Round Trip'}
💰 Fixed Fare: ₹${currentFare}
Please confirm availability!`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950/20" />
              <span>Book Cab on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking?.(null)}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Request Phone Callback (+91 76199 17057)</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-400 text-center">
            ⚡ Instant driver allotment with vehicle details SMS sent 2 hours before trip.
          </div>
        </div>

      </div>

      {/* Meet Your Drivers Section (Trust Feature) */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Meet Your Mountain Drivers
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
            Pahadi Drivers You Can Trust With Your Family
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            High-altitude Himalayan roads require calm heads and decades of experience on hairpin bends, snow, and landslide zones. Every driver is verified and local.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAHADI_DRIVERS.map((driver, i) => (
            <div
              key={i}
              className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 space-y-4 hover:border-teal-500/40 transition-all duration-300 group shadow-xl"
            >
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  ✓ {driver.verified}
                </span>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="font-bold text-sm">{driver.name}</div>
                  <div className="text-[11px] text-slate-300">{driver.location}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-semibold text-white">{driver.experience}</span>
                </div>
                <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-semibold text-teal-300">{driver.languages}</span>
                </div>
                <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="text-slate-400">Completed:</span>
                  <span className="font-semibold text-white">{driver.trips}</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-teal-400">Specialty:</strong> {driver.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
