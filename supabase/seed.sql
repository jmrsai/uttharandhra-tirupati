-- Create the 'news' table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW()
);

-- Create the 'sevas' table
CREATE TABLE IF NOT EXISTS sevas (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2)
);

-- Create the 'gallery' table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the 'site_status' table
CREATE TABLE IF NOT EXISTS site_status (
    id INT PRIMARY KEY DEFAULT 1,
    is_live BOOLEAN NOT NULL,
    message TEXT
);

-- Create the 'feedback' table
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the 'profiles' table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    avatar_url TEXT
);

-- Create the 'audio' table
CREATE TABLE IF NOT EXISTS audio (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT,
    url TEXT NOT NULL,
    cover_art_url TEXT
);

-- Create the 'books' table
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT,
    url TEXT NOT NULL,
    cover_image_url TEXT
);

-- Insert sample data into the 'news' table
INSERT INTO news (title, content) VALUES
('Website Launch', 'Our new website is now live!'),
('Upcoming Festival', 'Join us for our annual festival next month.');

-- Insert sample data into the 'sevas' table
INSERT INTO sevas (name, description, price) VALUES
('Archana', 'A special pooja for you and your family.', 50.00),
('Abhishekam', 'A ritual bath for the deity.', 101.00);

-- Insert sample data into the 'gallery' table
INSERT INTO gallery (title, description, image_url) VALUES
('Temple View', 'A beautiful view of the temple from the hills.', 'https://example.com/temple.jpg'),
('Festival Procession', 'The grand procession during our annual festival.', 'https://example.com/procession.jpg');

-- Insert sample data into the 'site_status' table
INSERT INTO site_status (is_live, message) VALUES
(true, 'The site is currently live.');

-- Insert sample data into the 'audio' table
INSERT INTO audio (title, artist, url, cover_art_url) VALUES
('Morning Prayers', 'Temple Choir', 'https://example.com/morning_prayers.mp3', 'https://example.com/morning_cover.jpg'),
('Evening Aarti', 'Temple Choir', 'https://example.com/evening_aarti.mp3', 'https://example.com/evening_cover.jpg');

-- Insert sample data into the 'books' table
INSERT INTO books (title, author, url, cover_image_url) VALUES
('The Story of Our Temple', 'Local Historian', 'https://example.com/temple_story.pdf', 'https://example.com/story_cover.jpg'),
('A Guide to Our Rituals', 'Head Priest', 'https://example.com/rituals_guide.pdf', 'https://example.com/rituals_cover.jpg');
