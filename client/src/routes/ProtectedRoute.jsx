import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, validateToken } = useAuthViewModel();
  const location = useLocation();

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
