import React from "react";

const UserProfile = () => {
  return (
    <section
      className="gradient-form d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card rounded-3 text-black">
              <div className="card-body p-md-5 mx-md-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">User Profile</h4>
                  <span>LogOut</span>
                </div>
                <form>
                  <div className="form-outline">
                    <p className="mb-4">Full Name </p>
                    <p className="mb-4">Email Address</p>
                    <p className="mb-4">Mobile Number </p>
                    <p className="mb-4">Password</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
