/*
  # Create books table for local book management

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `author` (text, required)
      - `description` (text, optional)
      - `cover_image` (text, optional)
      - `category` (text, optional)
      - `publisher` (text, optional)
      - `published_date` (text, optional)
      - `page_count` (integer, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `books` table
    - Add policy for authenticated users to read all books
    - Add policy for admin users to manage books

  3. Indexes
    - Add index on title for search performance
    - Add index on category for filtering
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text,
  cover_image text,
  category text,
  publisher text,
  published_date text,
  page_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read books"
  ON books
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert books"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can update books"
  ON books
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can delete books"
  ON books
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS books_title_idx ON books USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS books_category_idx ON books (category);
CREATE INDEX IF NOT EXISTS books_created_at_idx ON books (created_at DESC);

-- Create trigger for updated_at (only if the function exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    CREATE TRIGGER update_books_updated_at
      BEFORE UPDATE ON books
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;