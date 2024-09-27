import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {baseUrl} from "../../Urls"

function SubAssignment() {
  const navigate = useNavigate();
  const { subId } = useParams();
  const [userRole, setUserRole] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [fileStates, setFileStates] = useState({});
  const [newAssignmentFormVisible, setNewAssignmentFormVisible] =
    useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    title: "",
    description: "",
    dueDate: "",
    file: null,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseUrl}/todo/${subId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const modifiedAssignments = response.data.assignments.map(
          (assignment) => ({
            ...assignment,
            _id: assignment._id,
            dueDate: new Date(assignment.dueDate).toLocaleDateString(),
            uploadDate: new Date(assignment.postedOn).toLocaleDateString(),
            expanded: false,
          })
        );
        setAssignments(modifiedAssignments.reverse()); // Reverse the order
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleExpanded = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment._id === id
          ? { ...assignment, expanded: !assignment.expanded }
          : assignment
      )
    );
  };

  const handleFileChange = (e, assignmentId) => {
    const selectedFile = e.target.files[0];
    setFileStates({
      ...fileStates,
      [assignmentId]: selectedFile,
    });
  };

  const handleSubmit = async (assignmentId) => {
    const file = fileStates[assignmentId];
    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseUrl}/todo/${subId}/submit`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Assignment submitted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleNewAssignmentFormChange = (e) => {
    const { name, value } = e.target;
    setNewAssignmentData({
      ...newAssignmentData,
      [name]: value,
    });
  };

  const handleNewAssignmentFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewAssignmentData({
      ...newAssignmentData,
      file: selectedFile,
    });
  };

  const handleNewAssignmentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", newAssignmentData.file);
    formData.append("title", newAssignmentData.title);
    formData.append("description", newAssignmentData.description);
    formData.append("dueDate", newAssignmentData.dueDate);

    try {
      await axios.post(`${baseUrl}/todo/${subId}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Assignment submitted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading:", error);
    }

    setNewAssignmentData({
      title: "",
      description: "",
      dueDate: "",
      file: null,
    });
    setNewAssignmentFormVisible(false);
  };

  const handleCancelNewAssignment = () => {
    setNewAssignmentFormVisible(false);
    setNewAssignmentData({
      title: "",
      description: "",
      dueDate: "",
      files: [],
    });
  };

  const handleViewSubmission = async (assignmentId) => {
    const assignment = assignments.find((a) => a._id === assignmentId);
    const newUrl = `/todo/${subId}/submission`;
    navigate(newUrl, { state: { assignment } });
  };

  const handleViewAllSubmissions = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}/todo/${subId}/submissions`,
        {
          assignmentId: assignmentId,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Redirect to the /todo/{subId}/submissions URL
      navigate(`/todo/${subId}/submissions`, {
        state: { submissions: response.data },
      });
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Assignments</h1>
        {userRole === "Professor" && !newAssignmentFormVisible && (
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full"
            onClick={() => setNewAssignmentFormVisible(true)}
          >
            New Assignment
          </button>
        )}
      </div>
      {newAssignmentFormVisible && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 max-w-lg mx-auto">
          <form onSubmit={handleNewAssignmentSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newAssignmentData.title}
                onChange={handleNewAssignmentFormChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newAssignmentData.description}
                onChange={handleNewAssignmentFormChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-gray-700 font-semibold"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newAssignmentData.dueDate}
                onChange={handleNewAssignmentFormChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="files"
                className="block text-gray-700 font-semibold"
              >
                Files
              </label>
              <input
                type="file"
                id="files"
                name="files"
                onChange={handleNewAssignmentFileChange}
                multiple
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancelNewAssignment}
                className="text-gray-600 border border-gray-300 hover:bg-gray-200 py-2 px-4 rounded-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {assignments.map((assignment) => (
        <div
          key={assignment._id}
          className="bg-white rounded-lg shadow-md p-6 mb-4 relative"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{assignment.title}</h2>
            <p className="text-gray-600">{assignment.dueDate}</p>
          </div>
          {!assignment.expanded ? (
            <p className="text-gray-600 mb-2">
              {assignment.description.substring(0, 100)}...
            </p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">{assignment.description}</p>
              <p className="text-gray-600 mb-2">
                Uploaded On: {assignment.uploadDate}
              </p>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Files:</span>
                {assignment.files &&
                  assignment.files.map((file, index) => (
                    <a
                      key={index}
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mr-2"
                    >
                      File {index + 1}
                    </a>
                  ))}
              </div>
              <p className="text-gray-600">
                Posted By: {assignment.postedBy.name}
              </p>
              {userRole === "Student" && (
                <div className="flex flex-col sm:flex-row items-center mt-4 mb-4 ">
                  <label className="inline-flex items-center bg-white rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-blue-500 hover:bg-blue-100 hover:border-blue-500 cursor-pointer mr-4  ">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    {fileStates[assignment._id]
                      ? fileStates[assignment._id].name
                      : "Upload File"}{" "}
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, assignment._id)}
                      className="hidden"
                    />
                  </label>
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full mb-2 sm:mb-0 sm:mr-4"
                    onClick={() => handleSubmit(assignment._id)}
                  >
                    Submit
                  </button>
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-full mb-2 sm:mb-0 sm:mr-4"
                    onClick={() => handleViewSubmission(assignment._id)}
                  >
                    View My Submission
                  </button>
                </div>
              )}
            </>
          )}
          <div className="flex justify-between">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleExpanded(assignment._id)}
            >
              {assignment.expanded ? "Collapse" : "Expand"}
            </button>
            {userRole === "Professor" && (
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleViewAllSubmissions(assignment._id)}
              >
                View All Submissions
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubAssignment;
