import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

function AdCard({ ad }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3
        className="text-xl font-semibold mb-2 cursor-pointer hover:underline"
        onClick={() => navigate(`/marketplace/${ad.id}`)}
      >
        {ad.title}
      </h3>
      <p className="text-gray-700 mb-2"><strong>Category:</strong> {ad.category}</p>
      <p className="text-gray-700 mb-2">{ad.description.substring(0, 100)}...</p>
      {ad.imageUrls && ad.imageUrls.length > 0 && (
        <div className="flex space-x-2 mb-2">
          {ad.imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Ad ${index}`} className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
      )}
      <p className="text-gray-500 text-sm mb-2">
        Posted by {ad.userId} on {new Date(ad.createdAt).toLocaleDateString()}
      </p>
      {user && user.email === ad.userId && (
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/marketplace/edit/${ad.id}`)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => navigate(`/marketplace/${ad.id}`)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default AdCard;