import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UnprotectedRoute = ({ children }) => {
  const { isAuthenticated, loading, validateToken } = useAuthViewModel();

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingSpinner />;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UnprotectedRoute;
