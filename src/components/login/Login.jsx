import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Urls";
import Swal from "sweetalert2";

const Image4 = "/photos/Subjects/img4.jpg";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    signIn: "Student",
  });
  const handleInput = (e) => {
    // console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSelectChange = (e) => {
      setFormData({ ...formData, signIn: e.target.value });
    };

function handleSubmit(e) {
  e.preventDefault();
  axios
    .post(`${baseUrl}/user/login`, formData)
    .then((response) => {
      const newUser = {
        user: response.data.user.name,
        userImage: response.data.user.image,
        userEmail: response.data.user.email,
      };
      localStorage.setItem("nuser", JSON.stringify(newUser));
      const token = response.data.token;
      localStorage.setItem("token", token);
      const role = formData.signIn;
      localStorage.setItem("role", role);

      setUser(newUser);

      window.location.replace("/");
    })
    .catch((error) => {
      // Use SweetAlert2 for a beautiful alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter correct credentials!",
        footer: "<a href>Need help?</a>", // Optionally provide a link or more info
      });
      console.log(error.response);
    });
}


  const users = ["Student", "Professor", "Admin"];

  return (
    <>
      <main className="login-main">
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              <form
                onSubmit={handleSubmit}
                autocomplete="off"
                className="sign-in-form"
              >
                <div className="logo">
                  <img src="./photos/Login/clgLogo.png" alt="easyclass" />
                  <a href="/">
                    <h4>IIITA Classroom</h4>
                  </a>
                </div>

                <div className="heading">
                  <h2>Welcome Back</h2>
                  <h6>Please enter your details</h6>
                </div>

                <div className="actual-form">
                  <div className="relative z-0">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleInput}
                      className=" my-5 block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      for="email"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative z-0">
                    {/* <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    /> */}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInput}
                      className="block mb-5 py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      for="password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Password
                    </label>
                  </div>

                  <div className="mb-6 input-wrap flex">
                    <div className=" mr-3 text-gray-400">Sign-in as:</div>
                    <div>
                      <div>
                        <select
                          id="user"
                          className="focus:outline-none "
                          onChange={handleSelectChange}
                        >
                          {users.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" value="Sign In" className="sign-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="carousel">
              <div className="images-wrapper">
                <img
                  src="/photos/Login/img1.svg"
                  className="image img-1 show"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
