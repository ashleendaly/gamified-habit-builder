import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import PrivateRoute from "./auth/PrivateRoute";
import Admin from "./core/Admin";
import AdminRoute from "./auth/AdminRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/auth/activate/:token" element={<Activate />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
