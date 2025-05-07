import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/auth';
import { login } from '../services/api';
// Import Eye icons for password visibility toggle
import { Eye, EyeOff } from 'react-feather'; // or you can use any icon library you prefer

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      await authLogin(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      toast.error('Failed to log in: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 bg-fixed overflow-hidden relative">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <div className="stars-sm absolute inset-0" style={{background: 'radial-gradient(1px 1px at 25% 25%, white, rgba(0, 0, 0, 0)), radial-gradient(1px 1px at 50% 50%, white, rgba(0, 0, 0, 0)), radial-gradient(1px 1px at 75% 75%, white, rgba(0, 0, 0, 0)), radial-gradient(2px 2px at 100% 100%, white, rgba(0, 0, 0, 0))'}}></div>
        {/* Large circular glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl animate-pulse"></div>
        {/* Small nebula */}
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-3xl animate-pulse"></div>
      </div>
      
      {/* Login Form Card with cosmic border */}
      <div className="relative max-w-md w-full mx-4 bg-gray-800/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
        {/* Animated border effect */}
        <div className="absolute inset-0 border-2 border-transparent rounded-2xl glow-border" style={{
          background: 'linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.8), transparent) border-box', 
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'borderGlow 4s linear infinite'
        }}></div>
        
        {/* Card content */}
        <div className="relative p-8 z-10">
          {/* Small planet decoration */}
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 opacity-70 shadow-lg"></div>
          
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-400 bg-clip-text mb-8">
            Welcome To The SkillVerse
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-blue-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-lg border border-indigo-500/30 bg-gray-900/50 px-4 py-3 text-white placeholder-indigo-300/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition-all duration-300"
                placeholder="you@example.com"
              />
              <div className="absolute right-3 top-10 w-2 h-2 rounded-full bg-indigo-400 opacity-70"></div>
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-blue-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full rounded-lg border border-indigo-500/30 bg-gray-900/50 px-4 py-3 text-white placeholder-indigo-300/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-blue-800 transition-all duration-200 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <div className="flex items-center justify-center w-6 h-6">
                      <Eye size={18} className="opacity-80 hover:opacity-100" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-6 h-6">
                      <EyeOff size={18} className="opacity-80 hover:opacity-100" />
                    </div>
                  )}
                </button>
              </div>
              <div className="absolute right-10 top-10 w-2 h-2 rounded-full bg-purple-400 opacity-70"></div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                  </svg>
                  Launching...
                </>
              ) : (
                'SignIn'
              )}
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-blue-200">
            New explorer?{' '}
            <a href="/signup" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors duration-200">
              Begin your journey
            </a>
          </p>
          
          {/* Decorative elements */}
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
          <div className="absolute bottom-6 left-8 w-1 h-1 rounded-full bg-purple-400 opacity-80"></div>
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glow-border {
          background-size: 300% 300%;
        }
        .stars-sm {
          background-size: 200px 200px;
        }
      `}</style>
    </div>
  );
}

export default Login;