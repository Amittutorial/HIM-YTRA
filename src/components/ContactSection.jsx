import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Mountain } from 'lucide-react';
import { saveInquiryToSupabase } from '../lib/supabaseClient';
import { sendInquiryEmail } from '../lib/emailService';

export default function ContactSection() {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    const inquiryPayload = {
      name,
      phone,
      email: email || 'Not provided',
      message: query,
      source: 'contact_page_form'
    };
    saveInquiryToSupabase(inquiryPayload);
    // Send automated email directly to amitpatel42203@gmail.com
    sendInquiryEmail(inquiryPayload);
  };

  const offices = [
    {
      city: 'Shimla Head Office (HP)',
      address: 'HimYatra House, Near The Ridge, The Mall, Shimla, Himachal Pradesh 171001',
      phone: '+91 76199 17057',
      timing: '9:00 AM - 9:00 PM IST (Daily)'
    },
    {
      city: 'Manali Operations Hub (HP)',
      address: 'Club House Road, Old Manali, Distt. Kullu, Himachal Pradesh 175131',
      phone: '+91 76199 17057',
      timing: '24/7 Mountain Field Operations'
    },
    {
      city: 'Rishikesh / Dehradun (UK)',
      address: 'Tapovan Badrinath Road, Near Laxman Jhula, Rishikesh, Uttarakhand 249192',
      phone: '+91 76199 17057',
      timing: '8:00 AM - 10:00 PM IST (Char Dham Cell)'
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left 7 cols: Office details & 24/7 Help */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
              We’re Here in the Mountains, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                Ready to Help You Plan
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Whether you need advice on Kedarnath helicopter registration, Atal Tunnel weather updates, or a customized family itinerary, our local mountain travel desks are always open.
            </p>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+917619917057"
              className="px-5 py-3 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 76199 17057</span>
            </a>

            <a
              href="https://wa.me/917619917057?text=Hi%20HimYatra!%20I%20am%20planning%20a%20trip%20to%20Himachal/Uttarakhand.%20Please%20guide%20me."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: +91 76199 17057</span>
            </a>

            <a
              href="mailto:amitpatel42203@gmail.com"
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/10 transition"
            >
              <Mail className="w-4 h-4 text-teal-400" />
              <span>amitpatel42203@gmail.com</span>
            </a>
          </div>

          {/* Offices List */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Our Local Mountain Offices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {offices.map((off, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Mountain className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="truncate">{off.city.split('(')[0]}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {off.address}
                  </p>
                  <div className="pt-1 text-[11px] text-teal-300 font-semibold">
                    {off.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Instant Callback / Enquiry Form */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-slate-900/90 border border-teal-500/30 p-6 sm:p-8 shadow-2xl relative">
            {formSent ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white font-['Outfit']">Callback Sent to Amit Patel!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>. Your full query details have been automatically emailed to Amit Patel (<span className="text-teal-300 font-mono">amitpatel42203@gmail.com</span>). Our travel team will call you back on <strong className="text-white">{phone}</strong> within 15 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <a
                    href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi Amit Patel! I am ${name}. I just requested a callback regarding: ${query || 'Tour Package'}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Amit Patel
                  </a>
                  <button
                    onClick={() => setFormSent(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                  >
                    Send Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase text-teal-400 tracking-wider">Fast Response</span>
                  <h3 className="text-xl font-black text-white font-['Outfit'] mt-0.5">Request a Quick Callback</h3>
                  <p className="text-xs text-slate-400 mt-1">Directly delivers to Amit Patel's Gmail & phone.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Menon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Trip Details / Query</label>
                  <textarea
                    rows="3"
                    placeholder="e.g. Planning 5 days Manali or Kedarnath in June with family. Need quote."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Instant Callback</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Verified Himachal Tourism Registered Operator</span>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
