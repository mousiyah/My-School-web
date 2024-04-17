import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LessonGroupDetails from './LessonGroupDetails';
import Loading from 'components/common/Loading';
import { lessonApi } from 'api/routes';

interface LessonGroup {
  group: {
    id: number,
    name: string
  };
  students: Student[];
}

interface Student {
  id: number;
  name: number;
  present: boolean;
  hwSubmission: {
    id: number,
  }
  hwMark: number;
  cwMark: number;
  lessonMark: number;
}

const LessonStudents: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lessonGroup, setLessonGroup] = useState<LessonGroup>(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const lessonData = await lessonApi.getLessonGroupData(lessonId);
        setLessonGroup(lessonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessonData();
  }, [lessonId]);

  if (!lessonGroup) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full p-10">

      {/* Display lesson group details */}
      <LessonGroupDetails
        groupName={lessonGroup.group.name}
        presentStudents={26}
        totalStudents={18}/>


      {/* Display students table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Presence</th>
              <th>Homework submission</th>
              <th>Homework mark</th>
              <th>Classwork mark</th>
              <th>Lesson mark</th>
            </tr>
          </thead>


          <tbody>
            {/* Map over each student and render a row */}
            {lessonGroup.students.map((student: any) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>

                {/* Render presence status based on student's attendance */}
                <td>
                  <button className={`mb-1 ml-1 ${student.present ? 'bg-green-600' : 'bg-red-600'} w-fit px-1 rounded`}>
                    <span className="text-white">{student.present ? 'present' : 'absent'}</span>
                  </button>
                </td>

                {/* Render homework submission status */}
                <td>
                  <a href="#" className="text-primary underline">View Submission</a>
                </td>

                {/* Render input fields for homework mark, classwork mark, and lesson mark */}
                <td>
                  <input type="text" className="input w-8 text-center input-bordered input-xs w-full max-w-xs" />
                </td>

                <td>
                  <input type="text" className="input w-8 text-center input-bordered input-xs w-full max-w-xs" />
                </td>

                <td>
                  <input type="text" className="input w-8 text-center input-bordered input-xs w-full max-w-xs" />
                </td>

              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonStudents;
