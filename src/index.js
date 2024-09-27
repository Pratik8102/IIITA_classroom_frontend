import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider";
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";




import Login from "./components/login/Login";
import UserCard from "./components/dashboard/UserCard";
import SubjectInfo from "./components/SubjectInfo/SubjectInfo";
import Attendance from "./components/Attendance/Attendance";
import ToDo from "./components/ToDo/ToDo";
import Results from "./components/Results/Results";
import Admin from "./components/Admin/Admin"
import TakeAttendance from "./components/Attendance/TakeAttendance";
import FormAttendance from "./components/Attendance/FormAttendance";
import ViewAttendance from "./components/Attendance/ViewAttendance"
import SemPart from "./components/Results/SemPart";
import GiveResults from "./components/Results/GiveResults";
import ViewResults from "./components/Results/ViewResults";
import SubAssignment from "./components/ToDo/SubAssignment";
import Submission from "./components/ToDo/Submission";
import AllSubmissions from "./components/ToDo/AllSubmissions";

const lst=JSON.parse(localStorage.getItem('nuser'));
const role=localStorage.getItem('role');

const router = createBrowserRouter([
  {
    path: "/",
    element: lst ? role === "Admin" ? <Admin /> : <App /> : <Login />,
    children: [
      {
        path: "",
        element: <UserCard />,
      },
      {
        path: "subject/:subId",
        element: <SubjectInfo />,
      },
    ],
  },
  {
    path: "/attendance",
    element: <App />,
    children: [
      {
        path: "",
        element: role === "Professor" ? <TakeAttendance /> : <Attendance />,
      },
      {
        path: ":subId",
        element: role === "Professor" ? <FormAttendance /> : <ViewAttendance />,
      },
    ],
  },
  {
    path: "/results",
    element: <App/>,
    children:[
      {
        path: "",
        element: <Results/>
      },
      {
        path: ":subId",
        element: <SemPart/>
      },
      {
        path:":subId/midSem",
        element: (role==="Professor"?<GiveResults/>:<ViewResults/>)
      },
      {
        path:":subId/endSem",
        element: (role==="Professor"?<GiveResults/>:<ViewResults/>)
      },
    ]
  },
  {
    path: "/todo",
    element: <App/>,
    children: [
      {
        path: "",
        element: <ToDo/>
      },
      {
        path: ":subId",
        element: <SubAssignment/>
      },
      {
        path:":subId/submission",
        element: <Submission/>
      },
      {
        path:":subId/submissions",
        element:<AllSubmissions/>
      }
    ]
  }
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
