import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Diary from './Diary/Diary';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { sectionName } = useParams<{ sectionName?: string }>();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!sectionName || sectionName.trim() === '') {
      navigate('/dashboard/home');
    }
  }, [sectionName, navigate]);

  const onSidebarClick = (sectionName: string) => {
    navigate(`/dashboard/${sectionName}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sectionComponents: { [key: string]: React.ReactNode } = {
    diary: <Diary />,
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onSidebarClick={onSidebarClick}
          selectedSection={sectionName || 'home'}
        />
        <div className="w-full h-full">{sectionComponents[sectionName]}</div>
      </div>
    </div>
  );
};

export default Dashboard;
