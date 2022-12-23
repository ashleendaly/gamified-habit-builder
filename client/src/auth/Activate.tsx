import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Activate = () => {
  let { token } = useParams();
  useEffect(() => {
    if (token) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/account-activation`,
        data: { token },
      })
        .then((response) => {
          console.log("ACCOUNT ACTIVATION", response);
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
          toast.error(error.response.data.message);
        });
    }
  }, [token]);

  return (
    <Layout>
      <ToastContainer />
      Thank you for verifying your account! Please Sign in.
    </Layout>
  );
};

export default Activate;
