import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LessonStudents: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  return (
    <div className="w-full h-full">
      s
    </div>
  );
};

export default LessonStudents;
