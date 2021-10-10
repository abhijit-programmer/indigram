import { ActionTypes } from "../constants/action-types";

//add post state
export const addPostInitialize = () => ({ type: ActionTypes.ADD_POST_INITIAL_VALUE });
export const addPostStart = () => ({ type: ActionTypes.ADD_POST_START });
export const addPostSuccess = () => ({ type: ActionTypes.ADD_POST_SUCCESS });

export const addPostFail = (error) => ({
  type: ActionTypes.ADD_POST_FAIL,
  payload: error,
});
