import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, validateToken, checkAdmin, isAdmin } =
    useAuthViewModel();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await validateToken();
        await checkAdmin();
      } catch (error) {
        console.error('Error during auth checks:', error);
      } finally {
        setChecking(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) return <LoadingSpinner />;

  if (!isAuthenticated || !isAdmin) {
    console.log('Redirecting due to failed auth or admin check');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
