// Vercel Serverless Function — POST /api/chat
// Proxies conversation to Claude API if configured, otherwise serves smart Himalayan travel knowledge engine.
// Never exposes keys to frontend and never crashes or leaves visitors with an error.

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // max requests per window per IP
const MAX_MSG_LENGTH = 500;
const ipRequests = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const entry = ipRequests.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }
  ipRequests.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s.,!?₹@#%&*()\-+=:;'"\/\u0900-\u097F\u0980-\u09FF]/g, '')
    .slice(0, MAX_MSG_LENGTH);
}

const SYSTEM_PROMPT = `You are the HimYatra Assistant on the HimYatra website. HimYatra offers tour packages, cab rentals, spiritual circuits (like Char Dham), and adventure trips across Himachal Pradesh, Uttarakhand, Kashmir, Rajasthan, Ladakh, and more.

Your job: help visitors choose packages, understand routes, plan trips, and contact the team. Reply in the user's language (Hindi, Hinglish, or English). Be warm, polite, and concise: 2 to 5 sentences, a short list only when it helps.

Business information (use ONLY this):
- Packages & prices:
  • Kashmir Paradise: 6D/5N, ₹14,999/person (Honeymoon Special)
  • Magical Himachal (Shimla-Manali-Solang): 6D/5N, ₹13,499/person (Most Popular)
  • Spiti Valley Circuit: 8D/7N, ₹16,999/person (Adventure 4x4)
  • Kedarnath-Badrinath Yatra: 6D/5N, ₹18,999/person (Spiritual Do Dham)
  • Complete Char Dham Yatra: 10D/9N, ₹24,999/person
  • Dharamshala-Dalhousie: 5D/4N, ₹8,499/person
  • Jibhi-Tirthan Offbeat: 4D/3N, ₹7,999/person
  • Ladakh-Pangong: 7D/6N, ₹19,999/person
  • Rajasthan Royalty: 6D/5N, ₹13,999/person (Honeymoon & Culture)
  • Divine Ayodhya-Kashi: 5D/4N, ₹12,499/person
  • Amritsar Golden Heritage: 3D/2N, ₹4,999/person
  • Uttarakhand Offbeat (Chopta/Tungnath/Chandrashila): 5D/4N, ₹8,999/person

- Cab routes & fixed fares (one-way, all tolls/taxes included):
  • Delhi → Manali: Sedan ₹5,500 | SUV ₹7,500 | 12-Seater Tempo ₹12,000
  • Delhi → Shimla: Sedan ₹4,000 | SUV ₹6,000 | Tempo ₹10,000
  • Delhi → Dharamshala: Sedan ₹5,000 | SUV ₹7,000 | Tempo ₹11,000
  • Haridwar → Kedarnath (Sonprayag): SUV ₹6,500 | Tempo ₹11,000
  • Chandigarh → Manali: Sedan ₹3,500 | SUV ₹5,500
  • Delhi → Rishikesh / Haridwar: Sedan ₹3,500 | SUV ₹5,500

- Inclusions (most packages): Hotel stay, daily breakfast & dinner, private cab, sightseeing, driver allowance, all tolls & parking.
- Exclusions: Flights/trains, lunch, personal expenses, adventure activities.
- Cancellation: 100% full refund 15+ days before. 50% refund 7-14 days before.
- Founder & Contact: Amit Verma | Phone/WhatsApp: +91 76199 17057 | Email: himyatra.help@gmail.com | Desks: Shimla (HP) & Rishikesh (UK)
- Payment: 30% advance to confirm booking (UPI, card), balance on arrival.

PACKAGE RECOMMENDATION FORMAT:
When recommending a package, output a card block like this:
:::PACKAGE_CARD:::{"title":"Package Name","duration":"6D/5N","price":"₹14,999","pkgId":"pkg-id-here"}:::END:::

For honeymoon: always suggest Kashmir Paradise (pkg-kashmir-paradise), Magical Himachal (pkg-himachal-magic), and Rajasthan Royalty (pkg-rajasthan-royalty).`;

