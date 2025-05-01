import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toggleLike } from '../services/api';
import { toast } from 'react-toastify';

function PostCard({ post, onDelete }) {
  const { user } = useAuth();

  const handleLike = async () => {
    try {
      await toggleLike(post.id);
      toast.success('Like toggled!');
      window.location.reload(); // Refresh to update like count
    } catch (error) {
      toast.error('Failed to toggle like');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await onDelete(post.id);
        toast.success('Post deleted!');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </Link>
      <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="mt-2 w-full h-48 object-cover rounded"
        />
      )}
      <p className="text-sm text-gray-500 mt-2">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">Likes: {post.likeCount}</p>
      <div className="mt-4 flex space-x-2">
        {user && (
          <button
            onClick={handleLike}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {post.likeCount > 0 ? 'Unlike' : 'Like'}
          </button>
        )}
        {user && user.email === post.userId && (
          <>
            <Link
              to={`/posts/${post.id}`}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PostCard;