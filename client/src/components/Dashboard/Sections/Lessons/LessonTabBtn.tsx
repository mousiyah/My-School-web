import React from 'react';

interface LessonTabBtnProps {
  id: number;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const LessonTabBtn: React.FC<LessonTabBtnProps> = ({ id, label, selected, onClick }) => {
  return (
    <button
      className={`h-full py-3 px-4
                 ${selected ?
                   'font-medium text-primary border-b border-b-4 border-primary hover:bg-primary-light'
                   : 'text-gray-600 hover:bg-gray-100 hover:border-b hover:border-b-4 hover:border-gray-100 hover:text-inherit'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default LessonTabBtn;
