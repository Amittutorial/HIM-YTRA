// HimYatra AI Travel Assistant Engine
// Comprehensive bilingual (English & Hindi) knowledge base & natural language response engine for Himalayan travel

export const HIMYATRA_PACKAGES = [
  {
    id: 'pkg-kashmir-paradise',
    title: 'Kashmir Paradise: Srinagar, Gulmarg & Houseboat',
    duration: '6D / 5N',
    price: '₹14,999',
    badge: 'Honeymoon Special',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
    category: 'Honeymoon',
    highlights: 'Dal Lake Sunset Shikara, Gulmarg Gondola, Private Houseboat Stay'
  },
  {
    id: 'pkg-himachal-magic',
    title: 'Magical Himachal: Shimla, Kullu & Manali with Atal Tunnel',
    duration: '6D / 5N',
    price: '₹13,499',
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    category: 'Family & Honeymoon',
    highlights: 'Atal Tunnel, Solang Snow Valley, Kufri, Mall Road Stroll'
  },
  {
    id: 'pkg-rajasthan-royalty',
    title: 'Royal Rajputana: Jaipur Pink City & Udaipur Lake Palace',
    duration: '6D / 5N',
    price: '₹13,999',
    badge: 'Royal Heritage',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    category: 'Honeymoon & Culture',
    highlights: 'Lake Pichola Boat Cruise, Amber Fort, Heritage Haveli Stays'
  },
  {
    id: 'pkg-chardham-complete',
    title: 'Complete Char Dham Yatra: Yamunotri, Gangotri, Kedarnath & Badrinath',
    duration: '10D / 9N',
    price: '₹24,999',
    badge: 'Sacred Pilgrimage',
    image: '/destinations/kedarnath.jpg',
    category: 'Spiritual',
    highlights: 'All 4 Dhams Darshan, VIP Pass Assistance, Experienced Mountain Driver'
  },
  {
    id: 'pkg-kedarnath-badrinath',
    title: 'Sacred Do Dham: Kedarnath Temple & Badrinath Shrine',
    duration: '6D / 5N',
    price: '₹18,999',
    badge: 'Devbhoomi Special',
    image: '/destinations/kedarnath.jpg',
    category: 'Spiritual',
    highlights: 'Kedarnath Aarti, Badrinath Darshan, Mana Village, Helicopter Support'
  },
  {
    id: 'pkg-spiti-circuit',
    title: 'Raw Spiti Valley 4x4 Circuit: Chandratal & Kaza',
    duration: '8D / 7N',
    price: '₹16,999',
    badge: 'High Altitude 4x4',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    category: 'Adventure',
    highlights: 'Key Monastery, Moon Lake Camping, Chicham Highest Bridge, Hikkim'
  },
  {
    id: 'pkg-uttarakhand-offbeat',
    title: 'Mini Switzerland: Chopta, Tungnath & Chandrashila Trek',
    duration: '5D / 4N',
    price: '₹8,999',
    badge: 'Snow & Summit Trek',
    image: '/destinations/chopta-tungnath.jpg',
    category: 'Trek & Adventure',
    highlights: 'Highest Shiva Temple Tungnath, Chandrashila 360° Summit, Deoriatal Lake'
  },
  {
    id: 'pkg-dharamshala-dalhousie',
    title: 'Tibetan Tranquility: Dharamshala, McLeodganj & Khajjiar',
    duration: '5D / 4N',
    price: '₹8,499',
    badge: 'Serene Escape',
    image: '/destinations/dharamshala.jpg',
    category: 'Family & Peaceful',
    highlights: 'Dalai Lama Temple, Triund Views, Khajjiar Mini Switzerland, HPCA Stadium'
  },
  {
    id: 'pkg-jibhi-tirthan-offbeat',
    title: 'Offbeat Himachal: Jibhi, Jalori Pass & Tirthan Valley',
    duration: '4D / 3N',
    price: '₹7,999',
    badge: 'Hidden Gem',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    category: 'Offbeat & Nature',
    highlights: 'Serolsar Lake Trek, Traditional Wooden Cottages, Trout River Fishing'
  },
  {
    id: 'pkg-ladakh-pangong',
    title: 'Himalayan Frontier: Leh Ladakh, Nubra & Pangong Tso',
    duration: '7D / 6N',
    price: '₹19,999',
    badge: 'Land of High Passes',
    image: 'https://images.unsplash.com/photo-1652204597589-962156b9483d?auto=format&fit=crop&w=800&q=80',
    category: 'Adventure',
    highlights: 'Pangong Blue Lake, Khardung La 17,582 ft, Nubra Sand Dunes Camels'
  },
  {
    id: 'pkg-ayodhya-kashi',
    title: 'Divine Ayodhya Ram Mandir & Kashi Vishwanath Yatra',
    duration: '5D / 4N',
    price: '₹12,499',
    badge: 'Featured Pilgrimage',
    image: '/destinations/ayodhya-full.jpg',
    category: 'Spiritual',
    highlights: 'Shri Ram Janmabhoomi VIP Darshan, Saryu Aarti, Kashi Vishwanath Corridor'
  },
  {
    id: 'pkg-amritsar-golden-heritage',
    title: 'Sacred Amritsar: Golden Temple, Wagah Border & Food Heritage',
    duration: '3D / 2N',
    price: '₹4,999',
    badge: 'Heritage & Budget',
    image: '/destinations/golden_temple_amritsar.jpg',
    category: 'Spiritual & Food',
    highlights: 'Golden Temple Darshan, World’s Largest Langar, Wagah Border Ceremony'
  }
];

