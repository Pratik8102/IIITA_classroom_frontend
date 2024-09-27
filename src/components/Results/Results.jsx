import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Urls";

function Results() {
  const { data, setData } = useContext(UserContext);
  const [url,setUrl]=useState();

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



  return (
    <div className="flex flex-wrap justify-center absolute">
      {data.map((d, index) => (
        <div
          key={index}
          className="w-64 bg-white rounded-lg shadow-md m-4 overflow-hidden"
        >
          <img
            src={d.Image}
            alt="Course"
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {d.course_name}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Professor: {d.proffesor}
            </p>
          </div>
          <div className="p-4 ">
            <Link to={`/results/${d.course}`} className="block w-full">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
                Show details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Results;
