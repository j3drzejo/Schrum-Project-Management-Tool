import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'token';
const TOKEN_EXPIRY_DAYS = 1;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);

    if (!token) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const setToken = (token, user = null) => {
    if (token) {
      Cookies.set(TOKEN_KEY, token, {
        expires: TOKEN_EXPIRY_DAYS,
      });

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }
  };

  const clearToken = () => {
    Cookies.remove(TOKEN_KEY);

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const setLoading = (isLoading) => {
    setAuthState((prev) => ({ ...prev, isLoading }));
  };

  const setError = (error) => {
    setAuthState((prev) => ({ ...prev, error }));
  };

  const setUser = (user) => {
    setAuthState((prev) => ({ ...prev, user }));
  };

  const contextValue = {
    ...authState,
    setToken,
    clearToken,
    setLoading,
    setError,
    setUser,
    getToken: () => Cookies.get(TOKEN_KEY),
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
