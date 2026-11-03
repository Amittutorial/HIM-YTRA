import React, { useState } from 'react';
import { Sparkles, MapPin, ShieldCheck, HeartPulse, AlertTriangle, ArrowRight, MessageSquare, Phone, Calendar, CheckCircle2, Info } from 'lucide-react';

export const CHARDHAM_CIRCUITS = [
  {
    id: 'complete-chardham',
    title: 'Complete Char Dham Yatra (All 4 Sacred Dhams)',
    route: 'Haridwar ➔ Yamunotri ➔ Gangotri ➔ Kedarnath ➔ Badrinath ➔ Rishikesh',
    duration: '10 Days / 9 Nights',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Sacred & Auspicious',
    maxAltitude: '3,583 m (11,755 ft) at Kedarnath',
    difficulty: 'Moderate to Demanding',
    helicopterAvailable: true,
    highlights: ['Yamunotri Surya Kund bath', 'Gangotri Bhagirathi Aarti', 'Kedarnath Jyotirlinga Darshan', 'Badrinath Maha Abhishek']
  },
  {
    id: 'do-dham',
    title: 'Do Dham Yatra (Kedarnath & Badrinath Combined)',
    route: 'Haridwar / Rishikesh ➔ Guptkashi ➔ Kedarnath ➔ Joshimath ➔ Badrinath',
    duration: '6 Days / 5 Nights',
    price: 18499,
    image: '/destinations/kedarnath.jpg',
    badge: 'Most Popular Devotee Choice',
    maxAltitude: '3,583 m (11,755 ft)',
    difficulty: 'Moderate (16 km Kedarnath Trek)',
    helicopterAvailable: true,
    highlights: ['Kedarnath Evening Shringar Aarti', 'Sonprayag to Gaurikund Shuttle', 'Badrinath Tapt Kund', 'Mana (First Indian Village)']
  },
  {
    id: 'kedarnath-special',
    title: 'Kedarnath Dham Yatra & Tungnath Circuit',
    route: 'Haridwar / Dehradun ➔ Sonprayag ➔ Kedarnath ➔ Chopta ➔ Tungnath',
    duration: '5 Days / 4 Nights',
    price: 13999,
    image: '/destinations/kedarnath.jpg',
    badge: 'Highest Shiva Temples',
    maxAltitude: '3,680 m (12,073 ft) at Tungnath',
    difficulty: 'Moderate Trekking',
    helicopterAvailable: true,
    highlights: ['Bhim Shila Darshan', 'Helicopter shuttle assistance from Phata/Sirsi', 'Tungnath (World’s highest Shiva temple)', 'Chandrashila Sunrise']
  }
];

export default function CharDhamSection({ onOpenBooking }) {
  const [selectedCircuit, setSelectedCircuit] = useState(CHARDHAM_CIRCUITS[0]);

  return (
    <section id="chardham" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devbhoomi Uttarakhand Spiritual Circuits</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Sacred Char Dham Yatra & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-emerald-300">
              High-Altitude Himalayan Pilgrimages
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Complete hassle-free pilgrimage packages with verified Pahadi drivers, priority helicopter assistance, biometric registration help, clean hotel stays, and vegetarian satvik meals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/917619917057?text=Hi%20HimYatra!%20I%20want%20to%20plan%20Char%20Dham%20Yatra%202026.%20Please%20guide%20me."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950/20" />
            <span>WhatsApp Yatra Expert</span>
          </a>
        </div>
      </div>

      {/* Char Dham Circuits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {CHARDHAM_CIRCUITS.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl overflow-hidden border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl ${
              selectedCircuit.id === item.id
                ? 'bg-slate-900 border-teal-400/60 ring-2 ring-teal-400/20'
                : 'bg-slate-900/70 border-white/10 hover:border-teal-500/30'
            }`}
          >
            <div>
              <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow-md">
                  {item.badge}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-white/15">
                  ⏱️ {item.duration}
                </span>
              </div>

              <h3 className="text-lg font-black text-white font-['Outfit'] mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-teal-300 mb-3 flex items-start gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{item.route}</span>
              </p>

              <div className="space-y-1.5 mb-4 text-xs text-slate-300">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase text-teal-400 font-bold tracking-wider">Starting ₹{item.price.toLocaleString('en-IN')} per person</div>
                <div className="text-xl font-black text-white font-['Outfit']">
                  ₹{item.price.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-400"> / person</span>
                </div>
              </div>
              <button
                onClick={() => onOpenBooking?.(null)}
                className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition cursor-pointer"
              >
                Book Yatra
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Altitude & Safety Card for High Altitude / Yatra Devotees (Requirement Feature) */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/70 border border-teal-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-amber-400" />
              <span>High Altitude Health & Safety Advisory</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Altitude, AMS Prevention & Devotee Safety Guidelines
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Kedarnath is at 11,755 ft and Badrinath is at 10,279 ft. Our local Pahadi drivers and tour leads carry emergency oxygen cylinders and first aid kits in all vehicles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs shrink-0 max-w-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Mandatory Yatra Registration</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Uttarakhand Govt. Biometric Yatra e-pass registration is mandatory for all pilgrims before Sonprayag. We provide free assistance!
            </p>
          </div>
        </div>

        {/* 4 Pillars of Mountain Safety */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs">1</span>
              <span>Acclimatization Day</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              We always schedule an intermediate night stay at Guptkashi or Pipalkoti (1,300m) to allow your body to adapt before ascending above 3,500m.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs">2</span>
              <span>Hydration & Camphor</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Drink 3-4 liters of warm water daily. Inhaling camphor (Kapur) tablet in a handkerchief provides immediate relief in thin oxygen above Lincholi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs">3</span>
              <span>Ponies, Palki & Heli</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              For senior citizens, pre-booked helicopter shuttles from Phata/Guptkashi or government-regulated Kandi/Palki are arranged directly at Gaurikund.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs">4</span>
              <span>24/7 Mountain Helpline</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Direct connection with our Rishikesh & Sonprayag field desks at <strong className="text-teal-300">+91 76199 17057</strong> for weather delays and assistance.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
