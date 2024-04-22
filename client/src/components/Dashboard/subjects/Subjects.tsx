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
  averageAttendance: number;
  averageMark: number;
}

const Subjects: React.FC = () => {
  const [subjectsList, setSubjectsList] = useState<Subject[]>(null);

  useEffect(() => {
    fetchSubjectList();
  }, []);

  const { navigateToSubject } = useNavigate();

  const fetchSubjectList = async () => {
    const subjects = await subjectApi.getMyGroupSubjects();
    setSubjectsList(subjects);
  };

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 21) + 30;
    const lightness = Math.floor(Math.random() * 21) + 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const generateLayout = () => {
    return subjectsList.map((subject, index) => ({
      i: String(index),
      x: index % 3,
      y: Math.floor(index / 3),
      w: 1,
      h: 1.5,
    }));
  };

  const handleCardClick = (subjectId: string) => {
    navigateToSubject(subjectId);
  };

  const handleDragHandleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  if (!subjectsList) {
    return <Loading />;
  }

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
              onClick={() => handleCardClick(subject.name)}
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
                <span className="text-xs">
                  Average attendance: {subject.averageAttendance}%
                </span>
                <br />
                <span className="text-xs">
                  Average mark: {subject.averageMark}
                </span>
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
