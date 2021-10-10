import { ActionTypes } from "../constants/action-types";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST_INITIAL_VALUE:
      return {
        ...state,
        success: false,
        loading: false,
        error: "",
      };
    case ActionTypes.ADD_POST_START:
      return {
        ...state,
        error: "",
        success: false,
        loading: true,
      };
    case ActionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        error: "",
        success: true,
        loading: false,
      };
    case ActionTypes.ADD_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
};
