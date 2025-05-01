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
      throw error;
    }
  };

  if (!user) {
    return <div className="text-center mt-8">Please log in to view your ads.</div>;
  }

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Ads</h2>
        <button
          onClick={() => navigate('/marketplace/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Ad
        </button>
      </div>
      <AdForm onSubmit={handleCreateAd} />
      {ads.length === 0 ? (
        <p className="text-gray-500 mt-4">You haven't created any ads yet.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserAds;