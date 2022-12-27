import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";

const PrivateRoute = ({ children }: { children: ReactElement<any, any> }) =>
  isAuth() ? children : <Navigate to="/signin" />;

export default PrivateRoute;
