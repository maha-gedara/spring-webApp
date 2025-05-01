import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAds } from '../services/api';
import AdCard from '../components/AdCard';

function Marketplace() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Marketplace</h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/marketplace/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Ad
          </button>
          <button
            onClick={() => navigate('/my-ads')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            My Ads
          </button>
        </div>
      </div>
      {ads.length === 0 ? (
        <p className="text-gray-500">No ads available.</p>
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Marketplace;