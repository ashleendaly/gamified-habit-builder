import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/auth/activate/:token" element={<Activate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
