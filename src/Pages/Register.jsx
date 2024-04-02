import React, { useEffect, useState } from "react";
import json from "../json/register.json";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Breadcrumb from "../Components/Breadcrumb.jsx";
import { PhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

const Register = () => {
  const { editUser, currentUser } = useSelector((item) => item.Reducers);

  const [myStorage, setMyStorage] = useState([]);
  const [show, setShow] = useState(false);
  const [validationOff, setValidationOff] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      setShow((await currentUser.role) === "admin" && true);
    };
    currentUser?.role === "admin" && getCurrentUser();
  }, [currentUser]);

  useEffect(() => {
    const getCurrentUser = async () => {
      setShow((await currentUser.role) === "manager" && true);
    };
    currentUser?.role === "manager" && getCurrentUser();
  }, [currentUser]);

  useEffect(() => {
    const getCurrentUser = async () => {
      setShow((await currentUser.role) === "user" && false);
    };
    currentUser?.role === "user" && getCurrentUser();
  }, [currentUser]);

  useEffect(() => {
    try {
      setMyStorage(JSON.parse(localStorage.getItem("formData")));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(editUser) && editUser[0]) {
      const { id, name, email, mobile, password, role, manager, image } =
        editUser[0];

      setFormData({
        id: id,
        name: name || "",
        email: email || "",
        mobile: mobile || "",
        password: password || "",
        role: role || "",
        manager: manager || "",
        image: image || "",
      });
    }
  }, [editUser]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    manager: "",
    image: "",
  });

  const handleValidation = (e) => {
    const res = JSON.parse(localStorage.getItem("formData"));
    let error = {};
    try {
      json.forEach((rule) => {
        const { name, label, isrequired, ispattern } = rule;
        const value = formData[name];
        if (!value && isrequired) {
          error[name] = `${label} is required`;
        } else if (ispattern && !RegExp(ispattern).test(value)) {
          error[name] = `${label} is Invalid`;
        } else if (name === "mobile") {
          const isValid = isValidPhoneNumber(`+91${value}`, "IN");
          if (!isValid || !/^6|7|8|9/.test(value.charAt(0))) {
            error[name] = "Invalid mobile number";
          }
        } else if (
          currentUser?.role === "user" || (editUser && editUser[0])
            ? validationOff
            : res?.find((item) => item.email === formData.email)
        ) {
          error.email = "email is already exit";
        } else if (
          currentUser?.role === "user" || (editUser && editUser[0])
            ? validationOff
            : formData?.role === "user" && name === "manager" && !value
        ) {
          error.manager = "Manager is required";
        }
      });
      return error;
    } catch (error) {
      console.error(error, "validation failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = handleValidation();
    setErrors(error);
    let storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
    let updatedFormData;

    if (Object.values(error).length === 0) {
      if (editUser && editUser[0]?.id) {
        const editIndex = storedFormData.findIndex(
          (item) => item.id === editUser[0]?.id
        );

        if (editIndex) {
          storedFormData[editIndex] = {
            ...formData,
            id: formData.id,
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            role: formData.role,
            manager: formData.manager,
            image: formData.image,
          };
          updatedFormData = storedFormData;
        }
      } else {
        updatedFormData = [...storedFormData, { ...formData }];
      }
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
      currentUser.role === "user"
        ? navigate("/userProfile")
        : navigate("/userManagement");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, id } = e.target;
    const numericValue = value.replace(/\D/g, "");
    name === "mobile"
      ? setFormData({ ...formData, [name]: numericValue })
      : setFormData({ ...formData, [name]: type === "radio" ? id : value });
    setErrors({ ...errors, [name]: "" });
  };

  const filetoBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const base64 = await filetoBase64(files[0]);
      setFormData({
        ...formData,
        [name]: { file: base64, name: files[0] && files[0].name },
      });
    }
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
              value={formData[item.id]}
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
      case "radio":
        return (
          show && (
            <div key={item.label} className="form-outline mb-4">
              <label className="form-label" htmlFor={item.label}>
                {item.label}
              </label>
              <br />
              {item.option.map((option, i) => (
                <div key={i} className="form-check form-check-inline">
                  <input
                    id={option.id}
                    className="form-check-input"
                    type={
                      currentUser.role === "manager" &&
                      option.label === "Manager"
                        ? "hidden"
                        : option.type
                    }
                    name={option.name}
                    onChange={handleChange}
                    checked={formData.role === option.id}
                  />
                  <label className="form-check-label" htmlFor={option.id}>
                    {currentUser.role === "manager" &&
                    option.label === "Manager"
                      ? ""
                      : option.label}
                  </label>
                </div>
              ))}
            </div>
          )
        );
      case "select":
        const roleResult = myStorage?.filter((res) => res.role === "manager");
        return (
          show &&
          formData.role === "user" && (
            <div key={item.name} className="form-outline mb-4">
              <label className="form-label" htmlFor={item.id}>
                {item.label}
              </label>
              <select
                id={item.id}
                name={item.name}
                className="form-control"
                onChange={handleChange}
                value={formData[item.name]}
                type={item.type}
              >
                <option value="" disabled>
                  Select a manager
                </option>
                {currentUser?.role === "manager" ? (
                  <option value={currentUser?.name}>{currentUser?.name}</option>
                ) : (
                  roleResult?.map((option, i) => (
                    <option key={i} value={option.name}>
                      {option.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          )
        );
      case "file":
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
              onChange={handleFileUpload}
            />
            {/* <p>{!isEmpty(editUser) && formData.image?.name}</p> */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section
        className="gradient-form d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="card rounded-3 text-black">
                <Breadcrumb />
                <div className="card-body  mx-md-4">
                  <div className="text-center">
                    {Object.keys(errors).length > 0 && (
                      <div
                        style={{
                          background: "rgb(230, 190, 199)",
                        }}
                      >
                        {Object.entries(errors).map(([keys, value]) => (
                          <li
                            key={keys}
                            style={{ display: value ? "" : "none" }}
                          >
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
    </>
  );
};

export default Register;
