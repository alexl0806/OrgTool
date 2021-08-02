import { combineReducers } from "redux";

import todos from "./todos.js";
import authReducer from "./auth.js";

export default combineReducers({
  todos,
  authReducer,
});
