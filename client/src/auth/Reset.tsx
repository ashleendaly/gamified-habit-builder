import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Reset = () => {
  let { token } = useParams();

  const [values, setValues] = useState({
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
  });

  useEffect(() => {
    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const { newPassword, buttonText } = values;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Resetting..." });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({
          ...values,
          buttonText: "Reset Password",
        });
      });
  };

  const passwordResetForm = () => (
    <div className="p-6 rounded-lg shadow-lg bg-white w-1/3">
      <form>
        <div className="form-group mb-6">
          <label className="form-label inline-block mb-2 text-gray-700">
            New Password
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
            onChange={handleChange}
            value={newPassword}
            type="password"
            placeholder="Type new password"
            required
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
          Reset Password
        </h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
