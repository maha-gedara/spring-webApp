import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/success', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.email !== 'anonymousUser') {
            setUser({ email: data.email });
          } else {
            setUser(null);
            navigate('/login');
          }
        } else {
          setUser(null);
          navigate('/login');
        }
      } catch (error) {
        setUser(null);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const loginUser = async (credentials) => {
    const response = await login(credentials);
    setUser({ email: response.email });
    navigate('/');
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logout: logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}