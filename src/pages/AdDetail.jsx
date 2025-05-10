import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getAdById, createAd, updateAd, deleteAd } from '../services/api';
import AdForm from '../components/AdForm';

function AdDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(id === 'create');
  const isCreating = id === 'create';

  useEffect(() => {
    if (!isCreating) {
      const fetchAd = async () => {
        try {
          const adData = await getAdById(id);
          setAd(adData);
        } catch (error) {
          console.error('Error fetching ad:', error);
          toast.error('Failed to load ad');
        } finally {
          setLoading(false);
        }
      };
      fetchAd();
    } else {
      setLoading(false);
    }
  }, [id, isCreating]);

  const handleSubmit = async (formData) => {
    try {
      if (isCreating) {
        const response = await createAd(formData);
        toast.success('Ad created successfully');
        navigate(`/marketplace/${response.ad.id}`);
      } else {
        const response = await updateAd(id, formData);
        setAd(response.ad);
        setIsEditing(false);
        toast.success('Ad updated successfully');
      }
    } catch (error) {
      console.error('Error submitting ad:', error);
      toast.error(isCreating ? 'Failed to create ad' : 'Failed to update ad');
      throw error;
    }
  };

  const handleDeleteAd = async () => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await deleteAd(id);
        toast.success('Ad deleted successfully');
        navigate('/my-ads');
      } catch (error) {
        console.error('Error deleting ad:', error);
        toast.error('Failed to delete ad');
      }
    }
  };

  const gradientBackground = "bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen";

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${gradientBackground}`}>
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg font-semibold">Loading ad...</p>
        </div>
      </div>
    );
  }

  if (!isCreating && !ad) {
    return (
      <div className={`text-center text-white mt-20 text-xl ${gradientBackground}`}>
        Ad not found
      </div>
    );
  }

  return (
    <div className={gradientBackground}>
      <div className="max-w-3xl mx-auto pt-10 pb-16 px-4">
        <div className="bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-2xl border border-indigo-600 text-white animate-float">
          {isEditing || isCreating ? (
            <AdForm
              onSubmit={handleSubmit}
              initialData={isCreating ? {} : ad}
              isEditing={!isCreating}
            />
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {ad.title}
              </h2>
              <p className="text-gray-300 mb-2">
                <strong>Category:</strong> {ad.category}
              </p>
              <p className="text-gray-300 mb-4">{ad.description}</p>
              {ad.imageUrls && ad.imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-4">
                  {ad.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Ad ${index}`}
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
              <p className="text-gray-400 text-sm mb-4">
                Posted by {ad.userId} on {new Date(ad.createdAt).toLocaleDateString()}
              </p>
              {user && user.email === ad.userId && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                  >
                    Edit Ad
                  </button>
                  <button
                    onClick={handleDeleteAd}
                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition duration-300"
                  >
                    Delete Ad
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default AdDetail;