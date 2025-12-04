import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { donorAPI } from '../api/api';

const DonorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchDonor();
    }
  }, [id]);

  const fetchDonor = async () => {
    try {
      const response = await donorAPI.getById(id);
      setFormData(response.data.data || response.data);
    } catch (err) {
      setError('Failed to fetch donor');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await donorAPI.update(id, formData);
      } else {
        await donorAPI.create(formData);
      }
      navigate('/donors');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save donor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 100, 0, 0.7), rgba(0, 100, 0, 0.7)), url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%23166534"/%3E%3C/svg%3E")'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl text-cyan-700 md:text-5xl font-bold mb-2 text-center">
            JOIN OUR MISSION TO
          </h1>
          <h2 className="text-3xl text-cyan-700 md:text-4xl font-bold text-center">
            RESTORE BUNDELKHAND
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              CREATE YOUR<br />
              DONOR PROFILE
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
           
               <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="8657456666"
                  required
                />
              </div>

          
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gmail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter@Gmail.com"
                  required
                />
              </div>

      
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Address"
                  rows="2"
                  required
                />
              </div>

         
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Address"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Country"
                  required
                />
              </div>

      
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Pin Code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Any additional message"
                  rows="2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">
              THE WORLD NEEDS MORE TREES
            </h2>
            <h3 className="text-xl font-semibold mb-4">WHY TREES MATTER</h3>
            <p className="mb-8 text-green-50">
              Trees are not just plants.<br />
              They are the foundation of life on Earth. They provide:
            </p>

     
            <div className="space-y-6">
            
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-3xl">🌬️</span>
                  </div>
                  <h4 className="text-xl font-bold">CLEAN AIR</h4>
                </div>
                <p className="text-sm text-green-50">
                  Trees absorb pollutants and release oxygen, helping us all breathe better.
                </p>
              </div>

          
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-3xl">🏘️</span>
                  </div>
                  <h4 className="text-xl font-bold">STRONGER COMMUNITIES</h4>
                </div>
                <p className="text-sm text-green-50">
                  Tree planting creates local jobs, improves soil fertility, brings food to rural families.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-3xl">🦜</span>
                  </div>
                  <h4 className="text-xl font-bold">HABITAT FOR WILDLIFE</h4>
                </div>
                <p className="text-sm text-green-50">
                  Forests shelter countless species and restore balance to fragile ecosystems.
                </p>
              </div>

         
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-3xl">🌡️</span>
                  </div>
                  <h4 className="text-xl font-bold">CLIMATE PROTECTION</h4>
                </div>
                <p className="text-sm text-green-50">
                  Trees capture carbon, reduce heat, and help buffer the impacts of climate change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorForm;