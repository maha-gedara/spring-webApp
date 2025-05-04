import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAds } from '../services/api';
import AdCard from '../components/AdCard';
import { FaPlus, FaRocket } from 'react-icons/fa';

function Marketplace() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed min-h-screen";

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAds();
        setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
        toast.error('Failed to load ads');
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${universeBackground}`}>
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg font-semibold">Scanning the stars for opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`px-4 pb-16 pt-8 ${universeBackground}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
              Marketplace
            </span>
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/marketplace/create')}
              className="bg-blue-600 bg-opacity-90 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <FaPlus />
              <span>Create Ad</span>
            </button>
            <button
              onClick={() => navigate('/my-ads')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              My Ads
            </button>
          </div>
        </div>

        {ads.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-40 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-700">
            <p className="text-gray-300">No listings found in this galaxy. Launch the first one?</p>
            <button
              onClick={() => navigate('/marketplace/create')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              <FaRocket className="inline mr-2" />
              Create Ad
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {ads.map((ad) => (
              <div key={ad.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                <AdCard ad={ad} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
