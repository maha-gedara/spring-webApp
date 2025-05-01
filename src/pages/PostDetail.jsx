import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { getPostById, updatePost } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../services/auth';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        toast.error('Failed to fetch post');
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async (formData) => {
    try {
      const updatedPost = await updatePost(id, formData);
      setPost(updatedPost.post);
    } catch (error) {
      throw error;
    }
  };

  if (!post) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="mt-4 w-full h-64 object-cover rounded"
        />
      )}
      <p className="text-sm text-gray-500 mt-2">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">Likes: {post.likeCount}</p>
      {user && user.email === post.userId && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
          <PostForm
            onSubmit={handleUpdatePost}
            initialData={post}
            isEditing={true}
          />
        </div>
      )}
    </div>
  );
}

export default PostDetail;