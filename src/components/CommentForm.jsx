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
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Write your comment..."
        />
      </div>
      <button
        type="submit"
        disabled={loading || !user}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Comment' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;