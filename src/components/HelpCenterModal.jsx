import React, { useState } from 'react';
import { X, HelpCircle, Phone, MessageSquare, Mail, ShieldCheck, ChevronDown, Clock, AlertTriangle, FileText, CheckCircle2, Award, Sparkles, MapPin } from 'lucide-react';

export default function HelpCenterModal({ onClose, onOpenPayment, onOpenBooking }) {
  const [activeFaq, setActiveFaq] = useState(0);

  const founderName = 'Amit Verma';
  const founderPhone = '+91 76199 17057';
  const founderEmail = 'amitpatel42203@gmail.com';

  const helpTopics = [
    {
      title: 'How does Vacation Reservation & 20% Token work?',
      icon: <CheckCircle2 className="w-4 h-4 text-teal-400" />,
      answer:
        'To reserve any vacation package or private cab, you only need to pay a 20% advance token via our secure UPI QR. The remaining 80% balance is paid comfortably on arrival during your hotel check-in or cab pickup. Once your 20% token is verified, you receive your official confirmed voucher on WhatsApp and Email within 15 minutes.'
    },
    {
      title: 'Payment Guide: Where do I find the 12-digit UTR Number?',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      answer:
        'When you make a payment in Google Pay, PhonePe, Paytm, BHIM, or Cred, open the payment receipt details. Look for "UPI Transaction ID" or "UTR" (a 12-digit number like 412984920194). Enter this number into the payment verification box to instantly unlock your WhatsApp confirmation.'
    },
    {
      title: 'What is the Cancellation & 100% Refund Policy?',
      icon: <Award className="w-4 h-4 text-amber-400" />,
      answer:
        'We offer a traveler-first refund policy: If your trip cannot proceed due to severe mountain weather, snow blockages, landslides, or government highway closures, you receive a 100% full refund or free rescheduling to future dates. For personal cancellations made 7 or more days before departure, you receive a full refund minus minimal bank handling charges.'
    },
    {
      title: 'What vehicles are provided and are drivers hill-experienced?',
      icon: <MapPin className="w-4 h-4 text-cyan-400" />,
      answer:
        'All our vehicles (Swift Dzire, Toyota Innova Crysta, Mahindra 4x4, and Force Urbania) are commercially registered hill-fitness certified. Every driver is a local Pahadi native who has driven high Himalayan passes (Rohtang, Kunzum, Atal Tunnel, Badrinath Ghats) for over 8+ years. They double as your trusted local mountain guides.'
    },
    {
      title: 'Permits: Atal Tunnel, Rohtang Pass & Char Dham Yatra',
      icon: <FileText className="w-4 h-4 text-purple-400" />,
      answer:
        'Our team manages your Atal Tunnel transit, Green Tax permits, and state border tolls directly. For Kedarnath and Badrinath Yatra, we assist with Uttarakhand Devbhoomi biometric registration passes and helicopter ticket guidance.'
    },
    {
      title: '24/7 Mountain Emergency & High Altitude Support',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      answer:
        'Our ground operations team in Shimla, Manali, and Rishikesh operates around the clock. For high-altitude circuits like Spiti Valley and Chandratal, medical first-aid kits and emergency portable oxygen cylinders are arranged on board.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 my-6 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 border-b border-white/10 shrink-0">
          <div className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 24/7 Traveler Assistance
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
            HimYatra Help Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Everything you need for booking, payments, cancellations, permits, and 24/7 on-ground mountain support.
          </p>

          {/* Founder Direct Line Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/80 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 font-black flex items-center justify-center text-xs shadow-md shrink-0">
                AV
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Founder Direct Helpline:</span>
                  <strong className="text-white font-bold">{founderName}</strong>
                </div>
                <div className="text-[11px] text-teal-300">Himachal & Uttarakhand Tourism Director</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${founderPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition shadow-md shadow-teal-500/20"
              >
                <Phone className="w-3.5 h-3.5" /> Call Founder
              </a>
              <a
                href={`https://wa.me/917619917057?text=${encodeURIComponent('Hello Amit Verma! I need assistance regarding my HimYatra holiday booking.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Modal Body / FAQs */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">24/7 Operations</h4>
              <p className="text-slate-400 text-[11px]">Emergency support active at all mountain destinations.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">Safe UPI Payments</h4>
              <p className="text-slate-400 text-[11px]">Verified accounts with instant WhatsApp voucher receipts.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-sm">100% Pahadi Guides</h4>
              <p className="text-slate-400 text-[11px]">Native mountain drivers with deep terrain expertise.</p>
            </div>
          </div>

          {/* Frequently Asked Help Topics Accordion */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Help Topics
            </h3>

            <div className="space-y-2.5">
              {helpTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-950/80 border border-white/10 overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-teal-300 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      {topic.icon}
                      <span>{topic.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        activeFaq === idx ? 'rotate-180 text-teal-400' : ''
                      }`}
                    />
                  </button>

                  {activeFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/40">
                      {topic.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Help Channels */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/50 to-slate-950 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="font-bold text-white text-sm">Still have questions?</h4>
              <p className="text-slate-400 text-[11px]">Contact Founder Amit Verma directly via phone, WhatsApp, or email.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${founderEmail}`}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>Email Us</span>
              </a>
              <a
                href={`https://wa.me/917619917057`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Help</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
