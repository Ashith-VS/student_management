import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import UserManagement from "./Components/UserManagement.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="userProfile" element={<UserProfile />} />
        </Route>
        <Route path="/" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
