import { ActionTypes } from "../constants/action-types";

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
  success: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_START:
    case ActionTypes.LOGIN_START:
    case ActionTypes.LOGOUT_START:
    case ActionTypes.GOOGLE_LOGIN_START:
    case ActionTypes.FORGOT_PASSWORD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        success: true,
        loading: false,
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
      };
    case ActionTypes.REGISTER_SUCCESS:
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
      };
    case ActionTypes.REGISTER_FAIL:
    case ActionTypes.LOGIN_FAIL:
    case ActionTypes.LOGOUT_FAIL:
    case ActionTypes.GOOGLE_LOGIN_FAIL:
    case ActionTypes.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
