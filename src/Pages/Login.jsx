import React from "react";

const Login = () => {
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
                <div className="text-center">
                  <h4 className="mt-1 mb-5 pb-1">Login</h4>
                </div>
                <form>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example11">
                      Email
                    </label>
                    <input
                      type="email"
                      id="form2Example11"
                      className="form-control"
                      placeholder="enter your email"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example22">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form2Example22"
                      className="form-control"
                      placeholder="enter your Password"
                    />
                  </div>
                  <div className="pt-1 mb-3 pb-1">
                    <button
                      className="btn btn-primary mb-3 my-3 m-2"
                      type="button"
                    >
                      Submit
                    </button>
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

export default Login;
