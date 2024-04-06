import React from 'react';
import DiaryEntry from './DiaryDayEntry';

interface DiaryDayProps {
  weekIndex: number; 
  selectedDate: Date;
}

const DiaryDay: React.FC<DiaryDayProps> = ({
  weekIndex,
  selectedDate,
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate the date for the day of the week
  const currentDate = new Date(selectedDate);
  currentDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 1 + weekIndex);

  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  const isCurrentDate = (): boolean => {
    const today = new Date();
    return currentDate.toDateString() === today.toDateString();
  };

  return (
    <div className="w-full h-full border-box flex-grow rounded-md text-sm">

      <div className={`flex justify-between text-white  py-3 px-3 ${isCurrentDate() ? 'bg-primary-dark' : 'bg-primary'}`}>
        <span>{days[weekIndex]}</span>
        {isCurrentDate() ? (
          <span>Today</span>) : 
          (<span>{formattedDate}</span>)}
      </div>

      <div className="text-xs">
        <DiaryEntry />
        <DiaryEntry />
        <DiaryEntry />
        <DiaryEntry />
        <DiaryEntry />
      </div>

    </div>
  );
};

export default DiaryDay;
