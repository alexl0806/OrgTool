import { AUTH, LOGOUT, PASS_ERROR } from "../constants/actionTypes";

const authReducer = (
  state = { authData: null, error: false, errorMessage: "No errors" },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data, error: false };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };

    case PASS_ERROR:
      return {
        ...state,
        authData: null,
        error: true,
        errorMessage: "Incorrect password!",
      };
    default:
      return state;
  }
};

export default authReducer;
