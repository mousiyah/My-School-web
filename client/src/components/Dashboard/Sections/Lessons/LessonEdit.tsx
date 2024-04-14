import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LessonEdit: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const [homeworkName, setHomeworkName] = useState("");
  const [classworkkName, setClassworkkName] = useState("");

  return (
    <div className="w-full h-full p-10">
      <p>Date</p>
      <p>Time: </p>
      <p>Room: </p>
      <p>Group: </p>
      <p>Subject name</p>
      
    </div>
  );
};

export default LessonEdit;
