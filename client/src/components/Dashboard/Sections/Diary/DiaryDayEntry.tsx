import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'

import { PiNotebook } from "react-icons/pi";
import { studentApi } from 'api/studentApi';

interface DiaryEntryProps {
  entry: Entry;
  order: number;
}

interface Entry {
  lessonId: string;
  subject: string;
  teacher: string;
  room: string;
  homework: string;
  isHomeworkCompleted: boolean;
  classwork: string;
  marks: {
    type: string;
    value: number;
  }[];
  attended: boolean;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, order}) => {
  const { lessonId, subject, teacher, room, homework, isHomeworkCompleted, classwork, marks, attended} = entry;

  const colorMap = {
    5: 'bg-green-600',
    4: 'bg-orange-500',
    3: 'bg-yellow-400',
    2: 'bg-red-500',
  };

  const timeMap = {
    1: '8:00-8:45',
    2: '8:50-9:35',
    3: '9:40-10:25',
    4: '10:40-11:25',
    5: '11:30-12:15',
    6: '12:20-13:05',
    7: '13:15-14:00',
  };

  const [isHomeworkChecked, setIsHomeworkChecked] = useState(isHomeworkCompleted);

  const homeworkCheckboxToggle = async () => {
    setIsHomeworkChecked(!isHomeworkChecked);
    await studentApi.setHomeworkCompleted(lessonId, !isHomeworkChecked);
  };

  const getTooltipText = (mark) => {
    let prefix = 'Mark for ';
    if (mark.type === 'homework') {
      return prefix + homework;
    } else if (mark.type === 'classwork') {
      return prefix + classwork;
    } else {
      return prefix + 'answer in the lesson';
    }
  };

  return (
    <div className={`px-2 py-1 ${attended? '' : ''}`}>
      <div className="flex">
        <div className="flex-grow p-1">
          <span className="text-xs font-semibold">{order}. </span>
          <span className="text-xs font-semibold cursor-pointer hover:underline">{subject}</span>
          <div className="text-xxs text-gray-500">
            <span>{timeMap[order]}</span> <br/>
            <span>{teacher}, </span>
            <span>room {room}</span>
          </div>

          {classwork ? (
          <div className="flex items-center mt-0.5 mb-0.5">
            <PiNotebook size={14} className="text-blue-500"/>
            <span className="text-xs ml-1">{classwork}</span>
          </div>
          ) : ''}

        </div>

        
        <div className="flex w-fit h-min mt-1 text-xs">

        {marks.map((mark, index) => (

          <div key={index}>
            <Tooltip id="tooltip" />
            <button
              className={`px-1.5 py-0.5 mr-1 max-w-min max-h-min h-fit rounded flex 
                          items-center justify-center text-white font-semibold 
                          ${colorMap[mark.value]}`}
              data-tooltip-id="tooltip"
              data-tooltip-content={getTooltipText(mark)}
              data-tooltip-place="top">
            {mark.value}
            </button>
          </div>

          ))}

        </div>


      </div>

      {!attended ? (
        <div className="mb-1 ml-1 bg-red-600 w-fit px-1 rounded">
          <span className="text-white">absent</span>
        </div>
      ) : ''}

      {homework ? (
      <div className="flex cursor-pointer" onClick={homeworkCheckboxToggle}>
        <div className="bg-indigo-100 py-0.5 px-1 rounded flex items-baseline cursor-pointer">
          <input key={Math.random()} type="checkbox" id={`checkbox-${lessonId}`} checked={isHomeworkChecked}
            onChange={homeworkCheckboxToggle}/>
          <label htmlFor={`checkbox-${lessonId}`}
                className={`text-xs whitespace-normal ml-2 cursor-pointer ${isHomeworkChecked ? 'line-through' : ''}`}>
            {homework}</label>
        </div>
      </div>
      ) : ''}

      <hr className="border-gray-300 border-t-1 p-0 m-0 mt-2 w-full"></hr>
    </div>
  );
};

export default DiaryEntry;
