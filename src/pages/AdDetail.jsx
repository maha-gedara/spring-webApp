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

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!isCreating && !ad) {
    return <div className="text-center mt-8">Ad not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      {isEditing || isCreating ? (
        <AdForm
          onSubmit={handleSubmit}
          initialData={isCreating ? {} : ad}
          isEditing={!isCreating}
        />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{ad.title}</h2>
          <p className="text-gray-700 mb-2"><strong>Category:</strong> {ad.category}</p>
          <p className="text-gray-700 mb-4">{ad.description}</p>
          {ad.imageUrls && ad.imageUrls.length > 0 && (
            <div className="flex space-x-4 mb-4">
              {ad.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Ad ${index}`} className="w-40 h-40 object-cover rounded" />
              ))}
            </div>
          )}
          <p className="text-gray-500 text-sm mb-4">
            Posted by {ad.userId} on {new Date(ad.createdAt).toLocaleDateString()}
          </p>
          {user && user.email === ad.userId && (
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:underline"
              >
                Edit Ad
              </button>
              <button
                onClick={handleDeleteAd}
                className="text-red-500 hover:underline"
              >
                Delete Ad
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdDetail;
