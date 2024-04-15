import React, { useEffect, useState } from 'react';

import { USER_ROLES } from 'constants/roles';
import { useSelector } from 'react-redux';
import { RootState } from 'store'; 

import { Outlet, useLocation, useParams } from 'react-router-dom';
import LessonTab from './LessonTab';
import { useNavigate } from 'hooks/useNavigate';

const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const userRole = useSelector((state: RootState) => state.user.role);

  const [selectedTab, setSelectedTab] = useState(1);

  const { navigateToLessonStudents, navigateToLessonEdit, navigateToLessonDetails, navigateToLessonMyWork} = useNavigate();
  const location = useLocation();

  const tabs = [

    ...(userRole === USER_ROLES.TEACHER ? 
      [{ id: 0, label: 'Edit details', onClick: () => navigateToLessonEdit(lessonId)}] : []),

    ...(userRole === USER_ROLES.STUDENT ? 
      [{ id: 0, label: 'Details', onClick: () => navigateToLessonDetails(lessonId)}] : []),

    ...(userRole === USER_ROLES.TEACHER ? 
      [ { id: 1, label: 'Students', onClick: () => navigateToLessonStudents(lessonId)}] : []),

    ...(userRole === USER_ROLES.STUDENT ? 
      [ { id: 1, label: 'My work', onClick: () => navigateToLessonMyWork(lessonId)}] : []),

  ];

  const onTabSelect = (id: number) => {
    setSelectedTab(id);
    tabs[id].onClick();
  }


  useEffect(() => {
    const lessonPattern = /^\/dashboard\/lesson\/[a-zA-Z0-9]+\/?$/;
    if (lessonPattern.test(location.pathname) && tabs.length > 0) {
      onTabSelect(1);
    }

    if (location.pathname.includes('edit') || location.pathname.includes('details')) {
      setSelectedTab(0);
    } else if (location.pathname.includes('my-work') || location.pathname.includes('students')) {
      setSelectedTab(1);
    }

  }, [location.pathname, onTabSelect, tabs, selectedTab]);

  return (
    <div className="w-full h-full">
      <LessonTab tabs={tabs} selectedTab={selectedTab} onTabSelect={onTabSelect} />

      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Lesson;
