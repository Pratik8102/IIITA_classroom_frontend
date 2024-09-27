import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Urls";

function FormAttendance({ onSubmitAttendance }) {
  const { subId } = useParams();
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});

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
          // Initialize attendance status as false for all users
          const initialAttendance = sortedUsers.reduce((acc, user) => {
            acc[user._id] = false;
            return acc;
          }, {});
          setAttendance(initialAttendance);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    getData();
  }, [subId]);

  // Function to handle toggle of attendance
  const handleToggleAttendance = (userId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [userId]: !prevAttendance[userId], // Toggle the attendance
    }));
  };

  // Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  const currentDate = new Date().toISOString().split("T")[0];
  const attendanceData = Object.entries(attendance).map(([userId, status]) => ({
    rollno: users.find((user) => user._id === userId).rollno,
    status,
    date: currentDate,
  }));
  try {
    await axios.post(
      `${baseUrl}/markAttendance/${subId}`,
      { attendanceData }, // Send attendance data directly as an array
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Attendance data submitted successfully:", attendanceData);
    window.location.reload()
  } catch (error) {
    console.error("Error submitting attendance:", error);
  }
};




  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Mark Attendance
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center p-4 bg-gray-100 rounded-lg"
          >
            <input
              type="checkbox"
              id={user._id}
              checked={attendance[user._id] || false}
              onChange={() => handleToggleAttendance(user._id)}
              className="form-checkbox h-5 w-5 text-blue-600 mr-4"
            />
            <label htmlFor={user._id} className="text-gray-800">
              {user.rollno}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out"
      >
        Submit Attendance
      </button>
    </form>
  );
}

export default FormAttendance;
