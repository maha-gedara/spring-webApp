import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPosts, createPost } from '../services/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { FaPlus } from 'react-icons/fa';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  // Add body class to prevent scrolling when form is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isFormOpen]);

  const handleCreatePost = async (formData) => {
    try {
      const response = await createPost(formData);
      setPosts([response.post, ...posts]);
      setIsFormOpen(false);
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

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed";
  
  // Modified Title component with blur effect
  const TitleSection = ({ isBlurred = false }) => (
    <div className="text-center mb-8">
      <h1 className={`text-6xl font-bold text-white drop-shadow-lg ${isBlurred ? 'blur-md' : ''}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          SkillVerse
        </span>
      </h1>
      <p className={`mt-2 text-blue-100 text-xl dark:text-blue-200 ${isBlurred ? 'blur-sm' : ''}`}>
        Build skills. Shape your future
      </p>
    </div>
  );

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
    <div className={`min-h-screen ${universeBackground} transition-all duration-300`}>
      {/* Main content */}
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-16 transition-all duration-500 relative">
        {/* Top-Right Buttons */}
        <div className="fixed top-4 right-6 flex space-x-3 z-40">
          {/* Create Post Button */}
          <button
            onClick={openForm}
            className="bg-blue-600 bg-opacity-90 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            title="Create Post"
            aria-label="Create a new post"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Page Header - With conditional blur effect */}
        <TitleSection isBlurred={isFormOpen} />

        {/* Create Post Form Popup - Fixed and centered on screen */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-12">
            {/* Semi-transparent overlay */}
            <div className="fixed inset-0 bg-opacity-50" onClick={closeForm}></div>
            
            {/* Form Content - Centered Popup */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl z-10 animate-popup border border-gray-700">
              {/* Clear title in the form (no blur) */}
              <TitleSection isBlurred={false} />
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Create Post
                </h2>
                <button
                  onClick={closeForm}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors font-bold text-xl"
                  aria-label="Close form"
                >
                  ×
                </button>
              </div>
              <PostForm onSubmit={handleCreatePost} />
            </div>
          </div>
        )}

        {/* Posts Section with Conditional Blur */}
        <div className={`transition-all duration-500 ${isFormOpen ? 'filter blur-sm' : ''}`}>
          {posts.length === 0 ? (
            <div className="bg-gray-800 bg-opacity-40 rounded-lg p-8 text-center backdrop-blur-sm border border-gray-700">
              <p className="text-gray-300">No posts discovered yet. Create the first one!</p>
              <button
                onClick={openForm}
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
      </div>

      {/* Popup Animation and Floating Effect */}
      <style jsx>{`
        @keyframes popup {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-popup {
          animation: popup 0.3s ease-out;
        }
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