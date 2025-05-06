import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/auth';
import { toast } from 'react-toastify';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Extract username from user email/id
  const username = user && user.email ? user.email.split('@')[0] : 'User';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const universeBackground = "bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed";

  return (
    <div className={`${universeBackground} min-h-screen text-white flex flex-col items-center py-12 px-4`}>   
      <div className="max-w-4xl w-full bg-gray-800 bg-opacity-50 rounded-lg shadow-xl p-12">
        
        <div className="flex flex-col items-center gap-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Hello {username}
            </h1>
            <p className="text-3xl text-gray-300 italic">
              Welcome to your profile!
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <Link
              to="/my-posts"
              className="w-80 px- py-3 bg-gray-600 rounded-md text-white font-semibold hover:bg-gradient-to-br hover:from-gray-900 hover:to-blue-900 transition-colors duration-300 text-center"
            >
              My Posts
            </Link>
            <Link
              to="/my-quizzes"
              className="w-80 px-6 py-3 bg-gray-600 rounded-md text-white font-semibold hover:bg-gradient-to-br hover:from-gray-900 hover:to-blue-900 transition-colors duration-300 text-center"
            >
              My Quizzes
            </Link>
            <button
              onClick={handleLogout}
              className="w-80 px-6 py-3 bg-gray-600 rounded-md text-white font-semibold hover:bg-gradient-to-br hover:from-gray-900 hover:to-blue-900 transition-colors duration-300 text-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Profile;