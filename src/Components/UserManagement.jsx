import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/images/delete.png";
import editIcon from "../assets/images/edit.png";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { EditUser } from "../Redux/Action/Action";
const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myStorage, setMyStorage] = useState([]);


  useEffect(() => {
    setMyStorage(JSON.parse(localStorage.getItem("formData")));
  }, []);

  const handleEdit = (item) => {
    const updatedStorage = myStorage.filter((data) => data.id === item);
    dispatch(EditUser(updatedStorage));
    navigate("/register");
  };

  const handleDelete = (item) => {
    const updatedStorage = myStorage?.filter((data) => data.name !== item);
    localStorage.setItem("formData", JSON.stringify(updatedStorage));
    setMyStorage(updatedStorage);
  };

  return (
    <div className="main">
      <nav className="navbar navbar-light bg-light ">
        <span className="navbar-brand p-4">User Management</span>
        <div className="ml-auto mx-3">
          <button
            className="btn btn-primary mx-3 "
            onClick={() => {
              window.location.replace("/register")
            //  navigate("/register")
            }}
          >
            Create User
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.replace("/");
              // window.location.reload();
              // navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

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
          <tbody>
            {myStorage?.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.admin === true ? "admin" : "student"}</td>
                {item.admin === false ? (
                  <td>
                    <span><img
                      src={editIcon}
                      alt=""
                      style={{ width: "20px" }}
                      onClick={() => handleEdit(item.id)}
                    /></span>           
                   <span> <img
                      src={deleteIcon}
                      alt=""
                      style={{ width: "20px" }}
                      onClick={() => handleDelete(item.name)}
                    /></span>
                  </td>
                ) : (
                  <td> </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
