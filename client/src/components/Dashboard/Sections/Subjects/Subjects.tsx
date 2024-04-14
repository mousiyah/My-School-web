import React, { useState, useEffect } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { subject as subjectApi} from 'api/routes';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Subjects: React.FC = () => {
  const [subjectsList, setSubjectsList] = useState<{ id: number; name: string; teacher: string }[]>([]);

  useEffect(() => {
    fetchSubjectList();
  }, []);

  const fetchSubjectList = async () => {
    const subjects = await subjectApi.getMyGroupSubjects();
    setSubjectsList(subjects);
  };

  // Function to generate a random pastel color code
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue
    const saturation = Math.floor(Math.random() * 21) + 30; // Saturation between 80 and 100
    const lightness = Math.floor(Math.random() * 21) + 50; // Lightness between 70 and 90
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Calculate the initial layout for each subject item
  const generateLayout = () => {
    return subjectsList.map((subject, index) => ({
      i: String(index),
      x: (index % 3), // Distribute items in 3 columns
      y: Math.floor(index / 3), // Place items in rows
      w: 1, // Each item occupies 3 columns
      h: 1.5, // Each item is 2 units tall
    }));
  };

  return (
    <div className="flex w-full items-center py-4">
      <ResponsiveReactGridLayout
        className="layout w-full h-full"
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 450}}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        layouts={{ lg: generateLayout(), md: generateLayout(), sm: generateLayout() }}
        isDraggable={true}
        isResizable={false}
      >
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
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Subjects;
