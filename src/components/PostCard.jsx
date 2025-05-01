import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toggleLike } from '../services/api';
import { toast } from 'react-toastify';

function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error('Please log in to like posts');
      return;
    }
    try {
      await toggleLike(post.id);
      toast.success(post.liked ? 'Post unliked!' : 'Post liked!');
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  const hasImages = post.imageUrls && post.imageUrls.length > 0;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % post.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? post.imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3
        className="text-xl font-semibold mb-2 cursor-pointer hover:underline"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        {post.title}
      </h3>

      {hasImages && (
        <div className="relative mb-2">
          <img
            src={post.imageUrls[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="w-full h-48 object-cover rounded"
          />
          {post.imageUrls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      <p className="text-gray-700 mb-2">
        {post.description?.substring(0, 100)}...
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Posted by {post.userId} on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center">
        <button
          onClick={handleToggleLike}
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill={post.liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {post.likeCount} Likes
        </button>
      </div>
    </div>
  );
}

export default PostCard;
