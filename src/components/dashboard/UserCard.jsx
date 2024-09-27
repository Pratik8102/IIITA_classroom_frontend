import React, { useContext, useEffect } from "react";
import UserSection from "../dashboard/UserSection";
import axios from "axios";

import Cards from "../SubjectCards/Cards";
import UserContext from "../../context/UserContext";
import { baseUrl } from "../../Urls";

const Image4 = "/photos/Subjects/img4.jpg";

function UserCard() {

  const {setData} = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await axios.get(`${baseUrl}/user/Dashboard`, {
            headers: {
              authorization: token, // Pass the token directly, assuming it's a string
            },
          });
          const subData=data.data.user.courses
          // console.log(subData)

          const formattedData = subData.map((item) => ({
            Image: item.course.courseImage, // Assuming Image4 is defined somewhere in your code
            course_name: item.course.coursename, // Assuming course name is stored in course.coursename
            course: item.course.courseid, // Assuming course ID is stored in course.courseid
            proffesor:
              item.course.professor.length > 0
                ? item.course.professor.map(prof => prof.name).join(', ')
                : "N/A",
            // posts: item.course.posts.map((post) => ({
            //   Author: post.author,
            //   // pfp: post.user.userImage,
            //   date: post.date,
            //   content: post.content,
            // })),
          }));
          // console.log(formattedData)

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
    <>
      <div className="w-full h-1/2 hidden md:flex ">
        <UserSection />
      </div>
      <div>
        <Cards />
      </div>
    </>
  );
}

export default UserCard;
