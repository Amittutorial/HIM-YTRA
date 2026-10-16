export const DESTINATIONS = [
  // Himachal Pradesh
  {
    id: 'hp-manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    tagline: 'Valley of the Gods & Snow Paradise',
    altitude: '2,050 m',
    bestTime: 'October to June',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    description: 'Snow-capped Himalayan peaks, roaring Beas river, ancient Hadimba temple, Solang ski slopes, and the breathtaking Atal Tunnel connecting to Sissu waterfalls.',
    highlights: ['Atal Tunnel & Sissu Waterfall', 'Solang Valley Paragliding', 'Old Manali Cafés & Live Music', 'Jogini Waterfall Trek'],
    packagesCount: 6,
    startingPrice: 8999,
    weather: '8°C - 18°C',
    popularFor: ['Snow & Skiing', 'Honeymoon', 'Café Culture', 'Adventure']
  },
  {
    id: 'hp-shimla',
    name: 'Shimla & Kufri',
    state: 'Himachal Pradesh',
    tagline: 'The Queen of Hills & British Colonial Splendor',
    altitude: '2,276 m',
    bestTime: 'Throughout the year',
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
    description: 'Historic British summer capital with heritage Mall Road, neo-Gothic Christ Church, panoramic Ridge views, Jakhoo temple giant Hanuman statue, and Kufri snow amusement.',
    highlights: ['UNESCO Heritage Toy Train', 'Kufri Snow World', 'The Ridge & Mall Road Stroll', 'Jakhoo Ropeway Ride'],
    packagesCount: 5,
    startingPrice: 7499,
    weather: '10°C - 20°C',
    popularFor: ['Heritage', 'Family Vacation', 'Scenic Walks', 'Shopping']
  },
  {
    id: 'hp-spiti',
    name: 'Spiti Valley & Chandratal',
    state: 'Himachal Pradesh',
    tagline: 'The Middle Land — High Altitude Cold Desert',
    altitude: '3,800 m - 4,300 m',
    bestTime: 'May to October',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    description: 'A rugged, mystical wonderland of ancient 1000-year-old Buddhist monasteries, turquoise crescent lake Chandratal, fossil villages like Langza, and world’s highest post office at Hikkim.',
    highlights: ['Key Monastery 1000-Yr Heritage', 'Moon Lake Chandratal Camping', 'Highest Post Office in Hikkim', 'Chicham Bridge (Highest in Asia)'],
    packagesCount: 4,
    startingPrice: 16999,
    weather: '-2°C - 14°C',
    popularFor: ['Biking & 4x4', 'Stargazing', 'Ancient Monasteries', 'Raw Adventure']
  },
  {
    id: 'hp-dharamshala',
    name: 'Dharamshala & McLeodganj',
    state: 'Himachal Pradesh',
    tagline: 'Little Lhasa & Dhauladhar Serenity',
    altitude: '1,457 m - 2,082 m',
    bestTime: 'September to June',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    description: 'Respected abode of His Holiness the Dalai Lama, surrounded by pine-covered Dhauladhar mountain ridges, Tibetan monasteries, Tibetan food trails, and the scenic Triund trek.',
    highlights: ['Tsuglagkhang Dalai Lama Complex', 'Triund Ridge Day Trek', 'Bhagsunag Waterfall & Shiva Café', 'HPCA International Cricket Stadium'],
    packagesCount: 4,
    startingPrice: 8499,
    weather: '12°C - 22°C',
    popularFor: ['Spiritual Peace', 'Tibetan Culture', 'Trekking', 'Café Hopping']
  },
  {
    id: 'hp-kasol',
    name: 'Kasol & Parvati Valley',
    state: 'Himachal Pradesh',
    tagline: 'Riverside Hippie Haven & Lush Pine Trails',
    altitude: '1,580 m',
    bestTime: 'March to November',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    description: 'Nestled on the gushing banks of Parvati River, Kasol is famous for Israeli delicacies, Tosh mountain village, sacred Manikaran hot sulphur springs, and serene pine forests.',
    highlights: ['Manikaran Sahib Gurudwara & Hot Springs', 'Tosh Village Panoramic Views', 'Chalal Riverside Forest Walk', 'Kheerganga Trek with Hot Springs'],
    packagesCount: 3,
    startingPrice: 6999,
    weather: '11°C - 21°C',
    popularFor: ['Youth & Backpackers', 'Riverside Cafés', 'Hot Springs', 'Nature Trails']
  },
  {
    id: 'hp-jibhi',
    name: 'Jibhi & Tirthan Valley',
    state: 'Himachal Pradesh',
    tagline: 'Hidden Offbeat Gem of the Himalayas',
    altitude: '1,600 m',
    bestTime: 'March to December',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Unspoiled wooden hamlets, crystalline trout streams, Jalori Pass with pristine Serolsar Lake, and traditional cedar wood treehouse homestays away from the crowd.',
    highlights: ['Jalori Pass & Serolsar Lake Trek', 'Jibhi Waterfall & Hidden Stone Bridge', 'Great Himalayan National Park UNESCO Gate', 'Traditional Wooden Treehouse Stays'],
    packagesCount: 3,
    startingPrice: 9499,
    weather: '10°C - 20°C',
    popularFor: ['Quiet Relaxation', 'Treehouses', 'Trout Fishing', 'Nature Lovers']
  },
  {
    id: 'hp-dalhousie',
    name: 'Dalhousie & Khajjiar',
    state: 'Himachal Pradesh',
    tagline: 'Mini Switzerland of India',
    altitude: '1,970 m',
    bestTime: 'March to June & Dec-Jan for Snow',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Pine-clad valleys, British colonial bungalows, panoramic views of Pir Panjal ranges, and the saucer-shaped emerald meadow of Khajjiar bordered by dense deodar forests.',
    highlights: ['Khajjiar Lake & Deodar Forest', 'Kalatop Wildlife Sanctuary Walk', 'Dainkund Peak Singal Hills', 'Subhash Baoli Natural Spring'],
    packagesCount: 3,
    startingPrice: 8999,
    weather: '9°C - 19°C',
    popularFor: ['Couples', 'Family Holiday', 'Meadow Picnics', 'Pine Forest Walks']
  },
  {
    id: 'hp-kinnaur',
    name: 'Kinnaur & Chitkul',
    state: 'Himachal Pradesh',
    tagline: 'Last Inhabited Village of India & Apple Orchards',
    altitude: '3,450 m',
    bestTime: 'April to October',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    description: 'Lush Baspa valley, wooden Kinnauri houses, breathtaking views of sacred Kinner Kailash peak, and Chitkul - India’s last village near the Indo-Tibetan border.',
    highlights: ['Chitkul "Hindustan ka Aakhri Dhaba"', 'Sangla Valley Apple Orchards', 'Kamru Fort Ancient Heritage', 'Kalpa Sunset over Kinner Kailash'],
    packagesCount: 2,
    startingPrice: 14499,
    weather: '4°C - 16°C',
    popularFor: ['Border Trails', 'Apple Orchards', 'Raw Culture', 'Photography']
  },

  // Uttarakhand
  {
    id: 'uk-rishikesh',
    name: 'Rishikesh & Haridwar',
    state: 'Uttarakhand',
    tagline: 'Yoga Capital of the World & Gateway to Devbhoomi',
    altitude: '372 m',
    bestTime: 'September to May',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    description: 'Sacred river Ganga, iconic Laxman Jhula & Ram Jhula, divine Ganga Aarti at Parmarth Niketan & Har Ki Pauri, alongside world-class river rafting and cliff jumping.',
    highlights: ['White Water Ganga Rafting (Grade III/IV)', 'Har Ki Pauri Evening Maha Aarti', 'Beatles Ashram Graffiti Ruins', 'Bungee Jumping at Mohan Chatti (83m)'],
    packagesCount: 5,
    startingPrice: 5999,
    weather: '16°C - 28°C',
    popularFor: ['River Rafting', 'Spiritual Peace', 'Ganga Aarti', 'Yoga & Meditation']
  },
  {
    id: 'uk-nainital',
    name: 'Nainital & Jim Corbett',
    state: 'Uttarakhand',
    tagline: 'Lake City of Uttarakhand & Royal Tiger Country',
    altitude: '2,084 m',
    bestTime: 'Throughout the year',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    description: 'Emerald eye-shaped Naini Lake surrounded by seven hills, lively Mall Road, Naina Devi temple, combined with thrilling 4x4 open-jeep tiger safaris in Jim Corbett.',
    highlights: ['Naini Lake Gondola Boating', 'Jim Corbett National Park Jeep Safari', 'Snow View Point Ropeway', 'Bhimtal & Naukuchiatal Lake Tour'],
    packagesCount: 5,
    startingPrice: 9999,
    weather: '12°C - 22°C',
    popularFor: ['Wildlife Safari', 'Lake Boating', 'Family Vacation', 'Scenic Hills']
  },
  {
    id: 'uk-mussoorie',
    name: 'Mussoorie & Dhanaulti',
    state: 'Uttarakhand',
    tagline: 'Queen of the Hills & Misty Doon Valley',
    altitude: '2,005 m',
    bestTime: 'March to June & Winter for Snow',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic views of the Doon valley and snow-clad Himalayan peaks, historic colonial streets, Kempty Falls, Mall Road, and tranquil deodar groves of Dhanaulti Eco Park.',
    highlights: ['Kempty Falls Splash', 'George Everest Peak Sunset', 'Dhanaulti Apple Orchard & Eco Park', 'Camel’s Back Road Evening Walk'],
    packagesCount: 4,
    startingPrice: 7999,
    weather: '13°C - 23°C',
    popularFor: ['Weekend Getaways', 'Honeymoon', 'Doon Valley Views', 'Colonial Charm']
  },
  {
    id: 'uk-auli',
    name: 'Auli & Joshimath',
    state: 'Uttarakhand',
    tagline: 'India’s Ski Capital & Grand Nanda Devi Views',
    altitude: '2,800 m - 3,050 m',
    bestTime: 'December to March (Snow/Ski) & May-Nov (Lush Meadows)',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    description: 'World-renowned skiing slopes, India’s highest cable car ropeway, artificial snow lake, and surreal 360-degree panoramic vistas of Mount Nanda Devi, Kamet, and Trishul.',
    highlights: ['4 km Joshimath to Auli Cable Car Ropeway', 'Skiing & Snowboarding Lessons', 'Artificial High-Altitude Lake', 'Gorson Bugyal Meadow Trek'],
    packagesCount: 4,
    startingPrice: 14999,
    weather: '-4°C - 12°C',
    popularFor: ['Snow Skiing', 'Cable Car Ropeway', 'Nanda Devi Views', 'Luxury Stays']
  },
  {
    id: 'uk-chopta',
    name: 'Chopta & Tungnath',
    state: 'Uttarakhand',
    tagline: 'Mini Switzerland of Uttarakhand & Highest Shiva Shrine',
    altitude: '2,680 m - 3,680 m',
    bestTime: 'April to November & Dec-Feb for Snow Trek',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    description: 'Unspoiled alpine meadows (Bugyals), rhododendron forests, trek to 1000-year-old Tungnath (highest Shiva temple on Earth), and sunrise summit at Chandrashila (4,000m).',
    highlights: ['Tungnath Temple (Highest Shiva Temple)', 'Chandrashila Peak 360° Himalayan Vista', 'Deoriatal Emerald Alpine Lake', 'Camping Under Milky Way Stars'],
    packagesCount: 3,
    startingPrice: 8999,
    weather: '5°C - 15°C',
    popularFor: ['Summit Treks', 'Shiva Pilgrimage', 'Starry Camping', 'Birdwatching']
  },
  {
    id: 'uk-chardham',
    name: 'Char Dham (Kedarnath & Badrinath)',
    state: 'Uttarakhand',
    tagline: 'The Ultimate Sacred Devbhoomi Yatra',
    altitude: '3,133 m - 3,583 m',
    bestTime: 'May to June & September to November',
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=1200&q=80',
    description: 'The holiest Hindu pilgrimage circuit in the Garhwal Himalayas. Ancient stone Kedarnath Jyotirlinga surrounded by snow peaks, and majestic golden-capped Badrinath temple.',
    highlights: ['Kedarnath Temple Darshan & Aarti', 'Badrinath Shrine & Mana (Last Indian Village)', 'Priority VIP Darshan Passes Assistance', 'Helicopter Shuttle Booking Option'],
    packagesCount: 6,
    startingPrice: 18999,
    weather: '2°C - 14°C',
    popularFor: ['Sacred Pilgrimage', 'Spiritual Awakening', 'Helicopter Tours', 'Life Milestone']
  },
  {
    id: 'uk-valley-of-flowers',
    name: 'Valley of Flowers & Hemkund',
    state: 'Uttarakhand',
    tagline: 'UNESCO World Heritage Alpine Paradise',
    altitude: '3,658 m - 4,329 m',
    bestTime: 'July to September (Peak Bloom)',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description: 'A carpet of over 500 species of rare wild alpine blossoms, endangered Himalayan fauna, cascading waterfalls, and the glacial holy lake of Hemkund Sahib surrounded by seven peaks.',
    highlights: ['500+ Wild Alpine Flower Species', 'UNESCO World Heritage Site Trek', 'Hemkund Sahib Glacial Lake (4,329m)', 'Govindghat & Ghangaria Stays'],
    packagesCount: 2,
    startingPrice: 15499,
    weather: '6°C - 16°C',
    popularFor: ['UNESCO Heritage', 'Botanical Wonders', 'Trekking', 'Sikh Pilgrimage']
  }
];

