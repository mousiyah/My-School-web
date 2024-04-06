import React from 'react';
import DiaryEntry from './DiaryDayEntry';

interface DiaryDayProps {
  date: Date;
}

const DiaryDay: React.FC<DiaryDayProps> = ({
  date,
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const weekIndex = (date.getDay() + 6) % 7;

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  const isToday = (): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="w-full h-full border-box flex-grow rounded-md text-sm">

      <div className={`flex justify-between text-white  py-3 px-3 ${isToday() ? 'bg-primary-dark' : 'bg-primary'}`}>
        <span>{days[weekIndex]}</span>
        {isToday() ? (
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
