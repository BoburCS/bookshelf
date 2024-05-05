import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "@pages/signup";
import Home from "@pages/home";
import PrivateRoute from "@routes/PrivateRoute";
import Modal from "@components/Modal";

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Modal />
      <ToastContainer />
    </React.Fragment>
  );
}
