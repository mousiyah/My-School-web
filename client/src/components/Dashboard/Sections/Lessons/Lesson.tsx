import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import LessonTab from './LessonTab';
import { useNavigate } from 'hooks/useNavigate';

const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const [selectedTab, setSelectedTab] = useState(1);

  const { navigateToLessonStudents, navigateToLessonEdit} = useNavigate();

  useEffect(() => {
    navigateToLessonEdit(lessonId);
  }, []);

  const tabs = [
    { id: 0, label: 'Edit details', onClick: () => navigateToLessonEdit(lessonId)},
    { id: 1, label: 'Students', onClick: () => navigateToLessonStudents(lessonId)},
  ];

  const onTabSelect = (id: number) => {
    setSelectedTab(id);
    tabs[id].onClick();
  }

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
