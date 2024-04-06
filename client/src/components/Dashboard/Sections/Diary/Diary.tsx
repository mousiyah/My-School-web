import React, { useState } from 'react';

import DiaryDay from './DiaryDay';
import DiaryDatePicker from './DiaryDatePicker';

const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex w-full flex-col items-center py-4 px-10">
     
     <DiaryDatePicker
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}/>

      <div className="flex w-full border-box px-2 space-x-1">
        {[...Array(6)].map((_, index) => (
          <DiaryDay key={index} weekIndex={index} selectedDate={selectedDate} />
        ))}
      </div>

    </div>
  );
};

export default Diary;
