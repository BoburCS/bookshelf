import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "@pages/signup";
import Home from "@pages/Home";
import CreateBook from "@pages/CreateBook";
import PrivateRoute from "@routes/PrivateRoute";
import Modal from "@components/Modal";

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/createbook" element={<CreateBook />} />
        </Route>
      </Routes>
      <Modal />
    </React.Fragment>
  );
}
