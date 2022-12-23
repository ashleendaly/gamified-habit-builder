import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children }: { children: React.ReactNode }) => {
  let navigate = useNavigate();

  function nav(): React.ReactNode {
    return (
      <ul className="flex justify-start bg-blue-400 text-white p-5 h-1/6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-200 hover:text-blue-100 p-2 hover:underline"
                : "hover:text-blue-100 p-2 hover:underline"
            }
          >
            Home
          </NavLink>
        </li>
        {!isAuth() && (
          <Fragment>
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-200 hover:text-blue-100 hover:underline p-2"
                    : "hover:text-blue-100 p-2 hover:underline"
                }
              >
                Signin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-200 hover:text-blue-100 p-2 hover:underline"
                    : "hover:text-blue-100 p-2 hover:underline"
                }
              >
                Signup
              </NavLink>
            </li>
          </Fragment>
        )}

        {isAuth() && (
          <li>
            <span
              className={
                "hover:text-blue-100 cursor-pointer p-2 hover:underline"
              }
            >
              {isAuth().username}
            </span>
          </li>
        )}

        {isAuth() && (
          <li>
            <span
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
              className={
                "hover:text-blue-100 cursor-pointer p-2 hover:underline"
              }
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    );
  }

  return (
    <Fragment>
      <p>{nav()}</p>
      <div>{children}</div>
    </Fragment>
  );
};

export default Layout;
