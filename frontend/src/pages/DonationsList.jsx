import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donationAPI } from '../api/api';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, count: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await donationAPI.getAll();
      const donationsData = response.data.data || response.data;
      setDonations(donationsData);
      
      // Calculate stats
      const total = donationsData.reduce((sum, d) => sum + parseFloat(d.amount), 0);
      setStats({ total, count: donationsData.length });
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch donations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.id.toString().includes(searchTerm);
    
    const matchesType = filterType === 'all' || donation.donation_type === filterType;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-green-700 font-semibold">Loading donations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-center">
            <span className="text-4xl mb-4 block">⚠️</span>
            <p className="text-xl font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-4 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">All Donations</h1>
              <p className="text-green-100">
                Track every contribution making a difference
              </p>
            </div>
            <Link 
              to="/donate" 
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span className="text-xl">💚</span>
              Make a Donation
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-100 text-sm font-medium">Total Donations</p>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-3xl font-bold">₹{stats.total.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-100 text-sm font-medium">Number of Donations</p>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-3xl font-bold">{stats.count}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-100 text-sm font-medium">Average Donation</p>
              <span className="text-3xl">📈</span>
            </div>
            <p className="text-3xl font-bold">
              ₹{stats.count > 0 ? Math.round(stats.total / stats.count).toLocaleString('en-IN') : 0}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-orange-100 text-sm font-medium">This Month</p>
              <span className="text-3xl">📅</span>
            </div>
            <p className="text-3xl font-bold">{stats.count}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search by donor name, email, or donation ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="one_time">One Time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredDonations.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🎁</span>
              <p className="text-gray-600 text-lg font-medium mb-2">No donations found</p>
              <p className="text-gray-500 text-sm mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by making your first donation'}
              </p>
              {!searchTerm && (
                <Link 
                  to="/donate" 
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Make First Donation
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">ID</th>
                    <th className="text-left py-4 px-6 font-semibold">Donor</th>
                    <th className="text-left py-4 px-6 font-semibold">Amount</th>
                    <th className="text-left py-4 px-6 font-semibold">Type</th>
                    <th className="text-left py-4 px-6 font-semibold">Impact</th>
                    <th className="text-left py-4 px-6 font-semibold">Payment</th>
                    <th className="text-left py-4 px-6 font-semibold">Date</th>
                    <th className="text-center py-4 px-6 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((donation, index) => (
                    <tr 
                      key={donation.id} 
                      className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                          #{donation.id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-800">{donation.donor_name}</p>
                          <p className="text-sm text-gray-600">{donation.donor_email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-lg font-bold text-green-600">
                          ₹{parseFloat(donation.amount).toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          donation.donation_type === 'one_time' 
                            ? 'bg-blue-100 text-blue-700' 
                            : donation.donation_type === 'weekly'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {donation.donation_type === 'one_time' ? 'One Time' : 
                           donation.donation_type === 'weekly' ? 'Weekly' : 'Monthly'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700">{donation.impact_type || '—'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700">{donation.payment_mode}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700">
                          {new Date(donation.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredDonations.length > 0 && (
          <div className="mt-6 bg-green-100 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium">
              Showing {filteredDonations.length} of {donations.length} {donations.length === 1 ? 'donation' : 'donations'}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterType !== 'all' && ` filtered by "${filterType}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsList;