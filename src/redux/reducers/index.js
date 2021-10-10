import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { userDataReducer } from "./userDataReducer";

const rootReducer = combineReducers({
  user: authReducer,
  user_data: userDataReducer,
  post_state: postReducer,
});

export default rootReducer;