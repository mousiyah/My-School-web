import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lessonApi } from 'api/routes';

import Loading from 'components/common/Loading';
import LessonEditClasswork from './LessonEditClasswork';
import LessonEditHomework from './LessonEditHomework';
import LessonData from './LessonData';

interface Lesson {
  id: number;
  date: string;
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
  homework: Homework;
  classwork: Classwork;
}

interface Classwork {
  id: number;
  name: string;
  description: string;
}

interface Homework {
  id: number;
  name: string;
  description: string;
  isSubmittable: boolean;
}

const LessonEdit: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson>();
  const [homework, setHomework] = useState<Homework>();
  const [classwork, setClasswork] = useState<Classwork>();

  const fetchLesson = async () => {
    try {
      const lessonData = await lessonApi.getLesson(lessonId);
  
      // Create empty homework if not present
      const lessonHomework = lessonData.homework ? lessonData.homework : 
      { id: null, name: "", description: "", isSubmittable: false };

      // Create empty classwork if not present
      const lessonClasswork = lessonData.classwork ? lessonData.classwork : 
      { id: null, name: "", description: "" };
  
      setLesson(lessonData);
      setHomework(lessonHomework);
      setClasswork(lessonClasswork);
      
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const saveLesson = async () => {
    try {

      const updatedHomework = homework && homework.name != "" ? homework : null;
      const updatedClasswork = classwork && classwork.name != "" ? classwork : null;
  
      // Update lesson with new homework and classwork
      const updatedLesson: Lesson = {
        ...lesson,
        homework: updatedHomework,
        classwork: updatedClasswork
      };

      const response = await lessonApi.saveLesson(updatedLesson);
      console.log(response)
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  return (
    <div className="w-full h-full p-10">
      
      {/* Lesson details */}
      {lesson ? (
        <LessonData lesson={lesson} />
      ) : (
        <Loading/>
      )}

      {/* Classwork section */}
      {classwork ? (
        <LessonEditClasswork classwork={classwork} setClasswork={setClasswork} />
      ) : (
        <Loading/>
      )}

      {/* Homework section */}
      {homework ? (
        <LessonEditHomework homework={homework} setHomework={setHomework}/>
      ) : (
        <Loading/>
      )}

      {/* Button to save changes */}
      <div className="mt-5">
        <button onClick={saveLesson} className="btn btn-primary text-white">Save changes</button>
      </div>

    </div>
  );
};

export default LessonEdit;
