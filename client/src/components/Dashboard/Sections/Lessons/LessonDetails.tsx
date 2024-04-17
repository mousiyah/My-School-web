import React from 'react';
import { LESSON_TIME_MAP } from 'constants/time';
import { FaRegBookmark } from "react-icons/fa6";

interface Lesson {
  date: string;
  order: number;
  room: string;
  group: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
  };
}

const LessonData: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div className="border border-gray-300 rounded p-4">
      
      <div className="mb-4 flex items-center">
        <div  className="mr-3 bg-accent rounded-full text-white p-2">
          <FaRegBookmark size={16}/>
        </div>
        <span className="text-xl text-accent md:text-2xl font-semibold ">Lesson Details</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        <p className="flex items-center"><span className="font-medium mr-2">Date:</span> 
        {new Date(lesson.date).toDateString()}</p>

        <p className="flex items-center"><span className="font-medium mr-2">Time:</span>
        <span className="px-2 py-1 bg-accent text-white rounded">{LESSON_TIME_MAP[lesson.order]}</span></p>

        <p className="flex items-center"><span className="font-medium mr-2">Room:</span> {lesson.room}</p>
        <p className="flex items-center"><span className="font-medium mr-2">Group:</span> {lesson.group.name}</p>
        <p className="flex items-center"><span className="font-medium mr-2">Subject:</span> {lesson.subject.name}</p>
      </div>
    </div>
  );
};

export default LessonData;
