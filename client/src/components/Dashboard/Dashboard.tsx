import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Topbar from './TopBar/Topbar';
import Sidebar from './Sidebar/Sidebar';
import Diary from './Sections/Diary/Diary';

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
    <div className="flex flex-col w-full h-screen border-box">
      
      <Topbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex w-full h-full border-box overflow-y-auto">

        <Sidebar
          isOpen={isSidebarOpen}
          onSidebarClick={onSidebarClick}
          selectedSection={sectionName || 'home'}/>

        <div className="w-full border-box h-full overflow-y-auto overflow-x-hidden">
          {sectionComponents[sectionName]}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
