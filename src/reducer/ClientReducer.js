import { CLIENT_ACTION_TYPES } from "../actions/types";

export const initialState = {
  clients: [],
  selectClient: [],
};

export const clientReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case CLIENT_ACTION_TYPES.GET_CLIENTS:
      return {
        ...state,
        clients: payload,
      };
    case CLIENT_ACTION_TYPES.GET_CLIENT:
      return {
        ...state,
        selectClient: payload,
      };
    default:
      return state;
  }
};
