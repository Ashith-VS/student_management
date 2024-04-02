import { CURRENT_USER, EDIT_USER } from "../Constants.jsx";

export const CurrentUserAction = (response) => {
  localStorage.setItem("currentUser", JSON.stringify(response));
  return {
    type: CURRENT_USER,
    payload: response,
  };
};

export const EditUser = (response) => {
  return {
    type: EDIT_USER,
    payload: response,
  };
};
