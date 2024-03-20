import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/images/delete.png";
import editIcon from "../assets/images/edit.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditUser } from "../Redux/Action/Action";
import Navbar from "./Navbar";
import profile from "../assets/images/profile.png";

const UserManagement = () => {
  const { currentUser } = useSelector((state) => state.Reducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myStorage, setMyStorage] = useState([]);
 
  useEffect(() => {
    try {
      setMyStorage(JSON.parse(localStorage.getItem("formData")));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleEdit = (item) => {
    const updatedStorage = myStorage.filter((data) => data.id === item);
    dispatch(EditUser(updatedStorage));
    navigate("/register");
  };

  const handleDelete = (item) => {
    const updatedStorage = myStorage?.filter((data) => data.id !== item);
    localStorage.setItem("formData", JSON.stringify(updatedStorage));
    setMyStorage(updatedStorage);
  };

  const renderAll = () => {
    return myStorage?.map((item, i) => (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
       
        <td>
          <img
            src={item.image?.file ? item.image?.file : profile}
            alt=""
            className="imgs"
          />
          {item.name}
        </td>
        <td>{item.email}</td>
        <td>{item.mobile}</td>
        <td>{item.role}</td>
        <td>
          <span>
            <img
              src={editIcon}
              alt=""
              style={{ width: "20px" ,cursor: "pointer" }}
              onClick={() => handleEdit(item.id)}
            />
          </span>
          <span>
            {" "}
            <img
              src={deleteIcon}
              alt=""
              style={{ width: "20px",cursor: "pointer" }}
              onClick={() => handleDelete(item.id)}
            />
          </span>
        </td>
      </tr>
    ));
  };

  const renderFilteredUser = () => {
    const userFilters = myStorage?.filter(
      (item) => item.role === "user" && item.manager === currentUser?.name
    );
    return userFilters?.map((item, i) => (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>
          <img
            src={item.image?.file ? item.image?.file : profile}
            alt=""
            className="imgs"
          />
          {item.name}
        </td>
        <td>{item.email}</td>
        <td>{item.mobile}</td>
        <td>{item.role}</td>
        <td>
          <span>
            <img
              src={editIcon}
              alt=""
              style={{ width: "20px",cursor: "pointer" }}
              onClick={() => handleEdit(item.id)}
            />
          </span>
          <span>
            {" "}
            <img
              src={deleteIcon}
              alt=""
              style={{ width: "20px",cursor: "pointer" }}
              onClick={() => handleDelete(item.id)}
            />
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="main">
      <Navbar />

      <div className="m-5 ">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {currentUser.role === "admin" && <tbody>{renderAll()}</tbody>}

          {currentUser.role === "manager" && (
            <tbody>{renderFilteredUser()}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
