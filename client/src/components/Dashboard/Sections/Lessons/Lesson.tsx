import React from 'react';
import { useParams } from 'react-router-dom';

const Lesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>(); // Extract lessonId from URL params

  return (
    <div>
      Lesson ID: {lessonId}
    </div>
  );
};

export default Lesson;
