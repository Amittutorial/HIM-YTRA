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
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1718383538820-524dd564fd06?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
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
  },

  // Featured Sacred & Heritage Destinations
  {
    id: 'up-ayodhya',
    name: 'Ayodhya & Ram Janmabhoomi',
    state: 'Uttar Pradesh',
    tagline: 'Divine Birthplace of Lord Rama & Holy Saryu River',
    altitude: '93 m',
    bestTime: 'October to March (Grand Deepotsav & Aarti)',
    image: 'https://images.unsplash.com/photo-1707327956851-30a531b70cda?auto=format&fit=crop&w=1200&q=80',
    description: 'The sacred land of Sri Rama. Experience the magnificent hand-carved stone Shri Ram Janmabhoomi Teerth Kshetra Mandir, evening Saryu Maha Aarti at Ram Ki Paidi, Hanuman Garhi temple, Kanak Bhawan, and the record-breaking Diwali Deepotsav.',
    highlights: ['Shri Ram Janmabhoomi Mandir Darshan', 'Saryu River Evening Maha Aarti', 'Hanuman Garhi & Kanak Bhawan', 'Surya Kund Light & Sound Show'],
    packagesCount: 4,
    startingPrice: 6499,
    weather: '15°C - 28°C',
    popularFor: ['Spiritual Darshan', 'Ram Mandir', 'Saryu Aarti', 'Heritage Culture']
  },
  {
    id: 'up-varanasi',
    name: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    tagline: 'World’s Oldest Living Spiritual City & Sacred Ganga',
    altitude: '81 m',
    bestTime: 'September to March (Dev Deepawali & Winter)',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'The luminous eternal city of Lord Shiva on the sacred banks of Mother Ganga. Witness the world-renowned evening Maha Aarti at Dashashwamedh Ghat, golden spires of Kashi Vishwanath Jyotirlinga, dawn boat rides along ancient stone ghats, and silk weaving trails.',
    highlights: ['Kashi Vishwanath Corridor & Golden Temple', 'Dashashwamedh Ghat Ganga Aarti (VIP Seats)', 'Sunrise Morning Wooden Boat Ride', 'Sarnath Buddhist Peace Stupa Tour'],
    packagesCount: 4,
    startingPrice: 5999,
    weather: '14°C - 26°C',
    popularFor: ['Maha Ganga Aarti', 'Kashi Vishwanath', 'Ancient Ghats', 'Spiritual Peace']
  },
  {
    id: 'ladakh-leh',
    name: 'Ladakh & Pangong Tso',
    state: 'Ladakh',
    tagline: 'Land of High Mountain Passes & Turquoise Lakes',
    altitude: '3,500 m - 4,350 m',
    bestTime: 'May to October',
    image: 'https://images.unsplash.com/photo-1652204597589-962156b9483d?auto=format&fit=crop&w=1200&q=80',
    description: 'Trans-Himalayan desert wonderland with electric blue Pangong Lake, double-humped camel rides in Nubra sand dunes, Khardung La (one of world’s highest motorable passes), and cliff-hanging Buddhist gompas.',
    highlights: ['Pangong Tso Color-Changing Lake Camping', 'Khardung La High Mountain Pass (5,359m)', 'Nubra Valley Hunder White Sand Dunes', 'Thiksey & Hemis Monasteries'],
    packagesCount: 5,
    startingPrice: 19999,
    weather: '0°C - 16°C',
    popularFor: ['High Altitude Lakes', 'Biking & 4x4', 'Monasteries', 'Raw Adventure']
  },
  {
    id: 'punjab-amritsar',
    name: 'Amritsar & Golden Temple',
    state: 'Punjab',
    tagline: 'Sacred Abode of Serenity & Divine Langar',
    altitude: '234 m',
    bestTime: 'October to March',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    description: 'Sri Harmandir Sahib (The Golden Temple), gilded in pure 24-karat gold and surrounded by the holy Amrit Sarovar pool. Experience the divine world-largest 24/7 community Langar kitchen, Wagah Border patriotism retreat ceremony, and legendary Punjabi kulcha food walks.',
    highlights: ['Sri Harmandir Sahib Golden Temple Darshan', 'World-Largest Langar Kitchen Experience', 'Wagah Border Beating Retreat Ceremony', 'Jallianwala Bagh Memorial & Old City Food Walk'],
    packagesCount: 3,
    startingPrice: 4999,
    weather: '12°C - 24°C',
    popularFor: ['Golden Temple', 'Langar Kitchen', 'Wagah Border', 'Spiritual Peace']
  },

  // Kashmir
  {
    id: 'jk-srinagar-gulmarg',
    name: 'Srinagar, Gulmarg & Pahalgam',
    state: 'Kashmir',
    tagline: 'Paradise on Earth — Dal Lake Shikaras & Alpine Snow Slopes',
    altitude: '1,585 m - 3,950 m',
    bestTime: 'March to October & Dec-Feb for Winter Snow',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    description: 'The crown jewel of Himalayan beauty. Glide on Dal Lake in hand-carved cedar Shikaras, ascend Asia’s highest cable car Gulmarg Gondola over pine forests, and walk along Betaab Valley and Chandanwari in Pahalgam.',
    highlights: ['Dal Lake Shikara & Houseboat Stays', 'Gulmarg Gondola World’s 2nd Highest Cable Car', 'Pahalgam Betaab Valley & Aru River Trails', 'Mughal Terraced Gardens (Shalimar & Nishat)'],
    packagesCount: 5,
    startingPrice: 11999,
    weather: '4°C - 20°C',
    popularFor: ['Houseboat Stays', 'Gondola Cable Car', 'Honeymoon', 'Pahadi Hospitality']
  },

  // Rajasthan
  {
    id: 'rj-jaipur-amber',
    name: 'Jaipur & Amber Palace',
    state: 'Rajasthan',
    tagline: 'The Royal Pink City — Palaces, Forts & Vibrant Bazaars',
    altitude: '431 m',
    bestTime: 'October to March',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse in royal Rajputana grandeur. Ascend the majestic ramparts of Amber Fort overlooking Maota Lake, photograph the 953-windowed pink facade of Hawa Mahal, explore City Palace museums, and watch the sun dip over Nahargarh Fort.',
    highlights: ['Amber Fort Elephant / Open-Jeep Safari', 'Hawa Mahal Palace of Winds', 'City Palace & Jantar Mantar Observatory', 'Nahargarh Fort Sunset Panorama'],
    packagesCount: 4,
    startingPrice: 6999,
    weather: '14°C - 28°C',
    popularFor: ['Heritage Forts', 'Palace Architecture', 'Royal Cuisine', 'Photography']
  },
  {
    id: 'rj-udaipur-lakes',
    name: 'Udaipur & Lake Pichola',
    state: 'Rajasthan',
    tagline: 'City of Lakes — Venice of the East & Floating Palaces',
    altitude: '598 m',
    bestTime: 'September to March',
    image: 'https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s most romantic city. Shimmering Lake Pichola bordered by the marble ramparts of City Palace, magical boat cruises to Jag Mandir island palace, folk dances at Bagore Ki Haveli, and panoramic views from Sajjangarh Monsoon Palace.',
    highlights: ['Lake Pichola Sunset Luxury Boat Cruise', 'City Palace Historic Museum & Courtyards', 'Jag Mandir Island Palace Tour', 'Sajjangarh Monsoon Palace Mountain View'],
    packagesCount: 4,
    startingPrice: 8499,
    weather: '15°C - 27°C',
    popularFor: ['Romantic Lakes', 'Floating Palaces', 'Heritage Luxury', 'Sunset Cruises']
  },

  // Goa
  {
    id: 'goa-coastal',
    name: 'Goa & Arabian Coastline',
    state: 'Goa',
    tagline: 'Sun-Kissed Beaches, Portuguese Forts & Tropical Serenity',
    altitude: 'Sea Level',
    bestTime: 'October to May',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'Pristine golden sands fringed by swaying coconut palms, 17th-century Portuguese Aguada Fort, water sports at Calangute and Palolem, 4-tier Dudhsagar waterfalls jungle jeep safari, and vibrant beachside dining.',
    highlights: ['Palolem & Calangute Beach Water Sports', 'Dudhsagar 4-Tier Waterfalls 4x4 Jeep Safari', 'Old Goa UNESCO Basilica of Bom Jesus', 'Mandovi River Sunset Cruise & Live Music'],
    packagesCount: 4,
    startingPrice: 7999,
    weather: '22°C - 31°C',
    popularFor: ['Golden Beaches', 'Water Sports', 'Portuguese Heritage', 'Night Bazaars']
  },

  // Kerala
  {
    id: 'kl-munnar-alleppey',
    name: 'Munnar & Alleppey Backwaters',
    state: 'Kerala',
    tagline: 'God’s Own Country — Verdant Tea Hills & Houseboat Canals',
    altitude: 'Sea Level - 1,600 m',
    bestTime: 'September to March',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Endless rolling emerald Munnar tea hills, misty mountain gap roads, exotic wildlife at Eravikulam National Park, combined with an unforgettable overnight traditional kettuvallam houseboat cruise along palm-fringed Alleppey lagoons.',
    highlights: ['Private Overnight Alleppey Houseboat Cruise', 'Munnar Tea Gardens & Tata Tea Museum', 'Eravikulam National Park (Nilgiri Tahr)', 'Mattupetty Dam & Eco Point Boating'],
    packagesCount: 5,
    startingPrice: 10499,
    weather: '16°C - 28°C',
    popularFor: ['Houseboat Cruises', 'Tea Plantations', 'Ayurvedic Spas', 'Honeymoon']
  },

  // Sikkim
  {
    id: 'sk-gangtok-tsomgo',
    name: 'Gangtok, Tsomgo & Nathula',
    state: 'Sikkim',
    tagline: 'Eastern Himalayan Wonderland & Sacred Glacial Lakes',
    altitude: '1,650 m - 4,310 m',
    bestTime: 'March to June & October to December',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    description: 'Panoramic views of Mount Kanchenjunga (world’s 3rd highest peak), sacred turquoise glacial lake Tsomgo with decorated yak rides, Indo-China historic border at Nathula Pass, and peaceful Buddhist chanting at Rumtek Monastery.',
    highlights: ['Tsomgo Glacial Holy Lake (12,310 ft)', 'Nathula Indo-China Border Pass Permit', 'Rumtek & Enchey Ancient Monasteries', 'Gangtok Ropeway & MG Marg Stroll'],
    packagesCount: 4,
    startingPrice: 12999,
    weather: '6°C - 18°C',
    popularFor: ['Glacial Lakes', 'Kanchenjunga Views', 'Monasteries', 'Himalayan Passes']
  },

  // Meghalaya
  {
    id: 'mg-shillong-cherrapunji',
    name: 'Meghalaya, Cherrapunji & Dawki',
    state: 'Meghalaya',
    tagline: 'Abode of Clouds — Living Root Bridges & Glass Rivers',
    altitude: '1,496 m',
    bestTime: 'October to May',
    image: 'https://images.unsplash.com/photo-1521437620269-f477f5437820?auto=format&fit=crop&w=1200&q=80',
    description: 'Trek to the ancient bio-engineered Double Decker Living Root Bridges of Nongriat, boat on the world’s clearest glass-like turquoise river Umngot in Dawki, marvel at towering Nohkalikai Falls, and experience Asia’s cleanest village Mawlynnong.',
    highlights: ['Double Decker Living Root Bridge Trek', 'Crystal Clear Dawki River Boating', 'Nohkalikai Falls (India’s Tallest Plunge)', 'Mawlynnong Asia’s Cleanest Village'],
    packagesCount: 4,
    startingPrice: 13999,
    weather: '10°C - 22°C',
    popularFor: ['Living Root Bridges', 'Crystal Rivers', 'Caving & Treks', 'Waterfalls']
  },

  // Prayagraj & Sacred Sangam
  {
    id: 'up-prayagraj-sangam',
    name: 'Prayagraj & Sacred Sangam',
    state: 'Uttar Pradesh',
    tagline: 'Triveni Sangam — Sacred Confluence of Ganga, Yamuna & Saraswati',
    altitude: '98 m',
    bestTime: 'October to March (Magh Mela & Kumbh Season)',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'The holy site of the Kumbh Mela where the sacred Ganga, Yamuna, and mystical Saraswati meet. Take a divine holy bath (snan) in mid-river, seek blessings at the reclining Bade Hanuman Mandir, and visit the historical Anand Bhawan.',
    highlights: ['Triveni Sangam Mid-River Boat Snan', 'Bade Hanuman Temple (Reclining Idol)', 'Akshayavat Sacred Undying Banyan Tree', 'Anand Bhawan & Alopi Devi Shaktipeeth'],
    packagesCount: 3,
    startingPrice: 3999,
    weather: '14°C - 27°C',
    popularFor: ['Triveni Sangam', 'Holy Snan', 'Kumbh Heritage', 'Spiritual Peace']
  }
];

