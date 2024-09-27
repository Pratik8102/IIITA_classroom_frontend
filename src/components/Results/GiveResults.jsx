import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Urls";

function GiveResults() {
  const [users, setUsers] = useState([]);
  const [maxMarks, setMaxMarks] = useState({
    reviewTest: "",
    quiz: "",
    assignments: "",
  });
  const { subId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await axios.get(
            `${baseUrl}/markAttendance/${subId}`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          const sortedUsers = data.data.students.sort((a, b) => {
            return a.rollno.localeCompare(b.rollno); // Sort by roll number in ascending order
          });
          setUsers(sortedUsers);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    getData();
  }, []);

  const handleMaxMarksChange = (e) => {
    setMaxMarks({ ...maxMarks, [e.target.name]: e.target.value });
  };

  const handleUserMarksChange = (e, userId) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, [e.target.name]: e.target.value } : user
    );
    setUsers(updatedUsers);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const marksData = users.map((user) => ({
          rollno: user.rollno,
          reviewTest: user.reviewTest || "",
          quiz: user.quiz || "",
          assignments: user.assignments || "",
        }));

        const data = {
          maxMarks,
          students: marksData,
        };

        const examType = window.location.pathname.includes("midSem")
          ? "midSem"
          : "endSem";

        await axios.post(
          `${baseUrl}/results/${subId}/${examType}`,
          { data },
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log("Data sent successfully!", data);
        window.location.reload()
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.error("Token not found in localStorage");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">Max Marks:</span>
            <input
              type="text"
              name="reviewTest"
              value={maxMarks.reviewTest}
              onChange={handleMaxMarksChange}
              placeholder="Review Test"
              className="border rounded px-2 py-1 mr-4 w-full sm:w-auto"
            />
            <input
              type="text"
              name="quiz"
              value={maxMarks.quiz}
              onChange={handleMaxMarksChange}
              placeholder="Quiz"
              className="border rounded px-2 py-1 mr-4 w-full sm:w-auto"
            />
            <input
              type="text"
              name="assignments"
              value={maxMarks.assignments}
              onChange={handleMaxMarksChange}
              placeholder="Assignments"
              className="border rounded px-2 py-1 w-full sm:w-auto"
            />
          </div>
          <hr className="border-gray-300 mb-2" />
        </div>
      </div>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex flex-wrap items-center mb-4 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="w-full md:w-auto md:flex-1 md:mr-4">
            <span className="font-semibold mr-2">Roll No:</span>
            <span>{user.rollno}</span>
          </div>
          <input
            type="text"
            name="reviewTest"
            value={user.reviewTest || ""}
            onChange={(e) => handleUserMarksChange(e, user._id)}
            placeholder="Review Test"
            className="border rounded px-2 py-1 mr-4 w-full sm:w-auto mb-2 md:mb-0"
          />
          <input
            type="text"
            name="quiz"
            value={user.quiz || ""}
            onChange={(e) => handleUserMarksChange(e, user._id)}
            placeholder="Quiz"
            className="border rounded px-2 py-1 mr-4 w-full sm:w-auto mb-2 md:mb-0"
          />
          <input
            type="text"
            name="assignments"
            value={user.assignments || ""}
            onChange={(e) => handleUserMarksChange(e, user._id)}
            placeholder="Assignments"
            className="border rounded px-2 py-1 w-full sm:w-auto mb-2 md:mb-0"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md"
      >
        Submit
      </button>
    </div>
  );
}

export default GiveResults;
