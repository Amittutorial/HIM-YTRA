import React, { useState } from 'react';
import { Sun, CloudSnow, CloudRain, Wind, Thermometer, CheckCircle, Compass, Mountain } from 'lucide-react';

export default function MountainGuide() {
  const [selectedMonth, setSelectedMonth] = useState('May');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthGuides = {
    Jan: {
      title: 'Peak Winter Snowfall & Ski Season',
      temp: '-5°C to 10°C',
      conditions: 'Heavy snow in high elevations. White wonderland in Manali, Kufri, Auli, Chopta.',
      bestFor: ['Auli Skiing', 'Solang Snow Games', 'Shimla Heritage Snow', 'Kedarnath is closed for winter'],
      clothing: 'Heavy thermal inners, down jacket, waterproof snow boots, woollen gloves and cap.',
      status: 'Atal tunnel open (subject to snow clearance). Spiti passes closed.'
    },
    Feb: {
      title: 'Fresh Powder Snow & Winter Romance',
      temp: '-2°C to 12°C',
      conditions: 'Crisp blue skies and thick snow cover across Manali, Dalhousie, and Mussoorie.',
      bestFor: ['Couples & Honeymoon', 'Khajjiar Snow Meadow', 'Chopta Winter Snow Trek', 'Rishikesh Camping'],
      clothing: 'Layered thermal clothing, windcheater, heavy woollens.',
      status: 'High mountain passes closed; regular highway corridors fully accessible.'
    },
    Mar: {
      title: 'Spring Thaw & Rhododendron Blossom',
      temp: '5°C to 18°C',
      conditions: 'Snow begins melting in lower valleys; scarlet rhododendron blossoms illuminate Chopta and Shimla.',
      bestFor: ['Tirthan Valley', 'Rishikesh River Rafting (Peak time)', 'Dharamshala McLeodganj', 'Nainital Lake Boating'],
      clothing: 'Light woollens for day; medium jacket for evenings.',
      status: 'Pleasant mountain roads, ideal for family holidays.'
    },
    Apr: {
      title: 'Pleasant Himalayan Spring Escape',
      temp: '10°C to 22°C',
      conditions: 'Sunny pleasant afternoons, cool crisp nights. Orchards in apple bloom.',
      bestFor: ['Shimla & Manali', 'Mussoorie & Dhanaulti', 'Jim Corbett Tiger Safaris', 'Kasol Parvati River'],
      clothing: 'Cotton shirts during daytime, light sweater or fleece jacket for evening.',
      status: 'Char Dham portal opening preparation begins.'
    },
    May: {
      title: 'Grand Summer Holiday & Char Dham Opening',
      temp: '14°C to 26°C',
      conditions: 'Perfect escape from the Indian plains heatwave. Kedarnath and Badrinath portals open for pilgrims.',
      bestFor: ['Kedarnath & Badrinath Yatra', 'Manali & Rohtang Pass', 'Auli Lush Green Meadows', 'Jibhi Treehouses'],
      clothing: 'Summer casuals with light jackets; warm woollens required at high-altitude shrines.',
      status: 'Peak summer season; early package reservation strongly advised.'
    },
    Jun: {
      title: 'High Altitude Passes Open & Spiti Circuit Starts',
      temp: '15°C to 28°C',
      conditions: 'Kunzum Pass and Rohtang fully open. Chandratal Lake accessible. Ideal for overland 4x4 road trips.',
      bestFor: ['Spiti Valley Expedition', 'Chandratal Lake Camping', 'Kinnaur & Chitkul', 'Solang Paragliding'],
      clothing: 'Comfortable adventure wear, sunglasses, sunblock SPF 50+, windbreakers.',
      status: 'All high Himalayan passes open for road travel.'
    },
    Jul: {
      title: 'Monsoon Greenery & Valley of Flowers Bloom',
      temp: '16°C to 24°C',
      conditions: 'Lush misty clouds; emerald green hills. Spiti stays completely rain-shadowed and dry!',
      bestFor: ['Valley of Flowers UNESCO Trek', 'Spiti Valley (Zero rain dry zone)', 'Hemkund Sahib', 'Monsoon Cafés'],
      clothing: 'Quick-dry clothes, waterproof trekking shoes, rain poncho / umbrella.',
      status: 'Spiti Valley dry & sunny; foothill roads monitored for monsoon showers.'
    },
    Aug: {
      title: 'Peak Blossom & Lush Apple Harvest',
      temp: '16°C to 25°C',
      conditions: 'Rare high-altitude alpine wildflowers in full carpet bloom in Chamoli. Apple picking begins in Kinnaur.',
      bestFor: ['Valley of Flowers', 'Chitkul & Sangla Valley', 'Dharamshala Rain Serenity', 'Spiti 4x4 Road Trip'],
      clothing: 'Rain jacket, waterproof bag covers, sturdy walking shoes.',
      status: 'High alpine valleys at their most vivid green.'
    },
    Sep: {
      title: 'Crystal Clear Autumn & High-Altitude Trekking',
      temp: '12°C to 22°C',
      conditions: 'Rains conclude; skies turn transparent sapphire blue with razor-sharp snow peak visibility.',
      bestFor: ['Kedarnath Darshan (Peaceful autumn)', 'Spiti Valley', 'Triund & Chandrashila Treks', 'Rishikesh Camping'],
      clothing: 'Light layers, warm fleece for night, camera with extra batteries.',
      status: 'One of the best months for photography and pilgrimage.'
    },
    Oct: {
      title: 'Golden Autumn & Festive Himalayan Holidays',
      temp: '8°C to 20°C',
      conditions: 'Chilly nights, brilliant sunny days, golden chinar leaves and crisp mountain air.',
      bestFor: ['Kullu Dussehra Celebration', 'Char Dham Final Autumn Darshan', 'Jim Corbett Jungle Safari Reopening', 'Nainital'],
      clothing: 'Medium woollens, warm thermals for nights.',
      status: 'Excellent road conditions before onset of severe winter.'
    },
    Nov: {
      title: 'Early Winter Frost & Serene Solitude',
      temp: '2°C to 16°C',
      conditions: 'Fresh snowfall begins dusting highest peaks. Off-peak tranquility with luxury hotel rates.',
      bestFor: ['Bir Billing Paragliding (World Cup season)', 'Rishikesh Rafting & Yoga', 'Dalhousie & McLeodganj', 'Corbett Safaris'],
      clothing: 'Warm jackets, thermal inner wear, woollen socks.',
      status: 'Char Dham portals close for winter with traditional idol descent.'
    },
    Dec: {
      title: 'Christmas & New Year Snow Festivities',
      temp: '-3°C to 12°C',
      conditions: 'Magical snowfall arrives across tourist towns. Christmas and New Year festive parties.',
      bestFor: ['Manali Snow & Mall Road parties', 'Auli Ski Resort', 'Shimla Christmas Carnival', 'Mussoorie Winterline'],
      clothing: 'Heavy winter gear, thermal gloves, snow shoes, insulated jackets.',
      status: 'High demand holiday period; advance cab & hotel booking required.'
    }
  };

  const current = monthGuides[selectedMonth];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="rounded-[36px] bg-slate-900/80 border border-white/10 p-6 sm:p-12 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Smart Himalayan Planner
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            Best Time to Visit: Month-by-Month Guide
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Select your intended travel month to see accurate expected temperatures, best destinations, road accessibility, and what to pack.
          </p>
        </div>

        {/* Month Selector Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`py-3 px-2 rounded-2xl text-xs font-bold transition text-center cursor-pointer ${
                selectedMonth === m
                  ? 'bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 scale-105'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/5'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Month Overview Card */}
        <div className="rounded-3xl bg-slate-950/80 border border-teal-500/20 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white font-['Outfit']">
                {selectedMonth} — {current.title}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold border border-teal-500/20">
              <Thermometer className="w-4 h-4 text-teal-400" />
              <span>Expected Temperature: {current.temp}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {current.conditions}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Top Recommended Spots for {selectedMonth}:</div>
              <div className="flex flex-wrap gap-2">
                {current.bestFor.map((spot, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-teal-300 text-xs font-semibold border border-teal-500/20">
                    ✓ {spot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-white/10">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Packing Checklist:</div>
              <p className="text-xs text-slate-300 leading-relaxed">{current.clothing}</p>
            </div>

            <div className="space-y-1 pt-3 border-t border-white/5">
              <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Road & Pass Status:</div>
              <p className="text-xs text-slate-300 leading-relaxed">{current.status}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
