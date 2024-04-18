import React from 'react';
import DiaryDayEntry from './DiaryDayEntry';

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
    <div className="w-full h-full border-box rounded-md text-sm">
      <div className={`flex justify-between text-white py-3 px-3 ${isToday() ? 'bg-primary-dark' : 'bg-primary'}`}>
        <span>{date.toLocaleDateString('en-GB', { weekday: 'long' })}</span>

        {isToday() ? (
          <p className="ml-1">Today</p>) : 
        <p className="ml-1">{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
        }
        
      </div>
      <div className="text-xs">
        {diaryDayData != null && diaryDayData.length != 0 ? diaryDayData.map((entry, index) => 
          <DiaryDayEntry key={entry.lessonId} entry={entry}/>) : 
            <div className="w-full h-full text-center px-2 py-5">
              <p className="text-base">No lessons</p>
            </div>
        }
      </div>
    </div>
  );
};

export default DiaryDay;
