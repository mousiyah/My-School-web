import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputWithIcon from 'components/common/InputWithIcon';
import { PiNotebook } from "react-icons/pi";

const LessonEditClasswork: React.FC = () => {
  const [classworkName, setClassworkName] = useState("");
  const [classworkDescription, setClassworkDescription] = useState("");
  const [isClassworkSectionOpen, setClassworkSectionOpen] = useState(true);

  const handleClassworkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    console.log(selectedFile);
  };

  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-gray-100 mt-5">
        <input type="checkbox"
               checked={isClassworkSectionOpen}
               onChange={(e) => setClassworkSectionOpen(!isClassworkSectionOpen)}/>
        <div className="collapse-title text-xl font-medium">Classwork</div>
        <div className="collapse-content"> 

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
  );
};

export default LessonEditClasswork;
