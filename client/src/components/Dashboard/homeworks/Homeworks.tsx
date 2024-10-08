import React, { useState, useEffect } from 'react';
import { homeworkApi, subjectApi } from 'api/routes';
import Loading from 'components/common/Loading';

interface homework { id: number; name: string; subject: string; due: Date; completed: boolean};

const Homeworks: React.FC = () => {
  const [subjectsList, setSubjectsList] = useState<{ id: number; name: string }[]>([]);
  const [homeworks, setHomeworks] = useState<homework[]>([]);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    fetchSubjectList();
    fetchHomeworks();
  }, []);

  const fetchSubjectList = async () => {
    const subjects = await subjectApi.getMyGroupSubjects();
    setSubjectsList(subjects);
  };

  const fetchHomeworks = async () => {
    const homeworks = await homeworkApi.getUpcomingHomeworks();
    console.log(homeworks);
    setHomeworks(homeworks);
  };

  const handleCheckboxChange = (index: number) => {
    // const updatedHomeworks = [...homeworks];
    // updatedHomeworks[index].completed = !updatedHomeworks[index].completed;
    // setHomeworks(updatedHomeworks);
  };

  return (
    <div className="flex w-full h-full flex-col items-center py-10 px-10">

      <select defaultValue={0} className="select select-bordered border w-full max-w-xs">
        <option>All subjects</option>
        {subjectsList.map((subject, index) => (
          <option key={index} value={subject.id}>{subject.name}</option>
        ))}
      </select>

      <div className="w-full h-full mt-4 md:px-10">

        <span className="ml-2" onClick={() => setShowUpcoming(!showUpcoming)}>Upcoming homeworks: </span>

        {showUpcoming && (
          <div className="w-full h-full">
           
            {homeworks.length != 0 ? (homeworks.map((homework, index) => (
              <div key={index}  className="card p-4 hover:shadow-lg cursor-pointer mt-4 flex-row">
                <input
                  type="checkbox"
                  checked={homework.completed}
                  onChange={() => handleCheckboxChange(index)}
                  className="mr-2"
                />
                <div className="ml-2">
                  <span className="text-base font-medium">{homework.name}</span><br></br>
                  <span className="text-xs text-gray-500">{homework.subject}</span><br></br>
                  <span className="text-xs text-gray-500">Due by: {homework.due.toString()}</span>
                </div>
              </div>
            ))) : <Loading/> }
          </div>

        )}

      </div>

    </div>
  );
};

export default Homeworks;
