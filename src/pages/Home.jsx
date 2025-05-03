import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPosts, createPost } from '../services/api';
import PostForm from '../components/PostForm'; // Sample implementation below
import PostCard from '../components/PostCard';
import { FaPlus, FaSync } from 'react-icons/fa';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPosts();
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreatePost = async (formData) => {
    try {
      const response = await createPost(formData);
      setPosts([response.post, ...posts]);
      setIsModalOpen(false);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
      throw error;
    }
  };

  const handleUpdatePosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      toast.success('Posts refreshed');
    } catch (error) {
      console.error('Error refreshing posts:', error);
      toast.error('Failed to refresh posts');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed";

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${universeBackground}`}>
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg font-semibold">Loading the cosmos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${universeBackground}`}>
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-16">
        {/* Top-Right Buttons */}
        <div className="fixed top-6 right-6 flex space-x-3 z-50">
          
          {/* Create Post Button */}
          <button
            onClick={openModal}
            className="bg-blue-600 bg-opacity-90 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            title="Create Post"
            aria-label="Create a new post"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              SkillVerse
            </span>
          </h1>
          <p className="mt-2 text-blue-100 text-xl dark:text-blue-200">
            Build skills. Shape your future
          </p>
        </div>

        {/* Modal for PostForm */}
        {isModalOpen && (
          <div className={`fixed inset-0 ${universeBackground} bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md`}>
            {/* Modal Content */}
            <div className="relative bg-gray-800 bg-opacity-90 rounded-xl p-8 w-full max-w-md border-2 border-indigo-600 shadow-2xl shadow-indigo-500/50 animate-float">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Create Post
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <PostForm onSubmit={handleCreatePost} />
            </div>
          </div>
        )}

{/*         <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">Recent Discoveries</h2>
 */}
        {posts.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-40 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-700">
            <p className="text-gray-300">No cosmic posts discovered yet. Create the first one!</p>
            <button
              onClick={openModal}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                <PostCard post={post} onUpdate={handleUpdatePosts} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Animation for Modal */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;