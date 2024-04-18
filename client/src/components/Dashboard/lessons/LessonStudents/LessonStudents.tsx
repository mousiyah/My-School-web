import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonGroupDetails from "./LessonGroupDetails";
import Loading from "components/common/Loading";
import { lessonApi } from "api/routes";

interface LessonGroup {
  group: {
    id: number;
    name: string;
  };
  hasHomework: boolean;
  hasClasswork: boolean;
  students: Student[];
}

interface Student {
  id: number;
  name: number;
  attended: boolean;
  hwSubmission: {
    id: number;
  };
  hwMark: number;
  cwMark: number;
  lessonMark: number;
}

const LessonStudents: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lessonGroup, setLessonGroup] = useState<LessonGroup>();

  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [absentStudents, setAbsentStudents] = useState<number>(0);

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
  }, []);

  useEffect(() => {
    if (lessonGroup) {
      calculateStudents();
    }
  }, [lessonGroup]);

  const calculateStudents = () => {
    let total = 0;
    let absent = 0;
    lessonGroup.students.forEach((student: Student) => {
      total++;
      if (!student.attended) {
        absent++;
      }
    });
    setTotalStudents(total);
    setAbsentStudents(absent);
  };

  const togglePresence = (studentId: number) => {
    setLessonGroup((prevLessonGroup) => {
      const updatedStudents = prevLessonGroup.students.map((student) => {
        if (student.id === studentId) {
          return { ...student, attended: !student.attended };
        }
        return student;
      });
      return { ...prevLessonGroup, students: updatedStudents };
    });
  };

  if (!lessonGroup) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full p-10">
      {/* Display lesson group details */}
      <LessonGroupDetails
        groupName={lessonGroup.group.name}
        totalStudents={totalStudents}
        absentStudents={absentStudents}
      />

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
            {lessonGroup.students.map((student: Student, index: number) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{student.name}</td>

                {/* Render presence status based on student's attendance */}

                <td>
                  <button
                    className={`mb-1 ml-1 ${
                      student.attended
                        ? "bg-white text-inherit border border-gray-300 hover:bg-gray-100"
                        : "bg-red-600 text-white hover:bg-red-700"
                    } w-fit px-1 rounded`}
                    onClick={() => togglePresence(student.id)}
                  >
                    <span className="">
                      {student.attended ? "present" : "absent"}
                    </span>
                  </button>
                </td>

                {/* Render homework submission */}
                <td>
                  <a href="#" className="text-primary underline">
                    View Submission
                  </a>
                </td>

                {/* Render input fields for homework mark, classwork mark, and lesson mark */}
                <td>
                  <input
                    type="text"
                    value={student.hwMark}
                    className="input w-8 text-center input-bordered input-xs w-full max-w-xs"
                    disabled={!lessonGroup.hasHomework}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={student.cwMark}
                    className="input w-8 text-center input-bordered input-xs w-full max-w-xs"
                    disabled={!lessonGroup.hasClasswork}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={student.lessonMark}
                    className="input w-8 text-center input-bordered input-xs w-full max-w-xs"
                  />
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