export const TOUR_PACKAGES = [
  {
    id: 'pkg-himachal-magic',
    title: 'Magical Himachal: Shimla, Kullu & Manali with Atal Tunnel',
    state: 'Himachal Pradesh',
    category: 'Bestseller',
    type: 'Family & Couple',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.9,
    reviewsCount: 384,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 17999,
    discountedPrice: 13499,
    pickupDrop: 'Delhi / Chandigarh',
    transport: 'Private Dedicated Cab (Dzire / Innova)',
    hotelStay: '3★ / 4★ Mountain View Stays',
    meals: 'Breakfast & Dinner Included',
    route: 'Delhi ➔ Shimla (2N) ➔ Kullu ➔ Manali (3N) ➔ Atal Tunnel / Solang ➔ Delhi',
    overview: 'Experience Himachal’s two most iconic destinations in supreme comfort. Enjoy toy-train vistas, colonial Shimla, scenic river-rafting in Kullu, Solang adventure valley, and the marvel of Atal Tunnel to Sissu waterfall.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Delhi/Chandigarh to Shimla (Scenic Drive & Mall Road)',
        details: 'Pickup from Delhi/Chandigarh in private air-conditioned cab. Drive up the Shivalik hills with stop at Timber Trail. Evening check-in at Shimla mountain-view hotel. Stroll along the famous Mall Road, Ridge, and Christ Church.'
      },
      {
        day: 'Day 2',
        title: 'Shimla & Kufri Sightseeing (Snow World & Jakhoo)',
        details: 'After hearty breakfast, drive to Kufri. Enjoy horse riding to Mahasu Peak, Himalayan Nature Park, and adventure activities. Afternoon visit to sacred Jakhoo Temple via ropeway and Viceregal Lodge heritage gardens.'
      },
      {
        day: 'Day 3',
        title: 'Shimla to Manali via Sundernagar Lake, Pandoh Dam & Kullu',
        details: 'Breathtaking 8-hour drive alongside the roaring Beas river. Photo stops at Sundernagar Lake, Pandoh Dam, and Hanogi Mata temple. Stop at Kullu for river rafting and authentic Shawl factory shopping. Night stay in Manali.'
      },
      {
        day: 'Day 4',
        title: 'Solang Valley Adventure & Atal Tunnel to Sissu (Lahaul)',
        details: 'Early morning excursion to Solang Valley. Thrilling paragliding, zorbing, and quad biking. Drive through the historic 9.02 km Atal Tunnel to enter Lahaul Valley and witness the magnificent Sissu Waterfall.'
      },
      {
        day: 'Day 5',
        title: 'Manali Local Heritage & Cafés (Hadimba, Vashisht & Old Manali)',
        details: 'Visit 500-year-old Hadimba Devi Temple amidst towering deodars, Manu Temple, hot sulphur springs at Vashisht, Tibetan Monastery, and spend the evening enjoying live music & trout fish in Old Manali cafés.'
      },
      {
        day: 'Day 6',
        title: 'Manali to Delhi/Chandigarh Departure with Cherished Memories',
        details: 'After breakfast, checkout and drive back towards Chandigarh/Delhi. Dropped at airport or railway station with lifetime Himalayan memories.'
      }
    ],
    inclusions: [
      'Dedicated AC Sedan / SUV with experienced local mountain driver',
      '5 Nights accommodation in 3★ / 4★ hill-view properties',
      'Daily morning buffet breakfast and evening chef dinners (MAP Plan)',
      'Atal Tunnel and Solang Valley permit assistance',
      'All toll taxes, parking, green tax, state tax, and driver allowances',
      '24x7 On-ground trip manager assistance'
    ],
    exclusions: [
      'Airfare or train tickets to/from Delhi/Chandigarh',
      'Personal adventure activities (paragliding, rafting, ski rental)',
      'Rohtang Pass NGT special permit fee (optional)',
      'Lunch, snacks, and personal laundry/room service'
    ]
  },
  {
    id: 'pkg-spiti-circuit',
    title: 'Spiti Valley Grand 4x4 Expedition: Shimla, Kaza, Chandratal',
    state: 'Himachal Pradesh',
    category: 'Adventure',
    type: 'Road Trip & Offbeat',
    duration: '8 Days / 7 Nights',
    days: 8,
    nights: 7,
    rating: 4.95,
    reviewsCount: 198,
    badge: 'Ultimate Thrill',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 28999,
    discountedPrice: 22499,
    pickupDrop: 'Chandigarh / Shimla',
    transport: 'Modified 4x4 Bolero Camper / Innova Crysta',
    hotelStay: 'Boutique Homestays & Swiss Tents at Chandratal',
    meals: 'Breakfast & Traditional Local Dinners',
    route: 'Shimla ➔ Sangla ➔ Kalpa ➔ Nako ➔ Tabo ➔ Kaza (2N) ➔ Chandratal ➔ Manali',
    overview: 'The definitive Himalayan trans-Himalayan overland adventure. Travel the legendary Hindustan-Tibet road through Kinnaur, enter the cold desert of Spiti, visit 1000-year-old monasteries, send postcards from highest post office, and camp by Chandratal lake.',
    itinerary: [
      { day: 'Day 1', title: 'Chandigarh to Narkanda / Sangla Valley', details: 'Begin the ascent through apple orchards and Satluj gorge. Stay at riverside luxury camp.' },
      { day: 'Day 2', title: 'Sangla to Chitkul (Last Indian Village) & Kalpa', details: 'Explore Chitkul, visit Hindustan Ka Aakhri Dhaba, and witness sunset over Kinner Kailash peak.' },
      { day: 'Day 3', title: 'Kalpa to Tabo via Nako Lake & Gue Mummy', details: 'Visit 500-year-old preserved monk mummy at Gue, Nako sacred lake, and 1000-year-old Tabo UNESCO Monastery.' },
      { day: 'Day 4', title: 'Tabo to Kaza & Dhankar Monastery Cliff', details: 'Explore Dhankar perched on a razor cliff. Reach Kaza, the heart of Spiti.' },
      { day: 'Day 5', title: 'Highest Villages Circuit: Key, Kibber, Chicham, Hikkim & Komik', details: 'Visit iconic Key Monastery, cross Asia’s highest Chicham bridge, mail a postcard at Hikkim, and visit highest motorable village Komik.' },
      { day: 'Day 6', title: 'Kaza to Chandratal (The Moon Lake) via Kunzum Pass', details: 'Cross majestic Kunzum La (4,590m). Hike to turquoise Chandratal lake. Camp under Milky Way galaxy.' },
      { day: 'Day 7', title: 'Chandratal to Manali via Batal & Rohtang/Atal Tunnel', details: 'Conquer the raw river crossings of Batal and Chhatru. Cross Atal Tunnel to arrive in Manali.' },
      { day: 'Day 8', title: 'Manali to Chandigarh Drop', details: 'Farewell Himalayan drive back to Chandigarh airport/station.' }
    ],
    inclusions: [
      'Overland 4x4 / Mountain SUV with verified Spiti specialist driver',
      '7 Nights stay (Homestays, Guesthouses, Chandratal Alpine Swiss Tents)',
      'Oxygen cylinder and medical first aid kit on board',
      'Breakfast and hot Pahadi dinners daily',
      'Inner line permits and wildlife sanctuary fees',
      'Campfire evening at Chandratal (weather permitting)'
    ],
    exclusions: ['Expenses of personal nature', 'Lunch and beverages', 'Extra vehicle usage beyond itinerary']
  },
  {
    id: 'pkg-kedarnath-badrinath',
    title: 'Sacred Do Dham Yatra: Kedarnath & Badrinath Deluxe Circuit',
    state: 'Uttarakhand',
    category: 'Spiritual',
    type: 'Pilgrimage & Sacred',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.96,
    reviewsCount: 520,
    badge: 'High Demand',
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 24999,
    discountedPrice: 19499,
    pickupDrop: 'Haridwar / Rishikesh / Dehradun',
    transport: 'AC Private Cab (Innova / Dzire) with Hill Driver',
    hotelStay: 'Pre-booked Hotels & Kedarnath Base Camps',
    meals: 'Pure Vegetarian Sattvic Meals',
    route: 'Haridwar ➔ Guptkashi (1N) ➔ Kedarnath (1N) ➔ Guptkashi (1N) ➔ Badrinath (1N) ➔ Rishikesh (1N)',
    overview: 'Fulfill your spiritual calling to Lord Shiva at Kedarnath and Lord Vishnu at Badrinath. Smooth logistics, verified hill-experienced drivers, priority darshan guidance, and Kedarnath helicopter booking support.',
    itinerary: [
      { day: 'Day 1', title: 'Haridwar/Rishikesh to Guptkashi / Sonprayag', details: 'Scenic mountain drive via Devprayag (Sangam of Alaknanda & Bhagirathi) and Rudraprayag. Evening check-in at Guptkashi.' },
      { day: 'Day 2', title: 'Guptkashi to Kedarnath Dham (Trek / Helipad / Pony)', details: 'Early morning transfer to Sonprayag/Gaurikund. Trek 16 km or board chopper to Kedarnath. Evening divine Sandhya Aarti and darshan of Kedarnath Jyotirlinga.' },
      { day: 'Day 3', title: 'Kedarnath Morning Darshan & Descent to Guptkashi', details: 'Morning Maha Abhishek darshan. Descend to Gaurikund. Return to Guptkashi for restful night.' },
      { day: 'Day 4', title: 'Guptkashi to Badrinath Dham via Joshimath', details: 'Drive past Chopta meadows to Badrinath. Take holy dip in Tapt Kund natural hot spring. Attend evening Swarna Aarti at Badrinath.' },
      { day: 'Day 5', title: 'Badrinath Darshan, Mana Village & Drive to Rishikesh', details: 'Visit Mana (Last village of India, Vyas Gufa, Bhim Pul, Saraswati river origin). Drive along Ganga to Rishikesh.' },
      { day: 'Day 6', title: 'Rishikesh Ganga Aarti & Drop at Haridwar / Dehradun', details: 'Morning temple visit, Ram Jhula walk, and timely drop at Haridwar/Dehradun railway station or airport.' }
    ],
    inclusions: [
      'Private dedicated cab for entire Devbhoomi circuit',
      'All 5 nights hotel/guest house accommodations',
      'Pure vegetarian breakfast and dinner included',
      'Kedarnath registration & biometric biometric token support',
      'All parking, toll, driver boarding and hill allowances'
    ],
    exclusions: ['Helicopter tickets, pony/doli charges for Kedarnath', 'VIP temple entry tickets', 'Lunch and personal expenses']
  },
  {
    id: 'pkg-rishikesh-mussoorie',
    title: 'Uttarakhand Romance: Mussoorie, Dhanaulti & Rishikesh Luxury',
    state: 'Uttarakhand',
    category: 'Honeymoon',
    type: 'Couples & Leisure',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.88,
    reviewsCount: 245,
    badge: 'Honeymoon Special',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 18999,
    discountedPrice: 14299,
    pickupDrop: 'Dehradun / Delhi',
    transport: 'Private Executive Sedan (Dzire / Etios)',
    hotelStay: 'Luxury 4★ Valley View Resort & Riverside Camp',
    meals: 'Buffet Breakfast & Candlelight Dinner',
    route: 'Delhi/Dehradun ➔ Mussoorie (2N) ➔ Dhanaulti ➔ Rishikesh (2N) ➔ Delhi',
    overview: 'The perfect blend of misty colonial mountain tranquility and spiritual riverside vitality. Includes candlelight dinner, flower bed decoration, private sightseeing, and peaceful luxury stays.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Mussoorie (The Queen of Hills)', details: 'Pick up from Dehradun airport/railway station. Drive to Mussoorie. Check-in to honeymoon valley-view room. Evening stroll on Mall Road.' },
      { day: 'Day 2', title: 'Mussoorie & Dhanaulti Pine Escape', details: 'Visit Kempty Falls, George Everest house sunset point, and drive through dense deodar forests of Dhanaulti Eco Park.' },
      { day: 'Day 3', title: 'Mussoorie to Rishikesh Riverside Serenity', details: 'Drive down to holy town Rishikesh. Check in to premium resort by the Ganga. Evening VIP Parmarth Niketan Ganga Aarti.' },
      { day: 'Day 4', title: 'Rishikesh Rafting, Beatles Ashram & Sunset Café', details: 'Thrilling Ganga river rafting (optional), Beatles Ashram graffiti walk, and romantic sunset coffee overlooking Lakshman Jhula.' },
      { day: 'Day 5', title: 'Departure to Dehradun / Delhi', details: 'Breakfast and drop at Dehradun airport or Delhi.' }
    ],
    inclusions: [
      'Private luxury AC car for all transfers and sightseeing',
      '4 Nights in 4★ luxury resorts with panoramic balconies',
      'Daily buffet breakfast & chef dinners + 1 Candlelight Dinner with cake',
      'Ganga Aarti reserved seats assistance',
      'Driver allowances, toll taxes, and parking'
    ],
    exclusions: ['Adventure activity fees', 'Lunch and personal expenses']
  },
  {
    id: 'pkg-auli-chopta-winter',
    title: 'Auli Snow Skiing & Chopta Chandrashila Summit Expedition',
    state: 'Uttarakhand',
    category: 'Adventure',
    type: 'Snow & Trek',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.92,
    reviewsCount: 167,
    badge: 'Winter Wonderland',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 22999,
    discountedPrice: 17499,
    pickupDrop: 'Rishikesh / Haridwar',
    transport: 'Private Mountain Cab with Snow Chains',
    hotelStay: 'Mountain Chalets in Chopta & Auli Ski Resort',
    meals: 'Breakfast & Warm Mountain Dinners',
    route: 'Rishikesh ➔ Chopta (2N) ➔ Tungnath/Chandrashila ➔ Joshimath/Auli (2N) ➔ Rishikesh',
    overview: 'Witness India’s best snow wonderland. Stand face-to-face with Mt. Nanda Devi in Auli, take the grand 4km cable car ropeway, and trek to the highest Shiva temple at Tungnath with Chandrashila summit (4,000m).',
    itinerary: [
      { day: 'Day 1', title: 'Rishikesh to Chopta (Mini Switzerland)', details: 'Drive along Alaknanda and Mandakini rivers via Devprayag. Stay in cozy wooden camp/cottage in Chopta.' },
      { day: 'Day 2', title: 'Chopta to Tungnath & Chandrashila Peak Trek', details: 'Scenic 5 km trek to 1000-year-old Tungnath temple. Continue 1.5 km to Chandrashila summit for 360-degree Himalayan panorama.' },
      { day: 'Day 3', title: 'Chopta to Joshimath & Auli Cable Car Ride', details: 'Drive to Joshimath. Board India’s longest cable car ropeway to Auli ski slopes. Check-in to Auli mountain resort.' },
      { day: 'Day 4', title: 'Full Day Auli Snow Skiing & Gorson Bugyal', details: 'Enjoy skiing lessons with certified instructor, visit artificial lake, and hike to Gorson Bugyal meadow.' },
      { day: 'Day 5', title: 'Auli/Joshimath to Rishikesh', details: 'Scenic descent through Garhwal valleys back to Rishikesh. Evening free for shopping and café dining.' },
      { day: 'Day 6', title: 'Rishikesh Departure', details: 'Drop at Rishikesh/Haridwar station or Dehradun airport.' }
    ],
    inclusions: [
      'Mountain-ready private cab with snow-experienced driver',
      '5 Nights accommodation in cozy chalets and resorts',
      'Breakfast and hot mountain dinners daily',
      'Trek guide assistance for Tungnath & Chandrashila',
      'Trek permits and sanctuary entry fees'
    ],
    exclusions: ['Cable car ropeway tickets (₹1,000/person approx)', 'Ski equipment rental & coach fee', 'Personal expenses']
  },
  {
    id: 'pkg-nainital-corbett',
    title: 'Nainital Lake Splendor & Jim Corbett Jungle Safari',
    state: 'Uttarakhand',
    category: 'Family',
    type: 'Family & Wildlife',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.87,
    reviewsCount: 310,
    badge: 'Family Favorite',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 16999,
    discountedPrice: 12999,
    pickupDrop: 'Delhi NCR / Kathgodam',
    transport: 'Private AC Cab for Entire Circuit',
    hotelStay: '3★/4★ Lake View Hotel & Corbett Jungle Resort',
    meals: 'Breakfast & Dinner Included',
    route: 'Delhi ➔ Nainital (2N) ➔ Bhimtal/Sattal ➔ Jim Corbett (2N) ➔ Delhi',
    overview: 'The ideal family holiday combining the tranquil beauty of Kumaon lake district with the adrenaline of spotting Royal Bengal Tigers in India’s oldest national park.',
    itinerary: [
      { day: 'Day 1', title: 'Delhi to Nainital (Welcome to the Lake District)', details: 'Drive from Delhi to Nainital. Check in to hotel. Evening boat ride in Naini Lake and visit to Naina Devi temple.' },
      { day: 'Day 2', title: 'Nainital & Famous Lakes Tour (Bhimtal, Sattal, Naukuchiatal)', details: 'Visit Snow View Point via cable car, Eco Cave Gardens, followed by scenic drive to Bhimtal aquarium island and Naukuchiatal.' },
      { day: 'Day 3', title: 'Nainital to Jim Corbett Tiger Reserve', details: 'Drive to Jim Corbett. Check-in to riverside jungle resort. Afternoon relax by pool or visit Garjiya Devi temple and Corbett Museum.' },
      { day: 'Day 4', title: 'Corbett 4x4 Jeep Safari & Wilderness Experience', details: 'Early morning 4x4 open-jeep safari inside Bijrani / Jhirna zone with experienced naturalist. Evening campfire and music at resort.' },
      { day: 'Day 5', title: 'Corbett to Delhi Drop', details: 'After breakfast, drive back to Delhi. Dropped at your home, airport, or railway station.' }
    ],
    inclusions: [
      'AC Sedan / SUV cab with dedicated driver from Delhi to Delhi',
      '2 Nights in Nainital + 2 Nights in Corbett Resort',
      'Daily morning breakfast and dinner',
      '1 Morning 4x4 Open Jeep Safari inside Corbett National Park zone',
      'All toll, state tax, and parking'
    ],
    exclusions: ['Safari permit camera charges', 'Boating fees and ropeway tickets', 'Lunch and personal expenses']
  },
  {
    id: 'pkg-jibhi-tirthan-offbeat',
    title: 'Secret Himachal: Jibhi, Tirthan Valley & Parvati Treehouse Escape',
    state: 'Himachal Pradesh',
    category: 'Offbeat',
    type: 'Peace & Nature',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.94,
    reviewsCount: 142,
    badge: 'Hidden Gem',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 15999,
    discountedPrice: 11999,
    pickupDrop: 'Chandigarh / Aut',
    transport: 'Dedicated Mountain Cab',
    hotelStay: 'Luxury Pine Treehouses & Riverside Cottages',
    meals: 'Organic Farm-to-Table Breakfast & Dinner',
    route: 'Chandigarh ➔ Tirthan Valley (2N) ➔ Jibhi (2N) ➔ Jalori Pass ➔ Chandigarh',
    overview: 'Escape crowded commercial tourist spots. Relax in hand-crafted pine wood treehouses, fish for brown trout in crystal rivers, explore Serolsar Lake at Jalori pass, and soak in pure Himalayan silence.',
    itinerary: [
      { day: 'Day 1', title: 'Chandigarh to Tirthan Valley', details: 'Drive along Beas and Tirthan rivers. Check in to wooden cottage next to the river. Bonfire evening.' },
      { day: 'Day 2', title: 'Great Himalayan National Park Gate & Chhoie Waterfall Trek', details: 'Gentle walk through cedar forests to Chhoie waterfall. Visit trout breeding farms and experience angling.' },
      { day: 'Day 3', title: 'Tirthan to Jibhi Treehouse & Village Stroll', details: 'Drive to Jibhi. Check in to iconic treehouse. Walk to hidden wooden bridges and Jibhi waterfall.' },
      { day: 'Day 4', title: 'Jalori Pass & Serolsar Lake Alpine Trek', details: 'Drive up Jalori Pass (3,120m). 5 km trek to sacred Serolsar Lake and Budhi Nagin temple through ancient oak forests.' },
      { day: 'Day 5', title: 'Jibhi to Chandigarh Drop', details: 'Scenic morning drive back to Chandigarh station/airport.' }
    ],
    inclusions: [
      'Private mountain vehicle with local driver',
      '4 Nights stay in hand-selected boutique treehouses & river cabins',
      'Fresh organic mountain breakfast and dinners',
      'Guided walk to Serolsar Lake & Chhoie Waterfall',
      'All toll, fuel, and driver expenses'
    ],
    exclusions: ['Trout fishing permit fees', 'Lunch and personal expenses']
  },
  {
    id: 'pkg-dharamshala-dalhousie',
    title: 'Dhauladhar Magic: Dharamshala, McLeodganj & Dalhousie-Khajjiar',
    state: 'Himachal Pradesh',
    category: 'Scenic',
    type: 'Culture & Nature',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.89,
    reviewsCount: 276,
    badge: 'Popular Combo',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 17499,
    discountedPrice: 13299,
    pickupDrop: 'Pathankot / Chakki Bank / Chandigarh',
    transport: 'Private AC Mountain Cab',
    hotelStay: '3★/4★ Valley View Stays',
    meals: 'Breakfast & Dinner Daily',
    route: 'Pathankot/Chandigarh ➔ Dharamshala (2N) ➔ McLeodganj ➔ Dalhousie (3N) ➔ Khajjiar',
    overview: 'Immerse in Tibetan monasteries, world-famous HPCA cricket stadium, and the European meadow allure of Khajjiar (Mini Switzerland) surrounded by towering deodars.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dharamshala Check-in', details: 'Pick up and drive to Dharamshala. Visit HPCA Stadium and local Tibetan markets.' },
      { day: 'Day 2', title: 'McLeodganj Dalai Lama Temple & Bhagsu Waterfall', details: 'Visit Tsuglagkhang Complex, Bhagsu Nath temple, waterfall, and quaint mountain cafés.' },
      { day: 'Day 3', title: 'Dharamshala to Dalhousie Scenic Transfer', details: 'Drive through pine valleys to colonial town of Dalhousie. Evening Mall Road walk.' },
      { day: 'Day 4', title: 'Excursion to Khajjiar (Mini Switzerland of India)', details: 'Spend day at Khajjiar saucer meadow, zorbing, horse riding, and visiting Kalatop wildlife sanctuary.' },
      { day: 'Day 5', title: 'Dalhousie Local & Dainkund Peak', details: 'Hike to Dainkund Peak (Singing Hills) and visit St. John Church.' },
      { day: 'Day 6', title: 'Drop at Pathankot / Chandigarh', details: 'Morning checkout and drop at railway station/airport.' }
    ],
    inclusions: [
      'Private dedicated cab for entire journey',
      '5 Nights accommodation in scenic valley-view hotels',
      'Daily morning breakfast and dinner',
      'All toll taxes, parking, and driver allowances'
    ],
    exclusions: ['Adventure activity tickets', 'Lunch and personal expenses']
  }
];

