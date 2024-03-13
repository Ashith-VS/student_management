import React, { useEffect, useState } from "react";
import json from "../json/register.json";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Register = () => {
  const { editUser } = useSelector((item) => item.Reducers);

  useEffect(() => {
    if (!isEmpty(editUser) && editUser[0]) {
      const { id, name, email, mobile, password, admin } = editUser[0];
      setFormData({
        id: id,
        name: name || "",
        email: email || "",
        mobile: mobile || "",
        password: password || "",
        admin: admin || false,
      });
    }
  }, [editUser]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const id = Date.now();
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    email: "",
    mobile: "",
    password: "",
    admin: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    let storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
    let updatedFormData;

    if (Object.entries(isValid).length === 0) {
      if (editUser && editUser[0]?.id) {
        const editIndex = storedFormData.findIndex(
          (item) => item.id === editUser[0]?.id
        );
        console.log(editIndex, "editIndex");
        if (editIndex) {
          storedFormData[editIndex] = {
            ...formData,
            id: formData.id,
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            admin: formData.admin,
          };
          updatedFormData = storedFormData;
        }
      } else {
        updatedFormData = [...storedFormData, { ...formData }];
      }

      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      navigate("/userManagement");
    }
  };

  const handleValidation = (e) => {
    let error = {};
    json.forEach((rule) => {
      const { name, label, isrequired, ispattern } = rule;
      const value = formData[name];
      if (!value && isrequired) {
        error[name] = `${label} is required`;
      } else if (ispattern && !RegExp(ispattern).test(value)) {
        error[name] = `${label} is Invalid`;
      }
    });
    setErrors(error);
    return error;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const numericValue = value.replace(/\D/g, "");
    name === "mobile"
      ? setFormData({ ...formData, [name]: numericValue })
      : setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
    setErrors({ ...errors, [name]: "" });
  };

  const renderedInputs = (item) => {
    switch (item.type) {
      case "text":
        return (
          <div key={item.name} className="form-outline mb-4">
            <label className="form-label" htmlFor={item.id}>
              {item.label}
            </label>
            <input
              id={item.id}
              type={item.type}
              name={item.name}
              className="form-control"
              placeholder={item.placeholder}
              onChange={handleChange}
              maxLength={item.maxLength}
              value={formData[item.name]}
              disabled={isEmpty(editUser) === false && item.name === "email"}
            />
          </div>
        );
      case "password":
        return (
          <div key={item.name} className="form-outline mb-4">
            <label className="form-label" htmlFor={item.id}>
              {item.label}
            </label>
            <input
              id={item.id}
              type={item.type}
              name={item.name}
              className="form-control"
              placeholder={item.placeholder}
              onChange={handleChange}
              value={formData[item.name]}
            />
          </div>
        );
      case "checkbox":
        return (
          <div key={item.name} className="form-check form-switch">
            <label className="form-label px-2" htmlFor={item.id}>
              {item.label}
            </label>
            <input
              id={item.id}
              className="form-check-input "
              type={item.type}
              name={item.name}
              defaultChecked=""
              style={{ width: "50px", height: "22px" }}
              onChange={handleChange}
              value={formData[item.name]}
            />
          </div>
        );
      default:
        return null;
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
                      {Object.entries(errors).map(([keys, value]) => (
                        <li key={keys} style={{ display: value ? "" : "none" }}>
                          {value}
                        </li>
                      ))}
                    </div>
                  )}
                  <h4 className="mb-5">
                    {isEmpty(editUser) ? "Register" : "UserDetails"}
                  </h4>
                </div>
                <form onSubmit={handleSubmit}>
                  {json?.map((item) => renderedInputs(item))}
                  <div className="btns">
                    <button
                      className="btn btn-primary  mb-3 my-3 m-2"
                      type="submit"
                    >
                      {isEmpty(editUser) ? "Create" : "Update"}
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

export default Register;
