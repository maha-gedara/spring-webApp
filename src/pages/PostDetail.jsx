import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getPostById, deletePost, toggleLike, createComment, getCommentsByPostId, updateComment, deleteComment } from '../services/api';
import CommentForm from '../components/CommentForm';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postData = await getPostById(id);
        const commentsData = await getCommentsByPostId(id);
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post or comments:', error);
        toast.error('Failed to load post or comments');
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
        navigate('/my-posts');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post');
      }
    }
  };

  const handleToggleLike = async () => {
    try {
      await toggleLike(id);
      const updatedPost = await getPostById(id);
      setPost(updatedPost);
      toast.success(post?.likeCount < updatedPost.likeCount ? 'Post liked!' : 'Post unliked!');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  const handleCreateComment = async (formData) => {
    try {
      const response = await createComment(formData);
      setComments([...comments, response.comment]);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateComment = async (formData, commentId) => {
    try {
      const response = await updateComment(commentId, formData);
      setComments(comments.map((c) => (c.id === commentId ? response.comment : c)));
      setEditingComment(null);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter((c) => c.id !== commentId));
        toast.success('Comment deleted successfully');
      } catch (error) {
        console.error('Error deleting comment:', error);
        toast.error('Failed to delete comment');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center mt-8">Post not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-gray-500 text-sm mb-2">
        Posted by {post.userId} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center mb-4">
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
      {user && user.email === post.userId && (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => navigate(`/posts/edit/${id}`)}
            className="text-blue-500 hover:underline"
          >
            Edit Post
          </button>
          <button
            onClick={handleDeletePost}
            className="text-red-500 hover:underline"
          >
            Delete Post
          </button>
        </div>
      )}

      <h3 className="text-xl font-semibold mt-6 mb-4">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-t pt-4">
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-gray-500 text-sm">
                Commented by {comment.userId} on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {user && user.email === comment.userId && (
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={() => setEditingComment(comment)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
              {editingComment?.id === comment.id && (
                <CommentForm
                  postId={post.id}
                  onSubmit={handleUpdateComment}
                  initialData={editingComment}
                  isEditing={true}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <CommentForm postId={post.id} onSubmit={handleCreateComment} />
    </div>
  );
}

export default PostDetail;