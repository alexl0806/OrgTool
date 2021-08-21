import decode from "jwt-decode";
import { LOGOUT } from "../constants/actionTypes.js";

export const isLogin = () => {
  if (localStorage.getItem("profile")) return true;

  return false;
};

export const checkToken = (user, setUser, dispatch, history) => {
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch({ type: LOGOUT });

      history.push("/login");

      setUser(null);
    }
  }

  setUser(JSON.parse(localStorage.getItem("profile")));
};
