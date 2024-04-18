import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { subjectApi as subjectApi } from "api/routes";
import Loading from "components/common/Loading";
import { useNavigate } from "hooks/useNavigate";
import { IoMdMove } from "react-icons/io";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Subject {
  id: string;
  name: string;
  teacher: string;
}

const Subjects: React.FC = () => {
  const [subjectsList, setSubjectsList] = useState<Subject[]>([]);

  useEffect(() => {
    fetchSubjectList();
  }, []);

  const { navigateToSubject } = useNavigate();

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
      x: index % 3, // Distribute items in 3 columns
      y: Math.floor(index / 3), // Place items in rows
      w: 1, // Each item occupies 3 columns
      h: 1.5, // Each item is 2 units tall
    }));
  };

  // Function to handle card click
  const handleCardClick = (subjectId: string) => {
    navigateToSubject(subjectId);
  };

  // Function to handle click on drag handler
  const handleDragHandleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent click event propagation to avoid triggering the card click event
    event.stopPropagation();
  };

  return (
    <div className="flex w-full items-center py-10 px-10">
      <ResponsiveReactGridLayout
        className="layout w-full h-full"
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 450 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        layouts={{
          lg: generateLayout(),
          md: generateLayout(),
          sm: generateLayout(),
        }}
        isDraggable={true}
        isResizable={false}
        draggableHandle=".drag-handle"
      >
        {subjectsList.length !== 0 ? (
          subjectsList.map((subject, index) => (
            <div
              key={index}
              className="card hover:shadow-lg mb-6 sm:m-0"
              onClick={() => handleCardClick(subject.id)}
            >
              <div
                className="flex justify-between card-content p-4 rounded-t-md"
                style={{ backgroundColor: getRandomPastelColor() }}
              >
                <div>
                  <span className="text-base font-medium text-white">
                    {subject.name}
                  </span>
                  <br />
                  <span className="text-xs text-white">
                    Teacher: {subject.teacher}
                  </span>
                  <br />
                </div>

                <div
                  className="drag-handle w-fit text-white cursor-move"
                  onClick={handleDragHandleClick}
                >
                  <IoMdMove size={24} />
                </div>
              </div>

              <div className="p-4">
                <span className="text-xs">Attendance: 83%</span>
                <br />
                <span className="text-xs">Average grade: 58%</span>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Subjects;
