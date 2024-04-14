import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './styles/input.css';
import './styles/app.scss';

import RequireAuth from '@auth-kit/react-router/RequireAuth'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useAuth } from './hooks/useAuth';

import { useDispatch } from 'react-redux';
import { fetchUserRole } from 'slices/userSlice';
import { AppDispatch } from 'store';

import { USER_ROLES } from 'constants/roles';
import { useSelector } from 'react-redux';
import { RootState } from 'store'; 

import NotFound from 'components/NotFound';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Diary from 'components/Dashboard/Sections/Diary/Diary';
import Subjects from 'components/Dashboard/Sections/Subjects/Subjects';
import Homeworks from 'components/Dashboard/Sections/Homeworks/Homeworks';
import Lesson from 'components/Dashboard/Sections/Lessons/Lesson';
import LessonEdit from 'components/Dashboard/Sections/Lessons/LessonEdit';
import LessonStudents from 'components/Dashboard/Sections/Lessons/LessonStudents';


const App: React.FC = () => {
  const { loading } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  const userRole = useSelector((state: RootState) => state.user.role);
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

  const roleAllowedFor = (role: string): boolean => {
    return userRole === role;
  };

  return (
    <Routes>


      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}/>

      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

      <Route path="/dashboard" element={
        <RequireAuth fallbackPath={'/login'}>
          <Dashboard />
        </RequireAuth>}>
        
        <Route path="/dashboard/diary" element={
        <RequireAuth fallbackPath={'/login'}>
          <Diary />
        </RequireAuth>} />

        <Route path="/dashboard/homeworks" element={
        <RequireAuth fallbackPath={'/login'}>
          <Homeworks/>
        </RequireAuth>} />

        <Route path="/dashboard/subjects" element={
        <RequireAuth fallbackPath={'/login'}>
          <Subjects/>
        </RequireAuth>} />

        {roleAllowedFor(USER_ROLES.TEACHER) && (
        <Route path="/dashboard/lesson/:lessonId" element={
          <RequireAuth fallbackPath={'/login'}>
            <Lesson/>
          </RequireAuth>}> 

          <Route path="/dashboard/lesson/:lessonId/edit" element={
            <RequireAuth fallbackPath={'/login'}>
              <LessonEdit/>
            </RequireAuth>} />

            <Route path="/dashboard/lesson/:lessonId/students" element={
            <RequireAuth fallbackPath={'/login'}>
              <LessonStudents/>
            </RequireAuth>} />

        </Route>)}


      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
