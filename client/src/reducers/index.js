import { combineReducers } from "redux";

import todos from "./todos.js";
import authReducer from "./auth.js";
import user from "./user.js";

export default combineReducers({
  todos,
  authReducer,
  user,
});
