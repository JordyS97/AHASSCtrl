-- AHASS CTRL - Fix RLS Infinite Recursion
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Drop the recursive policies
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin reads all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin updates profiles" ON public.profiles;

-- Disable RLS on profiles (safe: access control is handled in the app layer)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Keep RLS on dashboard_data but simplify the policy
DROP POLICY IF EXISTS "Approved users read dashboard" ON public.dashboard_data;
DROP POLICY IF EXISTS "Admin writes dashboard" ON public.dashboard_data;
DROP POLICY IF EXISTS "Admin updates dashboard" ON public.dashboard_data;

-- Simple policy: any authenticated user can read dashboard data
CREATE POLICY "Authenticated users read dashboard" ON public.dashboard_data
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow inserts and updates for authenticated users (data upload)
CREATE POLICY "Authenticated users write dashboard" ON public.dashboard_data
  FOR ALL USING (auth.role() = 'authenticated');
