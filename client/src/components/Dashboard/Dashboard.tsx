import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';

import Topbar from './TopBar/Topbar';
import Sidebar from './Sidebar/Sidebar';
import Diary from './Sections/Diary/Diary';
import Homeworks from './Sections/Homeworks/Homeworks';
import Subjects from './Sections/Subjects/Subjects';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { sectionName } = useParams<{ sectionName?: string }>();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarToggled, setSidebarToggled] = useState(false);

  useEffect(() => {
    if (!sectionName || sectionName.trim() === '') {
      navigate('/dashboard/diary');
    }
  }, [sectionName, navigate]);

  const onSidebarClick = (sectionName: string) => {
    navigate(`/dashboard/${sectionName}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setSidebarToggled(true);
  };

  const sectionComponents: { [key: string]: React.ReactNode } = {
    diary: <Diary/>,
    homeworks: <Homeworks/>,
    subjects: <Subjects/>,
  };


    const { width } = useWindowSize();
    useEffect(() => {
      if (!isSidebarToggled){
        if (width < 1024) { // = large screen size
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
      }
    }, [width]);

  return (
    <div className="flex flex-col w-full h-screen border-box">
      
      <Topbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex w-full h-full border-box overflow-y-auto">

        <Sidebar
          isOpen={isSidebarOpen}
          onSidebarClick={onSidebarClick}
          selectedSection={sectionName || 'diary'}/>

        <div className="w-full border-box h-full overflow-y-auto overflow-x-hidden py-4 px-10">
          {sectionComponents[sectionName]}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
