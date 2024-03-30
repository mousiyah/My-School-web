import React, { useState } from 'react';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Diary from './Diary';

const Dashboard: React.FC = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">

      <Topbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <Sidebar  isOpen={isSidebarOpen} />

        <div className="w-full h-full">
                          
          <Diary />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;