export const VEHICLE_FLEET = [
  {
    name: 'Swift Dzire / Toyota Etios',
    category: 'Executive Sedan',
    capacity: 'Up to 4 Passengers',
    luggage: '2-3 Medium Bags',
    idealFor: 'Couples, small families, budget-conscious travelers',
    features: ['High Fuel Efficiency', 'Air Conditioned', 'Experienced Mountain Driver', 'Music System'],
    ratePerKm: '₹14/km (All Incl. Tour Packages Available)',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Luxury Mountain SUV',
    capacity: '6 to 7 Passengers',
    luggage: '4-5 Large Bags',
    idealFor: 'Families, elder comfort, long Himalayan drives',
    features: ['Plush Captain Seats', 'Superior Mountain Suspension', 'Rear AC Vents', 'Hill Assist Safety'],
    ratePerKm: '₹22/km (Preferred for Comfort)',
    image: 'https://images.unsplash.com/photo-1512566393827-78dc4c8d8292?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mahindra Thar / 4x4 Camper',
    category: 'Extreme Terrain 4x4',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    idealFor: 'Spiti Valley, Chandratal, Zanskar, Winter Snow',
    features: ['Low-range 4x4 Drive', 'High Ground Clearance', 'All-Terrain Tires', 'Extreme Weather Ready'],
    ratePerKm: '₹30/km (Off-road Specialist)',
    image: 'https://images.unsplash.com/photo-1632107502848-74bbfa62f1ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Force Urbania / Tempo Traveller',
    category: 'Luxury Group Coach',
    capacity: '12 to 17 Passengers',
    luggage: 'Ample Dedicated Luggage Boot',
    idealFor: 'Corporate groups, extended families, friend squads',
    features: ['Pushback Recliner Seats', 'LED Screen & Stereo', 'Panoramic Windows', 'Separate Driver Cabin'],
    ratePerKm: '₹28 - ₹34/km',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh & Sunita Sharma',
    city: 'Mumbai, Maharashtra',
    package: 'Magical Himachal (Shimla & Manali)',
    rating: 5,
    date: 'February 2026',
    comment: 'HimYatra made our 25th anniversary trip completely stress-free! Our driver Vicky bhaiya was so polite and knew every snow turn around Atal Tunnel. The hotel rooms in Manali had direct snow mountain views. Truly genuine Pahadi hospitality!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Dr. Ananya Mukhopadhyay',
    city: 'Kolkata, West Bengal',
    package: 'Sacred Do Dham Yatra (Kedarnath & Badrinath)',
    rating: 5,
    date: 'October 2025',
    comment: 'Traveling with my 68-year-old parents to Kedarnath seemed daunting, but HimYatra organized priority token assistance and clean oxygen support. Their team kept calling us twice daily to check health and road updates. Devbhoomi was truly magical.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Vikram & Friends Squad',
    city: 'Bengaluru, Karnataka',
    package: 'Spiti Valley Grand 4x4 Expedition',
    rating: 5,
    date: 'June 2025',
    comment: 'The Spiti road trip was the adventure of a lifetime! Crossing Batal river streams, camping by Chandratal lake under millions of stars, and mailing postcards from Hikkim. Innova driver Tenzin was an absolute rockstar on steep cliffs.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Pooja & Amit Patel',
    city: 'Ahmedabad, Gujarat',
    package: 'Nainital & Jim Corbett Family Tour',
    rating: 5,
    date: 'December 2025',
    comment: 'We wanted pure vegetarian Jain meal arrangements and child-friendly stops, and HimYatra took care of every single detail. We even spotted two Royal Bengal Tigers during our morning Corbett safari! Highly recommended for families.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS = [
  {
    question: 'How do bookings and reservations work with HimYatra?',
    answer: 'You can reserve any tour package with just a 20% advance token amount. The remaining balance can be paid upon arrival or check-in. We send you an instant booking voucher with confirmed hotel details, driver contact numbers, and day-to-day itinerary.'
  },
  {
    question: 'Do your drivers know how to handle high-altitude and snow conditions?',
    answer: 'Yes, 100%! All our drivers are indigenous locals from Himachal Pradesh and Uttarakhand with over 8+ years of mountain driving experience. Our vehicles carry snow chains, proper hill permits, and emergency first aid supplies.'
  },
  {
    question: 'Which is better to visit: Himachal Pradesh or Uttarakhand?',
    answer: 'Himachal Pradesh is ideal if you want snow sports, alpine valleys, café culture (Manali, Kasol, Jibhi), and high-altitude road trips (Spiti). Uttarakhand (Devbhoomi) is ideal for sacred pilgrimages (Kedarnath, Badrinath, Rishikesh Ganga Aarti), wildlife tiger safaris (Jim Corbett), and serene lake districts (Nainital).'
  },
  {
    question: 'What is included in the tour package price?',
    answer: 'All our packages include private dedicated cab for transfers & sightseeing, hotel accommodation with mountain views, daily breakfast and dinner, toll taxes, fuel, state permits, and 24x7 trip support. There are zero hidden fees!'
  },
  {
    question: 'Can we customize the itinerary according to our flight or train timings?',
    answer: 'Absolutely! Every itinerary can be customized. You can add extra days, change hotel categories, request specific vehicle types (Sedan, Innova Crysta, Urbania), or adjust pickup cities (Delhi, Chandigarh, Dehradun, Ambala, Amritsar).'
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer: 'We offer flexible cancellations. If cancelled 15 days prior to travel, 90% of the advance amount is refunded. For cancellations within 7-14 days, you can reschedule your trip anytime within the next 12 months with zero penalty.'
  }
];

export const SEASONAL_OFFERS = [
  {
    code: 'HIMPEAKS15',
    discount: '15% FLAT OFF',
    title: 'Early Bird Himalayan Summer & Snowfall Escape',
    description: 'Book any Himachal or Uttarakhand tour package 20 days in advance and get flat 15% discount + complimentary river rafting or candle light dinner.',
    validTill: 'Limited Time Offer',
    badge: 'Trending Offer'
  },
  {
    code: 'CHARDHAM2026',
    discount: 'SAVE ₹3,500',
    title: 'Devbhoomi Pilgrimage Priority Token',
    description: 'Special early reservation discount for Kedarnath & Badrinath Do Dham / Char Dham packages with guaranteed VIP biometric darshan guidance.',
    validTill: 'First 50 Bookings',
    badge: 'Spiritual Special'
  },
  {
    code: 'HONEYMOONMAGIC',
    discount: 'FREE UPGRADE',
    title: 'Couples Romantic Suite Upgrade',
    description: 'Complimentary room decoration, cake, candle light dinner and luxury cab upgrade for newlywed couples traveling to Manali or Mussoorie.',
    validTill: 'Ongoing',
    badge: 'Couples Special'
  }
];
