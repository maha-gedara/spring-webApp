import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { getAllPosts, createPost, deletePost } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../services/auth';

function Home() {
  const [posts, setPosts] = useState([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Wait for auth check
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        if (error.message.includes('Unauthorized')) {
          navigate('/login');
        } else {
          toast.error('Failed to fetch posts');
        }
      }
    };
    fetchPosts();
  }, [user, loading, navigate]);

  const handleCreatePost = async (formData) => {
    try {
      const newPost = await createPost(formData);
      setPosts([newPost.post, ...posts]);
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        navigate('/login');
      } else {
        throw error;
      }
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        navigate('/login');
      } else {
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold SKIP_ISSUE mb-4">SkillVerse</h1>
      {user && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
          <PostForm onSubmit={handleCreatePost} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
        ))}
      </div>
    </div>
  );
}

export default Home;