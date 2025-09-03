import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store';
import { getCurrentUser } from './store/slices/authSlice';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import DevicesPage from './pages/Devices/DevicesPage';
import YangModelsPage from './pages/YangModels/YangModelsPage';
import ApiSchemasPage from './pages/ApiSchemas/ApiSchemasPage';
import MappingsPage from './pages/Mappings/MappingsPage';
import TemplatesPage from './pages/Templates/TemplatesPage';
import ServicesPage from './pages/Services/ServicesPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Try to get current user if we have a token
    if (localStorage.getItem('authToken')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
          } 
        />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="devices/*" element={<DevicesPage />} />
            <Route path="yang-models/*" element={<YangModelsPage />} />
            <Route path="api-schemas/*" element={<ApiSchemasPage />} />
            <Route path="mappings/*" element={<MappingsPage />} />
            <Route path="templates/*" element={<TemplatesPage />} />
            <Route path="services/*" element={<ServicesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
