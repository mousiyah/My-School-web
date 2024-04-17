import React from 'react';
import { GoPeople } from "react-icons/go";

interface LessonGroupDetailsProps {
  groupName: string;
  presentStudents: number;
  totalStudents: number;
}

const LessonGroupDetails: React.FC<LessonGroupDetailsProps> = ({ groupName, presentStudents, totalStudents }) => {
  const absentStudents = totalStudents - presentStudents;

  return (
    <div className="border border-gray-300 rounded p-4 mb-6">
      <div className="mb-4 flex items-center">
        <div className="mr-3 bg-accent rounded-full text-white p-2">
          <GoPeople size={16} />
        </div>
        <span className="text-xl text-accent md:text-2xl font-semibold">Group: {groupName}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
        <p className="flex items-center"><span className="font-medium mr-2">Total: </span>
          {totalStudents} students
        </p>
        <p className="flex items-center"><span className="font-medium text-green-600 mr-2">Present: </span>
          {presentStudents} students
        </p>
        <p className="flex items-center"><span className="font-medium text-red-600 mr-2">Absent: </span>
          {absentStudents} students
        </p>
      </div>
    </div>
  );
};

export default LessonGroupDetails;
