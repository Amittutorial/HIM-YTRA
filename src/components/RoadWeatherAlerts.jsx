import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, CloudRain, Sun, CloudSnow, Wind, Send, MessageSquare, PhoneCall, ShieldCheck, Clock } from 'lucide-react';
import { saveInquiryToSupabase } from '../lib/supabaseClient';

export const MOUNTAIN_ALERTS = [
  {
    route: 'Atal Tunnel (Manali ➔ Lahaul / Sissu)',
    status: 'Open & Clear',
    statusCode: 'green',
    weather: 'Clear Sky • 8°C',
    icon: 'Sun',
    lastUpdated: 'Today, 8:30 AM IST',
    notes: '2WD and 4WD tourist vehicles permitted without restrictions. Sissu waterfall accessible.'
  },
  {
    route: 'Sonprayag to Kedarnath Trek Route',
    status: 'Operational & Clear',
    statusCode: 'green',
    weather: 'Partly Cloudy • 4°C - 11°C',
    icon: 'Sun',
    lastUpdated: 'Today, 9:00 AM IST',
    notes: 'Gaurikund shuttle running every 10 mins. Helicopter sorties operating from Guptkashi/Phata.'
  },
  {
    route: 'Joshimath to Badrinath Dham (NH-07)',
    status: 'Smooth Traffic Flow',
    statusCode: 'green',
    weather: 'Sunny • 7°C - 14°C',
    icon: 'Sun',
    lastUpdated: 'Today, 7:45 AM IST',
    notes: 'All-weather double lane highway open. Pilgrims advised to carry warm jackets for evening aarti.'
  },
  {
    route: 'Rohtang Pass (High Altitude Crest)',
    status: 'Permit Regulated',
    statusCode: 'yellow',
    weather: 'Cold Breeze • 2°C',
    icon: 'Wind',
    lastUpdated: 'Today, 6:00 AM IST',
    notes: 'NGT daily green permits required. BRO snow-clearing teams active. Tuesday maintenance closed.'
  },
  {
    route: 'Spiti Valley Kunzum Pass (Kaza ➔ Manali)',
    status: 'High Altitude Winter Advisory',
    statusCode: 'amber',
    weather: 'Sub-Zero Nights • -4°C',
    icon: 'CloudSnow',
    lastUpdated: 'Today, 6:30 AM IST',
    notes: 'Kunzum Pass accessible only via 4x4 vehicles with experienced local drivers. Carry emergency snow chains.'
  }
];

export default function RoadWeatherAlerts() {
  const [phone, setPhone] = useState('');
  const [routeInterest, setRouteInterest] = useState('All Himachal & Uttarakhand Routes');
  const [subscribed, setSubscribed] = useState(false);

  const handleAlertSignup = (e) => {
    e.preventDefault();
    if (!phone) return;
    setSubscribed(true);

    saveInquiryToSupabase({
      name: 'Weather Alert Subscriber',
      phone,
      email: 'whatsapp_alert_signup',
      message: `WhatsApp Weather/Road Alert subscription for: ${routeInterest}`,
      source: 'Road & Weather Alert Section'
    });
  };

  return (
    <section id="weather-alerts" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Live Field Dispatch Updates</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Live Mountain Road & Weather Updates <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Himachal & Char Dham Routes
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Real-time highway, pass, and weather alerts verified daily by our local Pahadi drivers and mountain dispatch desks in Manali, Shimla, and Rishikesh.
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/10 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Updates Refreshed Every 2 Hours</span>
        </div>
      </div>

      {/* Main Grid: Status Cards on Left, WhatsApp Alerts Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Road Status Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5">
          {MOUNTAIN_ALERTS.map((alert, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-teal-500/30 transition shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white text-sm sm:text-base">{alert.route}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    alert.statusCode === 'green'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : alert.statusCode === 'yellow'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {alert.notes}
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                  <span>⏱️ {alert.lastUpdated}</span>
                  <span>•</span>
                  <span className="text-teal-400 font-medium">Verified by HimYatra Ops</span>
                </div>
              </div>

              <div className="sm:text-right shrink-0 bg-slate-950/60 p-3 rounded-xl border border-white/5 sm:bg-transparent sm:border-0 sm:p-0">
                <div className="text-xs font-bold text-teal-300">{alert.weather}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Field Temp</div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Alert Signup Form (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/60 rounded-3xl border border-teal-500/40 p-6 sm:p-8 shadow-2xl relative space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Instant WhatsApp Alerts
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
              Get Highway & Weather Alerts on WhatsApp
            </h3>
            <p className="text-xs text-slate-300">
              Traveling soon? Enter your WhatsApp number to receive critical road status, snowfall forecasts, and landslide advisories for your chosen route.
            </p>
          </div>

          {subscribed ? (
            <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <div className="font-bold text-white text-sm">You’re Subscribed!</div>
              <p className="text-xs text-slate-300">
                You will receive urgent road updates for <strong className="text-teal-300">{routeInterest}</strong> directly on WhatsApp.
              </p>
              <a
                href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I subscribed for road alerts for ${routeInterest}. Please send current live advisory.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
              >
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleAlertSignup} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Select Route to Monitor</label>
                <select
                  value={routeInterest}
                  onChange={(e) => setRouteInterest(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="All Himachal & Uttarakhand Routes">All Himachal & Uttarakhand Routes</option>
                  <option value="Manali, Atal Tunnel & Rohtang Pass">Manali, Atal Tunnel & Rohtang Pass</option>
                  <option value="Kedarnath Yatra & Sonprayag Trek">Kedarnath Yatra & Sonprayag Trek</option>
                  <option value="Badrinath National Highway">Badrinath National Highway</option>
                  <option value="Spiti Valley & Kunzum Pass">Spiti Valley & Kunzum Pass</option>
                  <option value="Shimla & Kufri Highway">Shimla & Kufri Highway</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Get Alerts on WhatsApp</span>
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Zero Spam. Only verified mountain advisories.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
