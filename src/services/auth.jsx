import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  const login = async (email, password) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, password }),
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setUser({ email: data.email });
      navigate('/');
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    await fetch('http://localhost:8080/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};