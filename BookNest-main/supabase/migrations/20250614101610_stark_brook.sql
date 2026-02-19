/*
  # Fix infinite recursion in user_profiles RLS policies

  1. Security Changes
    - Drop existing problematic policies that cause infinite recursion
    - Create new simplified policies that don't reference the same table
    - Ensure users can read their own profile without recursion
    - Remove admin policy that causes the recursive loop

  2. Policy Changes
    - Keep the basic "Users can read own profile" policy
    - Remove the "Admins can read all profiles" policy that causes recursion
    - Keep other policies (INSERT, UPDATE) as they don't cause issues
*/

-- Drop the problematic policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;

-- Create a simple, non-recursive policy for users to read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Note: We're removing the admin policy that caused infinite recursion.
-- If admin functionality is needed, it should be handled at the application level
-- or through a different approach that doesn't create recursive policy checks.