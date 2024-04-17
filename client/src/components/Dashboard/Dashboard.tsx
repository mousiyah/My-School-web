import React, { useState, useEffect } from 'react';
import { useNavigate } from 'hooks/useNavigate';
import { Outlet, useLocation } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import Topbar from './topBar/Topbar';
import Sidebar from './sidebar/Sidebar';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarToggled, setSidebarToggled] = useState(false);

  const location = useLocation();
  const { navigateToDiary } = useNavigate();

  useEffect(() => {
    const dashboardPattern = /^\/dashboard\/?$/;
    if (dashboardPattern.test(location.pathname)) {
      navigateToDiary();
    }
  }, [location, useNavigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setSidebarToggled(true);
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

        <Sidebar isOpen={isSidebarOpen}/>

        <div className="w-full border-box h-full overflow-y-auto overflow-x-hidden">
          <Outlet/>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
