/** initSqlite.js – run once to create the local SQLite DB and tables */
import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = resolve(__dirname, '../database.sqlite');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    booking_reference TEXT NOT NULL UNIQUE,
    package_id TEXT NOT NULL,
    package_title TEXT NOT NULL,
    state TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    travel_date TEXT NOT NULL,
    adults_count INTEGER NOT NULL DEFAULT 1,
    children_count INTEGER DEFAULT 0,
    pickup_city TEXT NOT NULL,
    vehicle_tier TEXT,
    hotel_tier TEXT,
    total_price NUMERIC NOT NULL,
    advance_token NUMERIC NOT NULL,
    coupon_applied TEXT,
    special_requests TEXT,
    status TEXT DEFAULT 'pending_payment',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    source TEXT DEFAULT 'website',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS custom_trips (
    id TEXT PRIMARY KEY,
    region TEXT NOT NULL,
    destinations TEXT NOT NULL,
    travel_style TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    travelers_count INTEGER NOT NULL,
    vehicle TEXT NOT NULL,
    pickup_city TEXT NOT NULL,
    hotel_type TEXT NOT NULL,
    estimated_budget NUMERIC NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

console.log('✅ SQLite DB initialized at:', dbPath);
db.close();
