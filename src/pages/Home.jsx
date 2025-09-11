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

  // Base universe background with simplified gradient
  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed";

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${universeBackground}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg font-semibold">Loading the cosmos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${universeBackground} transition-all duration-300 relative`}>
      {/* Optimized space background - fewer elements with will-change */}
      <div className="space-background fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Static or reduced stars instead of animated ones */}
        <div className="stars-layer"></div>
        
        {/* Just two nebulas instead of many animated effects */}
        <div className="nebula-primary"></div>
        <div className="nebula-secondary"></div>
      </div>
      
      {/* Main content with z-index to be above the background */}
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-16 relative z-10">
        {/* Top-Right Buttons */}
        <div className="fixed top-4 right-6 flex space-x-3 z-40">
          {/* Create Post Button */}
          <button
            onClick={openForm}
            className="bg-blue-600 bg-opacity-90 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            title="Create Post"
            aria-label="Create a new post"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Page Header with Form Popup */}
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              SkillVerse
            </span>
          </h1>
          <p className="mt-2 text-blue-100 text-xl">
            Build skills. Shape your future
          </p>

          {/* Create Post Form Popup - Centered with fixed position */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              {/* Semi-transparent overlay */}
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeForm}></div>
              
              {/* Form Content */}
              <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl z-10 animate-popup border border-gray-700">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Create Post
                  </h2>
                  <button
                    onClick={closeForm}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label="Close form"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <PostForm onSubmit={handleCreatePost} />
              </div>
            </div>
          )}
        </div>

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
                <div key={post.id} className="transform transition-all duration-300 hover:scale-105">
                  <PostCard post={post} onUpdate={handleUpdatePosts} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Optimized CSS for star animation - reduces number of elements and uses efficient CSS */}
      <style jsx global>{`
        /* Use transform for better performance */
        .space-background {
          will-change: transform;
          transform: translateZ(0); /* Hardware acceleration */
          backface-visibility: hidden;
        }
        
        /* Single stars layer with reduced complexity */
        .stars-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 50px 150px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 150px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 250px 250px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 350px 150px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 450px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 550px 250px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 650px 150px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 750px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 850px 250px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 950px 150px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 1050px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 1150px 250px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 100px 100px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 300px 300px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 500px 500px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 700px 300px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 900px 200px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 1100px 300px, white, rgba(0,0,0,0));
          background-size: 1200px 600px;
          background-repeat: repeat;
          opacity: 0.6;
          /* Reduced animation speed */
          animation: starMove 300s linear infinite;
        }

        /* Simplified nebula effects - using static positioning and reduced opacity */
        .nebula-primary {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 20% 35%, rgba(76, 0, 255, 0.08) 0%, transparent 30%),
                    radial-gradient(ellipse at 75% 60%, rgba(0, 153, 255, 0.06) 0%, transparent 40%);
          pointer-events: none;
          opacity: 0.7;
        }

        .nebula-secondary {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 80% 10%, rgba(255, 100, 200, 0.05) 0%, transparent 40%);
          pointer-events: none;
          opacity: 0.6;
        }

        /* Reduced animation keyframes */
        @keyframes starMove {
          from { background-position: 0 0; }
          to { background-position: -1200px 600px; }
        }

        @keyframes popup {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-popup {
          animation: popup 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home;