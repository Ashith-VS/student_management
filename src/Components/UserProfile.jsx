import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  
  const { currentUser } = useSelector((state) => state.Reducers);
  const currentUserEmail = currentUser.email;
  const [myStorage, setMyStorage] = useState([]);

  useEffect(() => {
    setMyStorage(JSON.parse(localStorage.getItem("formData")));
  }, []);
  
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
                  <span
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      window.location.replace("/");
                      // window.location.reload();
                      // navigate("/");
                    }}
                  >
                    LogOut
                  </span>
                </div>
                <form>
                  {Array.isArray(myStorage) &&myStorage?.filter((item) => item.email === currentUserEmail)
                    .map((item, i) => (
                      <div key={i} className="form-outline">
                        <p className="mb-4">Full Name : {item.name}</p>
                        <p className="mb-4">Email Address : {item.email}</p>
                        <p className="mb-4">Mobile Number: {item.mobile} </p>
                      </div>
                    ))}
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
