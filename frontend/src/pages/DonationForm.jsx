import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { donationAPI, donorAPI } from '../api/api';

const DonationForm = () => {
  const { donorId } = useParams();
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({
    donor_id: donorId || '',
    amount: '',
    payment_mode: 'UPI',
    donation_type: 'one_time',
    impact_type: '',
    on_behalf_of: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationDetails, setDonationDetails] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    // Scroll to top when success page show up
    if (showSuccess) {
      window.scrollTo(0, 0);
    }
  }, [showSuccess]);

  const fetchDonors = async () => {
    try {
      const response = await donorAPI.getAll();
      setDonors(response.data.data || response.data);
    } catch (err) {
      console.error('Failed to fetch donors', err);
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
      const response = await donationAPI.create(formData);
      setDonationDetails(response.data.data || response.data);
      setShowSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process donation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAnotherDonation = () => {
    setShowSuccess(false);
    setFormData({
      donor_id: donorId || '',
      amount: '',
      payment_mode: 'UPI',
      donation_type: 'one_time',
      impact_type: '',
      on_behalf_of: '',
      message: ''
    });
    window.scrollTo(0, 0);
  };

  // Success Page opens in new page
  if (showSuccess && donationDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-green-600 text-center mb-2">
              Successful Donation
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Thank you for your generous contribution! 🌱
            </p>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl mb-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Donation Amount</p>
              <p className="text-5xl font-bold text-green-700 mb-6">
                ₹{parseFloat(donationDetails.amount).toLocaleString('en-IN')}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span className="text-gray-600">Payment Mode:</span>
                  <span className="font-semibold text-gray-800">{donationDetails.payment_mode}</span>
                </div>
                {donationDetails.donation_type && (
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-gray-800 capitalize">{donationDetails.donation_type}</span>
                  </div>
                )}
                {donationDetails.impact_type && (
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span className="text-gray-600">Impact:</span>
                    <span className="font-semibold text-gray-800">{donationDetails.impact_type}</span>
                  </div>
                )}
                {donationDetails.on_behalf_of && (
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span className="text-gray-600">On Behalf Of:</span>
                    <span className="font-semibold text-gray-800">{donationDetails.on_behalf_of}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2">
                  <span className="text-gray-600">Donation ID:</span>
                  <span className="font-mono text-sm text-gray-700">#{donationDetails.id}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
                You will receive:
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base">Donation Certificate</p>
                    <p className="text-sm text-gray-600 mt-1">Official acknowledgment of your contribution</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base">Impact Tracking Dashboard Access</p>
                    <p className="text-sm text-gray-600 mt-1">Monitor your environmental impact in real-time</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base">Geo-tagged Tree Growth Updates</p>
                    <p className="text-sm text-gray-600 mt-1">Regular updates on your planted trees' progress</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 text-center">
                <strong>📧 Check your email!</strong> You'll receive a confirmation email with all the details and next steps.
              </p>
            </div>

            {/* Navbar Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold text-base hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                🏠 Back to Home
              </button>
              <button
                onClick={handleMakeAnotherDonation}
                className="flex-1 bg-gray-600 text-white py-4 rounded-lg font-bold text-base hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
              >
                💚 Make Another Donation
              </button>
            </div>

           
            <p className="text-center text-gray-500 text-xs mt-6">
              Your contribution is making a real difference in Bundelkhand. Thank you for being part of our mission! 🌳
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Donation Form Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="bg-green-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Plant a Tree. Restore Bundelkhand. Rebuild Our Future.
          </h1>
          <p className="text-sm md:text-base text-green-100 leading-relaxed max-w-3xl mx-auto">
            Your support helps us restore degraded lands, revive water sources, and empower rural 
            communities across Bundelkhand. Every contribution plants real, trackable trees with 
            geo-tagged updates and impact reports.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Donor Profile *
                </label>
                <select
                  name="donor_id"
                  value={formData.donor_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  required
                >
                  <option value="">-- Select Donor --</option>
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name} ({donor.email})
                    </option>
                  ))}
                </select>
                {!donorId && (
                  <p className="text-xs text-gray-500 mt-1">
                    Don't have a profile? <a href="/donors/new" className="text-green-600 hover:underline font-semibold">Create one here</a>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  I would like to Give...
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, donation_type: 'one_time'})}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                      formData.donation_type === 'one_time'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    One Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, donation_type: 'weekly'})}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                      formData.donation_type === 'weekly'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, donation_type: 'monthly'})}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                      formData.donation_type === 'monthly'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Your Impact
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, impact_type: 'Adopt 5 trees'})}
                    className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-sm transition-all ${
                      formData.impact_type === 'Adopt 5 trees'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Adopt 5 Trees
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, impact_type: 'Adopt 10 trees'})}
                    className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-sm transition-all ${
                      formData.impact_type === 'Adopt 10 trees'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Adopt 10 Trees
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, impact_type: 'Other'})}
                    className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-sm transition-all ${
                      formData.impact_type === 'Other'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="499"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Mode *
                </label>
                <select
                  name="payment_mode"
                  value={formData.payment_mode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  required
                >
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              {/* Donating on the Name of */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donating on the Name of
                </label>
                <input
                  type="text"
                  name="on_behalf_of"
                  value={formData.on_behalf_of}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Donor"
                />
              </div>

              {/* Any Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Any Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Type here............"
                />
              </div>

              {/* Donate Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Donate'}
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              THE WORLD NEEDS MORE TREES
            </h2>
            <h3 className="text-xl font-semibold mb-3">WHY TREES MATTER</h3>
            <p className="mb-6 text-green-50 leading-relaxed text-sm">
              Trees are not just plants.
            </p>
            <p className="mb-8 text-green-50 leading-relaxed">
              They are the foundation of life on Earth. They provide:
            </p>

         
            <div className="space-y-5">
            
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white rounded-full p-2.5 flex-shrink-0">
                    <span className="text-2xl">🌬️</span>
                  </div>
                  <h4 className="text-lg font-bold">CLEAN AIR</h4>
                </div>
                <p className="text-sm text-green-50 leading-relaxed">
                  Trees absorb pollutants and release oxygen, helping us all breathe better.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white rounded-full p-2.5 flex-shrink-0">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h4 className="text-lg font-bold">STRONGER COMMUNITIES</h4>
                </div>
                <p className="text-sm text-green-50 leading-relaxed">
                  Tree-planting creates local jobs, improves soil for farming, and brings hope to rural families.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white rounded-full p-2.5 flex-shrink-0">
                    <span className="text-2xl">🦜</span>
                  </div>
                  <h4 className="text-lg font-bold">HABITAT FOR WILDLIFE</h4>
                </div>
                <p className="text-sm text-green-50 leading-relaxed">
                  Forests shelter countless species and restore balance to fragile ecosystems.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white rounded-full p-2.5 flex-shrink-0">
                    <span className="text-2xl">🌡️</span>
                  </div>
                  <h4 className="text-lg font-bold">CLIMATE PROTECTION</h4>
                </div>
                <p className="text-sm text-green-50 leading-relaxed">
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

export default DonationForm;