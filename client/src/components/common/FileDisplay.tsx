import React from "react";

const FileDisplay = ({ filePath }) => {
  const fileURL = `http://localhost:9000/uploads/${filePath}`;

  return (
    <div>
      <iframe src={fileURL} width="100%" height="500px" title="PDF Viewer" />

      <a
        className="btn btn-primary btn-sm text-white mt-5"
        href={fileURL}
        target="_blank"
        download
      >
        Download File
      </a>
    </div>
  );
};

export default FileDisplay;
