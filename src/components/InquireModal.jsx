import React, { useState } from 'react';
import { X, Phone, Mail, MessageSquare, Copy, Check, Clock, MapPin, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { saveInquiryToSupabase, getCurrentUser } from '../lib/supabaseClient';
import { sendInquiryEmail } from '../lib/emailService';
import FormFounderBadge from './FormFounderBadge';

export default function InquireModal({ onClose, onOpenHelpCenter }) {
  const loggedInUser = getCurrentUser();
  const [copiedItem, setCopiedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState(loggedInUser?.full_name || loggedInUser?.username || '');
  const [phone, setPhone] = useState(loggedInUser?.phone || '');
  const [emailInput, setEmailInput] = useState(loggedInUser?.email || '');
  const [message, setMessage] = useState('');
  const [destination, setDestination] = useState('');
  const [travelersCount, setTravelersCount] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [fromCity, setFromCity] = useState('');

  const phoneNumber = '+91 76199 17057';
  const rawPhone = '7619917057';
  const email = 'amitpatel42203@gmail.com';

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const inquiryPayload = {
      name,
      phone,
      email: emailInput || 'Not provided',
      customer_username: loggedInUser?.username || null,
      destination: destination || 'Himachal Pradesh / Uttarakhand',
      fromCity: fromCity || 'Delhi NCR / Chandigarh',
      travelDate: travelDate || 'Flexible / To be planned',
      travelersCount: travelersCount ? `${travelersCount} Travelers` : '2 Persons',
      message: message || 'Interested in Himalayan holiday packages & best rates',
      source: 'Website Inquire Modal'
    };
    saveInquiryToSupabase(inquiryPayload);
    // Send automated email directly to amitpatel42203@gmail.com
    sendInquiryEmail(inquiryPayload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Direct Travel Assistance
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
            Contact & Inquire
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Connect directly with our Himalayan tour specialist for customized itineraries, best hotel rates, and cab bookings.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Quick Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Phone Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Call Directly</div>
                <div className="font-bold text-white text-sm mt-0.5">{phoneNumber}</div>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <a
                  href={`tel:+91${rawPhone}`}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold text-center transition"
                >
                  Call Now
                </a>
                <button
                  onClick={() => handleCopy(`+91${rawPhone}`, 'phone')}
                  title="Copy Phone Number"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                >
                  {copiedItem === 'phone' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">WhatsApp Chat</div>
                <div className="font-bold text-white text-sm mt-0.5">{phoneNumber}</div>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/91${rawPhone}?text=Hi%20HimYatra!%20I%20want%20to%20inquire%20about%20a%20tour%20package.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full block py-1.5 px-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold text-center transition"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email Inquiry</div>
                <div className="font-bold text-white text-xs mt-0.5 truncate" title={email}>{email}</div>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <a
                  href={`mailto:${email}`}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold text-center transition"
                >
                  Send Mail
                </a>
                <button
                  onClick={() => handleCopy(email, 'email')}
                  title="Copy Email"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                >
                  {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>

          {/* Quick Inquiry Form */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-white/10 space-y-4">
            {submitted ? (
              <div className="text-center py-6 space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Outfit']">Inquiry Sent to Founder Amit Verma!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your vacation details have been sent directly to Founder Amit Verma's Gmail (<span className="text-teal-300 font-mono">amitpatel42203@gmail.com</span>). Our travel desk will call you on <strong className="text-white">{phone}</strong> within 15 minutes.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/91${rawPhone}?text=${encodeURIComponent(`Hi Amit Verma! I am ${name}. I just submitted an inquiry for: ${destination || 'Himalayan Vacation'} (${travelersCount || '2'} Persons, Travel Date: ${travelDate || 'Flexible'}). Please share full package details.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Continue on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Send Instant Vacation Inquiry / Request Callback
                  </span>
                  <span className="text-[10px] text-slate-400">Direct to Amit Verma's Gmail</span>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                  <input
                    type="text"
                    placeholder="Pickup / Starting City (e.g. Delhi NCR)"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                {/* Vacation Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="">Select Destination</option>
                    <option value="Manali & Solang Valley (HP)">Manali & Solang Valley</option>
                    <option value="Shimla & Kufri (HP)">Shimla & Kufri</option>
                    <option value="Spiti Valley & Chandratal (HP)">Spiti Valley Expedition</option>
                    <option value="Dharamshala & McLeodganj (HP)">Dharamshala & McLeodganj</option>
                    <option value="Kasol & Jibhi (HP)">Kasol & Jibhi Valley</option>
                    <option value="Kedarnath Dham & Badrinath (UK)">Kedarnath & Badrinath Dham</option>
                    <option value="Rishikesh & Haridwar (UK)">Rishikesh & Haridwar</option>
                    <option value="Auli Skiing Resort (UK)">Auli Skiing Resort</option>
                    <option value="Nainital & Jim Corbett (UK)">Nainital & Jim Corbett</option>
                    <option value="Custom Himalayan Tour">Custom Himalayan Package</option>
                  </select>

                  <input
                    type="date"
                    placeholder="Travel Date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />

                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="">No. of Travelers</option>
                    <option value="1 Person (Solo)">1 Person (Solo)</option>
                    <option value="2 Persons (Couple)">2 Persons (Couple)</option>
                    <option value="3-4 Persons (Family)">3-4 Persons (Family)</option>
                    <option value="5-8 Persons (Group)">5-8 Persons (Group)</option>
                    <option value="9+ Persons (Large Group)">9+ Persons (Large Group)</option>
                  </select>
                </div>

                <textarea
                  rows="2"
                  placeholder="Special requests: budget, hotel category (3★/4★), cab preference, meals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                />

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry (Sends All Details to Amit Verma's Gmail)</span>
                </button>
              </form>
            )}

            {/* Founder Details & Help Center */}
            <FormFounderBadge onOpenHelpCenter={onOpenHelpCenter} />
          </div>

          {/* Online Payment / Scan UPI QR Code Block */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-teal-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="font-bold text-white text-xs sm:text-sm">Online Payment / Scan UPI QR</h4>
              </div>
              <span className="text-[10px] text-teal-300 font-bold bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                GPay / PhonePe / Paytm / BHIM
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-white/5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-teal-400/40 p-1 bg-black shrink-0 shadow-md">
                <img
                  src="/payment-qr.jpg"
                  alt="Amit Patel UPI QR"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <div className="text-xs text-white font-bold">Payee: Amit Patel</div>
                <div className="text-[11px] text-slate-400">Account: Central Bank of India 3744</div>
                
                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                  <span className="font-mono text-xs text-teal-300 font-bold bg-slate-900 px-2 py-1 rounded-lg border border-white/10">
                    amitpatel42203@okhdfcbank
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('amitpatel42203@okhdfcbank');
                      alert('UPI ID copied: amitpatel42203@okhdfcbank');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold transition cursor-pointer"
                  >
                    Copy UPI
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 pt-1">
                  Scan to pay any token or package advance directly. Share screenshot to get instant receipt.
                </p>
              </div>
            </div>
          </div>

          {/* Operational timings */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Helpline Hours: 24 Hours / 7 Days a Week</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Himachal & Uttarakhand Local Experts</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
