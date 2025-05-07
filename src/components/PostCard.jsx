import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toggleLike } from '../services/api';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getCommentsByPostId } from '../services/api';

function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLiking, setIsLiking] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  // Fetch comment count for this post
  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const comments = await getCommentsByPostId(post.id);
        setCommentCount(comments.length);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Silently fail - we don't want to show an error toast for this
      }
    };
    
    fetchCommentCount();
  }, [post.id]);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error('Please log in to like posts');
      return;
    }
   
    try {
      setIsLiking(true);
      await toggleLike(post.id);
      toast.success(post.liked ? 'Post unliked!' : 'Post liked!');
      if (onUpdate) onUpdate();
      setTimeout(() => setIsLiking(false), 300); // Reset animation after transition
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
      setIsLiking(false);
    }
  };
  
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 shadow-xl transition-all duration-300 hover:bg-white/15 hover:shadow-2xl group mb-4 max-w-xl w-full mx-auto">
      <h3
        className="text-xl font-semibold mb-2 cursor-pointer hover:underline text-white"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        {post.title}
      </h3>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-2"
        />
      )}
      <p className="text-white/80 mb-2">{post.content.substring(0, 100)}...</p>
      <p className="text-white/60 text-sm mb-2">
        Posted by {post.userId.split('@')[0]} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleLike}
          className="flex items-center gap-2 transition-all duration-200 focus:outline-none"
        >
          <div className="transform transition-transform active:scale-125 duration-200">
            {post.liked ? (
                              <FaHeart
                className="w-6 h-6 text-pink-500 fill-current transition-all duration-300 ease-in-out"
                style={{ transform: isLiking ? 'scale(1.2)' : 'scale(1)', color: '#ec4899' }}
              />
            ) : (
              <FaRegHeart
                className="w-6 h-6 text-pink-500 transition-all duration-300 ease-in-out"
                style={{ transform: isLiking ? 'scale(1.2)' : 'scale(1)' }}
              />
            )}
          </div>
          <span className="text-sm font-medium text-pink-500">
            {post.likeCount}
          </span>
        </button>
       
        <button
          onClick={() => navigate(`/posts/${post.id}`)}
          className="flex items-center gap-2 px-2 py-1 transition-all duration-300 text-blue-300 hover:text-blue-400 hover:bg-white/10 rounded-full"
        >
          <FaComment className="w-5 h-5" />
          <span className="text-sm font-medium">
            {commentCount}
          </span>
        </button>
      </div>
     
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

export default PostCard;
