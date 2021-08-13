import { UPDATE_USER } from "../constants/actionTypes";
import * as api from "../api";

//Action Creators
export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);

    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
