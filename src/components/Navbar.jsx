import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../services/auth';

function Navbar() {
  const { user } = useContext(AuthContext);

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
                  to="/"
                  className="hover:text-yellow-300 transition-colors duration-300 font-bold"
                >
                  Posts
                </Link>
                <Link
                  to="/my-quizzes"
                  className="hover:text-yellow-300 transition-colors duration-300 font-bold"
                >
                  Quizzes
                </Link>
                <Link
                  to="/marketplace"
                  className="hover:text-yellow-300 transition-colors duration-300 font-bold"
                >
                  Market Place
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-purple-300 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </Link>
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