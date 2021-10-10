import { ActionTypes } from "../constants/action-types";

//set user data
export const setUserData = (data) => ({
  type: ActionTypes.SET_USER_DATA,
  payload: data,
});
