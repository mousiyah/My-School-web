import React, { useState } from 'react';

import Topbar from '../partials/Topbar';
import Sidebar from '../partials/Sidebar';
import Diary from '../partials/Diary';

const Dashboard: React.FC = () => {

  const SidebarSize = 72;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">

      <Topbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <Sidebar  isOpen={isSidebarOpen} size={SidebarSize}/>

        <div className={`w-full h-full
                        transition-all duration-300 ease-in-out }`}>
                          
          <Diary />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;

