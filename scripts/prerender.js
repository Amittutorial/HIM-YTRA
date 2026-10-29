import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOUR_PACKAGES, DESTINATIONS } from '../src/data/travelData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');

function writeBoth(subPath, content) {
  const pubTarget = path.join(publicDir, subPath);
  fs.mkdirSync(path.dirname(pubTarget), { recursive: true });
  fs.writeFileSync(pubTarget, content, 'utf-8');

  if (fs.existsSync(distDir)) {
    const distTarget = path.join(distDir, subPath);
    fs.mkdirSync(path.dirname(distTarget), { recursive: true });
    fs.writeFileSync(distTarget, content, 'utf-8');
  }
}

console.log('🏔️ Starting HimYatra Pre-rendering engine...');

// 1. Generate Static Pre-rendered Pages for Every Tour Package
TOUR_PACKAGES.forEach((pkg) => {

  const canonicalUrl = `https://him-ytra.vercel.app/?pkg=${pkg.id}`;
  const ogImage = pkg.image || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&h=630&q=85';
  const pageTitle = `${pkg.title} (${pkg.duration}) — ₹${pkg.discountedPrice?.toLocaleString('en-IN') || pkg.price} | HimYatra`;
  const metaDesc = `${pkg.desc || pkg.subtitle || ''} Experience ${pkg.title} across ${pkg.state}. Includes ${pkg.transport || 'private cab'}, hotel stays, meals & 24/7 mountain support.`;

  const itineraryHtml = (pkg.itinerary || [])
    .map(
      (day) => `
      <div style="margin-bottom: 1.5rem; padding: 1.25rem; background: #0f172a; border-radius: 1rem; border: 1px solid rgba(20, 184, 166, 0.2);">
        <h3 style="color: #2dd4bf; font-size: 1.15rem; margin-top: 0; margin-bottom: 0.5rem;">Day ${day.day}: ${day.title}</h3>
        <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin: 0;">${day.desc}</p>
        ${day.meals ? `<div style="margin-top: 0.5rem; font-size: 0.85rem; color: #94a3b8;">🍽️ Meals Included: <strong>${day.meals}</strong> | 🏨 Stay: <strong>${day.stay || 'Premium Hotel'}</strong></div>` : ''}
      </div>
    `
    )
    .join('');

  const inclusionsHtml = (pkg.inclusions || [])
    .map((inc) => `<li style="margin-bottom: 0.5rem; color: #cbd5e1;">✅ ${inc}</li>`)
    .join('');

  const exclusionsHtml = (pkg.exclusions || [])
    .map((exc) => `<li style="margin-bottom: 0.5rem; color: #94a3b8;">❌ ${exc}</li>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="theme-color" content="#0d9488" />

  <!-- Open Graph / Facebook / WhatsApp (1200x630) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${metaDesc.replace(/"/g, '&quot;')}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${pkg.title}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
  <meta name="twitter:description" content="${metaDesc.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${ogImage}" />

  <!-- Schema.org JSON-LD Structured Data (TouristTrip & TravelAgency) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "${pkg.title}",
    "description": "${metaDesc.replace(/"/g, '&quot;')}",
    "touristType": ["Pilgrims", "Families", "Couples", "Adventure Enthusiasts"],
    "offers": {
      "@type": "Offer",
      "price": "${pkg.discountedPrice || pkg.price}",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "HimYatra Himalayan Tours & Travels",
      "telephone": "+917619917057",
      "url": "https://him-ytra.vercel.app/"
    }
  }
  </script>

  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070b14; color: #f8fafc; margin: 0; padding: 0; line-height: 1.5; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }
    .hero-img { width: 100%; max-height: 420px; object-fit: cover; border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.75rem; border-radius: 9999px; font-weight: 700; text-decoration: none; font-size: 0.95rem; cursor: pointer; transition: 0.2s; }
    .btn-primary { background: linear-gradient(135deg, #14b8a6, #10b981); color: #022c22; }
    .btn-secondary { background: #1e293b; color: #f8fafc; border: 1px solid rgba(255,255,255,0.15); }
    .badge { display: inline-block; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(20, 184, 166, 0.2); color: #2dd4bf; border: 1px solid rgba(20, 184, 166, 0.3); margin-right: 0.5rem; }
    .price-box { background: linear-gradient(135deg, #042f2e, #0f172a); border: 1px solid #14b8a6; padding: 1.5rem; border-radius: 1.25rem; margin: 2rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    h1 { font-size: 2.25rem; font-weight: 900; margin: 0.75rem 0; letter-spacing: -0.025em; }
  </style>

  <script>
    // Seamless Progressive Enhancement: Redirect interactive human visitors to client web app
    if (typeof window !== 'undefined' && !navigator.userAgent.match(/bot|crawl|spider|slurp|facebookexternalhit|whatsapp/i)) {
      window.location.replace('/?pkg=${pkg.id}');
    }
  </script>
</head>
<body>
  <div class="container">
    <div style="margin-bottom: 1.5rem;">
      <a href="/" style="color: #2dd4bf; text-decoration: none; font-weight: 600;">← Back to HimYatra Home</a>
    </div>

    <div>
      <span class="badge">${pkg.state}</span>
      <span class="badge">⏱️ ${pkg.duration}</span>
      ${pkg.badge ? `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3);">${pkg.badge}</span>` : ''}
    </div>

    <h1>${pkg.title}</h1>
    <p style="color: #94a3b8; font-size: 1.1rem; margin-top: 0;">📍 Route: <strong>${pkg.route}</strong></p>

    <img src="${ogImage}" alt="${pkg.title}" class="hero-img" />

    <div class="price-box">
      <div>
        <div style="color: #94a3b8; font-size: 0.85rem; text-transform: uppercase;">Starting All-Inclusive Price</div>
        <div style="font-size: 2rem; font-weight: 900; color: #ffffff;">
          ₹${pkg.discountedPrice?.toLocaleString('en-IN') || pkg.price}
          <span style="font-size: 0.9rem; font-weight: 400; color: #94a3b8;"> / person (Taxes Included)</span>
        </div>
      </div>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I want to inquire about "${pkg.title}" (₹${pkg.discountedPrice}/person). Please share details!`)}" class="btn btn-primary">
          💬 WhatsApp Inquiry
        </a>
        <a href="/?pkg=${pkg.id}" class="btn btn-secondary">
          ✨ Open Interactive Itinerary
        </a>
      </div>
    </div>

    <h2>Day-by-Day Himalayan Itinerary</h2>
    <div style="margin-top: 1rem;">
      ${itineraryHtml}
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
      <div style="background: #0f172a; padding: 1.5rem; border-radius: 1.25rem; border: 1px solid rgba(255,255,255,0.08);">
        <h3 style="color: #2dd4bf; margin-top: 0;">What is Included</h3>
        <ul style="padding-left: 1.25rem; margin: 0;">
          ${inclusionsHtml}
        </ul>
      </div>

      <div style="background: #0f172a; padding: 1.5rem; border-radius: 1.25rem; border: 1px solid rgba(255,255,255,0.08);">
        <h3 style="color: #f87171; margin-top: 0;">What is Excluded</h3>
        <ul style="padding-left: 1.25rem; margin: 0;">
          ${exclusionsHtml}
        </ul>
      </div>
    </div>

    <div style="margin-top: 2.5rem; padding: 1.5rem; background: #042f2e; border-radius: 1.25rem; border: 1px solid #0d9488;">
      <h3 style="margin-top: 0; color: #5eead4;">Pickup Points & Altitude Health Advice</h3>
      <p style="color: #ccfbf1; font-size: 0.95rem;">
        <strong>Pickup Points:</strong> Delhi NCR (Airport / Railway Stations), Chandigarh, Kalka, Haridwar, Dehradun.<br />
        <strong>Mountain Safety:</strong> Dedicated local driver with 10+ years experience on snow and mountain hairpin bends. Keep yourself hydrated, carry warm thermal layers, and take rest during initial ascent.
      </p>
      <p style="margin-bottom: 0;">
        <strong>Helpline:</strong> <a href="tel:+917619917057" style="color: #ffffff; font-weight: bold;">+91 76199 17057</a> | <strong>Email:</strong> amitpatel42203@gmail.com
      </p>
    </div>

    <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); color: #64748b; font-size: 0.85rem; text-align: center;">
      <p>© 2026 HimYatra Himalayan Tours & Cab Rentals. Registered Travel Agency (HP-TO-2024-8841). GSTIN: 02AAACH7891K1Z5. Himachal Pradesh & Uttarakhand Specialist.</p>
    </footer>
  </div>
</body>
</html>`;

  writeBoth(path.join('packages', pkg.id, 'index.html'), html);
});

