import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../services/auth';

function Navbar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          SkillVerse
        </Link>
        <div className="space-x-4">
          <Link to="/marketplace" className="hover:underline">
            Marketplace
          </Link>
          {user ? (
            <>
              <Link to="/my-posts" className="hover:underline">
                My Posts
              </Link>
              <Link to="/my-quizzes" className="hover:underline">
                My Quizzes
              </Link>
              <Link to="/my-ads" className="hover:underline">
                My Ads
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
