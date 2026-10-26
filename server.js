import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Save Booking
app.post('/api/bookings', (req, res) => {
  try {
    const booking = req.body;
    const stmt = db.prepare(`
      INSERT INTO bookings (
        id, booking_reference, package_id, package_title, state,
        customer_name, customer_phone, customer_email, travel_date,
        adults_count, children_count, pickup_city, vehicle_tier,
        hotel_tier, total_price, advance_token, coupon_applied,
        special_requests, status, created_at
      ) VALUES (
        @id, @booking_reference, @package_id, @package_title, @state,
        @customer_name, @customer_phone, @customer_email, @travel_date,
        @adults_count, @children_count, @pickup_city, @vehicle_tier,
        @hotel_tier, @total_price, @advance_token, @coupon_applied,
        @special_requests, @status, datetime('now')
      )
    `);

    const id = uuidv4();
    stmt.run({
      id,
      booking_reference: booking.bookingId || `HY-${Date.now()}`,
      package_id: booking.packageId,
      package_title: booking.packageTitle,
      state: booking.state,
      customer_name: booking.name,
      customer_phone: booking.phone,
      customer_email: booking.email || null,
      travel_date: booking.travelDate,
      adults_count: booking.adults || 1,
      children_count: booking.children || 0,
      pickup_city: booking.pickupCity,
      vehicle_tier: booking.vehicleTier || null,
      hotel_tier: booking.hotelTier || null,
      total_price: booking.finalTotal,
      advance_token: booking.advanceToken,
      coupon_applied: booking.couponCode || null,
      special_requests: booking.specialRequests || null,
      status: 'pending_payment'
    });

    res.json({ success: true, id });
  } catch (err) {
    console.error('Database booking error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save Inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const inquiry = req.body;
    const stmt = db.prepare(`
      INSERT INTO inquiries (id, name, phone, message, source, created_at)
      VALUES (@id, @name, @phone, @message, @source, datetime('now'))
    `);

    const id = uuidv4();
    stmt.run({
      id,
      name: inquiry.name,
      phone: inquiry.phone,
      message: inquiry.message || null,
      source: inquiry.source || 'website'
    });

    res.json({ success: true, id });
  } catch (err) {
    console.error('Database inquiry error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save Custom Trip
app.post('/api/custom-trips', (req, res) => {
  try {
    const trip = req.body;
    const stmt = db.prepare(`
      INSERT INTO custom_trips (
        id, region, destinations, travel_style, duration_days,
        travelers_count, vehicle, pickup_city, hotel_type,
        estimated_budget, customer_name, customer_phone, created_at
      ) VALUES (
        @id, @region, @destinations, @travel_style, @duration_days,
        @travelers_count, @vehicle, @pickup_city, @hotel_type,
        @estimated_budget, @customer_name, @customer_phone, datetime('now')
      )
    `);

    const id = uuidv4();
    stmt.run({
      id,
      region: trip.selectedRegion,
      destinations: JSON.stringify(trip.selectedSpots || []),
      travel_style: trip.travelStyle,
      duration_days: trip.durationDays,
      travelers_count: trip.travelersCount,
      vehicle: trip.vehicle,
      pickup_city: trip.pickupCity,
      hotel_type: trip.hotelType,
      estimated_budget: trip.estimatedPrice,
      customer_name: trip.contactName,
      customer_phone: trip.contactPhone
    });

    res.json({ success: true, id });
  } catch (err) {
    console.error('Database custom trip error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save Road Weather Alert Subscription
app.post('/api/road-alerts', (req, res) => {
  try {
    const { phone, routeInterest } = req.body;
    db.exec(`
      CREATE TABLE IF NOT EXISTS road_weather_subscribers (
        id TEXT PRIMARY KEY,
        phone TEXT NOT NULL,
        route_interest TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);
    const stmt = db.prepare(`
      INSERT INTO road_weather_subscribers (id, phone, route_interest, created_at)
      VALUES (@id, @phone, @route_interest, datetime('now'))
    `);

    const id = uuidv4();
    stmt.run({
      id,
      phone,
      route_interest: routeInterest || 'All Routes'
    });

    res.json({ success: true, id });
  } catch (err) {
    console.error('Database alert subscriber error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get recent bookings (helper to verify)
app.get('/api/bookings', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 10').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 File-based DB server running at http://localhost:${PORT}`);
});
