import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { username, email, password, buttonText } = values;

  const handleChange =
    (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      //   console.log(event.target.value);
      setValues({ ...values, [name]: event.target.value });
    };

  const clickSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { username, email, password },
    })
      .then((response) => {
        console.log("SIGNUP SUCCESS", response);
        setValues({
          ...values,
          username: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data);
        setValues({
          ...values,
          buttonText: "Submit",
        });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <div className="p-6 rounded-lg shadow-lg bg-white w-1/3">
      <form>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            Username
          </label>
          <input
            className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none"
            onChange={handleChange("username")}
            value={username}
            type="text"
          />
        </div>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            Email
          </label>
          <input
            className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none"
            onChange={handleChange("email")}
            value={email}
            type="text"
          />
        </div>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            Password
          </label>
          <input
            className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none"
            onChange={handleChange("password")}
            value={password}
            type="password"
          />
        </div>
        <div className="py-5">
          <button
            className="w-full
      px-6
      py-2.5
      bg-blue-400
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-500 hover:shadow-lg
      focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-500 active:shadow-lg
      transition
      duration-150
      ease-in-out"
            onClick={clickSubmit}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <ToastContainer />
      {isAuth() ? <Navigate to="/" replace /> : null}
      <div className="w-screen flex flex-col items-center justify-center p-20">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-400">
          Signup
        </h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
