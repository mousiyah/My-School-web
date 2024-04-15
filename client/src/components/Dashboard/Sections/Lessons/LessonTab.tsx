import React from 'react';
import LessonTabBtn from './LessonTabBtn';

interface LessonTabProps {
  tabs: { id: number; label: string }[];
  selectedTab: number;
  onTabSelect: (id: number) => void;
}

const LessonTab: React.FC<LessonTabProps> = ({ tabs, selectedTab, onTabSelect }) => {
  return (
    <div className="w-full border-b border-b-1 px-10 bg-white sticky top-0 z-20">
      {tabs.map((tab) => (
        <LessonTabBtn
          key={tab.id}
          id={tab.id}
          label={tab.label}
          selected={selectedTab === tab.id}
          onClick={() => onTabSelect(tab.id)}
        />
      ))}
    </div>
  );
};

export default LessonTab;
