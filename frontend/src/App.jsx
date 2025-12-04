import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DonorsList from './pages/DonorsList';
import DonorForm from './pages/DonorForm';
import DonationForm from './pages/DonationForm';
import DonationsList from './pages/DonationsList';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donors" element={<DonorsList />} />
            <Route path="/donors/new" element={<DonorForm />} />
            <Route path="/donors/edit/:id" element={<DonorForm />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/donate/:donorId" element={<DonationForm />} />
            <Route path="/donations" element={<DonationsList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;