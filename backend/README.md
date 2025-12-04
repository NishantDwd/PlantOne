# Donation Management System - Backend

Simple Express + PostgreSQL API for managing donors and donations.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and update `DATABASE_URL` and `PORT`.

3. Create tables in PostgreSQL:

```sql
CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  pincode TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  amount INTEGER NOT NULL,
  payment_mode TEXT NOT NULL,
  on_behalf_of TEXT,
  message TEXT,
  donor_id INTEGER NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  frequency TEXT,
  impact TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

4. Start the server:

```bash
npm run dev
```

The API will be available at `http://localhost:4000` by default.
