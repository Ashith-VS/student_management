import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuIcon from "../assets/images/menu_icon.png";
import profileIcon from "../assets/images/profile.png";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="navbar navbar-light bg-light ">
      <span className="navbar-brand p-4">User Management</span>
      <div className="ml-auto">
        <div className="dropdown mx-5">
          <Link to={"/userManagement"}>
            <img
              src={
                currentUser?.image?.file
                  ? currentUser?.image?.file
                  : profileIcon
              }
              alt=""
              className="img"
            />
          </Link>
          <span>{currentUser?.name}</span>
          <img
            src={menuIcon}
            alt=""
            className="img"
            onClick={handleDropdown}
            style={{ cursor: "pointer" }}
          />
          {showDropdown && (
            <div className="dropdown-menu dropdown-menu-right show">
              <button
                className="dropdown-item"
                onClick={() => {
                  window.location.replace("/register");
                }}
              >
                Create User
              </button>
              <button
                className="dropdown-item select"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
