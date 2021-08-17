import {
  AUTH,
  PASS_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from "../constants/actionTypes.js";
import * as api from "../api";

const passError = () => {
  return {
    type: PASS_ERROR,
  };
};

const userNotFoundError = () => {
  return {
    type: USER_NOT_FOUND_ERROR,
  };
};

const userAlreadyExistsError = () => {
  return {
    type: USER_ALREADY_EXISTS_ERROR,
  };
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    //login
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    history.push("/user");
  } catch (error) {
    switch (error.response.data.message) {
      case "Password Incorrect":
        dispatch(passError());
        break;
      case "User Does Not Exist":
        dispatch(userNotFoundError());
        break;
      default:
        console.log(error.response);
    }
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign up
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/login");
  } catch (error) {
    switch (error.response.data.message) {
      case "Password Do Not Match":
        break;
      case "A User With That Email Already Exists":
        dispatch(userAlreadyExistsError());
        break;
      default:
        console.log(error.response);
    }
  }
};

export const forgetpass = (formData, history) => async (dispatch) => {
  try {
    //forget password
    const { data } = await api.forgetPass(formData);
    dispatch({ type: AUTH, data});
    history.push("/resetPass");

  } catch (error) {
    switch(error.response.data.message) {
      case "User Does Not Exist":
        dispatch(userNotFoundError());
        break;
      default:
        console.log(error.response);
    }
  }
};
