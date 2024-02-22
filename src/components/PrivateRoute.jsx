// PrivateRoute.js

import React, { useContext, useEffect } from "react";
import { useNavigate, Route } from "react-router-dom";

import { getUserFromLocalStorage } from "../service/localstorage";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      navigate("/login");
    }
  })
  return (
      <Component />
  )
};

export default PrivateRoute;
