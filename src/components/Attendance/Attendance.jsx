import React, { useContext, useEffect, useState } from "react";
import Charts from "../Charts/Charts";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Urls";

const Image4 = "/photos/Subjects/img4.jpg";

function Attendance() {
  const { data, setData } = useContext(UserContext);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await axios.get(`${baseUrl}/user/Dashboard`, {
            headers: {
              authorization: token,
            },
          });
          const subData = data.data.user.courses;

          const formattedData = subData.map((item) => ({
            Image: item.course.courseImage,
            course_name: item.course.coursename,
            course: item.course.courseid,
            proffesor:
              item.course.professor.length > 0
                ? item.course.professor.map((prof) => prof.name).join(", ")
                : "N/A",
          }));

          setData(formattedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const subIds = data.map((d) => d.course);
          const promises = subIds.map((subId) =>
            axios.get(`${baseUrl}/viewAttendance/${subId}`, {
              headers: {
                authorization: token,
              },
            })
          );
          const responses = await Promise.all(promises);
          const attendanceCounts = responses.map((res) =>
            res.data.attendance.reduce(
              (acc, item) => {
                if (item.present) {
                  acc.presents++;
                } else {
                  acc.absents++;
                }
                return acc;
              },
              { presents: 0, absents: 0 }
            )
          );
          setAttendanceData(attendanceCounts);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [data]);

  return (
    <div className="flex flex-wrap">
      {data.map((d, index) => (
        <div
          key={d.course}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-gray-200 m-3 flex flex-col p-2"
        >
          <div className="font-bold flex m-1 text-gray-600 justify-center">
            {d.course_name}
          </div>
          <Charts
            pdata={[
              attendanceData[index]?.presents || 0,
              attendanceData[index]?.absents || 0,
            ]}
          />
          <div className="p-2 ">
            <Link to={`/attendance/${d.course}`} className="block w-full">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
                View Attendance
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Attendance;
