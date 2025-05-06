import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/auth';
import { toast } from 'react-toastify';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <div className="max-w-3xl w-full bg-gray-800 bg-opacity-50 rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
          {user ? `${user.username}'s Profile` : 'User Profile'}
        </h1>
        <div className="flex flex-col items-center gap-6">
          <p className="text-lg text-gray-300 text-center">
            Welcome to your profile! Explore your contributions below.
          </p>
          <div className="flex gap-4">
            <Link
              to="/my-posts"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-colors duration-300"
            >
              My Posts
            </Link>
            <Link
              to="/my-quizzes"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-colors duration-300"
            >
              My Quizzes
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-md text-white font-semibold hover:from-red-500 hover:to-red-700 transition-colors duration-300"
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