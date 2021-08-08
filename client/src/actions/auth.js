import { AUTH } from "../constants/actionTypes.js";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    //login
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    history.push("/user");
  } catch (error) {
    console.log(error);
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
