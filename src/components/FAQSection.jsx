import React, { useState } from 'react';
import { FAQS } from '../data/travelData';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Everything you need to know about booking, hill permits, road safety, and hotel stays in Himachal & Uttarakhand.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/70 border border-white/10 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition cursor-pointer"
              >
                <span className="font-bold text-white text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 text-teal-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-6 rounded-3xl bg-teal-950/30 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-bold text-white text-base">Have more custom queries about your upcoming trip?</h4>
          <p className="text-xs text-slate-300 mt-0.5">Our local mountain travel counselors are available 24/7 over call and WhatsApp.</p>
        </div>
        <a
          href="tel:+917619917057"
          className="px-6 py-3 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 whitespace-nowrap"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call Us: +91 76199 17057</span>
        </a>
      </div>
    </section>
  );
}
