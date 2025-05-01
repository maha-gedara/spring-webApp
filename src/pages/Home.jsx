import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPosts, createPost } from '../services/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (formData) => {
    try {
      const response = await createPost(formData);
      setPosts([response.post, ...posts]);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdatePosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error refreshing posts:', error);
      toast.error('Failed to refresh posts');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <PostForm onSubmit={handleCreatePost} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={handleUpdatePosts} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;