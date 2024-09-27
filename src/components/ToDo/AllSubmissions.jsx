import React from "react";
import { useLocation } from "react-router-dom";
import { FaFilePdf, FaFileImage, FaFileArchive } from "react-icons/fa";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function getFileTypeIcon(fileUrl) {
  if (fileUrl.endsWith(".pdf")) {
    return <FaFilePdf />;
  } else if (
    fileUrl.endsWith(".jpg") ||
    fileUrl.endsWith(".jpeg") ||
    fileUrl.endsWith(".png") ||
    fileUrl.endsWith(".gif")
  ) {
    return <FaFileImage />;
  } else if (fileUrl.endsWith(".zip")) {
    return <FaFileArchive />;
  } else {
    return null;
  }
}

function AllSubmissions() {
  const location = useLocation();
  const { submissions } = location.state;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Submissions</h2>
      <ul>
        {submissions.map((submission, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Student Roll No:</span>
                <span className="text-gray-700">
                  {submission.student.rollno}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold">Submitted File:</span>
                <div className="flex items-center">
                  {submission.submissionFile ? (
                    <>
                      <span className="mr-2">
                        {getFileTypeIcon(submission.submissionFile)}
                      </span>
                      <a
                        href={submission.submissionFile}
                        download
                        className="text-blue-500 hover:underline"
                      >
                        Download
                      </a>
                    </>
                  ) : (
                    <span className="text-gray-500">No file submitted</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Submitted On:</span>
                <span className="text-gray-700">
                  {formatDate(submission.submittedOn)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllSubmissions;
