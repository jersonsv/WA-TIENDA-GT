import { ORDEN_ACTION_TYPES } from "../actions/types";

export const initialState = {
  ordenes: [],
  selectedOrden: null,
};

export const ordenReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ORDEN_ACTION_TYPES.GET_ORDENES:
      return {
        ...state,
        ordenes: payload,
      };
    case ORDEN_ACTION_TYPES.GET_ORDEN:
      return {
        ...state,
        selectedOrden: payload,
      };
    case ORDEN_ACTION_TYPES.ADD_ORDEN:
      return {
        ...state,
        ordenes: [...state.ordenes, payload],
      };
    case ORDEN_ACTION_TYPES.UPDATE_STATE_ORDEN:
      return {
        ...state,
        ordenes: state.ordenes.map((orden) =>
          orden.id === payload.ordenId
            ? { ...orden, stateId: payload.newStateId }
            : orden
        ),
      };
    default:
      return state;
  }
};
