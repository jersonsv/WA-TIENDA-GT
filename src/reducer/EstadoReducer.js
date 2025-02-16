import { ESTADO_ACTION_TYPES } from "../actions/types";

export const initialState = {
  estados: [],
  selectEstado: []
}

export const estadoReducer = (state, action) => {
  const {payload, type } = action

  switch(type) {
    case ESTADO_ACTION_TYPES.GET_ESTADOS:
      return {
        ...state,
        estados: payload
      };
    case ESTADO_ACTION_TYPES.GET_ESTADO:
      return {
        ...state,
        selectEstado: payload
      }
    case ESTADO_ACTION_TYPES.ADD_ESTADO:
      return {
        ...state,
        estados: [...state.estados, payload]
      }
    case ESTADO_ACTION_TYPES.UPDATE_ESTADO:
      return {
        ...state,
        estados: state.estados.map(estado => 
         estado.EstadoID === payload.EstadoID ? payload : estado
        )
      }
    case ESTADO_ACTION_TYPES.DELETE_ESTADO:
      return {
        ...state,
        estados: state.estados.filter( estado =>
          estado.EstadoID !== payload.EstadoID
        )
      }
    default:
      return state;
  }
};