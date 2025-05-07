import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/api/marketplace');

        // Defensive check
        if (Array.isArray(response.data)) {
          setAds(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format from server.');
        }
      } catch (err) {
        console.error('Failed to fetch ads:', err);
        setError('Failed to load ads. Please try again later.');
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Course Ads</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!error && ads.length === 0 ? (
        <p>No ads available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-semibold">{ad.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{ad.category}</p>
              <p className="mb-2">{ad.description}</p>
              {ad.imageUrls?.length > 0 && (
                <img
                  src={ad.imageUrls[0]}
                  alt={ad.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <p className="text-xs text-gray-400 mt-2">
                Posted on {new Date(ad.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAds;
