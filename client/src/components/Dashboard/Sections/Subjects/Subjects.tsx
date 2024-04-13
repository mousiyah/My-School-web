import React, { useState, useEffect } from 'react';
import { studentApi } from 'api/studentApi';

const Subjects: React.FC = () => {
  const [subjectsList, setSubjectsList] = useState<{ id: number; name: string; teacher: string }[]>([]);

  useEffect(() => {
    fetchSubjectList();
  }, []);

  const fetchSubjectList = async () => {
    const subjects = await studentApi.getGroupSubjects();
    setSubjectsList(subjects);
  };

  // Function to generate a random pastel color code
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue
    const saturation = Math.floor(Math.random() * 21) + 30; // Saturation between 80 and 100
    const lightness = Math.floor(Math.random() * 21) + 50; // Lightness between 70 and 90
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className="flex w-full flex-col items-center py-4">
      <div className="grid sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-8  w-full lg:px-10 py-6">
        {subjectsList.map((subject, index) => (
          <div key={index} className="card hover:shadow-lg cursor-pointer mb-6 sm:m-0">
            <div style={{ backgroundColor: getRandomPastelColor() }} className="p-4 rounded-t-md">
              <span className="text-base font-medium text-white">{subject.name}</span>
              <br />
              <span className="text-xs text-white">Teacher: {subject.teacher}</span>
              <br />
            </div>
            <div className="p-4">
              <span className="text-xs">Attendance: 83%</span>
              <br />
              <span className="text-xs">Average grade: 58%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