export const TOUR_PACKAGES = [
  {
    id: 'pkg-kashmir-paradise',
    title: 'Heaven on Earth: Srinagar, Gulmarg Gondola & Pahalgam Valley with Shikara',
    state: 'Kashmir',
    category: 'Bestseller',
    categories: ["Bestseller","Honeymoon","Family","Offbeat"],
    type: 'Family & Honeymoon',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.96,
    reviewsCount: 340,
    badge: 'Honeymoon Special',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 19999,
    discountedPrice: 14999,
    pickupDrop: 'Srinagar Airport (SXR)',
    transport: 'Private Dedicated Cab (Etios / Innova)',
    hotelStay: '4★ Lake View Hotels & 1 Night Luxury Houseboat',
    meals: 'Daily Breakfast & Dinner with Authentic Kashmiri Wazwan',
    route: 'Srinagar (2N) ➔ Gulmarg (1N) ➔ Pahalgam (1N) ➔ Dal Lake Houseboat (1N)',
    overview: 'The definitive Kashmir dream vacation. Cruise through water-lilies on Dal Lake in a wooden Shikara, ride the high-altitude Gulmarg Gondola over pine trees, picnic along the roaring Lidder river in Pahalgam, and sleep under stars on a heritage wooden houseboat.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Srinagar & Dal Lake Sunset Shikara',
        details: 'Warm Kashmiri welcome at Srinagar Airport. Check-in at hotel. Evening 1-hour sunset Shikara ride across Dal Lake, visiting floating gardens and Nehru Park.'
      },
      {
        day: 'Day 2',
        title: 'Srinagar to Gulmarg Day Trip (Gondola Cable Car)',
        details: 'Drive to the "Meadow of Flowers" Gulmarg. Ascend to Phase 1 (Kongdoori) & Phase 2 (Apharwat Peak 13,780 ft) via the famous Gondola cable car. Return to Srinagar.'
      },
      {
        day: 'Day 3',
        title: 'Srinagar to Pahalgam via Saffron Fields of Pampore',
        details: 'Scenic mountain drive past world-famous Pampore saffron fields and Awantipora ruins. Check-in at riverside resort in Pahalgam. Walk along the crystal Lidder river.'
      },
      {
        day: 'Day 4',
        title: 'Pahalgam Betaab Valley, Aru & Chandanwari',
        details: 'Full day excursion to picturesque Betaab Valley, Aru alpine meadows, and Chandanwari (start point of holy Amarnath Yatra). Evening local wool shopping.'
      },
      {
        day: 'Day 5',
        title: 'Pahalgam to Srinagar Heritage Houseboat Stay',
        details: 'Drive back to Srinagar. Check-in to a luxury carved cedar-wood Houseboat on Nigeen / Dal Lake. Visit Shalimar Bagh and Nishat Bagh royal Mughal gardens.'
      },
      {
        day: 'Day 6',
        title: 'Departure with Sweet Mountain Memories',
        details: 'Morning breakfast overlooking the lake. Transfer to Srinagar airport with authentic Kashmiri dry fruits and shawls memories.'
      }
    ],
    inclusions: ['5 Nights Deluxe Stays (1N Houseboat)', 'Private Cab for all 6 Days', 'Daily Breakfast & Dinner', '1-Hour Sunset Shikara Ride', 'All State Tolls, Parking & Driver Charges'],
    exclusions: ['Airfare', 'Gulmarg Gondola tickets (booked directly via JK Tourism)', 'Pahalgam local union cab/pony rides', 'Personal expenses']
  },
  {
    id: 'pkg-rajasthan-royalty',
    title: 'Royal Rajputana: Jaipur Pink City & Udaipur Lake Palace Circuit',
    state: 'Rajasthan',
    category: 'Family',
    categories: ["Family","Bestseller","Honeymoon"],
    type: 'Family & Culture',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.93,
    reviewsCount: 290,
    badge: 'Royal Heritage',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 18499,
    discountedPrice: 13999,
    pickupDrop: 'Jaipur Airport / Udaipur Airport',
    transport: 'Private Air-Conditioned Sedan / Innova',
    hotelStay: '3★ / 4★ Heritage Haveli Stays',
    meals: 'Daily Royal Rajasthani Breakfast & Dinner Included',
    route: 'Jaipur (2N) ➔ Pushkar & Ajmer (1N) ➔ Udaipur (2N)',
    overview: 'Step into royal Rajput history. Explore towering stone ramparts of Amber Fort, photograph pink Hawa Mahal, visit holy Brahma Temple in sacred Pushkar, and cruise the golden waters of Lake Pichola in romantic Udaipur.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Jaipur & Chokhi Dhani Cultural Village',
        details: 'Arrival at Jaipur. Check-in at heritage haveli. Evening visit to Chokhi Dhani ethnic village resort for authentic Rajasthani folk dance, puppet show, and royal thali dinner.'
      },
      {
        day: 'Day 2',
        title: 'Jaipur Forts & Palaces (Amber, Hawa Mahal & Nahargarh)',
        details: 'Morning visit to grand Amber Fort. Photo stop at Jal Mahal in Man Sagar Lake. Afternoon tour of City Palace, Jantar Mantar observatory, and sunset at Nahargarh Fort.'
      },
      {
        day: 'Day 3',
        title: 'Jaipur to Pushkar via Ajmer Sharif Dargah',
        details: 'Drive to holy Pushkar. Visit world-famous Ajmer Sharif Dargah en route. Attend peaceful evening aarti at Pushkar holy lake and visit the unique Lord Brahma temple.'
      },
      {
        day: 'Day 4',
        title: 'Pushkar to Udaipur (City of Lakes)',
        details: 'Scenic highway drive to Udaipur. Check-in at lake-facing hotel. Evening leisurely stroll around Fateh Sagar Lake and Saheliyon Ki Bari royal maiden gardens.'
      },
      {
        day: 'Day 5',
        title: 'Udaipur City Palace & Sunset Lake Pichola Boat Cruise',
        details: 'Visit grand City Palace museum. Afternoon boat ride on shimmering Lake Pichola to Jag Mandir palace. Evening cultural dance show at historic Bagore Ki Haveli.'
      },
      {
        day: 'Day 6',
        title: 'Departure from Udaipur',
        details: 'Morning souvenir shopping for Bandhani sarees and handicrafts in old city bazaars. Drop-off at Udaipur airport or railway station.'
      }
    ],
    inclusions: ['5 Nights Heritage Hotel Stay', 'Dedicated Private AC Vehicle', 'Daily Breakfast & Dinner', 'Pushkar & Ajmer Sightseeing', 'Lake Pichola Boat Cruise Ticket', 'All Tolls & Driver Allowances'],
    exclusions: ['Airfare/Train tickets', 'Monument entry tickets', 'Lunches', 'Personal shopping']
  },
  {
    id: 'pkg-kerala-backwaters',
    title: 'God’s Own Country: Munnar Misty Tea Hills & Alleppey Houseboat',
    state: 'Kerala',
    category: 'Honeymoon',
    categories: ["Honeymoon","Family","Bestseller","Offbeat"],
    type: 'Couple & Family',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.95,
    reviewsCount: 310,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 17999,
    discountedPrice: 12999,
    pickupDrop: 'Cochin International Airport (COK)',
    transport: 'Private AC Dedicated Cab',
    hotelStay: '3★ / 4★ Hill Resorts & 1 Night Private Houseboat',
    meals: 'Daily Breakfast & Dinner with Authentic Kerala Meals on Houseboat',
    route: 'Cochin ➔ Munnar (2N) ➔ Thekkady (1N) ➔ Alleppey Backwaters (1N) ➔ Cochin',
    overview: 'Lush rolling tea estates, cool mountain mist, spice plantations, and the world-famous backwaters of Alleppey. Includes a private overnight cruise with chef-cooked traditional meals on board.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Cochin to Munnar (Waterfalls & Tea Hills Drive)',
        details: 'Pickup from Cochin. Spectacular scenic drive up the Western Ghats with photo stops at Cheeyappara and Valara waterfalls. Check-in at tea-valley resort in Munnar.'
      },
      {
        day: 'Day 2',
        title: 'Munnar Tea Estates, Eravikulam & Mattupetty Dam',
        details: 'Visit Eravikulam National Park (home to endangered Nilgiri Tahr). Tour KDHP Tea Museum, Mattupetty Lake Dam boating, and the natural Echo Point.'
      },
      {
        day: 'Day 3',
        title: 'Munnar to Thekkady (Periyar Tiger Reserve)',
        details: 'Drive through cardamom hills to Thekkady. Enjoy guided spice plantation tour and evening Kalaripayattu martial arts and Kathakali cultural show.'
      },
      {
        day: 'Day 4',
        title: 'Thekkady to Alleppey (Private Houseboat Cruise)',
        details: 'Drive to Alleppey backwaters. Board your private traditional thatched Houseboat at 12:30 PM. Cruise through palm-fringed lagoons, paddy fields, and backwater villages.'
      },
      {
        day: 'Day 5',
        title: 'Houseboat Check-out & Drop at Cochin Airport',
        details: 'Enjoy morning sunrise over backwaters with traditional Kerala breakfast. Disembark at 9:30 AM and transfer to Cochin airport or railway station.'
      }
    ],
    inclusions: ['4 Nights Stays (1N Private Houseboat)', 'Dedicated AC Private Vehicle', 'All Meals on Houseboat (Lunch, Evening Tea, Dinner, Breakfast)', 'Breakfast & Dinner at Resorts', 'All Driver & State Toll Charges'],
    exclusions: ['Airfare/Train tickets', 'Boating & national park tickets', 'Personal laundry & telephone charges']
  },
  {
    id: 'pkg-sikkim-himalaya',
    title: 'Majestic Sikkim & Gangtok: Tsomgo Glacial Lake & Kanchenjunga Vistas',
    state: 'Sikkim',
    category: 'Adventure',
    categories: ["Adventure","Bestseller","Offbeat","Family"],
    type: 'Family & Adventure',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.91,
    reviewsCount: 220,
    badge: 'Alpine Wonder',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 19499,
    discountedPrice: 14499,
    pickupDrop: 'Bagdogra Airport (IXB) / NJP Railway Station',
    transport: 'Private Luxury Mountain Vehicle (Innova / Xylo)',
    hotelStay: '3★ / 4★ Mountain View Hotels in Gangtok',
    meals: 'Daily Breakfast & Dinner Included',
    route: 'Bagdogra / NJP ➔ Gangtok (4N) ➔ Tsomgo Lake & Baba Mandir ➔ Bagdogra',
    overview: 'Discover the untamed grandeur of the Eastern Himalayas. Behold Mount Kanchenjunga, visit sacred glacial lake Tsomgo at 12,310 feet, explore 300-year-old Buddhist monasteries, and enjoy vibrant MG Marg evenings.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Bagdogra/NJP to Gangtok (Scenic Teesta River Drive)',
        details: 'Pickup from Bagdogra/NJP. Breathtaking 4.5-hour drive alongside the roaring emerald Teesta river. Check-in at hotel. Evening stroll at pedestrian-only MG Marg.'
      },
      {
        day: 'Day 2',
        title: 'Excursion to Sacred Tsomgo Lake & Baba Mandir',
        details: 'Drive to high-altitude holy Tsomgo Lake (12,310 ft) with snowy peaks reflecting in water. Visit historic Baba Harbhajan Singh shrine near Indo-China border.'
      },
      {
        day: 'Day 3',
        title: 'Gangtok Full Day Sightseeing (Monasteries & Waterfalls)',
        details: 'Visit Rumtek Monastery (Seat of Karmapa), Banjhakri Waterfalls, Do Drul Chorten Stupa, Namgyal Institute of Tibetology, and panoramic Tashi Viewpoint.'
      },
      {
        day: 'Day 4',
        title: 'Day Excursion to Namchi & Chardham Complex',
        details: 'Scenic day tour to Namchi. Visit the colossal 108-ft statue of Lord Shiva at Siddheshwar Dham and 135-ft Guru Padmasambhava statue atop Samdruptse hill.'
      },
      {
        day: 'Day 5',
        title: 'Departure to Bagdogra / NJP',
        details: 'After breakfast, drive down through scenic pine hills back to Bagdogra Airport or NJP Railway Station with unforgettable memories of Sikkim.'
      }
    ],
    inclusions: ['4 Nights Hotel in Gangtok', 'Private Dedicated Vehicle for all transfers & sightseeing', 'Daily Breakfast & Dinner', 'Tsomgo Lake & Baba Mandir Border Permits', 'All Tolls, Parking & Driver Allowances'],
    exclusions: ['Airfare/Train tickets', 'Nathula Pass permit fee (subject to Army approval)', 'Ropeway & Yak ride charges', 'Lunches']
  },
  {
    id: 'pkg-goa-sunshine',
    title: 'Tropical Goa Beach Vacation: Water Sports, Dudhsagar & Coastal Resorts',
    state: 'Goa',
    category: 'Bestseller',
    categories: ["Bestseller","Honeymoon","Adventure","Family"],
    type: 'Family & Friends',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    rating: 4.88,
    reviewsCount: 360,
    badge: 'Beach Special',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 13999,
    discountedPrice: 9499,
    pickupDrop: 'Mopa (GOX) / Dabolim (GOI) Airport or Madgaon Station',
    transport: 'Private Dedicated AC Vehicle throughout the trip',
    hotelStay: '3★ / 4★ Swimming Pool Beach Resort',
    meals: 'Daily Buffet Breakfast Included',
    route: 'Airport ➔ North Goa Beaches (2N) ➔ South Goa & Heritage (1N) ➔ Airport',
    overview: 'Relax on golden Arabian sea shores, enjoy thrilling water sports, take a jeep safari to the spectacular 4-tiered Dudhsagar Waterfalls in the jungle, and savor fresh seafood alongside live music.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Goa & Evening Beach Sunset',
        details: 'Warm welcome on arrival at Goa Airport. Transfer to beach resort. Spend evening unwinding by the pool or enjoying sunset cocktails on Calangute/Baga beach.'
      },
      {
        day: 'Day 2',
        title: 'North Goa Beaches, Fort Aguada & Water Sports',
        details: 'Visit 17th-century Portuguese Fort Aguada and lighthouse. Head to Anjuna and Baga beach for jet skiing, parasailing, and banana boat rides. Evening Tito’s lane vibes.'
      },
      {
        day: 'Day 3',
        title: 'Dudhsagar Waterfalls Jungle Safari or South Goa Churches',
        details: 'Exciting open-top 4x4 jeep safari through Mollem National Park to the base of Dudhsagar Waterfalls. Swim in natural freshwater pool. Visit Old Goa UNESCO churches.'
      },
      {
        day: 'Day 4',
        title: 'Morning Beach Walk & Departure',
        details: 'Leisurely morning swim in the sea and breakfast. Souvenir shopping at local flea markets. Drop-off at airport or railway station.'
      }
    ],
    inclusions: ['3 Nights Beach Resort Stay with Swimming Pool', 'Private AC Vehicle for all transfers & sightseeing', 'Daily Buffet Breakfast', 'North Goa & South Goa Sightseeing', 'All Tolls, Parking & Driver Charges'],
    exclusions: ['Airfare/Train tickets', 'Water sports activity tickets', 'Dudhsagar jeep safari entry fee', 'Lunches & Dinners']
  },
  {
    id: 'pkg-ayodhya-kashi',
    title: 'Divine Ram Mandir Ayodhya & Kashi Vishwanath Sacred Yatra',
    state: 'Uttar Pradesh',
    category: 'Spiritual',
    categories: ["Spiritual","Family","Bestseller"],
    type: 'Family & Pilgrim',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.95,
    reviewsCount: 420,
    badge: 'Featured Pilgrimage',
    image: 'https://images.unsplash.com/photo-1707327956851-30a531b70cda?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 16999,
    discountedPrice: 12499,
    pickupDrop: 'Ayodhya / Varanasi Airport & Railway Station',
    transport: 'Private AC Sedan / Innova with Local Pilot',
    hotelStay: '3★ / 4★ Premium Pilgrim Friendly Hotels',
    meals: 'Pure Vegetarian Breakfast & Dinner Included',
    route: 'Ayodhya (2N) ➔ Prayagraj Sangam ➔ Varanasi / Kashi (2N)',
    overview: 'The holy pilgrimage of a lifetime. Experience VIP Darshan at the grand Shri Ram Janmabhoomi Mandir in Ayodhya, evening Saryu Maha Aarti, Holy Triveni Sangam Snan in Prayagraj, and the divine Kashi Vishwanath Corridor with Dashashwamedh Ganga Aarti boat seats.',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Ayodhya & Saryu Maha Aarti',
        details: 'Warm traditional welcome on arrival at Ayodhya. Check-in at hotel. Afternoon visit to Ram Ki Paidi and attend the divine Saryu Maha Aarti with hundreds of glowing lamps. Evening visit to Hanuman Garhi temple.'
      },
      {
        day: 'Day 2',
        title: 'Shri Ram Janmabhoomi Mandir VIP Darshan & Kanak Bhawan',
        details: 'Morning peaceful darshan at the magnificent Shri Ram Janmabhoomi Teerth Kshetra. Visit Sita Rasoi, Kanak Bhawan, Dashrath Mahal, and the Surya Kund heritage light show in the evening.'
      },
      {
        day: 'Day 3',
        title: 'Ayodhya to Prayagraj Sangam to Varanasi (Kashi)',
        details: 'Scenic drive to Prayagraj. Sacred holy bath (snan) and boat ride at Triveni Sangam (Ganga, Yamuna, Saraswati). Visit Anand Bhawan and Bade Hanuman temple. Continue drive to holy Kashi (Varanasi). Night stay in Varanasi.'
      },
      {
        day: 'Day 4',
        title: 'Kashi Vishwanath Jyotirlinga & Evening Ganga Aarti',
        details: 'Early morning VIP Darshan at Kashi Vishwanath temple via the grand corridor. Visit Annapurna Mandir and Kaal Bhairav. Sunset boat ride on river Ganga to witness the mesmerizing world-famous Maha Aarti at Dashashwamedh Ghat.'
      },
      {
        day: 'Day 5',
        title: 'Sarnath Buddhist Stupa & Departure',
        details: 'Morning trip to peaceful Sarnath where Lord Buddha gave his first sermon. Explore Dhamek Stupa and archaeological museum. Drop-off at Varanasi airport or railway station with divine prasad.'
      }
    ],
    inclusions: ['4 Nights Hotel Accommodation', 'Dedicated Private AC Vehicle', 'Daily Breakfast & Dinner', 'VIP Temple Darshan Assistance', 'Saryu & Ganga Aarti Boat Experience', 'All Tolls, Parking & Driver Allowances'],
    exclusions: ['Airfare / Train tickets', 'Personal donations / VIP special pujas', 'Lunches', 'Items of personal nature']
  },
  {
    id: 'pkg-himachal-magic',
    title: 'Magical Himachal: Shimla, Kullu & Manali with Atal Tunnel',
    state: 'Himachal Pradesh',
    category: 'Bestseller',
    categories: ["Bestseller","Family","Honeymoon"],
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
    categories: ["Adventure","Offbeat","Bestseller"],
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
    categories: ["Spiritual","Family","Bestseller"],
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
    categories: ["Honeymoon","Bestseller"],
    type: 'Couples & Leisure',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.88,
    reviewsCount: 245,
    badge: 'Honeymoon Special',
    image: '/destinations/mussoorie-honeymoon.jpg',
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
    categories: ["Adventure","Offbeat","Bestseller"],
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
    categories: ["Family","Bestseller","Honeymoon"],
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
    categories: ["Offbeat","Honeymoon","Adventure"],
    type: 'Peace & Nature',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.94,
    reviewsCount: 142,
    badge: 'Hidden Gem',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
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
    categories: ["Family","Offbeat","Bestseller"],
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
  },
  {
    id: 'pkg-ladakh-pangong',
    title: 'Highland Odyssey: Leh Ladakh, Pangong Tso Lake & Nubra Valley 4x4',
    state: 'Ladakh',
    category: 'Adventure',
    categories: ["Adventure","Offbeat","Bestseller"],
    type: 'Adventure & Biking',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    rating: 4.97,
    reviewsCount: 312,
    badge: 'High Altitude Thrill',
    image: 'https://images.unsplash.com/photo-1652204597589-962156b9483d?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 28999,
    discountedPrice: 21999,
    pickupDrop: 'Kushok Bakula Rimpochee Airport, Leh (IXL)',
    transport: 'Dedicated 4x4 Mountain Cab (Innova / Scorpio) with Oxygen Cylinder',
    hotelStay: '3★/4★ Heritage Leh Hotels & Deluxe Camps at Pangong Tso',
    meals: 'Nutritious Breakfast & Dinner with Warm Himalayan Soups',
    route: 'Leh (2N) ➔ Khardung La Pass ➔ Nubra Valley (1N) ➔ Pangong Tso (1N) ➔ Leh (1N)',
    overview: 'Experience the crown of the Himalayas. Stand on Khardung La (17,982 ft), ride double-humped Bactrian camels in Nubra white sand dunes, and camp under the Milky Way by the azure waters of Pangong Tso.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Leh & Complete Acclimatization', details: 'Pick up from Leh airport. Check-in to hotel. Mandatory rest for high altitude acclimatization. Evening sunset walk at Shanti Stupa.' },
      { day: 'Day 2', title: 'Leh Monasteries, Hall of Fame & Magnetic Hill', details: 'Visit Shey Palace, Thiksey Monastery, confluence of Indus & Zanskar rivers (Sangam), and defy gravity at Magnetic Hill.' },
      { day: 'Day 3', title: 'Leh to Nubra Valley via Khardung La Pass (5,359m)', details: 'Drive across Khardung La. Descend into Nubra Valley. Ride Bactrian camels on Hunder sand dunes. Night stay in luxury camp.' },
      { day: 'Day 4', title: 'Nubra Valley to Pangong Tso Lake via Shyok River', details: 'Spectacular offroad drive along Shyok River to world-famous Pangong Lake. Witness colors shifting from emerald to turquoise. Stargazing bonfire.' },
      { day: 'Day 5', title: 'Pangong Tso Sunrise & Return to Leh via Chang La', details: 'Early morning photography by the crystal waters. Drive back to Leh over Chang La Pass (17,688 ft). Evening souvenir shopping at Leh Main Bazaar.' },
      { day: 'Day 6', title: 'Leh Airport Drop with Himalayan Memories', details: 'Breakfast and timely transfer to Leh airport.' }
    ],
    inclusions: ['5 Nights Hotel & Glamping Accommodation', 'Dedicated Mountain 4x4 Cab with Oxygen Kit', 'Inner Line Permits & Wildlife Fees', 'Daily Breakfast and Dinner', 'Local Ladakhi Guide Assistance'],
    exclusions: ['Airfare to Leh', 'Camel rides at Hunder', 'Personal medical expenses']
  },
  {
    id: 'pkg-meghalaya-dawki',
    title: 'Enchanted Meghalaya: Shillong, Cherrapunji Living Root Bridges & Dawki Glass River',
    state: 'Meghalaya',
    category: 'Offbeat',
    categories: ["Offbeat","Adventure","Bestseller","Family"],
    type: 'Nature & Trekking',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.95,
    reviewsCount: 198,
    badge: 'Abode of Clouds',
    image: 'https://images.unsplash.com/photo-1521437620269-f477f5437820?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 19999,
    discountedPrice: 14999,
    pickupDrop: 'Guwahati Airport (GAU) / Railway Station',
    transport: 'Dedicated AC Mountain Cab with Khasi Driver Guide',
    hotelStay: 'Boutique Pine Resorts in Shillong & Cherrapunji',
    meals: 'Daily Breakfast & Local Khasi / North Indian Dinners',
    route: 'Guwahati ➔ Umiam Lake ➔ Shillong (2N) ➔ Cherrapunji (1N) ➔ Dawki (1N) ➔ Guwahati',
    overview: 'Explore the wettest wonderland on Earth. Walk across 500-year-old Double Decker Living Root Bridges in Nongriat, float on glass-like transparent Dawki River, marvel at towering Nohkalikai Falls, and explore ancient Mawsmai limestone caves.',
    itinerary: [
      { day: 'Day 1', title: 'Guwahati to Shillong via Umiam Lake', details: 'Pickup from Guwahati. Scenic highway drive with photo stop at Umiam Lake (Barapani). Check in to Shillong resort. Evening Police Bazar walk.' },
      { day: 'Day 2', title: 'Shillong to Cherrapunji Waterfalls & Caves', details: 'Drive past misty canyons to Cherrapunji. Visit Nohkalikai Falls, Elephant Falls, Seven Sisters Falls, and Mawsmai limestone caves.' },
      { day: 'Day 3', title: 'Double Decker Living Root Bridge Trek at Nongriat', details: 'Trek down into the rainforest valley to marvel at the bio-engineered Double Decker Root Bridge and natural turquoise rock pools.' },
      { day: 'Day 4', title: 'Cherrapunji to Dawki & Mawlynnong (Cleanest Village)', details: 'Drive to Indo-Bangladesh border. Take a wooden boat ride on transparent Umngot River where boats float in air. Tour Mawlynnong Asia’s cleanest village.' },
      { day: 'Day 5', title: 'Dawki to Guwahati Drop via Krang Shuri Falls', details: 'Morning swim at Krang Shuri turquoise falls. Drive back to Guwahati airport/station.' }
    ],
    inclusions: ['4 Nights Boutique Resort Stays', 'Dedicated Private Cab with Local Driver Guide', 'Daily Breakfast and Dinner', 'Dawki River Wooden Boating Experience', 'All Tolls, Parking & Forest Entry Permits'],
    exclusions: ['Airfare/Train tickets', 'Guide charges for Nongriat trek', 'Lunches & personal snacks']
  },
  {
    id: 'pkg-amritsar-golden-heritage',
    title: 'Divine Amritsar: Golden Temple, Wagah Border & Punjabi Cultural Tour',
    state: 'Punjab',
    category: 'Spiritual',
    categories: ["Spiritual","Family","Bestseller"],
    type: 'Family & Pilgrim',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    rating: 4.96,
    reviewsCount: 380,
    badge: 'Spiritual Splendor',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 8999,
    discountedPrice: 5999,
    pickupDrop: 'Sri Guru Ram Dass Jee Airport / Amritsar Junction',
    transport: 'Private Dedicated AC Sedan',
    hotelStay: '4★ Hotel Walking Distance from Golden Temple',
    meals: 'Daily Breakfast & Amritsari Kulcha / Langar Experience',
    route: 'Amritsar Airport/Station ➔ Sri Harmandir Sahib (2N) ➔ Wagah Border ➔ Amritsar',
    overview: 'Immerse in the peace and grandeur of Sri Harmandir Sahib (The Golden Temple) illuminated over the holy Amrit Sarovar pool. Experience the world’s largest free community kitchen (Langar), witness the patriotic Wagah Border Beating Retreat ceremony, and savor authentic Punjabi cuisine.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Amritsar & Night Golden Temple Darshan', details: 'Pickup and check-in. Evening visit to Sri Harmandir Sahib bathed in golden light reflecting in the holy Sarovar. Participate in Langar service.' },
      { day: 'Day 2', title: 'Jallianwala Bagh & Wagah Border Retreat Ceremony', details: 'Morning heritage walk to historic Jallianwala Bagh. Afternoon drive to Indo-Pak Wagah Border for the thrilling military Beating Retreat ceremony.' },
      { day: 'Day 3', title: 'Partition Museum & Departure', details: 'Visit Partition Museum and taste authentic Amritsari stuffed kulchas and sweet lassi. Drop-off at airport or station.' }
    ],
    inclusions: ['2 Nights 4★ Hotel Accommodation', 'Dedicated Private AC Cab for all transfers', 'Daily Breakfast & Food Guide', 'Wagah Border Ceremony Transfer & Guidance', 'All Tolls & Parking'],
    exclusions: ['Airfare/Train tickets', 'Personal shopping & tips']
  }
