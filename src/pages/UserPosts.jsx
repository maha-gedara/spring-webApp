import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getUserPosts, deletePost } from '../services/api';
import { toast } from 'react-toastify';

function UserPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUserPosts();
        setPosts(data);
      } catch (error) {
        toast.error('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
        ))}
      </div>
    </div>
  );
}

export default UserPosts;