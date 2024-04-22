import { homeworkApi, lessonApi } from "api/routes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonData from "./LessonData";
import Loading from "components/common/Loading";
import { FileSelector } from "components/common/FileSelector";

interface Lesson {
  id: string;
  date: string;
  order: number;
  subject: {
    id: number;
    name: string;
  };
  group: {
    id: number;
    name: string;
  };
  room: string;
  homework: Homework;
  classwork: Classwork;
}

interface Classwork {
  id: string;
  name: string;
  description: string;
}

interface Homework {
  id: string;
  name: string;
  description: string;
  isSubmittable: boolean;
}

const LessonDetails: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson>();
  const [homework, setHomework] = useState<Homework | null>(null);
  const [classwork, setClasswork] = useState<Classwork | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const lessonData = await lessonApi.getLesson(lessonId);

      // Create empty homework if not present
      const lessonHomework = lessonData.homework
        ? lessonData.homework
        : { id: null, name: "", description: "", isSubmittable: false };

      // Create empty classwork if not present
      const lessonClasswork = lessonData.classwork
        ? lessonData.classwork
        : { id: null, name: "", description: "" };

      setLesson(lessonData);
      setHomework(lessonData.homework || null);
      setClasswork(lessonData.classwork || null);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleHomeworkFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleHomeworkSubmission = async () => {
    try {
      if (!selectedFile) {
        return;
      }

      const response = await homeworkApi.submitHomework(
        homework.id,
        selectedFile
      );

      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal.showModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full p-10">
      {/* Lesson details */}
      {lesson ? <LessonData lesson={lesson} /> : <Loading />}

      {/* Homework details */}
      {homework && (
        <div className="border border-gray-300 rounded p-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Homework</h2>
          <p>
            <span className="font-medium">{homework.name}</span>
          </p>

          {homework.isSubmittable && (
            <div>
              <FileSelector
                label="Upload your homework submission"
                onChange={handleHomeworkFileChange}
              />
              <button
                className="btn btn-md btn-success text-white mt-4"
                onClick={handleHomeworkSubmission}
              >
                Submit Homework
              </button>
            </div>
          )}

          <br></br>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {homework.description}
          </p>
        </div>
      )}

      {/* Classwork details */}
      {classwork && (
        <div className="border border-gray-300 rounded p-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Classwork</h2>
          <p>
            <span className="font-bold"> {classwork.name}</span>
          </p>
          <br></br>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {classwork.description}
          </p>
        </div>
      )}

      {/* Successfull modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success</h3>
          <p className="py-4">Homework Submitted!</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LessonDetails;
