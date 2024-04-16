import React, { useState } from 'react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  charCount: number;
}

export const TextArea: React.FC<TextareaProps> = ({ label, value, onChange, placeholder, charCount }) => {
  const [inputLength, setInputLength] = useState(value.length);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputLength(newValue.length);
    if (newValue.length < charCount) {
      onChange(newValue);
    }
  };

  const isOverLimit = inputLength >= charCount;

  return (
    <label className="form-control mt-5">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        value={value}
        onChange={handleTextareaChange}
        placeholder={placeholder}
        className={`textarea textarea-bordered h-96 ${isOverLimit ? 'border-red-500' : ''}`}
      ></textarea>
      <div className="label">
        <span className={`label-text-alt ${isOverLimit ? 'text-red-500' : ''}`}>{inputLength}/{charCount} characters</span>
      </div>
    </label>
  );
};