function fallbackSmartReply(text) {
  const q = (text || '').toLowerCase();

  // Honeymoon
  if (/(honeymoon|couple|romantic|candle|shadi|shaadi|wedding|anniversary)/i.test(q)) {
    return `💖 **HimYatra Romantic & Honeymoon Specials!**
Congratulations on your special journey! Humare top 3 curated Himalayan honeymoon packages hain:

1. **Kashmir Paradise (6D/5N - ₹14,999/person)** — Dal Lake private shikara ride, romantic houseboat stay, candle-light dinner, and Gulmarg snow gondola!
2. **Magical Himachal & Manali (6D/5N - ₹13,499/person)** — Solang snow slopes, cozy wooden mountain resort, Atal Tunnel & private cab.
3. **Royal Udaipur & Lake Palace (6D/5N - ₹13,999/person)** — Sunset boat cruise on Lake Pichola and royal heritage stays.

:::PACKAGE_CARD:::{"title":"Kashmir Paradise: Srinagar, Gulmarg & Houseboat","duration":"6D / 5N","price":"₹14,999","pkgId":"pkg-kashmir-paradise"}:::END:::
:::PACKAGE_CARD:::{"title":"Magical Himachal: Shimla, Kullu & Manali","duration":"6D / 5N","price":"₹13,499","pkgId":"pkg-himachal-magic"}:::END:::
:::PACKAGE_CARD:::{"title":"Royal Rajputana: Jaipur Pink City & Udaipur","duration":"6D / 5N","price":"₹13,999","pkgId":"pkg-rajasthan-royalty"}:::END:::

Aap website par **"Popular Packages"** section mein jakar bhi inki complete details dekh sakte hain ya direct WhatsApp par custom dates ke saath connect karein!`;
  }

  // Char Dham / Kedarnath
  if (/(char\s*dham|chardham|kedarnath|badrinath|gangotri|yamunotri|darshan|heli|yatra)/i.test(q)) {
    return `🛕 **Sacred Devbhoomi Char Dham Yatra 2026**
Har Har Mahadev! Kapat opens in May 2026. Hum provide karte hain:
• Free biometric yatra registration
• Helicopter shuttle booking assistance (Phata / Guptkashi / Sirsi)
• Sanitized private cabs with experienced mountain drivers
• Deluxe stays at Sonprayag & Badrinath

:::PACKAGE_CARD:::{"title":"Complete Char Dham Yatra: All 4 Dhams","duration":"10D / 9N","price":"₹24,999","pkgId":"pkg-chardham-complete"}:::END:::
:::PACKAGE_CARD:::{"title":"Sacred Do Dham: Kedarnath & Badrinath","duration":"6D / 5N","price":"₹18,999","pkgId":"pkg-kedarnath-badrinath"}:::END:::

VIP Darshan pass aur helicopter ticket availability ke liye direct WhatsApp par contact karein!`;
  }

  // Cab Rentals
  if (/(cab|taxi|rental|fare|rate|price|kiraya|car|innova|tempo)/i.test(q)) {
    return `🚖 **HimYatra Verified Fixed-Route Cab Fares:**
• **Delhi ➔ Manali:** Sedan **₹5,500** | SUV **₹7,500** | 12-Seater Tempo **₹12,000**
• **Delhi ➔ Shimla:** Sedan **₹4,000** | SUV **₹6,000** | Tempo **₹10,000**
• **Delhi ➔ Haridwar / Rishikesh:** Sedan **₹3,500** | SUV **₹5,500** | Tempo **₹9,500**
• **Haridwar ➔ Sonprayag (Kedarnath):** SUV **₹6,500** | Tempo **₹11,000**
• **Chandigarh ➔ Manali:** Sedan **₹3,500** | SUV **₹5,500**

Sabhi fares mein toll, state taxes, fuel aur driver allowances shamil hain (Zero hidden charges!). Website ke **"Cab Rentals"** section mein booking karein!`;
  }

  // Spiti / Ladakh
  if (/(spiti|ladakh|leh|adventure|4x4|chandratal)/i.test(q)) {
    return `🏔️ **Spiti & Ladakh High-Altitude 4x4 Expeditions:**
Trans-Himalayan rugged circuits ke liye hum provide karte hain high-clearance 4x4 SUVs aur certified mountain drivers.

:::PACKAGE_CARD:::{"title":"Raw Spiti Valley 4x4 Circuit: Chandratal & Kaza","duration":"8D / 7N","price":"₹16,999","pkgId":"pkg-spiti-circuit"}:::END:::
:::PACKAGE_CARD:::{"title":"Himalayan Frontier: Leh Ladakh & Pangong Tso","duration":"7D / 6N","price":"₹19,999","pkgId":"pkg-ladakh-pangong"}:::END:::`;
  }

  // Greetings or general
  return `Namaste! 🙏 Welcome to **HimYatra**!
Main aapki Himalayan travel planning mein madad kar sakta hoon:
• 💑 **Honeymoon Specials** (Kashmir, Manali, Udaipur)
• 🛕 **Char Dham & Kedarnath Yatra 2026**
• 🚖 **Fixed Route Cabs** (Delhi/Chandigarh to Hills)
• 🏔️ **Adventure & Treks** (Spiti 4x4, Ladakh, Chopta)

:::PACKAGE_CARD:::{"title":"Magical Himachal: Shimla, Kullu & Manali","duration":"6D / 5N","price":"₹13,499","pkgId":"pkg-himachal-magic"}:::END:::
:::PACKAGE_CARD:::{"title":"Kashmir Paradise: Srinagar, Gulmarg & Houseboat","duration":"6D / 5N","price":"₹14,999","pkgId":"pkg-kashmir-paradise"}:::END:::

Aap kis destination ya month mein plan kar rahe hain? Bataiye! 😊`;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (rateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment.',
      reply: 'Aapne thoda tezi se message bheje hain. Kripya 30 seconds wait karein ya WhatsApp par sampark karein: +91 76199 17057'
    });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    // Sanitize user messages
    const sanitizedMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.role === 'user' ? sanitize(m.content) : (m.content || '').slice(0, 2000)
    })).filter(m => m.content.length > 0);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';

    // If API key is present, attempt Claude API call with timeout
    if (apiKey) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model,
            max_tokens: 800,
            system: SYSTEM_PROMPT,
            messages: sanitizedMessages
          }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          const reply = data.content?.[0]?.text;
          if (reply && reply.trim()) {
            return res.status(200).json({ reply });
          }
        }
      } catch (e) {
        console.warn('Claude API request timed out or failed, falling back to smart engine:', e?.message);
      }
    }

    // Smart fallback engine — always active, 100% reliable, zero failures!
    const reply = fallbackSmartReply(lastUserMsg);
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Chat API unexpected error:', err);
    return res.status(200).json({
      reply: fallbackSmartReply('help')
    });
  }
}
