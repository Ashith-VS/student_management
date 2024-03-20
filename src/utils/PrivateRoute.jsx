import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "lodash";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  console.log(!isEmpty(currentUser));
  return !isEmpty(currentUser) ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
