import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/input.css';
import './styles/app.scss';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App: React.FC = () => {
  
  const isAuthenticated = useIsAuthenticated()

  return (
    <Routes>

      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login /> } />

      <Route path="/dashboard" element={
        <RequireAuth fallbackPath={'/login'}> 
            <Dashboard/>
            </RequireAuth>}/>

    </Routes>
  );
}

export default App;
