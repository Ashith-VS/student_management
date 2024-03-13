import React from "react";

const UserManagement = () => {
  return (
    <div className="main">
      <nav className="navbar navbar-light bg-light ">
        <span className="navbar-brand p-4">Student Management</span>
        <div className="ml-auto mx-3">
          <button className="btn btn-primary mx-3 ">Create User</button>
          <button className="btn btn-secondary">Logout</button>
        </div>
      </nav>

      <div className="m-5 ">
        <nav className="navbar  bg-light">
          <p>nav</p>
          <span></span>
          <span></span>
        </nav>
      </div>
      <nav className="navbar bg-light">
        <p>nav</p>
      </nav>
    </div>
  );
};

export default UserManagement;
