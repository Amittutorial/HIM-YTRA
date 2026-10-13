import React from 'react';
import { ShieldCheck, Mountain, Users, HeartHandshake, PhoneCall, Award } from 'lucide-react';

export default function TrustStats() {
  const stats = [
    {
      icon: Users,
      value: '15,000+',
      label: 'Delighted Travelers',
      sublabel: 'Across all Indian states'
    },
    {
      icon: Mountain,
      value: '120+',
      label: 'Curated Itineraries',
      sublabel: 'Himachal & Uttarakhand'
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Local Pahadi Drivers',
      sublabel: 'Verified mountain safety'
    },
    {
      icon: Award,
      value: '4.9 ★',
      label: 'Google & Trip Rating',
      sublabel: 'Based on 2,400+ reviews'
    }
  ];

  const trustHighlights = [
    {
      title: 'Zero Hidden Charges',
      desc: 'All tolls, state hill taxes, green taxes, driver food and night halts are 100% included upfront.'
    },
    {
      title: '24/7 Mountain SOS Support',
      desc: 'Real-time road condition tracking, Atal Tunnel & pass updates, and medical oxygen backup.'
    },
    {
      title: 'Handpicked Mountain View Stays',
      desc: 'Personally vetted hotels, cozy pine treehouses, and riverside resorts with guaranteed valley views.'
    },
    {
      title: 'Flexible Rescheduling',
      desc: 'Weather change or flight delay? Reschedule your tour within 12 months with zero penalty.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Numbers Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-white/10 hover:border-teal-500/30 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-slate-950 transition duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Choose HimYatra Card */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900/90 via-slate-950 to-teal-950/40 border border-teal-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              Why HimYatra
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] leading-tight">
              We Don’t Just Book Trips. <br />
              <span className="text-teal-400">We Live in the Himalayas.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Based out of Shimla and Manali with regional operations in Rishikesh and Dehradun, HimYatra was founded by passionate local Himalayan explorers. We treat every traveler like family and ensure your trip is as safe as it is awe-inspiring.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustHighlights.map((item, index) => (
              <div key={index} className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-teal-500/30 transition">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <h3 className="font-bold text-white text-sm sm:text-base">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
