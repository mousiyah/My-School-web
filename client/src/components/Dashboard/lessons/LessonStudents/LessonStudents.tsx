import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonGroupDetails from "./LessonGroupDetails";
import Loading from "components/common/Loading";
import { homeworkApi, lessonApi } from "api/routes";
import FileDisplay from "components/common/FileDisplay";
import MarkInput from "./MarkInput";

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
    filename: string;
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
    fetchLessonData();
  }, []);

  const fetchLessonData = async () => {
    try {
      const lessonData = await lessonApi.getLessonGroupData(lessonId);
      setLessonGroup(lessonData);
    } catch (error) {
      console.error(error);
    }
  };

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

  const togglePresence = async (studentId: number, attended: boolean) => {
    await lessonApi.setAttended(studentId, lessonId, attended);
    await fetchLessonData();
  };

  if (!lessonGroup) {
    return <Loading />;
  }

  const onHomeworkMarkSelect = async (studentId: number, markValue: number) => {
    await lessonApi.setLessonHomeworkMark(studentId, lessonId, markValue);
    await fetchLessonData();
  };

  const onClassworkMarkSelect = async (
    studentId: number,
    markValue: number
  ) => {
    await lessonApi.setLessonClassworkMark(studentId, lessonId, markValue);
    await fetchLessonData();
  };

  const onLessonMarkSelect = async (studentId: number, markValue: number) => {
    await lessonApi.setLessonMark(studentId, lessonId, markValue);
    await fetchLessonData();
  };

  const viewSubmission = async (student: Student) => {
    // const filepath = await homeworkApi.getStudentHomeworkSubmissionFile(
    //   studentId,
    //   lessonId
    // );
    // setSelectedFilePath(filepath);

    // Open modal
    const modal = document.getElementById(
      student.id.toLocaleString()
    ) as HTMLDialogElement;
    modal.showModal();
  };

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
                    onClick={() =>
                      togglePresence(student.id, !student.attended)
                    }
                  >
                    <span className="">
                      {student.attended ? "present" : "absent"}
                    </span>
                  </button>
                </td>

                {/* Render homework submission */}
                {student.hwSubmission.filename ? (
                  <td>
                    <a
                      onClick={() => viewSubmission(student)}
                      className="text-primary underline"
                    >
                      View Submission
                    </a>
                  </td>
                ) : (
                  <td>No submission</td>
                )}

                {/* Render input fields for homework mark, classwork mark, and lesson mark */}
                <td>
                  <MarkInput
                    value={student.hwMark}
                    disabled={!lessonGroup.hasHomework}
                    onSelect={(value) =>
                      onHomeworkMarkSelect(student.id, value)
                    }
                  />
                </td>

                <td>
                  <MarkInput
                    value={student.cwMark}
                    disabled={!lessonGroup.hasClasswork}
                    onSelect={(value) =>
                      onClassworkMarkSelect(student.id, value)
                    }
                  />
                </td>

                <td>
                  <MarkInput
                    value={student.lessonMark}
                    disabled={false}
                    onSelect={(value) => onLessonMarkSelect(student.id, value)}
                  />
                </td>

                {/* Student homework submission modal */}
                <dialog id={student.id.toLocaleString()} className="modal">
                  <div className="bg-white p-10 w-2/3 card">
                    <h3 className="font-bold text-lg mb-5">
                      Homework submission
                    </h3>
                    <FileDisplay filePath={student.hwSubmission.filename} />
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonStudents;
