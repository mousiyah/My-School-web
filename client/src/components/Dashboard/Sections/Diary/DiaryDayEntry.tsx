import React, { useState } from 'react';

import { PiNotebook } from "react-icons/pi";

const DiaryEntry: React.FC = () => {

  const [isHomeworkChecked, setIsHomeworkChecked] = useState(false);

  const homeworkCheckboxToggle = () => {
    setIsHomeworkChecked(!isHomeworkChecked);
  };

  return (
    
    <div className="px-2 py-1">

      <div className="flex">

        <div className="flex-grow p-1">
         <span className="text-xs font-semibold">1. Mathematics </span>

          <div className="text-xxs ">
            <span>8:00-8:45</span>
            <span>, </span>
            <span>room 5</span>
          </div>

          <div className="flex items-center mt-1">
            <PiNotebook className="text-blue-500"/>
            <span className="text-xs ml-1">Classwork name</span>
          </div>
        </div>

        <div className="w-5 mt-1 text-xs">
          <div className="tooltip" data-tip="mark for homework">
          <button className="bg-green-600 px-1.5 py-0.5 rounded flex items-center justify-center text-white font-semibold">
            5
          </button>
          </div>
        </div>

      </div>

      <div className="flex mt-1">
        <div className="bg-indigo-100 py-0.5 px-1 rounded flex items-baseline">
          <input 
            key={Math.random()}
            type="checkbox"
            id="checkbox"
            checked={isHomeworkChecked}
            onChange={homeworkCheckboxToggle}/>
          <label htmlFor="checkbox" className="text-xs whitespace-normal ml-2">solve page 82</label>
        </div>
      </div>

      <hr className="border-gray-300 border-t-1 p-0 m-0 mt-2 w-full"></hr>

    </div>




  );
};

export default DiaryEntry;