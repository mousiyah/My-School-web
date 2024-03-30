import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { isAuthenticated } from './utils/auth'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/input.css';
import './styles/app.scss';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage /> } />

        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
