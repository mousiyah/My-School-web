import React from 'react';

import DiaryEntry from './DiaryEntry';

const DiaryDay: React.FC<{weekIndex: number}> = ({weekIndex}) => {

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="card w-fit text-sm m-2">


      <div className="flex justify-between bg-primary text-white p-2 rounded-t-md">
        <span>{days[weekIndex]}</span>
        <span>19 Feb</span>
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

