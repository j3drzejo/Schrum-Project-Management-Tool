import { useState } from 'react';
import * as authService from '../services/authService';
import Cookies from 'js-cookie';

export const useAuthViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (formData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 5000));
    setError(null);
    try {
      const res = await authService.login(formData);
      console.log(res);
      const data = res.data;
      if (data.accessToken) {
        Cookies.set('token', data.accessToken, { expires: 1 }); // 1 day
        return true;
      } else {
        setError('Invalid response from server');
        return false;
      }
    } catch (err) {
      console.error(err);
      setError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(formData);
      return true;
    } catch (err) {
      console.error(err);
      setError('Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, registerUser, loading, error };
};
