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

Your job: help visitors choose packages, understand routes, plan trips, and contact the team.
CRITICAL LANGUAGE RULE:
- If the user writes or speaks in English, reply strictly in English.
- If the user writes in Hindi or Hinglish, reply in Hindi/Hinglish.
Be warm, polite, and concise: 2 to 5 sentences, a short list only when it helps.

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
- Founder & Contact: Amit Verma | Phone/WhatsApp: +91 76199 17057 | Email: amitpatel42203@gmail.com | Desks: Shimla (HP) & Rishikesh (UK)
- Payment: 30% advance to confirm booking (UPI, card), balance on arrival.

PACKAGE RECOMMENDATION FORMAT:
When recommending a package, output a card block like this:
:::PACKAGE_CARD:::{"title":"Package Name","duration":"6D/5N","price":"₹14,999","pkgId":"pkg-id-here"}:::END:::

For honeymoon: always suggest Kashmir Paradise (pkg-kashmir-paradise), Magical Himachal (pkg-himachal-magic), and Rajasthan Royalty (pkg-rajasthan-royalty).`;

function fallbackSmartReply(text) {
  const q = (text || '').toLowerCase();
  const isEn = !/(kya|hai|hain|kaise|kahan|kaha|kitna|batao|mujhe|hum|jana|gaadi|kiraya|sasta|namaste|yatra|chahiye)/i.test(q);

  // Honeymoon
  if (/(honeymoon|couple|romantic|candle|shadi|shaadi|wedding|anniversary)/i.test(q)) {
    if (isEn) {
      return `💖 **HimYatra Romantic & Honeymoon Specials!**
Congratulations on your special journey! Here are our 3 most celebrated Himalayan honeymoon packages:

1. **Kashmir Paradise (6D/5N — ₹14,999/person)**: Private sunset Shikara on Dal Lake, romantic luxury houseboat stay, candlelight dinner & snow gondola in Gulmarg!
2. **Magical Himachal & Manali (6D/5N — ₹13,499/person)**: Cozy mountain resorts, snow views at Solang Valley, Atal Tunnel to Sissu, and private cab.
3. **Royal Udaipur & Lake Palace (6D/5N — ₹13,999/person)**: Romantic evening boat cruise on Lake Pichola and royal heritage stays.

:::PACKAGE_CARD:::{"title":"Kashmir Paradise: Srinagar, Gulmarg & Houseboat","duration":"6D / 5N","price":"₹14,999","pkgId":"pkg-kashmir-paradise"}:::END:::
:::PACKAGE_CARD:::{"title":"Magical Himachal: Shimla, Kullu & Manali","duration":"6D / 5N","price":"₹13,499","pkgId":"pkg-himachal-magic"}:::END:::
:::PACKAGE_CARD:::{"title":"Royal Rajputana: Jaipur Pink City & Udaipur","duration":"6D / 5N","price":"₹13,999","pkgId":"pkg-rajasthan-royalty"}:::END:::`;
    }
    return `💖 **HimYatra Romantic & Honeymoon Specials!**
Congratulations on your special journey! Humare top 3 curated Himalayan honeymoon packages hain:

1. **Kashmir Paradise (6D/5N — ₹14,999/person)** — Dal Lake private shikara ride, romantic houseboat stay, candle-light dinner, and Gulmarg snow gondola!
2. **Magical Himachal & Manali (6D/5N — ₹13,499/person)** — Solang snow slopes, cozy wooden mountain resort, Atal Tunnel & private cab.
3. **Royal Udaipur & Lake Palace (6D/5N — ₹13,999/person)** — Sunset boat cruise on Lake Pichola and royal heritage stays.

:::PACKAGE_CARD:::{"title":"Kashmir Paradise: Srinagar, Gulmarg & Houseboat","duration":"6D / 5N","price":"₹14,999","pkgId":"pkg-kashmir-paradise"}:::END:::
:::PACKAGE_CARD:::{"title":"Magical Himachal: Shimla, Kullu & Manali","duration":"6D / 5N","price":"₹13,499","pkgId":"pkg-himachal-magic"}:::END:::
:::PACKAGE_CARD:::{"title":"Royal Rajputana: Jaipur Pink City & Udaipur","duration":"6D / 5N","price":"₹13,999","pkgId":"pkg-rajasthan-royalty"}:::END:::`;
  }

  // Help / Contact
  if (/(help|contact|phone|call|email|gmail|whatsapp|founder|amit)/i.test(q)) {
    return `📞 **HimYatra Direct Contact & Support Desk**
• 👤 **Founder:** Amit Verma
• 📱 **Direct Call & WhatsApp:** +91 76199 17057
• ✉️ **Official Email:** amitpatel42203@gmail.com
• 🏢 **Desks:** The Mall Road, Shimla (HP) & Tapovan, Rishikesh (Uttarakhand)`;
  }

  // General greeting / fallback
  if (isEn) {
    return `Hello! 🙏 Welcome to **HimYatra**!
I am your personal AI Himalayan Travel Assistant. How can I help you today?
• 💑 **Honeymoon Specials** (Kashmir, Manali, Udaipur)
• 🛕 **Char Dham & Kedarnath Yatra 2026**
• 🚖 **Fixed Route Cabs** (Delhi/Chandigarh to Hills)
• 🏔️ **Adventure & Treks** (Spiti 4x4, Ladakh, Chopta)

:::PACKAGE_CARD:::{"title":"Magical Himachal: Shimla, Kullu & Manali","duration":"6D / 5N","price":"₹13,499","pkgId":"pkg-himachal-magic"}:::END:::
:::PACKAGE_CARD:::{"title":"Kashmir Paradise: Srinagar, Gulmarg & Houseboat","duration":"6D / 5N","price":"₹14,999","pkgId":"pkg-kashmir-paradise"}:::END:::`;
  }

  return `Namaste! 🙏 Welcome to **HimYatra**!
Main aapki Himalayan travel planning mein madad kar sakta hoon:
• 💑 **Honeymoon Specials** (Kashmir, Manali, Udaipur)
• 🛕 **Char Dham & Kedarnath Yatra 2026**
• 🚖 **Fixed Route Cabs** (Delhi/Chandigarh to Hills)
• 🏔️ **Adventure & Treks** (Spiti 4x4, Ladakh, Chopta)

:::PACKAGE_CARD:::{"title":"Magical Himachal: Shimla, Kullu & Manali","duration":"6D / 5N","price":"₹13,499","pkgId":"pkg-himachal-magic"}:::END:::
:::PACKAGE_CARD:::{"title":"Kashmir Paradise: Srinagar, Gulmarg & Houseboat","duration":"6D / 5N","price":"₹14,999","pkgId":"pkg-kashmir-paradise"}:::END:::`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (rateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment.',
      reply: 'Please wait a moment before sending another message or WhatsApp us directly at: +91 76199 17057'
    });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    const sanitizedMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.role === 'user' ? sanitize(m.content) : (m.content || '').slice(0, 2000)
    })).filter(m => m.content.length > 0);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';

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
        console.warn('Claude API request timed out or failed, falling back:', e?.message);
      }
    }

    const reply = fallbackSmartReply(lastUserMsg);
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Chat API unexpected error:', err);
    return res.status(200).json({
      reply: fallbackSmartReply('help')
    });
  }
}
