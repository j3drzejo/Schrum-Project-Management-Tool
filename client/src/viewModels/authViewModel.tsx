import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext/useAuth';
import { authService } from '../services';
import { LoginDto, RegisterDto } from '../types';

export function useAuthViewModel() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    error,
    setToken,
    clearToken,
    setLoading,
    setError,
    setUser,
    getToken,
  } = useAuth();

  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const validateToken = async () => {
    const token = getToken();

    if (!token) {
      return;
    }

    setLoading(true);

    try {
      const userData = await authService.validateUser(token);
      setUser(userData);
    } catch (err) {
      console.error('Token validation failed:', err);
      clearToken();
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (formData: LoginDto) => {
    setLocalLoading(true);
    setLocalError(null);
    setError(null);

    try {
      const res = await authService.login(formData);

      if (res.accessToken) {
        setToken(res.accessToken, res.user);
        navigate('/');
        return true;
      } else {
        const errorMsg = 'Invalid response from server';
        setLocalError(errorMsg);
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err.response?.data?.message || 'Login failed';
      setLocalError(errorMsg);
      setError(errorMsg);
      return false;
    } finally {
      setLocalLoading(false);
    }
  };

  const registerUser = async (formData: RegisterDto) => {
    setLocalLoading(true);
    setLocalError(null);
    setError(null);

    try {
      await authService.register(formData);
      navigate('/login');
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setLocalError(errorMsg);
      setError(errorMsg);
      return false;
    } finally {
      setLocalLoading(false);
    }
  };

  const logoutUser = async () => {
    setLocalLoading(true);

    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearToken();
      setLocalLoading(false);
      navigate('/login');
    }
  };

  return {
    loginUser,
    registerUser,
    logoutUser,
    validateToken,
    isAuthenticated,
    loading: isLoading || localLoading,
    error: error || localError,
  };
}
