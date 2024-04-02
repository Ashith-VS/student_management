import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrentUserAction } from "../Redux/Action/Action.jsx";

const Login = () => {
  const [myStorage, setMyStorage] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const adminDetails = [
    {
      id: Date.now().toString(),
      name: "Admin",
      email: "admin@gmail.com",
      phone: "4567891234",
      password: "123",
      role: "admin",
    },
  ];
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(adminDetails));
  }, []);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    const formDatas = JSON.parse(localStorage.getItem("formData"));
    setMyStorage({ adminData, formDatas });
  }, []);

  const { adminData, formDatas } = myStorage;

  const handleValidation = () => {
    let error = {};
    inputs.forEach((rule) => {
      const { name, label, ispattern, isrequired } = rule;
      const value = formData[name];
      if (!value && isrequired) {
        error[name] = `${label} is required`;
      } else if (ispattern && !RegExp(ispattern).test(value)) {
        error[name] = `${label} is invalid`;
      }
    });
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result =
      Array.isArray(adminData) &&
      adminData?.find(
        (item) =>
          item.email === formData.email && item.password === formData.password
      );
    const response =
      Array.isArray(formDatas) &&
      formDatas?.find(
        (item) =>
          item.email === formData.email && item.password === formData.password
      );

    let error = handleValidation();
    setErrors(error);
    if (Object.keys(error).length === 0) {
      inputs.forEach((rule) => {
        const { name } = rule;
        const value = formData[name];
        if (
          value !== adminData?.[name] &&
          !formDatas?.some((item) => item[name] === value)
        ) {
          error.email = "Invalid email/password";
        }
      });
    }

    if (result?.role === "admin") {
      navigate("/userManagement");
      dispatch(CurrentUserAction(result));
    } else if (response?.role === "manager") {
      navigate("/userManagement");
      dispatch(CurrentUserAction(response));
    } else if (response?.role === "user") {
      navigate("/userProfile");
      dispatch(CurrentUserAction(response));
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
                      type="submit"
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
