import React, { useContext } from "react";
import Header from "./components/Header/Header";
import UserContext from "./context/UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const { expand } = useContext(UserContext);
  return (
    <>
      {/* <Login /> */}
      <Header />
      <div className="flex ">
        <div
          className={`${
            expand ? "flex" : "md:flex hidden"
          } w-full md:w-1/5 h-[90vh] sticky top-16`}
        >
          <Sidebar />
        </div>
        <div
          className={`w-full md:w-4/5 ${
            expand ? "hidden md:flex" : "flex"
          } flex-col`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
