-- ========================================================
-- MCC WNY Supabase Database Schema & RLS Policies
-- Execute these SQL statements in your Supabase SQL Editor
-- ========================================================

-- 1. Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    badge TEXT DEFAULT 'Announcement',
    action_url TEXT DEFAULT '#prayer-times',
    action_text TEXT DEFAULT 'View Prayer Times',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Community',
    description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Active', 'Completed')),
    goal_amount NUMERIC DEFAULT 0,
    raised_amount NUMERIC DEFAULT 0,
    completed_date TEXT,
    impact_note TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on both tables
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Public Read Access (SELECT)
DROP POLICY IF EXISTS "Allow public read access on announcements" ON public.announcements;
CREATE POLICY "Allow public read access on announcements"
    ON public.announcements
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
CREATE POLICY "Allow public read access on projects"
    ON public.projects
    FOR SELECT
    USING (true);

-- RLS Policies for Write Access (Insert/Update/Delete) for Client Admin Portal
DROP POLICY IF EXISTS "Allow public write access on announcements" ON public.announcements;
CREATE POLICY "Allow public write access on announcements"
    ON public.announcements
    FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public write access on projects" ON public.projects;
CREATE POLICY "Allow public write access on projects"
    ON public.projects
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Insert initial seed data for announcements
INSERT INTO public.announcements (message, badge, action_url, action_text, is_active)
VALUES 
('Welcome to MCC WNY – Muslim Community Center of Western New York', 'Announcement', '#prayer-times', 'View Prayer Times', true);

-- Insert initial seed data for projects
INSERT INTO public.projects (title, category, description, status, goal_amount, raised_amount, completed_date, impact_note)
VALUES
('Masjid Expansion & Sister''s Community Lounge', 'Expansion', 'Expanding our main prayer hall capacity by 300+ worshippers and constructing a modern, multi-purpose sister''s lounge & youth center.', 'Active', 150000, 98500, NULL, NULL),
('Solar Energy & Eco-Masjid Green Initiative', 'Sustainability', 'Installing rooftop solar panel arrays to cut annual utility costs and transition MCC WNY to clean, renewable energy.', 'Active', 45000, 32000, NULL, NULL),
('Youth Center & Gymnasium Upgrade', 'Youth & Sports', 'Upgrading indoor sports equipment, carpeting, audio-visual systems, and study spaces for our weekend Islamic school students.', 'Active', 30000, 12400, NULL, NULL),
('Main Prayer Hall Carpet & Acoustic Sound System', 'Renovation', 'Installed high-density antimicrobial plush prayer carpeting with woven saf lines, along with a state-of-the-art wireless microphone audio system.', 'Completed', 55000, 55000, 'Spring 2026', 'Serves 500+ daily worshippers with crystal clear sermon sound quality.'),
('Community Food Pantry & Cold Storage Unit', 'Social Welfare', 'Purchased commercial walk-in refrigeration units to store fresh produce and halal meats for weekly food distribution to local families.', 'Completed', 25000, 25000, 'Winter 2025', 'Distributes over 400+ fresh meal boxes to WNY families every month.'),
('Parking Lot Repaving & LED Security Floodlights', 'Facility Upgrades', 'Resurfaced the entire parking facility with eco-friendly asphalt, added marked spots, and installed high-efficiency dusk-to-dawn LED security lighting.', 'Completed', 40000, 40000, 'Autumn 2025', 'Ensures safety and smooth traffic flow during Friday Jummah & Isha prayers.');
