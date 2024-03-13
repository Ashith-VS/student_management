import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrentUserAction } from "../Redux/Action/Action";
import { isEmpty } from "lodash";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myStorage, setMyStorage] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setMyStorage(JSON.parse(localStorage.getItem("formData")));
  }, []);

  const handleValidation = (result, response) => {
    let error = {};
    inputs.forEach((rule) => {
      const { name, label, ispattern, isrequired } = rule;
      const value = formData[name];
      if (!value && isrequired) {
        error[name] = `${label} is required`;
      } else if (ispattern && !RegExp(ispattern).test(value)) {
        error[name] = `${label} is invalid`;
      } else if (name === "email" && result === undefined) {
        error[name] = `enter a valid ${label}`;
      } else if (name === "password" && response === undefined) {
        error[name] = `enter a valid ${label}`;
      } else {
        error[name] = "";
      }
    });
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result =
      Array.isArray(myStorage) &&
      myStorage?.find((item) => item.email === formData.email);
    const response =
      Array.isArray(myStorage) &&
      myStorage?.find(
        (item) =>
          item.password === formData.password && item.email === formData.email
      );
    let error = await handleValidation(result, response);
    if (!isEmpty(error)) {
      setErrors(error);
    }

    console.log(result?.admin && response?.admin);

    if (result?.admin === false && response?.admin === false) {
      navigate("/userProfile");
      dispatch(CurrentUserAction(result));
    } else if (result?.admin && response?.admin === true) {
      navigate("/userManagement");
      dispatch(CurrentUserAction(result));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const inputs = [
    {
      id: "email",
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "enter your email",
      isrequired: true,
      ispattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "enter your password",
      isrequired: true,
    },
  ];

  const renderedInputs = (item, i) => {
    if (item.type === "password") {
      return (
        <div key={i} className="form-outline mb-4">
          <label className="form-label" htmlFor={item.id}>
            {item.label}
          </label>
          <input
            id={item.id}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            className="form-control"
            onChange={handleChange}
            value={formData?.password}
          />
        </div>
      );
    } else if (item.type === "text") {
      return (
        <div key={i} className="form-outline mb-4">
          <label className="form-label" htmlFor={item.id}>
            {item.label}
          </label>
          <input
            id={item.id}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            className="form-control"
            onChange={handleChange}
            value={formData?.email}
          />
        </div>
      );
    }
  };

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
                  {Object.keys(errors).length > 0 && (
                    <div
                      style={{
                        background: "rgb(230, 190, 199)",
                      }}
                    >
                      {Object.entries(errors).map(([key, value]) => (
                        <li key={key} style={{ display: value ? "" : "none" }}>
                          {value}
                        </li>
                      ))}
                    </div>
                  )}
                  <h4 className="mt-1 mb-5 pb-1">Login</h4>
                </div>
                <form>
                  {inputs.map((item, i) => renderedInputs(item, i))}
                  <div className="pt-1 mb-3 pb-1">
                    <button
                      className="btn btn-primary mb-3 my-3 m-2"
                      onClick={handleSubmit}
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
