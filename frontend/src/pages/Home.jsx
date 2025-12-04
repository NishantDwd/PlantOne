import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donorAPI, donationAPI } from '../api/api';

const Home = () => {
  const [stats, setStats] = useState({
    plantsPlanted: 56230,
    livesImpacted: 12850,
    villagesCovered: 42,
    carbonSequestered: 56230,
    womenEmployed: 56230
  });

  useEffect(() => {
    // Fetch real stats from API
    const fetchStats = async () => {
      try {
        const [donorsRes, donationsRes] = await Promise.all([
          donorAPI.getAll(),
          donationAPI.getAll()
        ]);
        
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    
      <section className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4 animate-bounce">
            <span className="text-6xl">🌱</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            RESTORING Bundelkhand
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl md:text-4xl font-bold bg-white text-green-600 px-6 py-2 rounded-full shadow-lg">
              1 PLANT
            </span>
            <span className="text-2xl">at a Time</span>
          </div>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto font-light">
            A community-driven initiative to restore degraded land, empower rural families, 
            and bring complete transparency to plantation and CSR projects
          </p>
          <p className="text-lg mb-8 italic">
            When communities grow, the land grows with them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/donors/new" className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl">
              🤝 Join as Donor
            </Link>
            <Link to="/donate" className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-all transform hover:scale-105 shadow-xl">
              💚 Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why We Need You Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Need Us?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Bundelkhand is one of India's most climate-stressed regions. These are the urgent challenges we're 
            addressing through restoration and community-led solutions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Challenge 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">💧</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-blue-900">Severe Water Scarcity</h3>
              <p className="text-gray-700 text-center text-sm">
                Extreme water shortage affects daily life and agriculture across the region
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">🏜️</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-amber-900">Land Degradation</h3>
              <p className="text-gray-700 text-center text-sm">
                Years of soil erosion have turned fertile land into barren patches
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-red-900">Low Livelihood</h3>
              <p className="text-gray-700 text-center text-sm">
                Limited income sources force families into economic distress
              </p>
            </div>

            {/* Challenge 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-4xl">🚶</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-purple-900">High Migration</h3>
              <p className="text-gray-700 text-center text-sm">
                Thousands migrate yearly in search of livelihood opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="our-mission" className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Mission</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-8 text-center">
                <span className="text-8xl">🗺️</span>
                <p className="mt-4 text-sm text-gray-600 font-semibold">Bundelkhand Region Map</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  {['Jalaun', 'Jhansi', 'Lalitpur', 'Hamirpur', 'Mahoba', 'Banda', 'Chitrakoot', 'Tikamgarh', 'Chhatarpur', 'Panna', 'Damoh', 'Sagar'].map((district) => (
                    <span key={district} className="bg-green-600 text-white px-2 py-1 rounded">
                      {district}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Details */}
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We are restoring degraded lands across Bundelkhand through native plantations, 
                water conservation, and community-led rural employment. With support from CSR partners 
                and individual donors, we are building a greener and more self-reliant Bundelkhand.
              </p>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">🌳 Environment Restoration</h3>
                  <p className="text-gray-600">
                    Rebuilding degraded landscapes with native, drought-resistant species.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">👥 Rural Empowerment</h3>
                  <p className="text-gray-600">
                    Creating employment for local communities through plantation and maintenance.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">💧 Water Conservation</h3>
                  <p className="text-gray-600">
                    Improving soil moisture and groundwater recharge through nature-based solutions.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-700 mb-2">📊 Transparent Impact</h3>
                  <p className="text-gray-600">
                    Every plant is geo-tagged, monitored, and digitally tracked for donors and CSR partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section id="our-impact" className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Impact In Bundelkhand</h2>
          <p className="text-center text-green-100 mb-12 text-lg">
            Every donation contributes to real, measurable progress on the ground
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-center">
                <span className="text-5xl mb-4 block">🌱</span>
                <p className="text-5xl font-bold text-green-600 mb-2">{stats.plantsPlanted.toLocaleString()}</p>
                <p className="text-lg font-semibold text-gray-600">Plants Planted</p>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-center">
                <span className="text-5xl mb-4 block">👨‍👩‍👧‍👦</span>
                <p className="text-5xl font-bold text-green-600 mb-2">{stats.livesImpacted.toLocaleString()}</p>
                <p className="text-lg font-semibold text-gray-600">Lives Impacted</p>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-center">
                <span className="text-5xl mb-4 block">📍</span>
                <p className="text-5xl font-bold text-green-600 mb-2">{stats.villagesCovered}+</p>
                <p className="text-lg font-semibold text-gray-600">Villages Covered</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-center">
                <span className="text-5xl mb-4 block">🌍</span>
                <p className="text-5xl font-bold text-green-600 mb-2">{stats.carbonSequestered.toLocaleString()}</p>
                <p className="text-lg font-semibold text-gray-600">CO₂ Sequestered (kg)</p>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-center">
                <span className="text-5xl mb-4 block">👩</span>
                <p className="text-5xl font-bold text-green-600 mb-2">{stats.womenEmployed.toLocaleString()}</p>
                <p className="text-lg font-semibold text-gray-600">Women Employed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Before & After</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Real Impact In Bundelkhand
          </p>
          <p className="text-center text-green-700 mb-8 font-semibold">
            Transparent, traceable, and measurable impact for every contribution.
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative">
              
              <div className="grid grid-cols-2 h-96">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    BEFORE
                  </span>
                  <div className="text-center">
                    <span className="text-8xl">🏜️</span>
                    <p className="mt-4 text-gray-700 font-semibold">Degraded Land</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
                  <span className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    AFTER
                  </span>
                  <div className="text-center">
                    <span className="text-8xl">🌳</span>
                    <p className="mt-4 text-gray-700 font-semibold">Restored Forest</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-green-50 text-center">
              <p className="text-xl font-bold text-green-800">
                Be Part Of This Change — Adopt A Plant
              </p>
              <p className="text-gray-600 mt-2">
                1,200+ native plants, soil moisture improved, fodder availability growing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            How Your Contribution Creates Impact
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Plant, Track, and Celebrate your contribution to Bundelkhand's restoration.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-9xl">🌍</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-xl">
                  <span className="text-4xl">🌱</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-full shadow-xl">
                  <span className="text-4xl">💚</span>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">You Donate</h3>
                  <p className="text-gray-600">
                    Choose the number of plants you want to support.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">We Plant with Local Communities</h3>
                  <p className="text-gray-600">
                    Our team plants native, drought-resistant species across Bundelkhand.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">You Receive Geo-Tagged Updates Every 6 Months</h3>
                  <p className="text-gray-600">
                    See exactly where and how your plants are growing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Track Carbon Sequestration in Your Dashboard</h3>
                  <p className="text-gray-600">
                    Watch your environmental impact grow over time.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link to="/donate" className="btn-primary inline-block text-lg px-8 py-3">
                  Adopt a Plant 🌱
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate CSR Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            For Corporates: Verified Impact You Can Trust
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We offer complete visibility with geo-tagging, carbon tracking, survival reports, and 
            impact dashboards tailored for CSR compliance
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { name: 'C.H.I.R.A.G. Connect', logo: '🏢' },
              { name: 'Apna Khaata', logo: '📘' },
              { name: 'Apna Health Khaata', logo: '🏥' },
              { name: 'C.H.I.R.A.G. Connect+', logo: '🏢+' }
            ].map((partner) => (
              <div key={partner.name} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-5xl mb-3">{partner.logo}</div>
                <p className="font-semibold text-gray-700">{partner.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/donate" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors inline-block shadow-xl">
              Start Your CSR Partnership → Join with Us
            </Link>
          </div>
        </div>
      </section>

      {/* Voices From Bundelkhand Section */}
      <section id="voices" className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Voices From Bundelkhand
          </h2>
          <p className="text-center text-green-100 mb-12 text-lg">
            When communities grow, the land grows with them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  RP
                </div>
              </div>
              <p className="text-gray-600 text-center mb-4 italic">
                "Earlier our fields stayed dry and unused. After the plantation, the soil has improved, 
                and I'm able to grow fodder again. This project has brought hope back to our village."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-800">Ramesh Patel</p>
                <p className="text-sm text-gray-500">Farmer - Tikamgarh</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  SD
                </div>
              </div>
              <p className="text-gray-600 text-center mb-4 italic">
                "I never imagined planting saplings could give us steady income. Today, our group 
                runs a nursery and supports our families with pride."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-800">Sunita Devi</p>
                <p className="text-sm text-gray-500">Women SHG Leader - Lalitpur</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  CL
                </div>
              </div>
              <p className="text-gray-600 text-center mb-4 italic">
                "The transparency and data reporting gave us complete confidence — geo-tagged updates, 
                survival reports, and carbon data make this a model CSR project."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-800">CSR Lead</p>
                <p className="text-sm text-gray-500">GreenTech Industries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-white"> 
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every plant you support brings us one step closer to a greener, self-reliant Bundelkhand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate" className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl">
              🌱 Plant Now
            </Link>
            <Link to="/donors" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl">
              👥 View Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;