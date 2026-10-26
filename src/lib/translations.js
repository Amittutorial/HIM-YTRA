/**
 * HimYatra Hindi / English Translation Dictionary
 * Used by the `lang` state across the app.
 * `t(key)` returns the Hindi or English string for the active language.
 */

const translations = {
  // ─── Navbar ─────────────────────────────────────────────
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },
  'nav.destinations': { en: 'Destinations', hi: 'गंतव्य स्थल' },
  'nav.packages': { en: 'Packages', hi: 'पैकेज' },
  'nav.charDham': { en: 'Char Dham', hi: 'चार धाम' },
  'nav.cabs': { en: 'Cabs & Fares', hi: 'कैब और किराया' },
  'nav.roadStatus': { en: 'Road Status', hi: 'सड़क स्थिति' },
  'nav.customTrip': { en: 'Custom Trip', hi: 'अपनी यात्रा बनाएं' },
  'nav.compare': { en: 'Compare (3)', hi: 'तुलना (3)' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.bookNow': { en: 'Book Now', hi: 'अभी बुक करें' },
  'nav.inquire': { en: 'Inquire', hi: 'पूछताछ' },
  'nav.login': { en: 'Login', hi: 'लॉगिन' },
  'nav.seasonSpecial': { en: 'Season Special', hi: 'सीज़न स्पेशल' },
  'nav.findMyTrip': { en: '✨ Find My Trip Quiz', hi: '✨ मेरी यात्रा खोजें' },
  'nav.liveTracking': { en: '📍 Live Tracking', hi: '📍 लाइव ट्रैकिंग' },
  'nav.menuNav': { en: 'Menu Navigation', hi: 'मेनू नेविगेशन' },

  // ─── Mobile Drawer ──────────────────────────────────────
  'mobile.destinations': { en: '🏔️ Destinations (Himachal & Uttarakhand)', hi: '🏔️ गंतव्य (हिमाचल और उत्तराखंड)' },
  'mobile.tourPackages': { en: '🎒 Tour Packages', hi: '🎒 टूर पैकेज' },
  'mobile.customizeYatra': { en: '✨ Customize Your Yatra', hi: '✨ अपनी यात्रा बनाएं' },
  'mobile.seasonalDeals': { en: '🏷️ Seasonal Deals & Offers', hi: '🏷️ सीज़नल डील और ऑफ़र' },
  'mobile.findMyTrip': { en: '✨ Find My Trip Quiz', hi: '✨ मेरी यात्रा खोजें क्विज़' },
  'mobile.liveTracking': { en: '📍 Live Trip Tracking', hi: '📍 लाइव ट्रिप ट्रैकिंग' },
  'mobile.charDham': { en: '🕉️ Char Dham Yatra 2026', hi: '🕉️ चार धाम यात्रा 2026' },
  'mobile.cabRentals': { en: '🚗 Cab Rentals & Fixed Fares', hi: '🚗 कैब किराया और निश्चित दर' },
  'mobile.weatherUpdates': { en: '🌦️ Road & Weather Updates', hi: '🌦️ सड़क और मौसम अपडेट' },
  'mobile.compare': { en: '⚖️ Compare 3 Packages', hi: '⚖️ 3 पैकेज तुलना' },
  'mobile.reviews': { en: '⭐ Traveler Reviews', hi: '⭐ यात्री समीक्षा' },
  'mobile.contactOffices': { en: '📞 Contact & Offices', hi: '📞 संपर्क और कार्यालय' },
  'mobile.bookJourney': { en: 'Book Your Journey Now', hi: 'अभी यात्रा बुक करें' },
  'mobile.helpCenter': { en: 'Help Center & FAQs', hi: 'सहायता केंद्र और FAQ' },
  'mobile.inquireContact': { en: 'Inquire & View Contact Details', hi: 'पूछताछ और संपर्क विवरण' },

  // ─── Hero ───────────────────────────────────────────────
  'hero.tagline': {
    en: 'Discover the Sacred Himalayas',
    hi: 'पवित्र हिमालय की खोज करें'
  },
  'hero.subtitle': {
    en: 'Premium tours, cab rentals & spiritual circuits across Himachal Pradesh and Uttarakhand',
    hi: 'हिमाचल प्रदेश और उत्तराखंड में प्रीमियम टूर, कैब किराया और आध्यात्मिक यात्राएं'
  },
  'hero.planMyTrip': { en: 'Plan My Trip', hi: 'यात्रा प्लान करें' },
  'hero.whatsappUs': { en: 'WhatsApp Us', hi: 'व्हाट्सएप करें' },
  'hero.exploreAll': { en: 'Explore All Destinations', hi: 'सभी गंतव्य देखें' },

  // ─── Quick Search ───────────────────────────────────────
  'search.destinationRegion': { en: 'Destination Region', hi: 'गंतव्य क्षेत्र' },
  'search.tourExperience': { en: 'Tour Experience', hi: 'यात्रा अनुभव' },
  'search.searchDest': { en: 'Search Destination', hi: 'गंतव्य खोजें' },
  'search.searchPackages': { en: 'Search Packages', hi: 'पैकेज खोजें' },
  'search.voiceSearch': { en: 'Voice', hi: 'आवाज़' },
  'search.quickTags': { en: 'Quick tags:', hi: 'क्विक टैग:' },
  'search.placeholder': { en: 'e.g. Manali, Kedarnath, Spiti, मनाली...', hi: 'जैसे मनाली, केदारनाथ, स्पिति...' },

  // ─── Trust Stats ────────────────────────────────────────
  'trust.whyChoose': { en: 'Why Choose HimYatra?', hi: 'हिमयात्रा क्यों चुनें?' },
  'trust.localDrivers': { en: 'Local Pahadi Drivers', hi: 'स्थानीय पहाड़ी ड्राइवर' },
  'trust.noHiddenCost': { en: 'No Hidden Costs', hi: 'कोई छिपी लागत नहीं' },
  'trust.support247': { en: '24/7 Mountain Support', hi: '24/7 पहाड़ी सहायता' },
  'trust.verifiedHotels': { en: 'Verified Mountain Hotels', hi: 'सत्यापित पहाड़ी होटल' },

  // ─── Destinations ───────────────────────────────────────
  'dest.title': { en: 'Explore Breathtaking Destinations', hi: 'अद्भुत गंतव्यों का अन्वेषण करें' },
  'dest.subtitle': { en: 'Handpicked mountain paradises across India', hi: 'भारत भर के चुनिंदा पहाड़ी स्वर्ग' },
  'dest.viewPackages': { en: 'View Packages', hi: 'पैकेज देखें' },
  'dest.startingFrom': { en: 'Starting', hi: 'शुरू' },
  'dest.perPerson': { en: '/ person', hi: '/ व्यक्ति' },

  // ─── Packages ───────────────────────────────────────────
  'pkg.title': { en: 'Handpicked Tour Packages', hi: 'चुनिंदा टूर पैकेज' },
  'pkg.subtitle': { en: 'Verified itineraries with transparent pricing', hi: 'पारदर्शी मूल्य निर्धारण के साथ सत्यापित यात्रा कार्यक्रम' },
  'pkg.viewDetails': { en: 'View Details', hi: 'विवरण देखें' },
  'pkg.bookNow': { en: 'Book Now', hi: 'अभी बुक करें' },
  'pkg.perPerson': { en: '/ person', hi: '/ व्यक्ति' },
  'pkg.showMore': { en: 'Show More Packages', hi: 'और पैकेज देखें' },

  // ─── Package Modal ──────────────────────────────────────
  'pkgModal.dayByDay': { en: 'Day-by-Day Plan', hi: 'दिन-प्रतिदिन योजना' },
  'pkgModal.inclusions': { en: 'Inclusions & Exclusions', hi: 'शामिल और गैर-शामिल' },
  'pkgModal.altitudeSafety': { en: 'Altitude & Safety', hi: 'ऊंचाई और सुरक्षा' },
  'pkgModal.pickupPolicy': { en: 'Pickup & Cancellation', hi: 'पिकअप और रद्दीकरण' },
  'pkgModal.printPdf': { en: 'Print / PDF Itinerary', hi: 'प्रिंट / PDF यात्रा कार्यक्रम' },
  'pkgModal.routeStops': { en: 'Route Stops & Highlights Timeline', hi: 'रूट स्टॉप और हाइलाइट टाइमलाइन' },
  'pkgModal.whatsIncluded': { en: "What's 100% Included:", hi: 'क्या 100% शामिल है:' },
  'pkgModal.whatsExcluded': { en: "What's Excluded:", hi: 'क्या शामिल नहीं है:' },
  'pkgModal.acclimatization': { en: 'Altitude & Acclimatization Profile', hi: 'ऊंचाई और अभ्यास प्रोफ़ाइल' },
  'pkgModal.acclimatizationTips': { en: '💧 Acclimatization Tips', hi: '💧 अभ्यास सुझाव' },
  'pkgModal.restDay': { en: '🛌 Recommended Rest Day', hi: '🛌 अनुशंसित आराम दिवस' },
  'pkgModal.emergencyOxygen': { en: '🫁 Emergency Oxygen', hi: '🫁 आपातकालीन ऑक्सीजन' },
  'pkgModal.whatsappUs': { en: 'WhatsApp Us', hi: 'व्हाट्सएप करें' },
  'pkgModal.bookReserve': { en: 'Book / Reserve Now', hi: 'अभी बुक / आरक्षित करें' },
  'pkgModal.save': { en: 'Save', hi: 'बचत' },
  'pkgModal.allTaxes': { en: '/ person (All Taxes Incl.)', hi: '/ व्यक्ति (सभी कर सहित)' },
  'pkgModal.pickupPoints': { en: 'Included Pickup & Drop Points', hi: 'शामिल पिकअप और ड्रॉप पॉइंट' },
  'pkgModal.cancellation': { en: 'Flexible Cancellation & Roadblock Protection', hi: 'लचीली रद्दीकरण और रोडब्लॉक सुरक्षा' },

  // ─── Cab Rental ─────────────────────────────────────────
  'cab.title': { en: 'Mountain Cab Rental Calculator', hi: 'पहाड़ी कैब किराया कैलकुलेटर' },
  'cab.subtitle': { en: 'Fixed route fares with experienced Pahadi drivers', hi: 'अनुभवी पहाड़ी ड्राइवरों के साथ निश्चित रूट किराया' },
  'cab.selectRoute': { en: 'Select Route', hi: 'रूट चुनें' },
  'cab.sedan': { en: 'Sedan', hi: 'सेडान' },
  'cab.suv': { en: 'SUV', hi: 'एसयूवी' },
  'cab.meetYourDriver': { en: 'Meet Your Pahadi Driver', hi: 'अपने पहाड़ी ड्राइवर से मिलें' },

  // ─── Custom Trip Builder ────────────────────────────────
  'custom.title': { en: 'Build Your Dream Himalayan Trip', hi: 'अपनी सपनों की हिमालयी यात्रा बनाएं' },
  'custom.subtitle': { en: 'Choose your preferences and get an instant estimate', hi: 'अपनी पसंद चुनें और तुरंत अनुमान पाएं' },
  'custom.getQuote': { en: 'Get Detailed Custom Quote', hi: 'विस्तृत कस्टम कोट प्राप्त करें' },
  'custom.sendWhatsApp': { en: 'Send on WhatsApp', hi: 'व्हाट्सएप पर भेजें' },
  'custom.shareLink': { en: 'Share Itinerary Link with Family', hi: 'परिवार के साथ यात्रा लिंक साझा करें' },
  'custom.linkCopied': { en: '✓ Custom Plan Link Copied!', hi: '✓ कस्टम प्लान लिंक कॉपी हो गया!' },

  // ─── Road & Weather Alerts ──────────────────────────────
  'weather.title': { en: 'Live Mountain Road & Weather Updates', hi: 'लाइव पहाड़ी सड़क और मौसम अपडेट' },
  'weather.subtitle': { en: 'Real-time highway, pass, and weather alerts', hi: 'रियल-टाइम राजमार्ग, दर्रा और मौसम अलर्ट' },
  'weather.getAlerts': { en: 'Get Alerts on WhatsApp', hi: 'व्हाट्सएप पर अलर्ट पाएं' },
  'weather.subscribed': { en: "You're Subscribed!", hi: 'आप सब्सक्राइब हो गए!' },
  'weather.selectRoute': { en: 'Select Route to Monitor', hi: 'निगरानी के लिए रूट चुनें' },
  'weather.whatsappNumber': { en: 'WhatsApp Mobile Number', hi: 'व्हाट्सएप मोबाइल नंबर' },

  // ─── Char Dham ──────────────────────────────────────────
  'charDham.title': { en: 'Sacred Char Dham Yatra Circuits', hi: 'पवित्र चार धाम यात्रा सर्किट' },
  'charDham.subtitle': { en: 'Devbhoomi Uttarakhand pilgrimage packages', hi: 'देवभूमि उत्तराखंड तीर्थ यात्रा पैकेज' },

  // ─── Find My Trip Quiz ──────────────────────────────────
  'quiz.title': { en: 'Find My Himalayan Trip', hi: 'मेरी हिमालय यात्रा खोजें' },
  'quiz.completed': { en: 'Completed', hi: 'पूरा हुआ' },
  'quiz.chooseOption': { en: 'Choose the option that best fits your travel expectations.', hi: 'वह विकल्प चुनें जो आपकी यात्रा अपेक्षाओं से सबसे अच्छा मेल खाता हो।' },
  'quiz.previousQuestion': { en: 'Previous Question', hi: 'पिछला प्रश्न' },
  'quiz.perfectMatch': { en: '🎉 Perfect Match Found', hi: '🎉 सही मिलान मिला' },
  'quiz.topRecommended': { en: 'Top 3 Recommended Himalayan Packages', hi: 'शीर्ष 3 अनुशंसित हिमालय पैकेज' },
  'quiz.retake': { en: 'Retake Trip Quiz', hi: 'क्विज़ दोबारा लें' },

  // ─── Live Tracking ──────────────────────────────────────
  'tracking.title': { en: 'Live Himalayan Trip Tracking', hi: 'लाइव हिमालय ट्रिप ट्रैकिंग' },
  'tracking.shareLink': { en: 'Share Live Tracking Link', hi: 'लाइव ट्रैकिंग लिंक साझा करें' },
  'tracking.linkCopied': { en: '✓ Link Copied!', hi: '✓ लिंक कॉपी हो गया!' },
  'tracking.lookup': { en: 'Lookup', hi: 'खोजें' },
  'tracking.currentPosition': { en: 'Current Route Position', hi: 'वर्तमान रूट स्थिति' },
  'tracking.todayPlan': { en: "Today's Plan & Night Stay:", hi: 'आज की योजना और रात्रि प्रवास:' },
  'tracking.todayJourney': { en: "Today's Journey Progress", hi: 'आज की यात्रा प्रगति' },
  'tracking.callDriver': { en: 'Call Driver', hi: 'ड्राइवर को कॉल करें' },
  'tracking.supportDesk': { en: 'Mountain Support Desk', hi: 'पहाड़ी सहायता डेस्क' },

  // ─── Package Compare ───────────────────────────────────
  'compare.title': { en: 'Compare Up to 3 Himalayan Tours', hi: '3 हिमालय टूर की तुलना करें' },
  'compare.subtitle': { en: 'Compare prices, inclusions, altitude, hotel categories, and vehicles to find your best trip.', hi: 'अपनी सर्वश्रेष्ठ यात्रा खोजने के लिए कीमतों, शामिल सुविधाओं, ऊंचाई, होटल श्रेणियों और वाहनों की तुलना करें।' },
  'compare.changePackages': { en: 'Change Packages:', hi: 'पैकेज बदलें:' },
  'compare.features': { en: 'Features', hi: 'विशेषताएं' },
  'compare.startingPrice': { en: 'Starting Price', hi: 'शुरुआती कीमत' },
  'compare.tripDuration': { en: 'Trip Duration', hi: 'यात्रा अवधि' },
  'compare.routeCovered': { en: 'Route Covered', hi: 'रूट' },
  'compare.vehicle': { en: 'Vehicle Transport', hi: 'वाहन परिवहन' },
  'compare.hotel': { en: 'Hotel Category', hi: 'होटल श्रेणी' },
  'compare.meals': { en: 'Meals Plan', hi: 'भोजन योजना' },
  'compare.travelStyle': { en: 'Travel Style / Best For', hi: 'यात्रा शैली / किसके लिए' },
  'compare.actions': { en: 'Actions', hi: 'कार्रवाई' },

  // ─── Reviews ────────────────────────────────────────────
  'reviews.title': { en: 'What Our Travelers Say', hi: 'हमारे यात्री क्या कहते हैं' },
  'reviews.verified': { en: 'Verified Google Reviews', hi: 'सत्यापित गूगल समीक्षा' },

  // ─── FAQ ────────────────────────────────────────────────
  'faq.title': { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न' },

  // ─── Footer ─────────────────────────────────────────────
  'footer.tagline': { en: 'Your Trusted Himalayan Travel Partner', hi: 'आपका विश्वसनीय हिमालयी यात्रा साथी' },
  'footer.quickLinks': { en: 'Quick Links', hi: 'त्वरित लिंक' },
  'footer.support': { en: 'Support', hi: 'सहायता' },

  // ─── Common ─────────────────────────────────────────────
  'common.starting': { en: 'Starting', hi: 'शुरू' },
  'common.perPerson': { en: '/ person', hi: '/ व्यक्ति' },
  'common.days': { en: 'Days', hi: 'दिन' },
  'common.rating': { en: 'Rating', hi: 'रेटिंग' },
  'common.match': { en: 'Match', hi: 'मिलान' },
  'common.question': { en: 'Question', hi: 'प्रश्न' },
  'common.of': { en: 'of', hi: 'में से' },
};

/**
 * Create a translation function bound to the current language.
 * @param {string} currentLang - 'en' or 'hi'
 * @returns {(key: string, fallback?: string) => string}
 */
export function createTranslator(currentLang) {
  return function t(key, fallback) {
    const entry = translations[key];
    if (!entry) return fallback || key;
    return entry[currentLang] || entry['en'] || fallback || key;
  };
}

export default translations;
