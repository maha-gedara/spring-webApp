import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { useState } from 'react';

function AdCard({ ad }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState({});

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
    console.error(`Failed to load image at index ${index}:`, ad.imageUrls[index]);
  };

  return (
    <div className="bg-gray-900 bg-opacity-80 border border-indigo-500 text-white rounded-xl p-5 shadow-lg backdrop-blur-sm hover:shadow-indigo-500/40 transition duration-300">
      <h3
        className="text-2xl font-semibold mb-2 cursor-pointer hover:text-indigo-400 transition"
        onClick={() => navigate(`/marketplace/${ad.id}`)}
      >
        {ad.title}
      </h3>
      
      <p className="text-gray-300 mb-1"><strong>Category:</strong> {ad.category}</p>
      
      <p className="text-gray-400 mb-3">
        {ad.description.length > 100
          ? `${ad.description.substring(0, 100)}...`
          : ad.description}
      </p>

      {ad.imageUrls && ad.imageUrls.length > 0 && (
        <div className="flex space-x-3 overflow-x-auto mb-3">
          {ad.imageUrls.map((url, index) => (
            !imageError[index] ? (
              <img
                key={index}
                src={url}
                alt={`Ad ${index}`}
                className="w-24 h-24 object-cover rounded-md shadow-md hover:scale-105 transition"
                onError={() => handleImageError(index)}
                loading="lazy"
              />
            ) : null
          ))}
        </div>
      )}

      <p className="text-gray-500 text-sm mb-3">
        Posted by {ad.userId} on {new Date(ad.createdAt).toLocaleDateString()}
      </p>

      {user && user.email === ad.userId && (
        <div className="flex space-x-4">
         
        </div>
      )}
    </div>
  );
}

export default AdCard;