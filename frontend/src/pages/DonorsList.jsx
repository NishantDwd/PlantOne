import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donorAPI } from '../api/api';

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await donorAPI.getAll();
      setDonors(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch donors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await donorAPI.delete(id);
        fetchDonors();
      } catch (err) {
        alert('Failed to delete donor');
        console.error(err);
      }
    }
  };

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-green-700 font-semibold">Loading donors...</p>
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Community of Donors</h1>
              <p className="text-green-100">
                {donors.length} generous {donors.length === 1 ? 'supporter' : 'supporters'} making a difference
              </p>
            </div>
            <Link 
              to="/donors/new" 
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span className="text-xl">➕</span>
              Add New Donor
            </Link>
          </div>
        </div>
      </div>

 
      <div className="container mx-auto px-4 py-8 max-w-7xl">
 

<div className="grid md:grid-cols-3 gap-6 mb-8">
  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
    <p className="text-gray-600 text-sm mb-1">Total Donors</p>
    <p className="text-3xl font-bold text-green-600">{donors.length}</p>
  </div>
  
  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
    <p className="text-gray-600 text-sm mb-1">Active Profiles</p>
    <p className="text-3xl font-bold text-blue-600">{donors.length}</p>
  </div>
  
  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
    <p className="text-gray-600 text-sm mb-1">Countries Represented</p>
    <p className="text-3xl font-bold text-purple-600">
      {new Set(donors.map(d => d.country)).size}
    </p>
  </div>
</div>

      
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

    
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredDonors.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-gray-600 text-lg font-medium mb-2">No donors found</p>
              <p className="text-gray-500 text-sm">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first donor'}
              </p>
              {!searchTerm && (
                <Link 
                  to="/donors/new" 
                  className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Add First Donor
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">Donor Name</th>
                    <th className="text-left py-4 px-6 font-semibold">Contact</th>
                    <th className="text-left py-4 px-6 font-semibold">Location</th>
                    <th className="text-left py-4 px-6 font-semibold">Country</th>
                    <th className="text-center py-4 px-6 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((donor, index) => (
                    <tr 
                      key={donor.id} 
                      className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {donor.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{donor.name}</p>
                            <p className="text-xs text-gray-500">ID: #{donor.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-gray-800">{donor.email}</p>
                          <p className="text-sm text-gray-600">{donor.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-gray-800 font-medium">{donor.city}</p>
                          <p className="text-sm text-gray-600">{donor.state}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {donor.country}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/donate/${donor.id}`}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                          >
                            💚 Donate
                          </Link>
                          <Link
                            to={`/donors/edit/${donor.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                          >
                            ✏️ Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(donor.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredDonors.length > 0 && (
          <div className="mt-6 bg-green-100 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium">
              Showing {filteredDonors.length} of {donors.length} {donors.length === 1 ? 'donor' : 'donors'}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorsList;