import { UPDATE_USER } from "../constants/actionTypes";

export default (user = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    default:
      return user;
  }
};
