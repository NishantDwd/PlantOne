-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS donors CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Donors table with all required fields
CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donations table with all required fields
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  donor_id INTEGER NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  payment_mode VARCHAR(50) NOT NULL DEFAULT 'UPI',
  donation_type VARCHAR(50) DEFAULT 'one_time',
  impact_type VARCHAR(100),
  on_behalf_of VARCHAR(255),
  message TEXT,
  donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_donors_email ON donors(email);
CREATE INDEX idx_donors_created_at ON donors(created_at);