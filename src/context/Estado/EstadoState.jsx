import { ESTADO_ACTION_TYPES } from "../../actions/types";
import React, { useReducer } from "react";
import { useAuth } from "../../hooks/useAuth";
import EstadoContext from "./EstadoContext";
import { estadoReducer, initialState } from "../../reducer/EstadoReducer";

const EstadoState = ({ children }) => {
  const [state, dispatch] = useReducer(estadoReducer, initialState);
  const { authFetch } = useAuth();

  const getEstados = async () => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/estado"
      );
      dispatch({
        type: ESTADO_ACTION_TYPES.GET_ESTADOS,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error al obtener estados", error.message);
    }
  };

  const getEstado = async (estadoID) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/estado/" + estadoID
      );
      dispatch({
        type: ESTADO_ACTION_TYPES.GET_ESTADO,
        payload: res.data[0],
      });
    } catch (error) {
      console.log("Error al obtener estado ", error.message);
    }
  };

  const addEstado = async (detalleEstado) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/estado",
        {
          method: "POST",
          body: detalleEstado,
        }
      );

      dispatch({
        type: ESTADO_ACTION_TYPES.ADD_ESTADO,
        payload: res,
      });
    } catch (error) {
      console.log("Error al guardar estado ", error.message);
    }
  };

  const updateEstado = async (detalleEstado) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/estado",
        {
          method: "PUT",
          body: detalleEstado,
        }
      );

      dispatch({
        type: ESTADO_ACTION_TYPES.UPDATE_ESTADO,
        payload: res,
      });
    } catch (error) {
      console.log("Error al actualizar estado: ", error.message);
    }
  };

  const deleteEstado = async (estadoID) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/estado/" + estadoID,
        {
          method: "DELETE"
        }
      );

      dispatch({
        type: ESTADO_ACTION_TYPES.DELETE_ESTADO,
        payload: res,
      });
    } catch (error) {
      console.log("Error al elminar estado: ", error.message);
    }
  };

  return (
    <EstadoContext.Provider
      value={{
        ...state,
        getEstados,
        getEstado,
        addEstado,
        updateEstado,
        deleteEstado
      }}
      >
        { children }
      </EstadoContext.Provider>
  );
};

export default EstadoState;
