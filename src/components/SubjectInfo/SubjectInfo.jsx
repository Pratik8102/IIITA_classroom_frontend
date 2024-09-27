import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Calender from "../dashboard/Calender";
import SubjectPost from "./SubjectPost";
import Announcement from "../Announcement/Announcement"
import axios from "axios";
import { baseUrl } from "../../Urls";

const Image4 = "/photos/Subjects/img4.jpg";

function SubjectInfo() {
  const { subId } = useParams();
  const [sub,setSub] = useState({});
  const role= localStorage.getItem('role');

  
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await axios.get(`${baseUrl}/course/${subId}`, {
            headers: {
              authorization: token, 
            },
          });
          
          const d=data.data.course;
          setSub(d);

          // console.log(data)

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    getData();
    // console.log(sub)
  }, []);
  

  

  return (
    <div className="flex flex-col">
      <div className="p-4 md:p-8 h-11/12  md:h-4/6 flex">
        <div className="w-full md:w-3/4 relative bg-contain h-40 md:h-64  overflow-hidden rounded-2xl shadow-lg group  ">
          <img
            src={sub.courseImage}
            alt=""
            className="w-full h-full  transition-transform group-hover:scale-110 duration-200"
          />
          <div className="absolute flex items-end inset-0 bg-gradient-to-t from-black/60 to-black/0">
            <div>
              <div className="flex-col  p-8 h-full text-white font-bold">
                <div className="text-xl">{sub.coursename}</div>
                {sub.professor && sub.professor.length > 0 ? (
                  <span>
                    {sub.professor.map((prof, index) => (
                      <span key={index}>
                        {prof.name}
                        {index !== sub.professor.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                ) : (
                  <div className=" opacity-55">No professors available</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col w-1/4 h-full p-4 pr-0 flex-end">
          <span className="font-semibold">Calender</span>
          <div className="w-full mt-3">
            <Calender />
          </div>
        </div>
      </div>
      <div className="flex md:h-40">
        <div className="w-full md:w-3/4 ">
          <div>
            <Announcement subId />
          </div>
          <div>
            <SubjectPost sub={sub} />
          </div>
        </div>
        {role=='Professor'?<div className="w-1/4 hidden md:flex">
                

          <div className="p-4 ">
            <Link to={`/attendance/${subId}`} className="block w-full">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg p-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
                Take Attendance
              </button>
            </Link>
          </div>
        </div>:<></>}
        
      </div>
    </div>
  );
}

export default SubjectInfo;
