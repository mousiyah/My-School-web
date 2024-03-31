import React from 'react';
import DiaryEntry from './DiaryDayEntry';

const DiaryDay: React.FC<{ weekIndex: number; selectedDate: Date }> = ({
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

  const isCurrentDate = () => {
    const today = new Date();
    return currentDate.toDateString() === today.toDateString();
  };


  return (
    <div className={`w-full text-sm border ${isCurrentDate() ? 'bg-gray-100' : 'bg-white'}`}>
      <div className={`flex justify-between text-white py-3 px-3 ${isCurrentDate() ? 'bg-primary-dark' : 'bg-primary'}`}>
        <span>{days[weekIndex]}</span>
        <span>{formattedDate}</span>
      </div>
      <DiaryEntry />
      <DiaryEntry />
      <DiaryEntry />
      <DiaryEntry />
      <DiaryEntry />
    </div>
  );
};

export default DiaryDay;
