import { AUTH_ACTION_TYPE } from "../actions/types";

export const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPE.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_ACTION_TYPE.AUTH_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AUTH_ACTION_TYPE.AUTH_ERROR:
      localStorage.removeItem("token");  // Limpiar token
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case AUTH_ACTION_TYPE.LOGOUT:
      localStorage.removeItem("token");  // Limpiar token
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
