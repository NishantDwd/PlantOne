# 🌱 PlantOne Foundation - Donation Management System

A full-stack web application for managing tree plantation donations and donor profiles in the Bundelkhand region. Built with transparency, impact tracking, and community empowerment at its core.

[![Frontend URL](https://img.shields.io/badge/Live-Demo-green)](https://plantone-six.vercel.app/)
[![Backend URL](https://img.shields.io/badge/API-Live-blue)](https://plantone-backend.onrender.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌍 Overview

PlantOne Foundation is a community-driven initiative to restore Bundelkhand's degraded lands through native tree plantations, water conservation, and rural employment programs. This platform enables:

- **Donors** to create profiles and make transparent, trackable donations
- **Administrators** to manage donor data and track total contributions


## ✨ Features

### Core Functionality
- ✅ Complete donor profile management (CRUD operations)
- ✅ Multi-mode donation processing (UPI, Card, Net Banking, Cash)
- ✅ Donation type options (One-time, Weekly, Monthly)
- ✅ Impact tracking (Adopt trees, Carbon sequestration)
- ✅ Responsive design for all devices
- ✅ Smooth scroll navigation
- ✅ Real-time statistics dashboard

### User Experience
- 🎨 Modern gradient-based UI with Tailwind CSS
- 📊 Impact visualization (Plants planted, Lives impacted, Villages covered)
- 💳 Multiple payment mode support
- 📱 Mobile-first responsive design
- 🔍 Search and filter functionality

## 🛠 Tech Stack

### Frontend
- **Framework:** React
- **Routing:** React Router DOM 
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios 
- **Build Tool:** Vite 
- **Language:** JavaScript (ES6+)

### Backend
- **Runtime:** Node.js
- **Framework:** Express 
- **Database:** PostgreSQL 8.16.3
- **Validation:** express-validator 
- **Environment:** dotenv 
- **CORS:** cors 

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Render PostgreSQL

## 📁 Project Structure

```
PlantOne/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # Database connection
│   │   │   ├── schema.sql            # Database schema
│   │   │   ├── migrate.js            # Migration script
│   │   │   └── testDb.js             # Connection test
│   │   ├── controllers/
│   │   │   ├── donorController.js    # Donor business logic
│   │   │   ├── donationController.js # Donation business logic
│   │   │   └── adminController.js    # Admin operations
│   │   ├── models/
│   │   │   ├── donorModel.js         # Donor data layer
│   │   │   ├── donationModel.js      # Donation data layer
│   │   │   └── adminModel.js         # Admin data layer
│   │   ├── routes/
│   │   │   ├── donorRoutes.js        # Donor endpoints
│   │   │   ├── donationRoutes.js     # Donation endpoints
│   │   │   └── adminRoutes.js        # Admin endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── app.js                    # Express app setup
│   │   └── server.js                 # Server entry point
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js                # API client configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation component
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── Layout.jsx            # Layout wrapper (unused)
│   │   │   └── SuccessModal.jsx      # Success modal (unused)
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── DonorsList.jsx        # Donors listing page
│   │   │   ├── DonorForm.jsx         # Donor create/edit form
│   │   │   ├── DonationForm.jsx      # Donation form
│   │   │   ├── DonationsList.jsx     # Donations listing page
│   │   │   └── AdminDashboard.jsx    # Admin dashboard (unused)
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   └── styles.css                # Global styles
│   ├── index.html
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── .gitignore
│   ├── package.json
│   └── vercel.json                   # Vercel deployment config
│
└── README.md                         # This file
```

## 🚀 Installation

### Prerequisites
- Node.js 
- PostgreSQL 
- npm 

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/NishantDwd/PlantOne.git
cd PlantOne/backend
```

2. **Install dependencies**
```bash
npm install
```

Edit `.env` file:
```env
DATABASE_URL=postgres://username:password@localhost:5432/donation_db
PORT=4000
NODE_ENV=development
```

4. **Create database and run migrations**
```bash
# Create database in PostgreSQL
create db donation_db

# Run migration
npm run db:migrate

# Test connection
npm run db:test
```

5. **Start the development server**
```bash
npm run dev
```

Backend will run at `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```


3. **Start the development server**
```bash
npm run dev
```

Frontend will run at `http://localhost:3000`

## 📡 API Documentation

### Base URL
- **Development:** `http://localhost:4000/api`
- **Production:** `https://plantone-backend.onrender.com/api`

### Endpoints

#### 🧑 Donors

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/donors` | Get all donors | - |
| GET | `/donors/:id` | Get donor by ID | - |
| POST | `/donors` | Create new donor | `{ name, email, phone, address, city, state, country, pincode, note? }` |
| PUT | `/donors/:id` | Update donor | `{ name, email, phone, address, city, state, country, pincode, note? }` |
| DELETE | `/donors/:id` | Delete donor | - |

#### 💰 Donations

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/donations` | Get all donations | - |
| GET | `/donations/:id` | Get donation by ID | - |
| GET | `/donations/donor/:donorId` | Get donations by donor | - |
| POST | `/donations` | Create donation | `{ donor_id, amount, payment_mode, donation_type, impact_type?, on_behalf_of?, message? }` |
| PUT | `/donations/:id` | Update donation | `{ amount, payment_mode, on_behalf_of?, message?, status }` |
| DELETE | `/donations/:id` | Delete donation | - |

#### 👨‍💼 Admin

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/admins/donors/all` | Get all donors with donations | - |
| GET | `/admins/donations/total` | Get total donations | - |
| GET | `/admins/statistics/dashboard` | Get dashboard stats | - |


### Postman Collection

Import this collection for easy API testing:

```json
{
  "info": {
    "name": "PlantOne API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Donors",
      "item": [
        {
          "name": "Get All Donors",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/donors"
          }
        },
        {
          "name": "Create Donor",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/donors",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"phone\": \"+91 9876543210\",\n  \"address\": \"123 Green Street\",\n  \"city\": \"Tikamgarh\",\n  \"state\": \"Madhya Pradesh\",\n  \"country\": \"India\",\n  \"pincode\": \"472001\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Donations",
      "item": [
        {
          "name": "Get All Donations",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/donations"
          }
        },
        {
          "name": "Create Donation",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/donations",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"donor_id\": 1,\n  \"amount\": 5000,\n  \"payment_mode\": \"UPI\",\n  \"donation_type\": \"one_time\",\n  \"impact_type\": \"Adopt 10 trees\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:4000/api"
    }
  ]
}
```

Save this as `PlantOne_API.postman_collection.json` and import into Postman.



## 🚀 Deployment

### Frontend (Vercel)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Set root directory: `frontend`
   - Set environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
   - Deploy

### Backend (Render)

1. **Create PostgreSQL Database on Render**
   - Create new PostgreSQL database
   - Copy Internal Database URL

2. **Deploy Web Service**
   - Create new Web Service
   - Connect GitHub repository
   - Set root directory: `backend`
   - Set environment variables:
     ```
     DATABASE_URL=<your-postgres-url>
     PORT=4000
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend.vercel.app
     ```
   - Deploy

3. **Run Migration**
   - Use pgAdmin to connect with External Database URL
   - Execute `schema.sql` to create tables

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=postgresql://...
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://plantone-six.vercel.app
```

**Frontend (.env)**
```env
VITE_API_URL=https://plantone-backend.onrender.com/api
```



---

**"When communities grow, the land grows with them."** 🌱

Made with ❤️ by Nishant for PlantOne Foundation
