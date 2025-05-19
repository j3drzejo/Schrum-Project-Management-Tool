import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UnprotectedRoute = ({ children, redirectPath = '/' }) => {
  const { isAuthenticated, loading, validateToken } = useAuthViewModel();
  const location = useLocation();

  useEffect(() => {
    validateToken();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const from = location.state?.from?.pathname || redirectPath;

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return children;
};

export default UnprotectedRoute;
