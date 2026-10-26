import React from 'react';
import { ArrowDown, MapPin, Compass, ShieldCheck, Star, Sparkles, ChevronRight, Play } from 'lucide-react';

export const REGION_BACKGROUNDS = [
  {
    id: 'himachal',
    name: 'Himachal',
    stateKey: 'Himachal Pradesh',
    location: 'Solang Valley & Rohtang Pass, Himachal Pradesh',
    tag: 'Snow & Alpine Valleys',
    // Dark mode: Starry night over snowy Himachal Himalayan peaks (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Sun-drenched brilliant snowy Solang & Rohtang peaks under clear blue skies (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    stateKey: 'Uttarakhand',
    location: 'Kedarnath & Badrinath Peaks, Uttarakhand',
    tag: 'Sacred Devbhoomi',
    // Dark mode: Starlit celestial night sky over sacred Garhwal Himalayan peaks (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Bright daylight sacred Kedarnath & Badrinath sun-lit snow mountains (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'spiti',
    name: 'Spiti',
    stateKey: 'Spiti Valley',
    location: 'Spiti Valley & Chandratal Lake, Himachal Pradesh',
    tag: 'Trans-Himalayan Overland',
    // Dark mode: Famous Spiti Milky Way galaxy & starry night over cold desert peaks (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Radiant daytime turquoise Chandratal Lake & sunlit alpine peaks (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    stateKey: 'Kashmir',
    location: 'Gulmarg & Dal Lake, Kashmir Valley',
    tag: 'Paradise on Earth',
    // Dark mode: Kashmir Pir Panjal twilight mountain range (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1624773144987-fe51d68722cf?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Iconic sunlit Dal Lake Shikaras & snow mountain range Srinagar, Kashmir (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    stateKey: 'Uttar Pradesh',
    location: 'Shri Ram Janmabhoomi Teerth & Saryu Ghat, Ayodhya',
    tag: 'Divine Ram Mandir & Saryu Aarti',
    bgPosition: 'bg-[center_top] sm:bg-[center_12%]',
    // Dark mode: Consecrated Shri Ram Janmabhoomi Mandir illuminated at night (Ultra HD 4K)
    dark: '/destinations/ayodhya-dark.jpg',
    // Light mode: Magnificent carved stone Shri Ram Janmabhoomi Mandir in brilliant daylight (Ultra HD 4K)
    light: '/destinations/ayodhya-light.jpg'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    stateKey: 'Uttar Pradesh',
    location: 'Kashi Vishwanath & Dashashwamedh Ghat, Varanasi',
    tag: 'Eternal Spiritual Capital & Maha Ganga Aarti',
    // Dark mode: World-famous evening Ganga Aarti at Dashashwamedh Ghat with brass fire lamps (Ultra HD 4K)
    dark: '/destinations/varanasi-dark.jpg',
    // Light mode: Sunrise golden hour over historic holy river Ganga stone ghats & boats (Ultra HD 4K)
    light: '/destinations/varanasi-light.jpg'
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    stateKey: 'Ladakh',
    location: 'Pangong Tso & Nubra Valley, Ladakh',
    tag: 'High Mountain Passes & Turquoise Lakes',
    // Dark mode: Celestial starry night over Pangong Tso Lake cold desert (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1685555845405-1503f76a5462?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Iconic Pangong Tso azure turquoise lake & arid mountain passes (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1652204597589-962156b9483d?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    stateKey: 'Uttarakhand',
    location: 'Laxman Jhula & Triveni Ghat, Rishikesh, Uttarakhand',
    tag: 'World Yoga Capital & Divine Ganga',
    // Dark mode: Lord Shiva statue on River Ganga at Rishikesh illuminated at twilight (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1687735175748-a19b5adb7591?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Iconic Laxman Jhula suspension bridge spanning emerald River Ganga (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1718383538820-524dd564fd06?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    stateKey: 'Rajasthan',
    location: 'Amber Fort & Hawa Mahal, Jaipur, Rajasthan',
    tag: 'Royal Palaces, Forts & Desert Royalty',
    // Dark mode: Grand Amber Fort illuminated golden under starlit desert sky (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Pink sandstone Hawa Mahal palace facade in bright daylight (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'goa',
    name: 'Goa',
    stateKey: 'Goa',
    location: 'Palolem Beach & Arabian Sea Coastline, Goa',
    tag: 'Golden Sands & Azure Arabian Sea',
    // Dark mode: Twilight ocean waves and glowing coast (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Tropical palm-fringed golden beach and clear turquoise water (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    stateKey: 'Kerala',
    location: 'Alleppey Backwaters & Munnar Hills, Kerala',
    tag: 'God’s Own Country & Verdant Backwaters',
    // Dark mode: Peaceful evening traditional houseboat at dusk with lanterns (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Sunlit rolling emerald green Munnar tea plantations (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    stateKey: 'Sikkim',
    location: 'Mount Kanchenjunga & Tsomgo Lake, Sikkim',
    tag: 'Eastern Himalayan Kingdom & Monasteries',
    // Dark mode: Majestic Kanchenjunga peaks under starry night sky (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Sacred Sikkim alpine lake and Buddhist prayer flags (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    stateKey: 'Meghalaya',
    location: 'Living Root Bridges & Dawki River, Meghalaya',
    tag: 'Abode of Clouds & Crystal Waters',
    // Dark mode: Double Decker Living Root Bridge of Nongriat, Meghalaya (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1625654325562-762dcec9e6f2?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Crystal-clear turquoise water of Dawki River with floating boats (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1521437620269-f477f5437820?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    stateKey: 'Punjab',
    location: 'Sri Harmandir Sahib (Golden Temple), Amritsar',
    tag: 'Sacred Amrit Sarovar & Golden Sanctum',
    // Dark mode: Radiant Golden Temple illuminated night reflection in holy sarovar (Ultra HD 4K)
    dark: '/destinations/golden_temple_amritsar.jpg',
    // Light mode: Pure 24K gold temple shining under radiant clear blue sky (Ultra HD 4K)
    light: '/destinations/golden_temple_amritsar.jpg'
  }
];

