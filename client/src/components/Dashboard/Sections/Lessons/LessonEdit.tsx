import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputWithIcon from 'components/common/InputWithIcon';

import { PiNotebook } from "react-icons/pi";

const LessonEdit: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const [homeworkName, setHomeworkName] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [homeworkSubmittable, setHomeworkSubmittable] = useState(false);
  const [classworkName, setClassworkName] = useState("");
  const [classworkDescription, setClassworkDescription] = useState("");

  const [isClassworkSectionOpen, setClassworkSectionOpen] = useState(true);
  const [isHomeworkSectionOpen, setHomeworkSectionOpen] = useState(true);

  const handleHomeworkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    console.log(selectedFile);
  };

  const handleClassworkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    console.log(selectedFile);
  };

  return (
    <div className="w-full h-full p-10">
      {/* Lesson details */}
      <p>Date</p>
      <p>Time: </p>
      <p>Room: </p>
      <p>Group: </p>
      <p>Subject name</p>

      {/* Classwork section */}
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-gray-100 mt-5">
        <input type="checkbox"
               checked={isClassworkSectionOpen}
               onChange={(e) => setClassworkSectionOpen(!isClassworkSectionOpen)}/>
        <div className="collapse-title text-xl font-medium">Classwork</div>
        <div className="collapse-content"> 

        {/* Classwork name */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Classwork name</span>
            </div>
            <input 
              value={classworkName}
              onChange={(e) => setClassworkName(e.target.value)}
              type="text" 
              placeholder="Classwork name" 
              className="input input-md input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">6 words</span>
            </div>
          </label>

          {/* Classwork description */}
          <label className="form-control mt-5">
            <div className="label">
              <span className="label-text">Classwork description</span>
            </div>
            <textarea 
              value={classworkDescription}
              onChange={(e) => setClassworkDescription(e.target.value)}
              placeholder="Classwork Description"
              className="textarea textarea-bordered h-24"
            ></textarea>
            <div className="label">
              <span className="label-text-alt">500 words</span>
            </div>
          </label>

          {/* Upload classwork file */}
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text">Upload a file for classwork</span>
            </div>
            <input 
              onChange={handleClassworkFileChange}
              type="file"
              className="file-input file-input-md file-input-bordered w-full max-w-xs" 
            />
          </label>

        </div>
      </div>


      {/* Homework section */}
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-gray-100 mt-5">
        <input type="checkbox"
               checked={isHomeworkSectionOpen}
               onChange={(e) => setHomeworkSectionOpen(!isHomeworkSectionOpen)}/>
        <div className="collapse-title text-xl font-medium">Homework</div>
        <div className="collapse-content"> 

          {/* Homework name */}
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text">Homework name</span>
            </div>
            <input 
              value={homeworkName}
              onChange={(e) => setHomeworkName(e.target.value)}
              type="text" 
              placeholder="Homework name" 
              className="input input-md input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">6 words</span>
            </div>
          </label>

          {/* Homework description */}
          <label className="form-control mt-5">
            <div className="label">
              <span className="label-text">Homework description</span>
            </div>
            <textarea 
              value={homeworkDescription}
              onChange={(e) => setHomeworkDescription(e.target.value)}
              placeholder="Homework Description"
              className="textarea textarea-bordered h-24"
            ></textarea>
            <div className="label">
              <span className="label-text-alt">500 words</span>
            </div>
          </label>

          {/* Upload homework file */}
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text">Upload a file for homework</span>
            </div>
            <input 
              onChange={handleHomeworkFileChange}
              type="file"
              className="file-input file-input-md file-input-bordered w-full max-w-xs" 
            />
          </label>

          {/* Homework submittable checkbox */}
          <div className="form-control w-fit mt-5">
            <label className="label cursor-pointer">
              <p className="label-text mr-2">Is homework submittable?</p> 
              <input 
                checked={homeworkSubmittable}
                onChange={(e) => setHomeworkSubmittable(e.target.checked)}
                type="checkbox"
                className="toggle"
              />
            </label>
          </div>

        </div>
      </div>

      {/* Button to save changes */}
      <div className="mt-5">
        <button className="btn btn-primary text-white">Save changes</button>
      </div>

    </div>
  );
};

export default LessonEdit;
