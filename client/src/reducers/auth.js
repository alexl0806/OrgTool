import {
  AUTH,
  LOGOUT,
  PASS_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from "../constants/actionTypes";

const authReducer = (
  state = { authData: null, error: false, errorMessage: "No errors" },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return {
        ...state,
        authData: action?.data,
        error: false,
        errorMessage: "No errors",
      };

    case LOGOUT:
      localStorage.clear();

      return {
        ...state,
        authData: null,
        error: false,
        errorMessage: "No errors",
      };

    case PASS_ERROR:
      return {
        ...state,
        authData: null,
        error: true,
        errorMessage: "Incorrect password",
      };
    case USER_NOT_FOUND_ERROR:
      return {
        ...state,
        authData: null,
        error: true,
        errorMessage: "User not found",
      };
    case USER_ALREADY_EXISTS_ERROR:
      return {
        ...state,
        authData: null,
        error: true,
        errorMessage: "A User With That Email Already Exists",
      };
    default:
      return state;
  }
};

export default authReducer;
