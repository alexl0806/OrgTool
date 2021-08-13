import { AUTH, PASS_ERROR } from "../constants/actionTypes.js";
import * as api from "../api";

const passError = () => {
  return {
    type: PASS_ERROR,
  };
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    //login
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    history.push("/user");
  } catch (err) {
    dispatch(passError());
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign up
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/login");
  } catch (error) {
    console.log(error);
  }
};

export const forgetpass = (formData, history) => async (dispatch) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
