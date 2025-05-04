import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getUserAds, createAd } from '../services/api';
import AdForm from '../components/AdForm';
import AdCard from '../components/AdCard';

function UserAds() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed";

  useEffect(() => {
    const fetchAds = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserAds();
        setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
        toast.error('Failed to load ads');
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [user]);

  const handleCreateAd = async (formData) => {
    try {
      const response = await createAd(formData);
      setAds([response.ad, ...ads]);
      navigate('/my-ads');
    } catch (error) {
      toast.error('Failed to create ad');
      throw error;
    }
  };

  if (!user) {
    return (
      <div className={`text-white text-center mt-20 text-xl ${universeBackground} min-h-screen`}>
        Please log in to view your ads.
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${universeBackground}`}>
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg font-semibold">Loading your stellar ads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${universeBackground}`}>
      <div className="max-w-4xl mx-auto pt-10 px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              My Ads
            </span>
          </h2>
          <button
            onClick={() => navigate('/marketplace/create')}
            className="bg-blue-600 bg-opacity-90 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            Create Ad
          </button>
        </div>

        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 border border-indigo-600 shadow-xl shadow-indigo-500/30 animate-float">
          <AdForm onSubmit={handleCreateAd} />
        </div>

        {ads.length === 0 ? (
          <div className="text-gray-300 text-center mt-8">
            You haven't created any ads yet.
          </div>
        ) : (
          <div className="space-y-6 mt-8">
            {ads.map((ad) => (
              <div key={ad.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                <AdCard ad={ad} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default UserAds;