export default function Hero({ onOpenBooking, onExploreClick, onQuickSearch, theme = 'dark', activeRegion = 'himachal', onSelectRegion }) {
  // Preload background images so switching between dark, light and regions is instant
  React.useEffect(() => {
    REGION_BACKGROUNDS.forEach((bg) => {
      const imgDark = new Image();
      imgDark.src = bg.dark;
      const imgLight = new Image();
      imgLight.src = bg.light;
    });
  }, []);

  const currentBg = REGION_BACKGROUNDS.find((b) => b.id === activeRegion) || REGION_BACKGROUNDS[0];

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Outer ambient blur glow behind the framed hero container */}
      <div className={`absolute inset-x-12 top-28 bottom-12 rounded-[40px] blur-3xl -z-10 pointer-events-none transition-colors duration-700 ${
        theme === 'light'
          ? 'bg-gradient-to-r from-sky-400/25 via-teal-400/20 to-emerald-400/25'
          : 'bg-gradient-to-r from-teal-500/20 via-emerald-600/15 to-cyan-500/20'
      }`} />

      {/* Main Framed Hero Card Container */}
      <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] rounded-[24px] sm:rounded-[38px] overflow-hidden border border-white/20 shadow-2xl shadow-black/80 flex flex-col justify-between p-4 sm:p-12 lg:p-16 transition-all duration-700">
        
        {/* Dynamic Background Images with Smooth Cross-Fade Transitions */}
        {REGION_BACKGROUNDS.map((bg) => {
          const isActive = activeRegion === bg.id;
          const bgUrl = theme === 'light' ? bg.light : bg.dark;
          return (
            <div
              key={bg.id}
              className={`absolute inset-0 bg-cover ${bg.bgPosition || 'bg-center'} transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 z-0'
                  : 'opacity-0 scale-105 pointer-events-none -z-10'
              }`}
              style={{ backgroundImage: `url(${bgUrl})` }}
            >
              {/* Overlays: dark vs light mode handling */}
              {theme === 'light' ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/35" />
                  <div className="absolute inset-0 bg-teal-900/15 mix-blend-overlay" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/50" />
                  <div className="absolute inset-0 bg-teal-950/20 mix-blend-color" />
                </>
              )}
            </div>
          );
        })}

        {/* Top Floating Badge inside Hero */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-xl bg-slate-950/70 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-medium shadow-lg transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <MapPin className="w-4 h-4 text-teal-400" />
            <span className="font-semibold">{currentBg.location}</span>
          </div>

          {/* Quick Region Switcher Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 backdrop-blur-2xl bg-slate-950/80 p-1.5 rounded-2xl sm:rounded-full border border-white/20 text-xs shadow-2xl max-w-full overflow-x-auto scrollbar-none py-1.5 px-2.5">
            <div className="flex items-center gap-1.5 text-teal-300 text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Featured:</span>
            </div>
            {REGION_BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => onSelectRegion?.(bg.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer font-bold whitespace-nowrap shrink-0 ${
                  activeRegion === bg.id
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black shadow-lg shadow-teal-400/40 scale-105 ring-2 ring-teal-200/50'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {bg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Middle Content: Headline on Left, Atmospheric Subtitle on Right (Pixel-matched to Reference) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-10 sm:py-16">
          
          {/* Left Column: Bold Typography matching reference "Unforgettable Travel Moments by Voyare" */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-teal-300 font-semibold text-xs sm:text-sm tracking-wider uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Premium Mountain Experiences</span>
            </div>

            <h1 className="text-[clamp(1.85rem,7vw,4.5rem)] font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.08]">
              Unforgettable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-teal-400">
                Himalayan Journeys
              </span> <br />
              <span className="text-white/95">by HimYatra</span>
            </h1>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">4.9 / 5</span>
                <span className="text-slate-400">(2,400+ Indian Travelers)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>100% Local Pahadi Drivers & Guides</span>
              </div>
            </div>
          </div>

          {/* Right Column: Atmospheric copy matching the reference screenshot */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <p className="text-base sm:text-lg lg:text-xl text-slate-200/90 leading-relaxed font-light backdrop-blur-sm bg-slate-950/30 p-4 sm:p-5 rounded-2xl border border-white/10">
              We take you beyond the ordinary, to mystical Himalayan peaks where cedar forests whisper, rivers roar, and every mountain pass turns into a story to tell.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBooking?.(null)}
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>Plan Your Journey</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#packages"
                className="backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-sm sm:text-base border border-white/20 hover:border-white/40 transition flex items-center gap-2"
              >
                <span>View Packages</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar inside Hero: Quick Tags on Left, Scroll Down Button on Right (Matching Reference) */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Popular Now:</span>
            <button
              onClick={() => onQuickSearch?.('Manali', 'Himachal Pradesh')}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-teal-500/20 hover:text-teal-300 backdrop-blur-md border border-white/10 text-white transition cursor-pointer text-xs"
            >
              Manali & Solang
            </button>
            <button
              onClick={() => onQuickSearch?.('Kedarnath', 'Uttarakhand')}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-teal-500/20 hover:text-teal-300 backdrop-blur-md border border-white/10 text-white transition cursor-pointer text-xs"
            >
              Kedarnath Yatra
            </button>
            <button
              onClick={() => onQuickSearch?.('Spiti', 'Himachal Pradesh')}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-teal-500/20 hover:text-teal-300 backdrop-blur-md border border-white/10 text-white transition cursor-pointer text-xs hidden sm:inline-block"
            >
              Spiti 4x4 Circuit
            </button>
            <button
              onClick={() => onQuickSearch?.('Rishikesh', 'Uttarakhand')}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-teal-500/20 hover:text-teal-300 backdrop-blur-md border border-white/10 text-white transition cursor-pointer text-xs hidden md:inline-block"
            >
              Rishikesh & Auli
            </button>
          </div>

          {/* Scroll Down Pill/Circle Button (Matching the down arrow button in bottom right of reference screenshot) */}
          <a
            href="#quick-search"
            aria-label="Scroll Down to Explore"
            className="w-12 h-12 rounded-full backdrop-blur-xl bg-slate-950/70 border border-white/20 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 transition-all duration-300 shadow-xl group hover:scale-110 active:scale-95"
          >
            <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform stroke-[2]" />
          </a>
        </div>

      </div>
    </section>
  );
}
