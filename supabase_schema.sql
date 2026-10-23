-- ===================================================
-- HIM YTRA Supabase Database Schema
-- Complete backend tables, RLS policies, and grants
-- ===================================================

-- 1. Table for Tour Bookings & Reservations
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT NOT NULL UNIQUE,
    package_id TEXT NOT NULL,
    package_title TEXT NOT NULL,
    state TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    customer_username TEXT,
    travel_date DATE,
    adults_count INT NOT NULL DEFAULT 1,
    children_count INT DEFAULT 0,
    pickup_city TEXT NOT NULL,
    vehicle_tier TEXT,
    hotel_tier TEXT,
    total_price NUMERIC(10, 2) NOT NULL,
    advance_token NUMERIC(10, 2) NOT NULL,
    coupon_applied TEXT,
    special_requests TEXT,
    utr_reference TEXT,
    status TEXT DEFAULT 'pending_payment',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table for General Inquiries & Callbacks
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    customer_username TEXT,
    destination TEXT,
    travel_date TEXT,
    travelers_count TEXT,
    pickup_city TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table for Custom Trip Builder Wizard
CREATE TABLE IF NOT EXISTS public.custom_trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region TEXT NOT NULL,
    destinations TEXT[] NOT NULL,
    travel_style TEXT NOT NULL,
    duration_days INT NOT NULL,
    travelers_count INT NOT NULL,
    vehicle TEXT NOT NULL,
    pickup_city TEXT NOT NULL,
    hotel_type TEXT NOT NULL,
    estimated_budget NUMERIC(10, 2) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_username TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table for Customer User Profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_color TEXT DEFAULT 'teal',
    total_bookings INT DEFAULT 0,
    total_inquiries INT DEFAULT 0,
    total_spent NUMERIC(12, 2) DEFAULT 0,
    password_hash TEXT,
    password_salt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table for Real Gmail OTP Verification
CREATE TABLE IF NOT EXISTS public.auth_otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    username TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- Grants for anon and authenticated roles
-- ===================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ===================================================
-- Enable Row Level Security (RLS) & Policies
-- ===================================================
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_otps ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Allow public insert on bookings" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public insert on inquiries" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public insert on custom_trips" ON public.custom_trips FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public insert on user_profiles" ON public.user_profiles FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public insert on auth_otps" ON public.auth_otps FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow public select
CREATE POLICY "Allow public select on bookings" ON public.bookings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public select on inquiries" ON public.inquiries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public select on custom_trips" ON public.custom_trips FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public select on user_profiles" ON public.user_profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public select on auth_otps" ON public.auth_otps FOR SELECT TO anon, authenticated USING (true);

-- Allow public update
CREATE POLICY "Allow public update on bookings" ON public.bookings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public update on user_profiles" ON public.user_profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public update on auth_otps" ON public.auth_otps FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
