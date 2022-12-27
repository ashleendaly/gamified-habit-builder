import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";

const AdminRoute = ({ children }: { children: ReactElement<any, any> }) => {
  return isAuth() && isAuth().role === "admin" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default AdminRoute;
