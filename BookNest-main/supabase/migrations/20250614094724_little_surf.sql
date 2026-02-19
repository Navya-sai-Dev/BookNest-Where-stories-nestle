/*
  # Create books table with proper error handling

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
      - `page_count` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `books` table
    - Add policies for authenticated users to read books
    - Add policies for admins to manage books

  3. Performance
    - Add indexes for title search, category, and creation date
    - Add trigger for automatic updated_at timestamp
*/

-- Create books table only if it doesn't exist
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

-- Enable RLS (safe to run multiple times)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DO $$
BEGIN
  -- Drop policies if they exist
  DROP POLICY IF EXISTS "Anyone can read books" ON books;
  DROP POLICY IF EXISTS "Admins can insert books" ON books;
  DROP POLICY IF EXISTS "Admins can update books" ON books;
  DROP POLICY IF EXISTS "Admins can delete books" ON books;
  
  -- Create new policies
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
END $$;

-- Create indexes for better performance (safe to run multiple times)
CREATE INDEX IF NOT EXISTS books_title_idx ON books USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS books_category_idx ON books (category);
CREATE INDEX IF NOT EXISTS books_created_at_idx ON books (created_at DESC);

-- Create trigger for updated_at (only if the function exists and trigger doesn't exist)
DO $$
BEGIN
  -- Check if the trigger already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_books_updated_at' 
    AND tgrelid = 'books'::regclass
  ) THEN
    -- Check if the function exists
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
      CREATE TRIGGER update_books_updated_at
        BEFORE UPDATE ON books
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
  END IF;
END $$;