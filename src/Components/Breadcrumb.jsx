import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import home from "../assets/images/home.png";

const Breadcrumb = () => {
  const { currentUser } = useSelector((state) => state.Reducers);

  return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" aria-current="page">
            <NavLink
              to={`${
                currentUser?.role === "user"
                  ? "/userProfile"
                  : "/userManagement"
              }`}
            >
              {" "}
              <img src={home} alt="" className="img" />
            </NavLink>
          </li>
        </ol>
      </nav>
  );
};

export default Breadcrumb;
