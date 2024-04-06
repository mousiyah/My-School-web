import React, { useState } from 'react';

import DiaryDay from './DiaryDay';
import DiaryDatePicker from './DiaryDatePicker';

const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDate = (weekIndex) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 1 + weekIndex);
    return currentDate;
  }

  return (
    <div className="flex w-full flex-col items-center py-4 px-10">
     
     <DiaryDatePicker
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}/>

      <div className="flex w-full border-box px-2 space-x-1">
        {[...Array(6)].map((_, weekIndex) => (
          <DiaryDay key={weekIndex} date={getDate(weekIndex)} />
        ))}
      </div>

    </div>
  );
};

export default Diary;
