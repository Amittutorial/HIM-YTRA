import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, MessageSquare, Star, MapPin } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import confetti from 'canvas-confetti';

export default function FindMyTripQuizModal({ isOpen, onClose, onSelectPackage, lang = 'en', t = (k) => k }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    budget: '',
    month: '',
    group: '',
    adventure: '',
    interest: ''
  });
  const [results, setResults] = useState(null);

  if (!isOpen) return null;

  const questions = [
    {
      id: 'budget',
      question: 'What is your preferred budget per person?',
      options: [
        { label: 'Budget Friendly', desc: '₹6,000 - ₹10,000 / person', value: 'budget' },
        { label: 'Comfort & Premium', desc: '₹10,000 - ₹18,000 / person', value: 'comfort' },
        { label: 'Luxury & Grand Pilgrimage', desc: '₹18,000 - ₹35,000 / person', value: 'luxury' }
      ]
    },
    {
      id: 'month',
      question: 'Which season / month do you plan to travel?',
      options: [
        { label: 'Summer Mountain Escape', desc: 'April to June (Pleasant weather & flowers)', value: 'summer' },
        { label: 'Autumn & Clear Skies', desc: 'September to November (Golden valley views)', value: 'autumn' },
        { label: 'Snow & Winter Wonderland', desc: 'December to March (Solang & Auli snow)', value: 'winter' },
        { label: 'Monsoon Greenery & Waterfalls', desc: 'July to August (Lush cedar slopes)', value: 'monsoon' }
      ]
    },
    {
      id: 'group',
      question: 'Who are you traveling with?',
      options: [
        { label: 'Honeymoon / Couple', desc: 'Romantic stays & scenic mountain sunsets', value: 'couple' },
        { label: 'Family with Kids & Elders', desc: 'Comfortable tempo/SUV, gentle pace & temples', value: 'family' },
        { label: 'Friends Group', desc: 'Adventure treks, bonfires & road trips', value: 'friends' },
        { label: 'Solo Wanderer', desc: 'Peace, monasteries & offbeat trails', value: 'solo' }
      ]
    },
    {
      id: 'adventure',
      question: 'What is your preferred activity & pace level?',
      options: [
        { label: 'Relaxed & Sightseeing', desc: 'Comfortable cab drives, café visits, zero strain', value: 'easy' },
        { label: 'Active & Nature Walks', desc: 'Day hikes, river rafting & ropeways', value: 'moderate' },
        { label: 'High Altitude & Raw Treks', desc: 'Cold desert 4x4 circuits, 3,500m+ passes', value: 'hard' }
      ]
    },
    {
      id: 'interest',
      question: 'What draws you most to the Himalayas?',
      options: [
        { label: 'Snow Peaks & Skiing', desc: 'Manali, Solang Valley, Atal Tunnel, Auli', value: 'snow' },
        { label: 'Sacred Devbhoomi & Dhams', desc: 'Kedarnath, Badrinath, Rishikesh Ganga Aarti', value: 'spiritual' },
        { label: 'Quiet Offbeat Valleys', desc: 'Jibhi wooden treehouses, Tirthan trout rivers', value: 'offbeat' },
        { label: 'Trans-Himalayan Cold Desert', desc: 'Spiti Valley ancient monasteries & Chandratal', value: 'spiti' }
      ]
    }
  ];

  const handleSelectOption = (field, value) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      calculateResults(updated);
    }
  };

  const calculateResults = (finalAnswers) => {
    // Score each package against traveler preferences
    const scored = TOUR_PACKAGES.map(pkg => {
      let score = 70; // baseline match

      if (finalAnswers.interest === 'spiritual' && (pkg.state === 'Uttarakhand' || pkg.category === 'Spiritual')) {
        score += 25;
      }
      if (finalAnswers.interest === 'snow' && (pkg.title.includes('Manali') || pkg.title.includes('Auli') || pkg.category === 'Adventure')) {
        score += 25;
      }
      if (finalAnswers.interest === 'spiti' && pkg.title.includes('Spiti')) {
        score += 28;
      }
      if (finalAnswers.interest === 'offbeat' && pkg.title.includes('Jibhi')) {
        score += 28;
      }

      if (finalAnswers.budget === 'budget' && pkg.price <= 10000) score += 15;
      if (finalAnswers.budget === 'comfort' && pkg.price > 10000 && pkg.price <= 20000) score += 15;
      if (finalAnswers.budget === 'luxury' && pkg.price > 18000) score += 15;

      if (finalAnswers.group === 'couple' && (pkg.category === 'Honeymoon' || pkg.idealFor?.includes('Couples'))) score += 10;
      if (finalAnswers.group === 'family' && (pkg.category === 'Family' || pkg.idealFor?.includes('Families'))) score += 10;

      return { ...pkg, matchScore: Math.min(score, 99) };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    const top3 = scored.slice(0, 3);
    setResults(top3);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ budget: '', month: '', group: '', adventure: '', interest: '' });
    setResults(null);
  };

  const currentQ = questions[step - 1];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl my-4 text-white overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        {!results ? (
          <div className="space-y-6">
            {/* Header with step progress */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-teal-400 mb-2">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> {lang === 'hi' ? 'मेरी हिमालय यात्रा खोजें' : 'Find My Himalayan Trip'} ({lang === 'hi' ? 'प्रश्न' : 'Question'} {step} {lang === 'hi' ? 'में से' : 'of'} 5)
                </span>
                <span>{step * 20}% {lang === 'hi' ? 'पूरा हुआ' : 'Completed'}</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${step * 20}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black font-['Outfit']">
                {currentQ.question}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'वह विकल्प चुनें जो आपकी यात्रा अपेक्षाओं से सबसे अच्छा मेल खाता हो।' : 'Choose the option that best fits your travel expectations.'}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, opt.value)}
                  className="w-full text-left p-4 rounded-2xl bg-slate-950/70 hover:bg-teal-500/15 border border-white/10 hover:border-teal-400/50 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Back Button */}
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 pt-2 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Question
              </button>
            )}
          </div>
        ) : (
          /* Results Section: 3 Top Matches */
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {lang === 'hi' ? '🎉 सही मिलान मिला' : '🎉 Perfect Match Found'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-['Outfit']">
                {lang === 'hi' ? 'शीर्ष 3 अनुशंसित हिमालय पैकेज' : 'Top 3 Recommended Himalayan Packages'}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                Based on your budget, travel group, and adventure preferences, here are the top 3 verified itineraries customized for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl bg-slate-950/80 border border-teal-500/30 p-4 flex flex-col justify-between space-y-3 relative shadow-xl"
                >
                  <div>
                    <div className="h-32 rounded-xl overflow-hidden relative mb-2">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-400 text-slate-950 shadow">
                        {pkg.matchScore}% Match
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white line-clamp-1">{pkg.title}</h4>
                    <p className="text-[11px] text-teal-300 line-clamp-1">{pkg.route}</p>
                    <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>⏱️ {pkg.duration}</span>
                      <span>⭐ {pkg.rating}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-400">Starting</span>
                      <span className="text-base font-black text-white font-['Outfit']">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectPackage(pkg);
                        }}
                        className="flex-1 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition cursor-pointer"
                      >
                        {lang === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                      </button>
                      <a
                        href={`https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I matched with "${pkg.title}" (₹${pkg.price}/person) in the Trip Quiz. Please share itinerary!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center cursor-pointer"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {lang === 'hi' ? 'क्विज़ दोबारा लें' : 'Retake Trip Quiz'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
