import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollTo = (element) => {
    const yOffset = -80; 
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 seconds for slower scroll
    let start = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 
        ? 4 * t * t * t 
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + (distance * ease));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          smoothScrollTo(element);
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        smoothScrollTo(element);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('root').firstChild;
      if (element) {
        smoothScrollTo(element);
      }
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white shadow-2xl sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
         
          <Link 
            to="/" 
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-2xl font-bold hover:text-green-400 transition-colors"
          >
            <span className="text-3xl">🌱</span>
            <span>PlantOne</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={handleHomeClick}
              className="px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('our-mission')}
              className="px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium"
            >
              Our Mission
            </button>
            <button
              onClick={() => scrollToSection('our-impact')}
              className="px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium"
            >
              Our Impact
            </button>
            <button
              onClick={() => scrollToSection('voices')}
              className="px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium"
            >
              Voices
            </button>
            <button
              onClick={() => scrollToSection('contact-us')}
              className="px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium"
            >
              Contact Us
            </button>
          </div>

          
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/donors"
              className="px-5 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all font-semibold flex items-center gap-2"
            >
              <span>👥</span>
              Donors
            </Link>
            <Link
              to="/donations"
              className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
            >
              <span>💚</span>
              Donations
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleHomeClick}
                className="text-left px-4 py-3 rounded-lg hover:bg-slate-700 transition-all font-medium"
              >
                🏠 Home
              </button>
              <button
                onClick={() => scrollToSection('our-mission')}
                className="text-left px-4 py-3 rounded-lg hover:bg-slate-700 transition-all font-medium"
              >
                🎯 Our Mission
              </button>
              <button
                onClick={() => scrollToSection('our-impact')}
                className="text-left px-4 py-3 rounded-lg hover:bg-slate-700 transition-all font-medium"
              >
                📊 Our Impact
              </button>
              <button
                onClick={() => scrollToSection('voices')}
                className="text-left px-4 py-3 rounded-lg hover:bg-slate-700 transition-all font-medium"
              >
                💬 Voices
              </button>
              <button
                onClick={() => scrollToSection('contact-us')}
                className="text-left px-4 py-3 rounded-lg hover:bg-slate-700 transition-all font-medium"
              >
                📞 Contact Us
              </button>

              
              <div className="border-t border-slate-700 my-2"></div>

              
              <Link
                to="/donors"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all font-semibold flex items-center gap-2"
              >
                <span>👥</span>
                Donors
              </Link>
              <Link
                to="/donations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center gap-2"
              >
                <span>💚</span>
                Donations
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;