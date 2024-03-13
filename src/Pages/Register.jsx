import React, { useState } from "react";
import json from "../json/register.json";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    admin: false,
  });
  // console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation()
    console.log(formData);
  };

  const handleValidation = (e) => {
    json.forEach((rule)=>{
      const {name,label,type,isrequired} = rule;

      const value = formData[name]
      console.log(value,"PPP")
      if()
      // console.log(rule,"kk")
    })
  }

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const renderedInputs = (item) => {
    switch (item.type) {
      case "text":
        return (
          <div key={item.name} className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example11">
              {item.label}
            </label>
            <input
              type={item.type}
              name={item.name}
              className="form-control"
              placeholder={item.placeholder}
              onChange={handleChange}
            />
          </div>
        );
      case "password":
        return (
          <div key={item.name} className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example22">
              {item.label}
            </label>
            <input
              type={item.type}
              name={item.name}
              className="form-control"
              placeholder={item.placeholder}
              onChange={handleChange}
            />
          </div>
        );
      case "checkbox":
        return (
          <div key={item.name} className="form-check form-switch">
            <label className="form-label px-2" htmlFor="flexSwitchCheckChecked">
              {item.label}
            </label>
            <input
              className="form-check-input "
              type={item.type}
              name={item.name}
              defaultChecked=""
              style={{ width: "50px", height: "22px" }}
              onChange={handleChange}
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
                  <h4 className="mb-5">Register</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  {json.map((item) => renderedInputs(item))}
                  <div className="btns">
                    <button
                      className="btn btn-primary  mb-3 my-3 m-2"
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

export default Register;