,
  {
    id: 'pkg-uttarakhand-offbeat',
    title: 'Secret Devbhoomi: Kanatal, Chopta Tungnath & Chakrata Pine Escape',
    state: 'Uttarakhand',
    category: 'Offbeat',
    categories: ['Offbeat', 'Adventure', 'Bestseller'],
    type: 'Offbeat & Hidden Meadows',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    rating: 4.94,
    reviewsCount: 182,
    badge: 'Hidden Gem',
    image: '/destinations/chopta-tungnath.jpg',
    originalPrice: 16999,
    discountedPrice: 11999,
    pickupDrop: 'Dehradun / Rishikesh',
    transport: 'Private Dedicated Mountain Cab',
    hotelStay: 'Alpine Wooden Cottages & Glamping Tents',
    meals: 'Daily Breakfast & Pahadi Style Dinners',
    route: 'Dehradun ➔ Kanatal (1N) ➔ Chopta (2N) ➔ Chakrata (1N) ➔ Dehradun',
    overview: 'Escape tourist crowds and immerse into pristine deodar forests, alpine bugyal meadows, and crystal clear night skies. Hike to the world’s highest Shiva temple at Tungnath, stargaze in Swiss tents at Chopta, and discover the hidden waterfalls of Chakrata.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival Dehradun to Kanatal Pine Ridge', details: 'Scenic ascent past Mussoorie bypass to quiet Kanatal. Check into wooden mountain chalet overlooking snow peaks. Sunset forest walk.' },
      { day: 'Day 2', title: 'Kanatal to Chopta (Mini Switzerland of India)', details: 'Drive along Mandakini river gorge into dense rhododendron forests of Chopta. Evening bonfire and stargazing under pollution-free skies.' },
      { day: 'Day 3', title: 'Tungnath Shiva Temple & Chandrashila Peak Trek', details: 'Hike 4.5 km to the highest Shiva temple on Earth at Tungnath (3,680m) and climb Chandrashila summit for 360-degree Himalayan views.' },
      { day: 'Day 4', title: 'Chopta to Hidden Chakrata & Tiger Falls', details: 'Drive to the unspoiled British cantonment hamlet of Chakrata. Trek down to pristine Tiger Falls and walk through centuries-old oak and deodar woods.' },
      { day: 'Day 5', title: 'Chakrata to Dehradun Departure', details: 'Morning stroll to Chilmiri sunset point. Descend smoothly back to Dehradun airport or railway station.' }
    ],
    inclusions: ['4 Nights Boutique Mountain Stay', 'Dedicated Private Mountain Cab', 'Daily Breakfast & Dinner', 'Guided Tungnath & Tiger Falls Hikes', 'Tolls, Parking & Driver Night Allowance'],
    exclusions: ['Airfare/Train tickets', 'Personal tips and laundry']
  },
  {
    id: 'pkg-rishikesh-adventure',
    title: 'Rishikesh Ganga Rapids: White Water Rafting, Cliff Jump & Riverside Camp',
    state: 'Uttarakhand',
    category: 'Adventure',
    categories: ['Adventure', 'Spiritual', 'Bestseller', 'Family'],
    type: 'Adventure & Wellness',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    rating: 4.91,
    reviewsCount: 215,
    badge: 'Adrenaline Rush',
    image: 'https://images.unsplash.com/photo-1687735175748-a19b5adb7591?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 8999,
    discountedPrice: 5499,
    pickupDrop: 'Haridwar / Dehradun / Rishikesh',
    transport: 'Private Dedicated AC Cab',
    hotelStay: 'Riverside Luxury Swiss Camps with Pool',
    meals: 'All Meals Included (Buffet Breakfast, Lunch, Evening Snacks & Dinner with Bonfire)',
    route: 'Rishikesh ➔ Shivpuri Camp (2N) ➔ Triveni Ghat ➔ Haridwar',
    overview: 'Feel the thunder of holy River Ganga with Grade III/IV white-water rafting, body surfing, cliff jumping, evening beach campfire with live guitar music, and divine sunset Ganga Aarti at Triveni Ghat.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Rishikesh & Riverside Camp Check-in', details: 'Check-in at luxury swiss camps along the Ganga tributary. Evening volleyball, river dip, beach campfire with barbecue snacks and music.' },
      { day: 'Day 2', title: '16 Km White Water Rafting & Cliff Jump', details: 'Conquer famous rapids: Roller Coaster, Golf Course, and Club House. Experience 25-ft cliff jumping and body surfing under certified instructors.' },
      { day: 'Day 3', title: 'Beatles Ashram, Triveni Ghat Aarti & Departure', details: 'Visit iconic Beatles Ashram graffiti huts, attend sunset Maha Aarti at Triveni Ghat, and drop-off at Haridwar or Dehradun station.' }
    ],
    inclusions: ['2 Nights Luxury Camp Accommodation', '16 Km River Rafting with all gear & guide', 'All Meals (Breakfast, Lunch, Dinner & Snacks)', 'Evening Bonfire & Music', 'All Local Transfers'],
    exclusions: ['Bungee jumping (optional add-on)', 'Personal expenses']
  },
  {
    id: 'pkg-varanasi-prayagraj',
    title: 'Sacred Kashi & Triveni Sangam: Varanasi Ghats, Ganga Aarti & Prayagraj Snan',
    state: 'Uttar Pradesh',
    category: 'Spiritual',
    categories: ['Spiritual', 'Family', 'Bestseller'],
    type: 'Spiritual & Heritage',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    rating: 4.97,
    reviewsCount: 360,
    badge: 'Maha Aarti Special',
    image: '/destinations/varanasi-aarti.jpg',
    originalPrice: 12999,
    discountedPrice: 8499,
    pickupDrop: 'Varanasi Airport / Cantt Station',
    transport: 'Private Dedicated AC Sedan',
    hotelStay: '4★ Heritage Hotel near Dashashwamedh Ghat',
    meals: 'Daily Breakfast & Authentic Banarasi Food Experience',
    route: 'Varanasi (2N) ➔ Prayagraj Sangam Day Trip ➔ Sarnath (1N) ➔ Varanasi',
    overview: 'Experience the eternal spirituality of Kashi Vishwanath Dham, private evening boat ride during grand Dashashwamedh Ganga Aarti, holy Triveni Sangam bath in Prayagraj, and the tranquil Buddhist deer park at Sarnath.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Varanasi & Evening Ganga Maha Aarti', details: 'Warm pickup and hotel check-in. Evening private traditional bajra boat cruise to witness the divine Maha Aarti at Dashashwamedh Ghat from the water.' },
      { day: 'Day 2', title: 'Kashi Vishwanath Corridor & Subah-e-Banaras', details: 'Sunrise boat ride along 84 Ghats. VIP darshan at Sri Kashi Vishwanath Golden Temple, Annapurna Mandir, and stroll through ancient alleyways.' },
      { day: 'Day 3', title: 'Excursion to Prayagraj Triveni Sangam', details: 'Day trip to Prayagraj. Sacred mid-river boat ride at the confluence of Ganga, Yamuna & Saraswati. Visit Bade Hanuman Mandir and Anand Bhawan.' },
      { day: 'Day 4', title: 'Sarnath Buddhist Stupas & Departure', details: 'Visit Dhamek Stupa and Ashoka Pillar where Lord Buddha delivered his first sermon. Transfer to Varanasi airport or station.' }
    ],
    inclusions: ['3 Nights 4★ Hotel Accommodation', 'Dedicated AC Cab for all days including Prayagraj excursion', 'Daily Breakfast', 'Private Sunset & Sunrise Boat Rides on Ganga', 'All Tolls, Parking & Driver Night Charges'],
    exclusions: ['Airfare/Train tickets', 'Special VIP entry passes', 'Personal shopping for Banarasi silk']
  },
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
    image: '/destinations/swift-dzire.jpg'
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Luxury Mountain SUV',
    capacity: '6 to 7 Passengers',
    luggage: '4-5 Large Bags',
    idealFor: 'Families, elder comfort, long Himalayan drives',
    features: ['Plush Captain Seats', 'Superior Mountain Suspension', 'Rear AC Vents', 'Hill Assist Safety'],
    ratePerKm: '₹22/km (Preferred for Comfort)',
    image: '/destinations/innova-crysta.jpg'
  },
  {
    name: 'Mahindra Thar / 4x4 Camper',
    category: 'Extreme Terrain 4x4',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    idealFor: 'Spiti Valley, Chandratal, Zanskar, Winter Snow',
    features: ['Low-range 4x4 Drive', 'High Ground Clearance', 'All-Terrain Tires', 'Extreme Weather Ready'],
    ratePerKm: '₹30/km (Off-road Specialist)',
    image: '/destinations/mahindra-thar.jpg'
  },
  {
    name: 'Force Urbania / Tempo Traveller',
    category: 'Luxury Group Coach',
    capacity: '12 to 17 Passengers',
    luggage: 'Ample Dedicated Luggage Boot',
    idealFor: 'Corporate groups, extended families, friend squads',
    features: ['Pushback Recliner Seats', 'LED Screen & Stereo', 'Panoramic Windows', 'Separate Driver Cabin'],
    ratePerKm: '₹28 - ₹34/km',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80'
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
