import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';

function CommentForm({ postId, onSubmit, initialData = {}, isEditing = false }) {
  const [content, setContent] = useState(initialData.content || '');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to comment');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('postId', postId);
      formData.append('content', content);

      await onSubmit(formData, isEditing ? initialData.id : null);
      toast.success(isEditing ? 'Comment updated!' : 'Comment created!');
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error.response?.data || error.message);
      toast.error(isEditing ? 'Failed to update comment' : 'Failed to create comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-200">
          Comment
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="3"
          className="mt-1 block w-full rounded-lg border-none bg-gray-800 text-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 p-3 transition-colors"
          placeholder="Write your comment..."
        />
      </div>
      <button
        type="submit"
        disabled={loading || !user}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Comment' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;