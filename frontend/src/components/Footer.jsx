import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact-us" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white pt-12 pb-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20">
        <div className="flex justify-around items-end h-full">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-2xl">🌲</span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Address Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📍</span>
              <h3 className="text-lg font-bold">Address:</h3>
            </div>
            <p className="text-green-100 text-sm mb-2">PlantOne Foundation</p>
            <p className="text-green-100 text-sm leading-relaxed">
              Address 
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📞</span>
              <h3 className="text-lg font-bold">Contact</h3>
            </div>
            <p className="text-green-100 text-sm mb-2">+91 123 456 7890</p>
            <a 
              href="mailto:contact@ngo.org" 
              className="text-green-100 text-sm hover:text-white transition-colors"
            >
              contact@plantone.org
            </a>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Career
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Projects</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Ongoing Plantations
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Land Restoration
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Water Conservation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Community Livelihoods
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Women SHG Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-green-100 text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold mb-4">Social Links</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-xl">f</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-xl">📷</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-xl">in</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-xl">🐦</span>
              </a>
            </div>

            <div className="bg-white p-3 rounded-lg inline-block">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <div className="text-left">
                  <p className="text-green-700 font-bold text-sm">PlantOne</p>
                  <p className="text-green-600 text-xs">FOUNDATION</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-500/30 pt-6 text-center">
          <p className="text-green-100 text-sm">
            Copyright © {new Date().getFullYear()} Vasudhaiva Kutumbakam. All Rights Reserved
          </p>
          <p className="text-green-100 text-sm">
              Made by <span className="font-semibold">Nishant</span> ❤️
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;