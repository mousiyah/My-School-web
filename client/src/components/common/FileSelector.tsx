import React from "react";

interface FileSelectorProps {
  label: string;
  onChange: (file: File | null) => void;
}

export const FileSelector: React.FC<FileSelectorProps> = ({
  label,
  onChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0];
    onChange(selectedFile);
  };

  return (
    <label className="form-control w-full max-w-xs mt-5">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        onChange={handleFileChange}
        type="file"
        className="file-input file-input-sm file-input-bordered w-full max-w-xs"
      />
    </label>
  );
};
