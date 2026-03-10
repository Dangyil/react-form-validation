import { createContext, useState, useEffect, useCallback } from 'react';
import API from '../api/config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 Verify token on mount
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await API.get('/users/verify');

        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem(
            'user',
            JSON.stringify(response.data.user)
          );
          setIsAuthenticated(true);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to verify user');
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  // ✅ Login
  const login = useCallback((userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // ✅ Logout
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // ✅ Update user (for profile updates)
  const updateUser = useCallback((updatedUser) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        error
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}