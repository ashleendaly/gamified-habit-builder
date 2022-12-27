import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth, getCookie, signout } from "../auth/helpers";
import { useNavigate } from "react-router-dom";

const Private = () => {
  let naviate = useNavigate();

  const [values, setValues] = useState({
    role: "",
    username: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response);
        const { role, username, email } = response.data;
        setValues({ ...values, role, username, email });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            naviate("/", { replace: true });
          });
        }
      });
  };

  const { role, username, email, password, buttonText } = values;

  const handleChange =
    (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      //   console.log(event.target.value);
      setValues({ ...values, [name]: event.target.value });
    };

  const clickSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { username, password },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
        setValues({
          ...values,
          buttonText: "Submitted",
        });
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE ERROR", error.response.data.error);
        setValues({
          ...values,
          buttonText: "Submit",
        });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <div className="p-6 rounded-lg shadow-lg bg-white w-1/3">
      <form>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            Role
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
        bg-gray bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0"
            defaultValue={role}
            type="text"
            disabled
          />
        </div>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            Username
          </label>
          <input
            className="form-control block
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
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-gray bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none"
            defaultValue={email}
            type="text"
            disabled
          />
        </div>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            Password
          </label>
          <input
            className="form-control block
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
      <div className="w-screen flex flex-col items-center justify-center p-20">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-400">
          Private
        </h1>
        <p className="leading-tight text-2xl mt-0 mb-2 text-blue-400">
          Profile update
        </p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
