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
    // Dark mode: Mystical twilight & celestial night sky over sacred Garhwal peaks (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=90',
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
    dark: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Radiant daytime turquoise Chandratal Lake & sunlit alpine peaks (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2560&q=90'
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    stateKey: 'Kashmir',
    location: 'Gulmarg & Dal Lake, Kashmir Valley',
    tag: 'Paradise on Earth',
    // Dark mode: Winter dusk & blue hour snow slopes of Gulmarg (Ultra HD 4K)
    dark: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2560&q=90',
    // Light mode: Sunlit alpine pines & snow-covered Gulmarg slopes under azure sky (Ultra HD 4K)
    light: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2560&q=90'
  }
];

export default function Hero({ onOpenBooking, onExploreClick, theme = 'dark', activeRegion = 'himachal', onSelectRegion }) {
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
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Outer ambient blur glow behind the framed hero container */}
      <div className={`absolute inset-x-12 top-28 bottom-12 rounded-[40px] blur-3xl -z-10 pointer-events-none transition-colors duration-700 ${
        theme === 'light'
          ? 'bg-gradient-to-r from-sky-400/25 via-teal-400/20 to-emerald-400/25'
          : 'bg-gradient-to-r from-teal-500/20 via-emerald-600/15 to-cyan-500/20'
      }`} />

      {/* Main Framed Hero Card Container */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] rounded-[28px] sm:rounded-[38px] overflow-hidden border border-white/20 shadow-2xl shadow-black/80 flex flex-col justify-between p-6 sm:p-12 lg:p-16 transition-all duration-700">
        
        {/* Dynamic Background Images with Smooth Cross-Fade Transitions */}
        {REGION_BACKGROUNDS.map((bg) => {
          const isActive = activeRegion === bg.id;
          const bgUrl = theme === 'light' ? bg.light : bg.dark;
          return (
            <div
              key={bg.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
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
          <div className="flex items-center gap-1.5 sm:gap-2 backdrop-blur-xl bg-slate-950/70 p-1.5 rounded-full border border-white/15 text-xs shadow-xl">
            <span className="text-slate-400 text-[11px] font-semibold px-2 hidden sm:inline">Featured:</span>
            {REGION_BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => onSelectRegion?.(bg.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer font-semibold ${
                  activeRegion === bg.id
                    ? 'bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-400/25 scale-105'
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

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.08]">
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
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Popular Now:</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">Manali & Solang</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">Kedarnath Yatra</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hidden sm:inline-block">Spiti 4x4 Circuit</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hidden md:inline-block">Rishikesh & Auli</span>
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
