import { CURRENT_USER, EDIT_USER } from "../Constants";

export const CurrentUserAction = (response) => {
  console.log(response);
  localStorage.setItem("currentUser", JSON.stringify(response));
  return {
    type: CURRENT_USER,
    payload: response,
  };
};

export const EditUser = (response) => {
  console.log(response);
  return {
    type: EDIT_USER,
    payload: response,
  };
};
