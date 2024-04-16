import React, { useState } from 'react';

import { HOMEWORK_NAME_CHAR_COUNT } from 'constants/numbers';
import { HOMEWORK_DESCRIPTION_CHAR_COUNT } from 'constants/numbers';

import { InputBox } from 'components/common/InputBoxCharCount';
import { TextArea } from 'components/common/TextAreaCharCount';
import { FileSelector } from 'components/common/FileSelector';

interface Homework {
    id: number;
    name: string;
    description: string;
    isSubmittable: boolean;
}

interface Props {
    homework: Homework;
    setHomework: React.Dispatch<React.SetStateAction<Homework>>;
}

const LessonEditHomework: React.FC<Props> = ({ homework, setHomework }) => {
    const [isHomeworkSectionOpen, setHomeworkSectionOpen] = useState(true);

    return (
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 mt-5">
            <input type="checkbox"
                checked={isHomeworkSectionOpen}
                onChange={() => setHomeworkSectionOpen(!isHomeworkSectionOpen)} />
            <div className="collapse-title text-xl font-medium">Homework</div>
            <div className="collapse-content">

                <InputBox
                    label="Homework name"
                    value={homework.name}
                    onChange={(name) => setHomework(prevHomework => ({ ...prevHomework, name }))}
                    placeholder="Homework name"
                    charCount={HOMEWORK_NAME_CHAR_COUNT}
                />

                <TextArea
                    label="Homework description"
                    value={homework.description}
                    onChange={(description) => setHomework(prevHomework => ({ ...prevHomework, description }))}
                    placeholder="Homework Description"
                    charCount={HOMEWORK_DESCRIPTION_CHAR_COUNT}
                />

                <FileSelector
                    label="Upload a file for homework"
                    onChange={(file) => console.log(file)}
                />

                <div className="form-control w-fit mt-5">
                    <label className="label cursor-pointer">
                        <p className="label-text mr-2">Is homework submittable?</p>
                        <input
                            checked={homework.isSubmittable}
                            onChange={(e) => setHomework(prevHomework => ({ ...prevHomework, isSubmittable: e.target.checked }))}
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
