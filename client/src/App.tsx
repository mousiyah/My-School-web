import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

import './styles/input.css';
import './styles/app.scss';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';

import { useDispatch } from 'react-redux';
import { fetchUserRole } from 'slices/userSlice';
import { AppDispatch } from 'store';

const App: React.FC = () => {
  const { loading } = useAuth();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(fetchUserRole());
    }
  }, [location.pathname]);

  if (loading) {
    return null;
  }

  return (
    <Routes>

      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

      <Route path="/dashboard/*" element={
        <RequireAuth fallbackPath={'/login'}>
          <Dashboard />
        </RequireAuth>
      } />

      <Route path="/dashboard/:sectionName/" element={
        <RequireAuth fallbackPath={'/login'}>
          <Dashboard />
        </RequireAuth>
      } />

      <Route path="/dashboard/:lesson/" element={
        <RequireAuth fallbackPath={'/login'}>
          <Dashboard />
        </RequireAuth>
      } />

    </Routes>
  );
}

export default App;