console.log(`✅ Pre-rendered ${TOUR_PACKAGES.length} individual tour package pages!`);

// 2. Generate Static Pre-rendered Pages for Every Destination
DESTINATIONS.forEach((dest) => {
  const canonicalUrl = `https://him-ytra.vercel.app/?dest=${dest.id}`;
  const ogImage = dest.image || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&h=630&q=85';
  const pageTitle = `${dest.name} Tour Packages, Cabs & Travel Guide (${dest.state}) — HimYatra`;
  const metaDesc = `Explore ${dest.name} in ${dest.state}. ${dest.tagline || ''}. Altitude: ${dest.altitude || 'Himalayas'}. Best time to visit: ${dest.bestTime}. Starting ₹${dest.startingPrice?.toLocaleString('en-IN') || '4,999'} per person.`;

  const highlightsHtml = (dest.highlights || [])
    .map((h) => `<li style="margin-bottom: 0.5rem; color: #cbd5e1;">⭐ ${h}</li>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="theme-color" content="#0d9488" />

  <!-- Open Graph / Facebook / WhatsApp (1200x630) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${metaDesc.replace(/"/g, '&quot;')}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${dest.name}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}" />
  <meta name="twitter:description" content="${metaDesc.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${ogImage}" />

  <!-- Schema.org JSON-LD (TouristDestination & TravelAgency) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "${dest.name}",
    "description": "${dest.description?.replace(/"/g, '&quot;') || metaDesc.replace(/"/g, '&quot;')}",
    "containedInPlace": {
      "@type": "State",
      "name": "${dest.state}"
    },
    "touristType": ["Families", "Pilgrims", "Couples", "Trekkers"]
  }
  </script>

  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070b14; color: #f8fafc; margin: 0; padding: 0; line-height: 1.5; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }
    .hero-img { width: 100%; max-height: 420px; object-fit: cover; border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.75rem; border-radius: 9999px; font-weight: 700; text-decoration: none; font-size: 0.95rem; cursor: pointer; transition: 0.2s; }
    .btn-primary { background: linear-gradient(135deg, #14b8a6, #10b981); color: #022c22; }
    .btn-secondary { background: #1e293b; color: #f8fafc; border: 1px solid rgba(255,255,255,0.15); }
    .badge { display: inline-block; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(20, 184, 166, 0.2); color: #2dd4bf; border: 1px solid rgba(20, 184, 166, 0.3); margin-right: 0.5rem; }
    .price-box { background: linear-gradient(135deg, #042f2e, #0f172a); border: 1px solid #14b8a6; padding: 1.5rem; border-radius: 1.25rem; margin: 2rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    h1 { font-size: 2.25rem; font-weight: 900; margin: 0.75rem 0; letter-spacing: -0.025em; }
  </style>

  <script>
    if (typeof window !== 'undefined' && !navigator.userAgent.match(/bot|crawl|spider|slurp|facebookexternalhit|whatsapp/i)) {
      window.location.replace('/?dest=${dest.id}');
    }
  </script>
</head>
<body>
  <div class="container">
    <div style="margin-bottom: 1.5rem;">
      <a href="/" style="color: #2dd4bf; text-decoration: none; font-weight: 600;">← Back to HimYatra Home</a>
    </div>

    <div>
      <span class="badge">${dest.state}</span>
      <span class="badge">🏔️ Altitude: ${dest.altitude || 'Himalayan Ridge'}</span>
      <span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border-color: rgba(56, 189, 248, 0.3);">🗓️ Best Time: ${dest.bestTime}</span>
    </div>

    <h1>${dest.name}</h1>
    <p style="color: #94a3b8; font-size: 1.1rem; margin-top: 0;"><em>"${dest.tagline}"</em></p>

    <img src="${ogImage}" alt="${dest.name}" class="hero-img" />

    <p style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.7;">${dest.description || ''}</p>

    <div class="price-box">
      <div>
        <div style="color: #94a3b8; font-size: 0.85rem; text-transform: uppercase;">Tour Packages Available</div>
        <div style="font-size: 2rem; font-weight: 900; color: #ffffff;">
          Starting ₹${dest.startingPrice?.toLocaleString('en-IN') || '4,999'}
          <span style="font-size: 0.9rem; font-weight: 400; color: #94a3b8;"> / person</span>
        </div>
        
      </div>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="https://wa.me/917619917057?text=${encodeURIComponent(`Hi HimYatra! I want to plan a tour to ${dest.name} (${dest.state}). Please send available packages and cab options!`)}" class="btn btn-primary">
          💬 Plan on WhatsApp
        </a>
        <a href="/?dest=${dest.id}" class="btn btn-secondary">
          ✨ View Packages on HimYatra
        </a>
      </div>
    </div>

    <h2>Top Attractions & Sightseeing Highlights</h2>
    <ul style="padding-left: 1.25rem; font-size: 1.05rem; line-height: 1.8;">
      ${highlightsHtml}
    </ul>

    <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); color: #64748b; font-size: 0.85rem; text-align: center;">
      <p>© 2026 HimYatra Himalayan Tours & Cab Rentals. Registered Travel Agency (HP-TO-2024-8841). GSTIN: 02AAACH7891K1Z5. Himachal Pradesh & Uttarakhand Specialist.</p>
    </footer>
  </div>
</body>
</html>`;

  writeBoth(path.join('destinations', dest.id, 'index.html'), html);
});

console.log(`✅ Pre-rendered ${DESTINATIONS.length} individual destination pages!`);
console.log('🎉 Pre-rendering complete! All pages generated with SEO tags, JSON-LD schema & social preview support.');
