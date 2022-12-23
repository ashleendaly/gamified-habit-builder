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
    <form>
      <div>
        <label>Username</label>
        <input
          onChange={handleChange("username")}
          value={username}
          type="text"
        />
      </div>
      <div>
        <label>Email</label>
        <input onChange={handleChange("email")} value={email} type="text" />
      </div>
      <div>
        <label>Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
        />
      </div>
      <div>
        <button onClick={clickSubmit}>{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <ToastContainer />
      {isAuth() ? <Navigate to="/" replace /> : null}
      <h1>Signup</h1>
      {signupForm()}
    </Layout>
  );
};

export default Signup;
