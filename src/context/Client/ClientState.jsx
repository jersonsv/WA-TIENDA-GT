import { CLIENT_ACTION_TYPES } from "../../actions/types";
import React, { useReducer } from "react";
import { clientReducer, initialState } from "../../reducer/ClientReducer";
import { useAuth } from "../../hooks/useAuth";
import ClientContext from "./ClientContext";

const ClientState = ({ children }) => {
  const [state, dispatch] = useReducer(clientReducer, initialState);
  const { authFetch } = useAuth();

  const getClients = async () => {
    try {
      const res = await authFetch("http://localhost:3001/api/cliente");
      dispatch({
        type: CLIENT_ACTION_TYPES.GET_CLIENTS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
    }
  };

  const getClient = async ( clienteID ) => {
    try {
      console.log('Llego aqui: el cliente id ', clienteID)
      const res = await authFetch('http://localhost:3001/api/cliente/'+ clienteID);
      dispatch({
        type: CLIENT_ACTION_TYPES.GET_CLIENT,
        payload: res.data[0]
      });
      
    } catch (error) {
      console.error("Error al obtener el cliente:", error.message);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        ...state,
        getClients,
        getClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientState;
