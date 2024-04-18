import React, { useState } from "react";
import { useParams } from "react-router-dom";

const LessonMyWork: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  return <div className="w-full h-full">my work</div>;
};

export default LessonMyWork;
