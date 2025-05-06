import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getUserPosts, deletePost } from '../services/api';
import { toast } from 'react-toastify';

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed";

  const fetchPosts = async () => {
    try {
      const data = await getUserPosts();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      toast.success('Post deleted!');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className={`min-h-screen ${universeBackground} text-white p-4`}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">My Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDeletePost} 
              onUpdate={fetchPosts} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;