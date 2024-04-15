import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lessonApi } from 'api/routes';

import LessonEditClasswork from './LessonEditClasswork';
import LessonEditHomework from './LessonEditHomework';

interface Lesson {
  date: Date;
  order: number;
  subject: {
    id: number,
    name: string
  };
  group: {
    id: number,
    name: string
  };
  room: string;
  homework: {
    id: number,
    name: string,
    description: string,
    isSubmittable: boolean
  };
  classwork: {
    id: number,
    name: string,
    description: string,
  };
}

const LessonEdit: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await lessonApi.getLesson(lessonId);
        setLesson(lessonData);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchLesson();
  }, [lessonId]);

  return (
    <div className="w-full h-full p-10">
      
      {/* Lesson details */}
      <p>Date</p>
      <p>Time: </p>
      <p>Room: </p>
      <p>Group: </p>
      <p>Subject name</p>

      {/* Classwork section */}
      <LessonEditClasswork/>


      {/* Homework section */}
      <LessonEditHomework/>

      {/* Button to save changes */}
      <div className="mt-5">
        <button className="btn btn-primary text-white">Save changes</button>
      </div>

    </div>
  );
};

export default LessonEdit;
