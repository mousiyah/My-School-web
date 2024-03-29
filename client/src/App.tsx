import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/input.css';
import './styles/app.scss';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    //<Dashboard/>
    <LoginPage/>
  );
}

export default App;
