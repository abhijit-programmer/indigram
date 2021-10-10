import { ActionTypes } from "../constants/action-types";

const initialState = {
  data: {},
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
