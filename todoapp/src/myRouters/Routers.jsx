import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { Home, Authentication } from "../pages";

const Routers = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
          exact
        />
        <Route
          path="/login"
          element={
            !user ? <Authentication page={"login"} /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/register"
          element={
            !user ? <Authentication page={"register"} /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/request-reset-password"
          element={
            !user ? (
              <Authentication page={"request-reset-password"} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            !user ? (
              <Authentication page={"reset-password"} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default Routers;
