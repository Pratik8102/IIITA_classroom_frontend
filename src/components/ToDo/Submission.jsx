import React from "react";
import { useLocation } from "react-router-dom";

function Submission() {
  const location = useLocation();
  const { assignment } = location.state;

  // Convert timestamp to Date object
  const submittedDate = assignment.submission
    ? new Date(assignment.submission.submittedOn)
    : null;

  // Get the date part only
  const submittedDateStr = submittedDate
    ? submittedDate.toLocaleDateString()
    : "No submission";

  const file = assignment.submission
    ? assignment.submission.submissionFile
    : null;

  // Function to determine how to render the file
  const renderFile = () => {
    if (!file) {
      return <div>No file submitted</div>;
    }

    let icon = "";
    // Check if the file is an image or a PDF
    if (
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".png")
    ) {
      return (
        <div className="flex flex-col items-center">
          <img
            src={file}
            alt="Submission"
            className="max-w-full h-auto rounded"
            style={{ maxWidth: "200px", maxHeight: "200px" }} // Adjust the max width and height as needed
          />
          <div className="text-center mt-2">
            <a href={file} download className="text-blue-500 hover:underline">
              Download Image
            </a>
          </div>
        </div>
      );
    } else if (file.endsWith(".pdf")) {
      icon = <i className="far fa-file-pdf text-red-500 text-4xl mb-2"></i>;
    } else {
      icon = <i className="far fa-file text-gray-500 text-4xl mb-2"></i>;
    }
    // For other file types, provide a download link
    return (
      <div className="flex flex-col items-center">
        {icon}
        <div className="text-center mt-2">
          <a href={file} download className="text-blue-500 hover:underline">
            Download File
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 pb-8 flex justify-center items-start min-h-screen">
      <div className="max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-2">
          <div className="text-lg font-bold mb-2">
            Submitted on: {submittedDateStr}
          </div>
          <div className="mb-4">{renderFile()}</div>
        </div>
      </div>
    </div>
  );
}

export default Submission;
