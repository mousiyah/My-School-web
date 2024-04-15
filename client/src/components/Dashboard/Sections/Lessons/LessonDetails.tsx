import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LessonDetails: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  return (
    <div className="w-full h-full">
      details
    </div>
  );
};

export default LessonDetails;
