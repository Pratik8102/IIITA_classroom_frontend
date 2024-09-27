import UserContext from "../../context/UserContext";
import Calender from "../dashboard/Calender"
import React, { useContext } from "react";

function UserSection() {
  const {user} = useContext(UserContext)
  return (
    <div className="border-black h-[40vh] w-full md:flex">
      <div className="w-3/4 px-4 py-2">
        <div
          className=" rounded-3xl text-white my-4 h-full w-full flex"
          style={{ backgroundColor: "#5743d8" }}
        >
          <div className="w-3/5 px-10 p-5 flex flex-col text-2xl justify-center">
            Welcome Back,
            <br />
            <h3 className="mt-2 font-bold">{user.user}</h3>
          </div>
          <div>
            <div className="hidden overflow-hidden justify-start h-3/4 mt-8 object-cover md:flex">
              <img src="/photos/Subjects/study.png" alt="err" className="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full p-4 flex-end">
        <span className="font-semibold">Calender</span>
        <div className="w-full mt-3">
            <Calender/>
        </div>
        
      </div>
    </div>
  );
}

export default UserSection;