export const CONTACT_INFO = {
  founder: 'Amit Verma',
  phone: '+91 76199 17057',
  whatsapp: '917619917057',
  email: 'amitpatel42203@gmail.com',
  offices: 'The Mall Road, Shimla (HP) & Tapovan, Rishikesh (UK)'
};

function formatCards(packages) {
  return packages.map(pkg =>
    `:::PACKAGE_CARD:::${JSON.stringify({
      title: pkg.title,
      duration: pkg.duration,
      price: pkg.price,
      pkgId: pkg.id,
      image: pkg.image,
      badge: pkg.badge
    })}:::END:::`
  ).join('\n');
}

/**
 * Detect language: 'en' for English, 'hi' for Hindi / Hinglish.
 */
export function detectLanguage(text, forcedLang = null) {
  if (forcedLang === 'en' || forcedLang === 'hi') return forcedLang;
  const t = (text || '').toLowerCase();

  // If user explicitly asks for language switch
  if (/(in english|speak english|talk in english|english please|switch to english)/i.test(t)) return 'en';
  if (/(in hindi|hindi me|hindi mein|talk in hindi|hindi please|switch to hindi)/i.test(t)) return 'hi';

  // Devanagari script detection
  if (/[\u0900-\u097F]/.test(t)) return 'hi';

  // Common Hindi / Hinglish words
  const hindiIndicators = [
    'kya', 'hai', 'hain', 'kaise', 'kahan', 'kaha', 'kitna', 'kitne', 'chahiye',
    'batao', 'batayein', 'mujhe', 'humko', 'hum', 'karo', 'jana', 'jaana', 'gadi',
    'gaadi', 'kiraya', 'kiraye', 'shadi', 'shaadi', 'bheed', 'kab', 'sasta',
    'accha', 'achi', 'bhai', 'aap', 'tum', 'namaste', 'pranam', 'dham', 'yatra',
    'bolo', 'kripya', 'shamil'
  ];

  const words = t.split(/\s+/);
  const matchCount = words.filter(w => hindiIndicators.includes(w)).length;
  if (matchCount > 0) return 'hi';

  return 'en';
}

/**
 * Generate intelligent, contextual travel responses in English or Hindi.
 */
