import React, { useState } from "react";
import UserContext from "./UserContext";

const Image1 = "/photos/Subjects/img1.jpg";
const Image2 = "/photos/Subjects/img2.jpg";
const Image3 = "/photos/Subjects/img3.jpg";
const Image4 = "/photos/Subjects/img4.jpg";
const Image5 = "/photos/Subjects/img5.jpg";

const lst = JSON.parse(localStorage.getItem("nuser"));

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: lst ? lst.user : "Roshan Chaudhary",
    userImage: lst ? lst.userImage : "/photos/Dashboard/dummy.jpeg",
    userEmail: lst ? lst.userEmail : "chaudharyrhan@gmail.com",
  });

  const [data, setData] = useState([]);

  const subjects = [
    {
      course_name: "Machine Learning",
      posts: [
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 21",
          content: "This is first post of ML ",
        },
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 24",
          content: "This is second post of ML",
        },
      ],
    },
    {
      course_name: "Data Visualization 2024",
      posts: [
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 11",
          content: "This is first post of DV",
        },
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 14",
          content: "This is second post of DV",
        },
      ],
    },
    {
      course_name: "Data Mining C",
      posts: [
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 1",
          content: "This is first post of DM",
        },
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 4",
          content: "This is second post of DM",
        },
      ],
    },
    {
      course_name: "IBO",
      posts: [
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 2",
          content: "This is first post of IBO",
        },
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 9",
          content: "This is second post of IBO ",
        },
      ],
    },
    {
      course_name: "Business Analytics",
      posts: [
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 21",
          content: "This is first post of BA",
        },
        {
          Author: user.user,
          pfp: user.userImage,
          date: "Feb 24",
          content: "This is second post of BA",
        },
      ],
    },
  ];

  const [expand, setExpand] = useState(false);
  return (
    <UserContext.Provider
      value={{ expand, setExpand, user, setUser, data, subjects, setData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
