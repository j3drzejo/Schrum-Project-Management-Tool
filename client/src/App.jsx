import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './views/Home/HomeView';
import LoginView from './views/Auth/LoginView';
import RegisterView from './views/Auth/RegisterView';
import ProtectedRoute from './routes/ProtectedRoute';
import UnprotectedRoute from './routes/UnprotectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <UnprotectedRoute>
            <LoginView />
          </UnprotectedRoute>} />

        <Route path="/register" element={
          <UnprotectedRoute> 
            <RegisterView /> 
          </UnprotectedRoute>} />

        <Route path="/" element={
          <ProtectedRoute>
            <HomeView />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
