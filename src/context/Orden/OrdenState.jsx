import { ORDEN_ACTION_TYPES } from "../../actions/types";
import React, { useReducer } from "react";
import { ordenReducer, initialState } from "../../reducer/OrdenReducer";
import { useAuth } from "../../hooks/useAuth";
import OrdenContext from "./OrdenContext";

const OrdenState = ({ children }) => {
  const [state, dispatch] = useReducer(ordenReducer, initialState);
  const { authFetch } = useAuth();

  const getOrdenes = async () => {
    try {
      const res = await authFetch("http://localhost:3001/api/orden");
      dispatch({
        type: ORDEN_ACTION_TYPES.GET_ORDENES,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
    }
  };

  const getOrden = async (ordenID) => {
    try {
      const res = await authFetch("http://localhost:3001/api/orden/" + ordenID);
      dispatch({
        type: ORDEN_ACTION_TYPES.GET_ORDEN,
        payload: res.data[0],
      });
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
    }
  };

  const addOrden = async (detallOrden) => {
    try {
      const res = await authFetch("http://localhost:3001/api/orden", {
        method: "POST",
        body: detallOrden,
      });

      dispatch({
        type: ORDEN_ACTION_TYPES.ADD_ORDEN,
        payload: res,
      });
      return res;
    } catch (error) {
      console.error("Error al guardar ordenes:", error.message);
      throw error;
    }
  };

  const updateStateOrden = async (detallOrden) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/orden/cambiarEstado",
        {
          method: "PUT",
          body: detallOrden,
        }
      );

      if (res.status === 200) {
        dispatch({
          type: ORDEN_ACTION_TYPES.UPDATE_STATE_ORDEN,
          payload: {
            ordenId: detallOrden.ordenID,
            newStateId: detallOrden.estadoID || 4,
          },
        });
        return res.data;
      } else {
        throw new Error(
          "Ocurrio un error al momento de actualizar estado de la orden"
        );
      }
    } catch (error) {
      console.error("Error al actulizar orden :", error.message);
      throw error;
    }
  };

  return (
    <OrdenContext.Provider
      value={{
        ...state,
        getOrdenes,
        getOrden,
        addOrden,
        updateStateOrden,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
};

export default OrdenState;
