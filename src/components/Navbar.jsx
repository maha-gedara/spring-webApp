import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/auth';
import { toast } from 'react-toastify';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          SkillVerse
        </Link>
        <div className="flex items-center gap-8">
          <div className="text-lg">
            {user ? (
              <div className="flex space-x-6">
                <Link
                  to="/my-posts"
                  className="hover:text-yellow-300 transition-colors duration-300 font-bold"
                >
                  My Posts
                </Link>
                <Link
                  to="/my-quizzes"
                  className="hover:text-yellow-300 transition-colors duration-300 font-bold"
                >
                  My Quizzes
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-300 transition-colors duration-300 font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
            <div className="space-x-6">
              <Link to="/login" className="hover:text-yellow-300 transition-colors duration-200">
                Login
              </Link>
              <Link to="/signup" className="hover:text-yellow-300 transition-colors duration-200">
                Signup
              </Link>
            </div>
          )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;