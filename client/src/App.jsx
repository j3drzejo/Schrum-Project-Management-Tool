import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './views/Home/HomeView';
import LoginView from './views/Auth/LoginView';
import RegisterView from './views/Auth/RegisterView';
import ProtectedRoute from './routes/ProtectedRoute';
import UnprotectedRoute from './routes/UnprotectedRoute';
import { SidebarProvider } from './contexts/SidebarContext/SidebarProvider';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <UnprotectedRoute>
                <LoginView />
              </UnprotectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <UnprotectedRoute>
                <RegisterView />
              </UnprotectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <HomeView />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
