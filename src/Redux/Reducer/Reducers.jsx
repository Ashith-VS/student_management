import { CURRENT_USER, EDIT_USER } from "../Constants.jsx";

const initialState = {
  admin: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || [],
  editUser: [],
};
console.log(initialState.currentUser);
export default function Reducers(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case EDIT_USER:
      return {
        ...state,
        editUser: action.payload,
      };

    default:
      return state;
  }
}
