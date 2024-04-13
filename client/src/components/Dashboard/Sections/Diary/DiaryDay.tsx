import React from 'react';
import DiaryEntry from './DiaryDayEntry';

interface DiaryDayProps {
  date: Date
  diaryDayData: any
};

const DiaryDay: React.FC<DiaryDayProps> = ({ date, diaryDayData }) => {

  const isToday = (): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="w-full h-full border-box flex-grow rounded-md text-sm">
      <div className={`flex justify-between text-white py-3 px-3 ${isToday() ? 'bg-primary-dark' : 'bg-primary'}`}>
        <span>{date.toLocaleDateString('en-GB', { weekday: 'long' })}</span>

        {isToday() ? (
          <span>Today</span>) : 
        <span>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
        }
        
      </div>
      <div className="text-xs">
        {diaryDayData ? diaryDayData.map((entry, index) => 
          <DiaryEntry key={entry.lessonId} entry={entry} order={index+1} />) : null}
      </div>
    </div>
  );
};

export default DiaryDay;
