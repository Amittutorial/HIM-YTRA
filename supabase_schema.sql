-- ===================================================
-- HimYatra Supabase Database Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
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
    travel_date DATE NOT NULL,
    adults_count INT NOT NULL DEFAULT 1,
    children_count INT DEFAULT 0,
    pickup_city TEXT NOT NULL,
    vehicle_tier TEXT,
    hotel_tier TEXT,
    total_price NUMERIC(10, 2) NOT NULL,
    advance_token NUMERIC(10, 2) NOT NULL,
    coupon_applied TEXT,
    special_requests TEXT,
    status TEXT DEFAULT 'pending_payment',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table for General Inquiries & Callbacks
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
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
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- Enable Row Level Security (RLS) & Public Insert Policy
-- ===================================================
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_trips ENABLE ROW LEVEL SECURITY;

-- Allow website visitors to insert their own bookings
CREATE POLICY "Allow public insert on bookings"
ON public.bookings FOR INSERT
WITH CHECK (true);

-- Allow website visitors to insert inquiries
CREATE POLICY "Allow public insert on inquiries"
ON public.inquiries FOR INSERT
WITH CHECK (true);

-- Allow website visitors to insert custom trip plans
CREATE POLICY "Allow public insert on custom_trips"
ON public.custom_trips FOR INSERT
WITH CHECK (true);