export function getSmartAssistantResponse(userQuery, langChoice = null) {
  const rawQ = userQuery || '';
  const q = rawQ.toLowerCase().trim();
  const lang = detectLanguage(rawQ, langChoice);
  const isEn = lang === 'en';

  // 1. GREETINGS & CASUAL
  if (/^(hi|hello|hii|heyy|heya|namaste|pranam|hola|good morning|good evening|good afternoon|kaise ho|kya haal)(\s|$|[!?.])/i.test(q)) {
    if (isEn) {
      return `Hello! 🙏 Welcome to **HimYatra**! I am your personal AI Mountain Travel Guide.

How can I help you today?
• 💑 **Honeymoon Specials** (Kashmir, Manali, Udaipur)
• 🛕 **Char Dham & Kedarnath Yatra 2026** (Dates, Registration & Helicopter)
• 🚖 **Cab Rentals with Fixed Fares** (Delhi / Chandigarh to Hills)
• 🏔️ **Adventure & Treks** (Spiti Valley 4x4, Ladakh, Chopta-Tungnath)
• 👨‍👩‍👧 **Family Mountain Holidays**

Tell me your destination preference, travel month, or budget, and I'll recommend the best packages instantly!`;
    }
    return `Namaste! 🙏 Welcome to **HimYatra**! Main aapka personal AI Mountain Travel Guide hoon.

Aap kahan ghoomna chahte hain?
• 💑 **Honeymoon Specials** (Kashmir, Manali, Udaipur)
• 🛕 **Char Dham & Kedarnath Yatra 2026** (Registration & Heli Booking)
• 🚖 **Cab Rentals with Fixed Fares** (Delhi/Chandigarh se Hills)
• 🏔️ **Adventure & Treks** (Spiti 4x4, Ladakh, Chopta)
• 👨‍👩‍👧 **Family Mountain Holidays**

Bataiye, aapka travel month, destination ya budget kya hai? Main turant aapke liye best package plan karunga! 😊`;
  }

  // 2. HONEYMOON PACKAGES
  if (/(honeymoon|couple|romantic|candle|candlelight|shadi|shaadi|wedding|anniversary|patni|biwi|wife|husband)/i.test(q)) {
    const honeymoonPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-kashmir-paradise'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-himachal-magic'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-rajasthan-royalty')
    ].filter(Boolean);

    if (isEn) {
      return `💖 **HimYatra Romantic & Honeymoon Specials!**
Congratulations on your special journey! Here are our 3 most celebrated Himalayan honeymoon packages:

1. **Kashmir Paradise (6D/5N — ₹14,999/person)**: Private sunset Shikara on Dal Lake, romantic luxury houseboat stay, candlelight dinner & snow gondola in Gulmarg!
2. **Magical Himachal & Manali (6D/5N — ₹13,499/person)**: Cozy mountain resorts, snow views at Solang Valley, Atal Tunnel to Sissu, and a dedicated private cab.
3. **Royal Udaipur & Lake Palace (6D/5N — ₹13,999/person)**: Romantic evening boat cruise on shimmering Lake Pichola and royal heritage haveli stays.

✨ **Complimentary Honeymoon Inclusions:**
• Welcome cake & flower bed decor (on request)
• Daily buffet breakfast & romantic dinners
• 100% private sanitized cab (Complete privacy, no sharing)
• 24/7 on-ground Pahadi manager support

Tap **"View Details"** below to see full day-by-day itineraries or connect on WhatsApp for custom dates:

${formatCards(honeymoonPkgs)}`;
    }

    return `💖 **HimYatra Romantic & Honeymoon Specials!**
Congratulations on your special journey! Himalayan valleys mein romance ke liye humare best 3 curated packages hain:

1. **Kashmir Paradise (6D/5N — ₹14,999/person)** — Dal Lake private shikara ride, sunset candle-light dinner on a heritage cedar houseboat, and snow gondola in Gulmarg!
2. **Magical Himachal & Manali (6D/5N — ₹13,499/person)** — Solang snow slopes, cozy wooden mountain resort, Atal Tunnel & private cab.
3. **Royal Udaipur & Lake Palace (6D/5N — ₹13,999/person)** — Sunset boat cruise on Lake Pichola and royal heritage haveli stays.

✨ **Special Honeymoon Inclusions:**
• Welcome cake & flower bed decoration (on request)
• Daily breakfast & romantic dinners
• Dedicated sanitized private cab (Complete privacy)
• 24/7 on-ground Pahadi tour manager support

Neeche diye gaye packages check karein ya direct WhatsApp par custom dates ke saath connect karein:

${formatCards(honeymoonPkgs)}`;
  }

  // 3. CHAR DHAM / KEDARNATH / BADRINATH / SPIRITUAL
  if (/(char\s*dham|chardham|kedarnath|badrinath|gangotri|yamunotri|do\s*dham|dham|darshan|helicopter|heli|yatra|shiva|jyotirlinga)/i.test(q)) {
    const spiritualPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-chardham-complete'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-kedarnath-badrinath'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-ayodhya-kashi')
    ].filter(Boolean);

    if (isEn) {
      return `🛕 **Sacred Devbhoomi Char Dham Yatra 2026**
Har Har Mahadev! HimYatra provides complete, comfortable, and spiritually fulfilling pilgrimage arrangements:

📌 **Key 2026 Yatra Highlights:**
• **Season:** Portals (Kapat) open in May (Akshaya Tritiya) and close around Diwali / Bhai Dooj (November).
• **Biometric Registration:** Our team assists you with free official biometric yatra registration.
• **Helicopter Bookings:** Confirmed shuttle booking guidance from Phata, Guptkashi, and Sirsi.
• **Sanitized Stays:** Clean, comfortable pilgrim-friendly hotels at Sonprayag, Guptkashi, and Badrinath.
• **Expert Mountain Pilots:** Verified drivers who know every curve of the Garhwal Himalayas.

Check our popular spiritual itineraries below:

${formatCards(spiritualPkgs)}`;
    }

    return `🛕 **Sacred Devbhoomi Char Dham Yatra 2026**
Har Har Mahadev! HimYatra ensures a seamless, comfortable, and deeply spiritual pilgrimage for you and your family:

📌 **Key Yatra Details & Assistance:**
• **Season:** Kapat May (Akshaya Tritiya) mein khulte hain aur Diwali/Bhai Dooj tak khule rehte hain.
• **Biometric Registration:** Humari team official biometric registration me complete madad karti hai.
• **Helicopter Booking:** Phata, Sirsi, aur Guptkashi se Kedarnath Heli shuttle ticket guidance.
• **Comfortable Stays:** Sonprayag, Guptkashi, Badrinath mein best sanitized hotels.
• **Pahadi Mountain Drivers:** Experienced hilly-route drivers with private cabs.

Ye rahe humare top spiritual packages:

${formatCards(spiritualPkgs)}`;
  }

  // 4. CAB RENTALS / TAXI FARES / VEHICLE
  if (/(cab|taxi|rental|fare|rate|price|kiraya|car|innova|ertiga|sedan|dzire|tempo|traveller|delhi to|chandigarh to|haridwar to)/i.test(q)) {
    if (isEn) {
      return `🚖 **HimYatra Verified Fixed-Route Cab Rentals**
We provide dedicated, sanitized private vehicles with **expert local Pahadi drivers**. All rates are all-inclusive with **zero hidden charges** (Fuel, toll taxes, state permits, and driver night allowances included!).

📋 **Popular Fixed Route One-Way Fares:**
• **Delhi ➔ Manali:** Sedan (Dzire/Etios) **₹5,500** | SUV (Innova/Ertiga) **₹7,500** | 12-Seater Tempo **₹12,000**
• **Delhi ➔ Shimla:** Sedan **₹4,000** | SUV **₹6,000** | Tempo **₹10,000**
• **Delhi ➔ Haridwar / Rishikesh:** Sedan **₹3,500** | SUV **₹5,500** | Tempo **₹9,500**
• **Haridwar ➔ Sonprayag (Kedarnath):** SUV **₹6,500** | Tempo **₹11,000**
• **Chandigarh ➔ Manali:** Sedan **₹3,500** | SUV **₹5,500**
• **Delhi ➔ Dharamshala:** Sedan **₹5,000** | SUV **₹7,000** | Tempo **₹11,000**

✨ **Why Choose HimYatra Cabs?**
1. 100% verified mountain drivers experienced in Himalayan terrain.
2. Luggage carrier & clean air-conditioned vehicles.
3. Punctual doorstep pickup from airport, station, or hotel.

You can also use our **Cab Calculator** tool on the website or message us to book instantly!`;
    }

    return `🚖 **HimYatra Verified Fixed-Route Cab Rentals**
Hum provide karte hain **private, verified Pahadi drivers** ke saath fully sanitized vehicles, bina kisi hidden charges ke (All state tax, toll tax, fuel, and driver night allowances included!).

📋 **Popular Fixed Route One-Way Fares:**
• **Delhi ➔ Manali:** Sedan (Dzire/Etios) **₹5,500** | SUV (Innova/Ertiga) **₹7,500** | 12-Seater Tempo **₹12,000**
• **Delhi ➔ Shimla:** Sedan **₹4,000** | SUV **₹6,000** | Tempo **₹10,000**
• **Delhi ➔ Haridwar / Rishikesh:** Sedan **₹3,500** | SUV **₹5,500** | Tempo **₹9,500**
• **Haridwar ➔ Sonprayag (Kedarnath Base):** SUV **₹6,500** | Tempo **₹11,000**
• **Chandigarh ➔ Manali:** Sedan **₹3,500** | SUV **₹5,500**
• **Delhi ➔ Dharamshala:** Sedan **₹5,000** | SUV **₹7,000** | Tempo **₹11,000**

✨ **HimYatra Cabs ke Fayde:**
1. Hilly terrain ke certified local Pahadi drivers.
2. Clean AC cabs with carrier.
3. On-time doorstep pickup from airport or railway station.

Aap website par **"Cab Rentals"** section mein online route calculator bhi use kar sakte hain!`;
  }

  // 5. SPITI VALLEY / LADAKH / RAW ADVENTURE
  if (/(spiti|ladakh|leh|pangong|chandratal|kaza|4x4|biking|bullet|hikkim|chicham|tabo|nubra|khardung)/i.test(q)) {
    const advPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-spiti-circuit'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-ladakh-pangong'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-uttarakhand-offbeat')
    ].filter(Boolean);

    if (isEn) {
      return `🏔️ **High-Altitude Spiti & Ladakh 4x4 Expeditions**
Ready to explore the highest trans-Himalayan motorable roads? We provide high-clearance 4x4 SUVs, experienced mountain drivers, and oxygen-equipped backup:

✨ **Spiti Valley Highlights:**
• 1000-year-old Key & Tabo Monasteries
• Stargazing & Camping at crescent Chandratal Lake
• Send a postcard from the World's Highest Post Office in Hikkim
• Cross Chicham Bridge (Asia's highest suspension bridge)

✨ **Ladakh Highlights:**
• Blue crystal waters of Pangong Tso Lake
• Khardung La Pass (17,582 ft)
• Double-humped camel safari at Nubra white sand dunes

⚠️ *Altitude Safety:* Day 1 rest and proper hydration are mandatory for smooth acclimatization.

${formatCards(advPkgs)}`;
    }

    return `🏔️ **High Altitude Spiti & Ladakh 4x4 Expeditions**
Himalayas ke sabse thrilling trans-Himalayan desert circuits ke liye HimYatra offer karta hai dedicated high-clearance 4x4 SUVs aur certified mountain drivers:

✨ **Spiti Valley Highlights:**
• 1000-year-old Key & Tabo Monasteries
• Stargazing & Camping at turquoise Crescent Chandratal Lake
• World's Highest Post Office at Hikkim
• Chicham Bridge (Asia's highest suspension bridge)

✨ **Ladakh Highlights:**
• Color-changing Pangong Tso Lake
• Khardung La Pass (17,582 ft)
• Nubra Valley double-humped Bactrian camel safari

⚠️ *Health Tip:* High altitude trips par Day 1 rest aur hydration zaroori hota hai.

${formatCards(advPkgs)}`;
  }

  // 6. FAMILY HOLIDAYS
  if (/(family|parents|bachhe|kids|children|elderly|senior citizen|safe|peaceful|parivar)/i.test(q)) {
    const familyPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-himachal-magic'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-dharamshala-dalhousie'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-rajasthan-royalty')
    ].filter(Boolean);

    if (isEn) {
      return `👨‍👩‍👧‍👦 **HimYatra Family Vacation Packages**
For family holidays, comfort, hygienic food, gentle driving, and an easy pace are top priorities:

🌟 **Top Family Recommendations:**
1. **Magical Himachal (Shimla & Manali):** Toy train views, safe scenic Kufri amusement park, Mall Road shopping, and snow fun at Solang.
2. **Dharamshala & Mini-Switzerland Khajjiar:** Peaceful pine forests, Dalai Lama temple, cricket stadium, and green meadows of Khajjiar.
3. **Royal Rajasthan:** Grand palaces, cultural folk shows, and boat rides with zero steep walking.

All family packages include spacious rooms, pure-veg options, and senior/child-friendly assistance:

${formatCards(familyPkgs)}`;
    }

    return `👨‍👩‍👧‍👦 **HimYatra Family Vacation Packages**
Family trip ke liye sabse important hota hai **comfort, safe driving, hygienic food, aur easy-paced itineraries**:

🌟 **Top Family Recommendations:**
1. **Magical Himachal (Shimla & Manali):** Toy train views, safe scenic Kufri amusement park, Mall Road shopping, and snow activities at Solang.
2. **Dharamshala & Mini-Switzerland Khajjiar:** Peaceful pine forests, Dalai Lama temple, cricket stadium, and green meadows of Khajjiar.
3. **Royal Rajasthan:** Grand palaces, cultural folk shows, and boat rides with zero steep walking.

Sabhi family packages mein spacious rooms, pure-veg food options, aur child/senior-citizen friendly assistance shamil hai:

${formatCards(familyPkgs)}`;
  }

  // 7. BEST TIME TO VISIT / WEATHER / SNOW
  if (/(best time|weather|snow|snowfall|barf|winter|summer|monsoon|kab jaye|temperature|month|december|january|february|march|april|may|june|july|august|september|october|november)/i.test(q)) {
    if (isEn) {
      return `🌤️ **Best Time to Visit Himachal Pradesh & Uttarakhand**

❄️ **Winter & Snow Season (December to February):**
• **Top Destinations:** Manali, Solang Valley, Kufri, Auli (Skiing), Chopta, Gulmarg.
• **Vibe:** Fresh snowfall, winter sports, skiing, cozy bonfire evenings.

🌸 **Spring & Summer Escape (March to June):**
• **Top Destinations:** Shimla, Dharamshala, Manali, Nainital, Mussoorie, Rishikesh, Kashmir.
• **Vibe:** Pleasant weather (15°C - 25°C), escaping summer heat, river rafting, blooming apple orchards.

🌧️ **Monsoon & Lush Meadows (July to August):**
• **Top Destinations:** Valley of Flowers (peak bloom!), Kinnaur, Spiti (rain-shadow zone).
• **Vibe:** Verdant green hills, waterfalls in full glory.

🍂 **Autumn & Clear Himalayan Views (September to November):**
• **Top Destinations:** Char Dham Yatra, Spiti Valley, Ladakh, Chopta-Chandrashila.
• **Vibe:** Crystal-clear blue skies, golden sunsets, best photography season!

Which month are you planning to travel? Tell me, and I'll give you exact route and weather status!`;
    }

    return `🌤️ **Best Time to Visit Himachal Pradesh & Uttarakhand**

❄️ **Winter & Snow Season (December to February):**
• **Top Destinations:** Manali, Solang Valley, Kufri, Auli (Skiing), Chopta, Gulmarg.
• **Vibe:** Live snowfall, skiing, cozy bonfire stays.

🌸 **Spring & Summer Escape (March to June):**
• **Top Destinations:** Shimla, Dharamshala, Manali, Nainital, Mussoorie, Rishikesh, Kashmir.
• **Vibe:** Pleasant weather (15°C - 25°C), escaping heat, river rafting, blooming apple orchards.

🌧️ **Monsoon & Lush Meadows (July to August):**
• **Top Destinations:** Valley of Flowers (peak bloom!), Kinnaur, Spiti.
• **Vibe:** Lush green valleys and full waterfalls.

🍂 **Autumn & Clear Views (September to November):**
• **Top Destinations:** Char Dham Yatra, Spiti Valley, Ladakh, Chopta-Chandrashila.
• **Vibe:** Clear blue skies, golden sunsets, best photography season!

Aap kis month mein travel plan kar rahe hain? Bataiye, main specific weather update share karunga!`;
  }

  // 8. TREKS & SUMMITS / ADVENTURE SPORTS
  if (/(trek|trekking|hiking|summit|tungnath|chandrashila|triund|kheerganga|paragliding|rafting|skiing)/i.test(q)) {
    const trekPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-uttarakhand-offbeat'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-jibhi-tirthan-offbeat'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-spiti-circuit')
    ].filter(Boolean);

    if (isEn) {
      return `🥾 **Himalayan Treks & Adventure Tours**
Looking to experience breathtaking mountain trails? Our guided treks are suitable for both beginners and seasoned hikers:

1. **Chopta-Tungnath-Chandrashila (Uttarakhand):**
   • Altitude: 4,000m (Highest Shiva temple on Earth!).
   • Highlights: 360° summit views of Nanda Devi, Chaukhamba & Trishul peaks!
2. **Triund Day Trek (McLeodganj):** Beautiful walk along Dhauladhar ridges with mountain café stops.
3. **Adventure Activities:** Paragliding at Solang, River Rafting in Kullu & Rishikesh, Skiing in Auli.

Includes certified mountain guides, quality camping gear, and warm meals:

${formatCards(trekPkgs)}`;
    }

    return `🥾 **Himalayan Treks & Adventure Tours**
Himalayas ke breathtaking trails par trekking karna chahte hain? Humare guided treks beginners aur experienced dono ke liye perfect hain:

1. **Chopta-Tungnath-Chandrashila (Uttarakhand):**
   • Altitude: 4,000m (Highest Shiva temple on Earth!).
   • 360° panoramic view of Nanda Devi, Chaukhamba & Trishul peaks!
2. **Triund Day Trek (McLeodganj):** Beautiful walk along Dhauladhar ridges.
3. **Adventure Sports:** Paragliding at Solang, River Rafting in Kullu & Rishikesh, Skiing in Auli.

Certified mountain guides, quality camping gear, aur meals shamil hain:

${formatCards(trekPkgs)}`;
  }

  // 9. BUDGET / CHEAP / LOW PRICE
  if (/(budget|cheap|sasta|low price|kam paise|discount|offer|under 5000|under 10000|under 15000)/i.test(q)) {
    const budgetPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-amritsar-golden-heritage'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-jibhi-tirthan-offbeat'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-dharamshala-dalhousie')
    ].filter(Boolean);

    if (isEn) {
      return `💰 **HimYatra Value & Budget Packages (Under ₹10,000 per person)**
Affordable travel without compromising on hygiene or safety! We maintain our own verified cab fleet and direct hotel partnerships:

1. **Sacred Amritsar Heritage (3D/2N):** Starting at just **₹4,999/person**! (Golden Temple + Wagah Border + Food Walk)
2. **Offbeat Jibhi & Tirthan (4D/3N):** Starting at **₹7,999/person**! (Hidden streams & cozy wooden cottages)
3. **Dharamshala & Khajjiar (5D/4N):** Starting at **₹8,499/person**!

${formatCards(budgetPkgs)}

Use coupon code **HIM1000** for an additional discount on custom bookings!`;
    }

    return `💰 **HimYatra Value & Budget Packages (Under ₹10,000 per person)**
Quality se compromise kiye bina affordable travel! Hum direct local hoteliers aur cab fleet maintain karte hain:

1. **Sacred Amritsar Heritage (3D/2N):** Starting at just **₹4,999/person**!
2. **Offbeat Jibhi & Tirthan (4D/3N):** Starting at **₹7,999/person**!
3. **Dharamshala & Khajjiar (5D/4N):** Starting at **₹8,499/person**!

${formatCards(budgetPkgs)}

Coupon code **HIM1000** use karne par custom bookings par extra discount bhi available hai!`;
  }

  // 10. INCLUSIONS & EXCLUSIONS
  if (/(inclusion|exclusion|kya milega|hotel|food|meals|breakfast|dinner|khana|stay)/i.test(q)) {
    if (isEn) {
      return `🏨 **What is Included in HimYatra Tour Packages?**

✅ **All Inclusions:**
• **Hotels & Stays:** 3-Star & 4-Star sanitized mountain view rooms, valley resorts, or luxury houseboats.
• **Meals:** Daily buffet breakfast and hot delicious dinner included.
• **Private Cab:** Dedicated vehicle (Dzire / Innova / Tempo) for your entire trip with pickup & drop.
• **All Vehicle Charges:** Fuel, state entry permits, toll taxes, parking fees, and driver night allowances.
• **Sightseeing:** All points as per the day-by-day confirmed itinerary.
• **24x7 Assistance:** Dedicated local trip manager on call throughout your journey.

❌ **Exclusions:**
• Personal shopping, train/air tickets (unless requested), lunches, and entry tickets for special adventure activities (paragliding/rafting).`;
    }

    return `🏨 **What is Included in HimYatra Packages?**

✅ **All Inclusions:**
• **Hotels & Stays:** 3-Star & 4-Star sanitized mountain view rooms, valley resorts, or luxury houseboats.
• **Meals:** Daily buffet breakfast and hot delicious dinner included.
• **Private Cab:** Dedicated vehicle (Dzire / Innova / Tempo) for your entire trip with pickup & drop.
• **All Vehicle Charges:** Fuel, state entry permits, toll taxes, parking fees, and driver night allowances.
• **Sightseeing:** All points as per the day-by-day confirmed itinerary.
• **24x7 Assistance:** Dedicated local trip manager on call throughout your journey.

❌ **Exclusions:**
• Personal shopping, train/air tickets (unless requested), lunches, and entry tickets for adventure activities.`;
  }

  // 11. BOOKING PROCESS, ADVANCE & REFUND POLICY
  if (/(how to book|booking kaise|advance|payment|refund|cancellation|cancel|policy|upi|card|netbanking)/i.test(q)) {
    if (isEn) {
      return `💳 **HimYatra Booking & Cancellation Policy**

🔹 **Easy 3-Step Booking:**
1. **Choose Package / Custom Plan:** Confirm your dates, destination, and traveler count.
2. **Only 30% Advance Deposit:** Pay a 30% token advance to reserve your hotel rooms and dedicated cab (UPI, Credit/Debit Card, Netbanking).
3. **Instant Confirmation Voucher:** Receive your official itinerary voucher, hotel receipts, and driver details on WhatsApp and Email.
*The remaining 70% balance is payable upon arrival at your destination!*

🛡️ **100% Transparent Cancellation:**
• **15+ days before trip:** 100% Full Refund (Zero cancellation fee).
• **7 to 14 days before:** 50% refund.
• **Free Rescheduling:** Date modification at zero extra charge subject to hotel availability.`;
    }

    return `💳 **HimYatra Booking & Cancellation Policy**

🔹 **Easy 3-Step Booking:**
1. **Choose Package / Custom Plan:** Apni dates, destination, aur traveler count confirm karein.
2. **Only 30% Advance Deposit:** Cab aur hotels reserve karne ke liye sirf 30% token advance dena hota hai (UPI, Card, Bank Transfer).
3. **Instant Confirmation Voucher:** Payment ke baad aapko official itinerary voucher, hotel receipts, aur driver details WhatsApp/Email par mil jati hain.
*Remaining 70% balance aap destination par arrival ke samay pay kar sakte hain!*

🛡️ **100% Transparent Cancellation:**
• **15+ days before trip:** 100% Full Refund (Zero cancellation fee).
• **7 to 14 days before:** 50% refund.
• **Free Rescheduling:** Date change request available at zero extra charge subject to hotel availability.`;
  }

  // 12. CONTACT / FOUNDER / TALK TO HUMAN / HELP
  if (/(human|person|talk|call|phone|number|mobile|whatsapp|contact|support|agent|owner|founder|amit verma|office|help|email|gmail)/i.test(q)) {
    if (isEn) {
      return `📞 **HimYatra Direct Contact & Support Desk**
You can directly reach out to our founder and Himalayan travel specialists:

• 👤 **Founder & Lead Specialist:** Amit Verma
• 📱 **Direct Call & WhatsApp:** +91 76199 17057
• ✉️ **Official Email:** amitpatel42203@gmail.com
• 🏢 **Desks:** The Mall Road, Shimla (HP) & Tapovan, Rishikesh (Uttarakhand)
• ⏰ **Support Hours:** 24/7 on-trip assistance!

Tap **"Talk to Human on WhatsApp"** below to start an instant direct chat! 🙏`;
    }

    return `📞 **HimYatra Direct Contact & Support Desk**
Aap direct humare founder aur Himalayan travel experts se baat kar sakte hain:

• 👤 **Founder & Lead Specialist:** Amit Verma
• 📱 **Direct Call & WhatsApp:** +91 76199 17057
• ✉️ **Official Email:** amitpatel42203@gmail.com
• 🏢 **Desks:** The Mall Road, Shimla (HP) & Tapovan, Rishikesh (Uttarakhand)
• ⏰ **Support Hours:** 24/7 on-trip assistance!

Neeche diya gaya **"Talk to Human on WhatsApp"** button dabayein, aur hum turant aapse jud jayenge! 🙏`;
  }

  // 13. PLAN MY TRIP / CUSTOM ITINERARY
  if (/(plan|custom|build|itinerary|confused|help me choose|suggest|recommend)/i.test(q)) {
    const featuredPkgs = [
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-himachal-magic'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-kashmir-paradise'),
      HIMYATRA_PACKAGES.find(p => p.id === 'pkg-chardham-complete')
    ].filter(Boolean);

    if (isEn) {
      return `🗺️ **Let's Plan Your Dream Himalayan Trip!**
I can tailor-make a custom itinerary for you. Tell me these 3 quick details:

1. **Your dream destination:** Himachal (Manali/Shimla), Uttarakhand (Char Dham/Rishikesh), Kashmir, or Spiti?
2. **Traveler count & trip style:** Couple/Honeymoon, Family, Friends, or Solo?
3. **Number of days & rough budget:** How many days are you planning?

In the meantime, take a look at our 3 all-time bestseller packages:

${formatCards(featuredPkgs)}`;
    }

    return `🗺️ **Let's Plan Your Dream Himalayan Trip!**
Main aapke liye tailored itinerary bana sakta hoon. Mujhe yeh 3 choti baatein bataiye:

1. **Aapka dream region:** Himachal (Manali/Shimla), Uttarakhand (Char Dham/Rishikesh), Kashmir, ya Spiti?
2. **Kitne log aur trip type:** Couple/Honeymoon, Family, Friends ya Solo?
3. **Kitne din aur budget:** Kitne dino ki trip plan kar rahe hain?

Tab tak aap humare 3 highest-rated bestseller packages dekh sakte hain:

${formatCards(featuredPkgs)}`;
  }

  // 14. SPECIFIC DESTINATION KEYWORD LOOKUP
  const destinationKeywords = [
    { key: 'kashmir', id: 'pkg-kashmir-paradise' },
    { key: 'manali', id: 'pkg-himachal-magic' },
    { key: 'shimla', id: 'pkg-himachal-magic' },
    { key: 'spiti', id: 'pkg-spiti-circuit' },
    { key: 'kedarnath', id: 'pkg-kedarnath-badrinath' },
    { key: 'badrinath', id: 'pkg-kedarnath-badrinath' },
    { key: 'chopta', id: 'pkg-uttarakhand-offbeat' },
    { key: 'tungnath', id: 'pkg-uttarakhand-offbeat' },
    { key: 'dharamshala', id: 'pkg-dharamshala-dalhousie' },
    { key: 'dalhousie', id: 'pkg-dharamshala-dalhousie' },
    { key: 'khajjiar', id: 'pkg-dharamshala-dalhousie' },
    { key: 'jibhi', id: 'pkg-jibhi-tirthan-offbeat' },
    { key: 'tirthan', id: 'pkg-jibhi-tirthan-offbeat' },
    { key: 'ladakh', id: 'pkg-ladakh-pangong' },
    { key: 'leh', id: 'pkg-ladakh-pangong' },
    { key: 'amritsar', id: 'pkg-amritsar-golden-heritage' },
    { key: 'ayodhya', id: 'pkg-ayodhya-kashi' },
    { key: 'kashi', id: 'pkg-ayodhya-kashi' },
    { key: 'varanasi', id: 'pkg-ayodhya-kashi' },
    { key: 'udaipur', id: 'pkg-rajasthan-royalty' },
    { key: 'jaipur', id: 'pkg-rajasthan-royalty' }
  ];

  const matchedDest = destinationKeywords.filter(d => q.includes(d.key));
  if (matchedDest.length > 0) {
    const matchedPkgs = matchedDest
      .map(m => HIMYATRA_PACKAGES.find(p => p.id === m.id))
      .filter((p, index, self) => p && self.findIndex(t => t.id === p.id) === index)
      .slice(0, 3);

    const placeName = matchedDest[0].key.toUpperCase();
    if (isEn) {
      return `🏔️ **${placeName} Tours & Sightseeing Packages**
You asked about **${matchedDest.map(m => m.key).join(', ')}**! We have dedicated private cabs, premium verified stays, and complete sightseeing itineraries available:

${formatCards(matchedPkgs)}

Tap **"View Details"** to see day-by-day itineraries or message us on WhatsApp for custom quotes!`;
    }

    return `🏔️ **${placeName} Tours & Sightseeing Packages**
Aapne **${matchedDest.map(m => m.key).join(', ')}** ke bare mein poocha! Humare pass is destination ke liye direct private vehicle, premium verified stays, aur complete sightseeing itineraries available hain:

${formatCards(matchedPkgs)}

Aap **"View Details"** dabakar complete day-by-day plan dekh sakte hain ya direct WhatsApp par custom quote le sakte hain!`;
  }

  // 15. DEFAULT HELPFUL FALLBACK
  const samplePkgs = [
    HIMYATRA_PACKAGES[0],
    HIMYATRA_PACKAGES[1],
    HIMYATRA_PACKAGES[3]
  ];

  if (isEn) {
    return `Thank you for reaching out! 🙏
At **HimYatra**, we curate custom tour packages, fixed-rate cab rentals, and stays across **Himachal Pradesh, Uttarakhand, Kashmir, Spiti, Ladakh, and Spiritual circuits**.

You can ask me questions like:
• *"Show me honeymoon packages for couple"*
• *"What is the fixed cab fare from Delhi to Manali?"*
• *"Kedarnath Yatra 2026 dates and helicopter booking"*
• *"Best time to visit Spiti Valley"*
• *"Family packages under ₹15,000"*

Here are our top trending packages:

${formatCards(samplePkgs)}

Tap **"Talk to Human on WhatsApp"** for personal quotes!`;
  }

  return `Thank you for reaching out! 🙏
HimYatra par hum **Himachal Pradesh, Uttarakhand, Kashmir, Spiti, Ladakh aur Spiritual circuits** ke custom tour packages, cab rentals, aur hotels organize karte hain.

Aap mujhse pooch sakte hain:
• *"Show me honeymoon packages for couple"*
• *"Delhi to Manali fixed cab fare"*
• *"Kedarnath yatra 2026 dates and helicopter booking"*
• *"Best time to visit Spiti Valley"*
• *"Family packages under ₹15,000"*

Ye rahe humare top trending packages:

${formatCards(samplePkgs)}

Direct assistance ke liye WhatsApp par judein!`;
}
