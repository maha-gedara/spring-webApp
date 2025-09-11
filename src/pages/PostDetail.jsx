import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { getPostById, deletePost, toggleLike, createComment, getCommentsByPostId, updateComment, deleteComment, updatePost } from '../services/api';
import CommentForm from '../components/CommentForm';
import PostForm from '../components/PostForm';
import { Heart, Edit2, Trash, MessageCircle } from 'lucide-react';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const commentFormRef = useRef(null);

  // Handle clicks outside of comment form
  useEffect(() => {
    function handleClickOutside(event) {
      if (commentFormRef.current && !commentFormRef.current.contains(event.target)) {
        setShowCommentForm(false);
      }
    }

    // Add event listener if comment form is shown
    if (showCommentForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCommentForm]);

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
      setShowCommentForm(false);
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.error('Failed to add comment');
      throw error;
    }
  };

  const handleUpdateComment = async (formData, commentId) => {
    try {
      const response = await updateComment(commentId, formData);
      setComments(comments.map((c) => (c.id === commentId ? response.comment : c)));
      setEditingComment(null);
      toast.success('Comment updated successfully');
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
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

  const handleUpdatePost = async (formData) => {
    try {
      await updatePost(id, formData);
      const updatedPost = await getPostById(id);
      setPost(updatedPost);
      setIsEditingPost(false);
      toast.success('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
      throw error;
    }
  };

  // Function to extract username from the email or use display name
  const getUserDisplayName = (userIdentifier) => {
    if (!userIdentifier) return 'Anonymous';
    
    // If the user identifier is an email, extract the username part
    if (userIdentifier.includes('@')) {
      return userIdentifier.split('@')[0];
    }
    
    return userIdentifier;
  };

  if (loading) {
    return <div className="text-center mt-8 text-white">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center mt-8 text-white">Post not found</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed text-white p-4">
      <div className="w-full max-w-2xl bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-6">
        {isEditingPost ? (
          <div className="mt-6 bg-transparent rounded-lg p-4">
            <h4 className="text-lg font-medium mb-2">Edit Post</h4>
            <PostForm
              postId={post.id}
              onSubmit={handleUpdatePost}
              initialData={{ title: post.title, content: post.content, imageUrl: post.imageUrl }}
              isEditing={true}
            />
            <button
              onClick={() => setIsEditingPost(false)}
              className="mt-4 text-gray-300 hover:text-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded mb-4" />
            )}
            <p className="text-gray-300 mb-4">{post.content}</p>
            <p className="text-gray-400 text-sm mb-2">
              Posted by {getUserDisplayName(post.userId)} on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={handleToggleLike}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Heart 
                  className="w-5 h-5 mr-1 text-pink-500" 
                  fill={post.liked ? "currentColor" : "none"} 
                />
                {post.likeCount} Likes
              </button>
              <button
                onClick={() => setShowCommentForm(!showCommentForm)}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-1 text-cyan-400" />
                {comments.length} Comments
              </button>
            </div>
            
            {user && user.email === post.userId && (
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setIsEditingPost(true)}
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-blue-400" />
                </button>
                <button
                  onClick={handleDeletePost}
                  className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash className="w-5 h-5 text-red-400" />
                </button>
              </div>
            )}

            {/* Add Comment Form */}
            {showCommentForm && user && (
              <div ref={commentFormRef} className="mt-4 mb-6">
                <CommentForm 
                  postId={post.id}
                  onSubmit={handleCreateComment}
                />
              </div>
            )}

            <h3 className="text-2xl font-semibold mt-6 mb-4">Comments</h3>
            {comments.length === 0 ? (
              <p className="text-gray-400">No comments yet.</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300">{comment.content}</p>
                    <p className="text-gray-400 text-sm">
                      Commented by {getUserDisplayName(comment.userId)} on {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    {user && user.email === comment.userId && (
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => setEditingComment(comment)}
                          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    )}
                    {editingComment?.id === comment.id && (
                      <CommentForm
                        postId={post.id}
                        onSubmit={(formData) => handleUpdateComment(formData, comment.id)}
                        initialData={editingComment}
                        isEditing={true}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PostDetail;