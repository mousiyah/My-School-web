import React, { useState } from 'react';

import { CLASSWORK_NAME_CHAR_COUNT } from 'constants/numbers';
import { CLASSWORK_DESCRIPTION_CHAR_COUNT } from 'constants/numbers';

import { InputBox } from 'components/common/InputBoxCharCount';
import { TextArea } from 'components/common/TextAreaCharCount';
import { FileSelector } from 'components/common/FileSelector';

interface Classwork {
  id: number;
  name: string;
  description: string;
}

interface Props {
  classwork: Classwork;
  setClasswork: React.Dispatch<React.SetStateAction<Classwork>>;
}

const LessonEditClasswork: React.FC<Props> = ({ classwork, setClasswork }) => {
  const [isClassworkSectionOpen, setClassworkSectionOpen] = useState(true);

  const setClassworkName = (name: string) => {
    setClasswork(prevClasswork => ({ ...prevClasswork, name }));
  }

  const setClassworkDescription = (description: string) => {
    setClasswork(prevClasswork => ({ ...prevClasswork, description }));
  }

  const handleClassworkFileChange = (file: File | null) => {
    console.log(file);
  };

  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 mt-5">
      <input
        type="checkbox"
        checked={isClassworkSectionOpen}
        onChange={(e) => setClassworkSectionOpen(!isClassworkSectionOpen)}
      />
      <div className="collapse-title text-xl font-medium">Classwork</div>
      <div className="collapse-content">

        <InputBox
          label="Classwork name"
          value={classwork.name}
          onChange={setClassworkName}
          placeholder="Classwork name"
          charCount={CLASSWORK_NAME_CHAR_COUNT}
        />

        <TextArea
          label="Classwork description"
          value={classwork.description}
          onChange={setClassworkDescription}
          placeholder="Classwork Description"
          charCount={CLASSWORK_DESCRIPTION_CHAR_COUNT}
        />

        <FileSelector
          label="Upload a file for classwork"
          onChange={handleClassworkFileChange}
        />

      </div>
    </div>
  );
};

export default LessonEditClasswork;
