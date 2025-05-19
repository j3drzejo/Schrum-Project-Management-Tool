import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { isAuthenticated, loading, validateToken } = useAuthViewModel();
  const location = useLocation();

  useEffect(() => {
    validateToken();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
