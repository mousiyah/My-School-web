import React from 'react';

const DiaryEntry: React.FC = () => {
  return (
    <div className="text-sm">

      <div className="flex p-1">
        <div className="w-5 p-1">1. </div>
        <div className="flex-grow p-1">
          Mathematics

          <div className="text-xxs ">
          <span>8:00-8:45</span>
          <span>, </span>
          <span>room 5</span>
          </div>

        </div>
        <div className="w-5 mt-1">
          <div className="bg-emerald-600 rounded flex items-center justify-center text-white">5</div>
        </div>
      </div>

      <div className="flex p-1">
      <div className="bg-indigo-200 p-1 rounded flex items-baseline">
          <input type="checkbox" className="mr-2" />
          <label htmlFor="checkbox" className="text-xs whitespace-normal">exercises on page 82</label>
        </div>
      </div>

      <hr className="border-gray-500 p-0 m-0 mt-2 w-full"></hr>

    </div>




  );
};

export default DiaryEntry;