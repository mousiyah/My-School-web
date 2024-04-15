import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputWithIcon from 'components/common/InputWithIcon';

import { PiNotebook } from "react-icons/pi";

const LessonEditHomework: React.FC = () => {
  const [homeworkName, setHomeworkName] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [homeworkSubmittable, setHomeworkSubmittable] = useState(false);
  const [isHomeworkSectionOpen, setHomeworkSectionOpen] = useState(true);

  const handleHomeworkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    console.log(selectedFile);
  };

  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-gray-100 mt-5">
        <input type="checkbox"
            checked={isHomeworkSectionOpen}
            onChange={(e) => setHomeworkSectionOpen(!isHomeworkSectionOpen)}/>
        <div className="collapse-title text-xl font-medium">Homework</div>
        <div className="collapse-content"> 

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
  );
};

export default LessonEditHomework;
