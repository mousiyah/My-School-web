import React, { useState } from "react";

import { USER_ROLES } from "constants/roles";
import { useSelector } from "react-redux";
import { RootState } from "store";

import { useNavigate } from "hooks/useNavigate";

import { Tooltip } from "react-tooltip";
import { LESSON_TIME_MAP } from "constants/time";

import { PiNotebook } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { homeworkApi, lessonApi } from "api/routes";

import MarkButton from "./MarkButton";

interface DiaryEntryProps {
  entry: Entry;
}

interface Entry {
  lessonId: string;
  order: number;
  subject: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  teacher: string;
  room: string;
  homework: {
    id: string;
    name: string;
    completed: boolean;
    mark: Mark;
  };
  classwork: {
    id: string;
    name: string;
    mark: Mark;
  };
  mark: Mark;
  attended: boolean;
}

interface Mark {
  id: number;
  value: number;
}

const DiaryDayEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  const {
    lessonId,
    order,
    subject,
    group,
    teacher,
    room,
    homework,
    classwork,
    mark,
    attended,
  } = entry;

  const userRole = useSelector((state: RootState) => state.user.role);

  const [isHomeworkChecked, setIsHomeworkChecked] = useState(
    homework ? homework.completed : null
  );

  const homeworkCheckboxToggle = async () => {
    setIsHomeworkChecked(!isHomeworkChecked);
    await homeworkApi.setHomeworkCompleted(homework.id, !isHomeworkChecked);
  };

  const { navigateToLessonStudents, navigateToLessonDetails } = useNavigate();

  const onEditButtonClick = async () => {
    navigateToLessonStudents(lessonId);
  };

  return (
    <div className={`px-2 py-1`}>
      <div className="flex">
        <div className="flex-grow p-1">
          <span className="text-xs font-semibold">{order}. </span>
          <span
            onClick={() => navigateToLessonDetails(lessonId)}
            className="text-xs font-semibold cursor-pointer hover:underline"
          >
            {subject.name}
          </span>
          <div className="text-xxs text-gray-500">
            <span>{LESSON_TIME_MAP[order]}</span> <br />
            {/* Teacher/Group */}
            {userRole == USER_ROLES.STUDENT ? (
              <span>{teacher}, </span>
            ) : userRole == USER_ROLES.TEACHER ? (
              <span>{group.name}, </span>
            ) : (
              ""
            )}
            {/* Room */}
            <span>room {room}</span>
          </div>

          {/* Classwork */}
          {classwork ? (
            <div className="flex items-center mt-0.5 mb-0.5">
              <PiNotebook size={14} className="text-blue-500" />
              <span className="text-xs ml-1">{classwork.name}</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex w-fit h-min mt-1 text-xs">
          {/* Marks */}
          {userRole === USER_ROLES.STUDENT && (
            <>
              {homework && homework.mark && (
                <MarkButton
                  mark={homework.mark}
                  hint={`Mark for ${homework.name}`}
                />
              )}
              {classwork && classwork.mark && (
                <MarkButton
                  mark={classwork.mark}
                  hint={`Mark for ${classwork.name}`}
                />
              )}
              {mark && <MarkButton mark={mark} hint="Mark in lesson" />}
            </>
          )}

          {/* Lesson action buttons */}
          {userRole == USER_ROLES.TEACHER ? (
            <div>
              <Tooltip id="tooltip" />
              <button
                onClick={onEditButtonClick}
                className={`px-1.5 py-0.5 mr-1 max-w-min max-h-min h-fit rounded flex 
                        items-center justify-center font-semibold hover:text-accent `}
                data-tooltip-id="tooltip"
                data-tooltip-content="Edit this lesson"
                data-tooltip-place="top"
              >
                <CiEdit size={24} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Attendance */}
      {userRole == USER_ROLES.STUDENT && !attended ? (
        <div className="mb-1 ml-1 bg-red-600 w-fit px-1 rounded">
          <span className="text-white">absent</span>
        </div>
      ) : (
        ""
      )}

      {/* Homework */}
      {homework && (
        <div className="bg-indigo-100 text-black py-0.5 px-1 rounded flex items-baseline cursor-pointer">
          {userRole === USER_ROLES.STUDENT && (
            <div className="flex cursor-pointer">
              <input
                type="checkbox"
                id={`checkbox-${lessonId}`}
                checked={isHomeworkChecked}
                onChange={homeworkCheckboxToggle}
              />
              <label
                htmlFor={`checkbox-${lessonId}`}
                className={`text-xs whitespace-normal ml-2 cursor-pointer ${
                  isHomeworkChecked ? "line-through" : ""
                }`}
              >
                {homework.name}
              </label>
            </div>
          )}

          {userRole === USER_ROLES.TEACHER && (
            <label className="text-xs whitespace-normal ml-2 cursor-pointer">
              {homework.name}
            </label>
          )}
        </div>
      )}

      <hr className="border-gray-300 border-t-1 p-0 m-0 mt-2 w-full"></hr>
    </div>
  );
};

export default DiaryDayEntry;
