import React, { useState } from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  charCount: number;
}

export const InputBox: React.FC<InputProps> = ({ label, value, onChange, placeholder, charCount }) => {
  const [inputLength, setInputLength] = useState(value.length);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputLength(newValue.length);
    if (newValue.length < charCount) {
      onChange(newValue);
    }
  };

  const isOverLimit = inputLength >= charCount;

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        value={value}
        onChange={handleInputChange}
        type="text"
        placeholder={placeholder}
        className={`input input-md input-bordered w-full max-w-xs ${isOverLimit ? 'border-red-500' : ''}`}
      />
      <div className="label">
        <span className={`label-text-alt ${isOverLimit ? 'text-red-500' : ''}`}>{inputLength}/{charCount} characters</span>
      </div>
    </label>
  );
};
