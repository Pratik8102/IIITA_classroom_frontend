import React, { useContext } from "react";
import Modal from "./Modal";
import { useState } from "react";
import UserContext from "../../context/UserContext";
import { AlignJustify,X } from "lucide-react";




function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = () => {
    console.log(isFocused);
    setIsFocused(true);
  };

  const {expand,setExpand} = useContext(UserContext)
  const {user}=useContext(UserContext)

  return (
    <div className=" flex h-16 border-b-2 shadow-lg items-center sticky top-0 bg-white z-10">
      {/* Sidebar span */}
      <div className=" w-[10%] h-full items-center justify-start flex md:w-[18%]">
        <div className=" flex justify-between items-center">
          <button
            onClick={() => setExpand((curr) => !curr)}
            className="md:hidden ml-2 md:ml-8 rounded-lg bg-gray-50 hover:bg-gray-100 "
          >
            {expand ? <X /> : <AlignJustify />}
          </button>
          <button className="hidden md:flex w-10 h-10 ml-8 rounded-lg">
            <img src="/photos/Login/clgLogo.png" alt="" />
          </button>
          <div
            
            className="hidden md:flex text-gray-600 text-xl mx-4"
          >
            <span className="font-semibold mr-2">IIITA </span>  Classroom
          </div>
        </div>
      </div>

      {/* header */}
      <div className=" w-3/4 h-full flex items-center justify-between md: mx-8">
        <div
          
          className={`${isFocused?"hidden":"flex md:hidden"} text-gray-600 text-xl`}
        >
          <span className="mr-1 font-semibold ">IIITA </span> Classroom
        </div>
        <div className="h-full w-full relative flex justify-end">
          {/* <form action="">
            <input
              type="search"
              autoComplete="off"
              className="peer cursor-pointer absolute z-10 right-0 inset-y-1.5  h-12 w-12 rounded-full border bg-transparent pr-12 outline-none focus:w-full focus:pl-4 focus:bg-white focus:pr-16 focus:cursor-text focus:border-[#7666df]"
              id="search"
              onFocus={handleOnFocus}
              onBlur={() => {
                setIsFocused(false);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto inset-y-0 absolute peer-focus:z-10 right-0 h-8 w-12 border-l border-transparent stroke-gray-500 px-3.5 peer-focus:border-[#7666df] peer-focus:stroke-[#7666df]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form> */}
        </div>
      </div>

      {/* UserInfo */}
      <div className=" relative px-0 flex  w-[15%] h-full  md:px-1">
        <Modal/>

        <div className="hidden flex-col justify-center  overflow-hidden md:flex mr-2">
          <span className=" text-xs font-bold">{user.user}</span>
          <span className=" text-gray-500 " style={{ fontSize: "0.6rem" }}>
            {user.userEmail}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
