import { AUTH_ACTION_TYPE } from "../../actions/types";
import React, { useReducer } from "react";
import { authReducer, initialState } from "../../reducer/AuthReducer";
import axios from "axios";
import AuthContext from "./AuthContext";

// 2. Creando el provider
const AuthState = ( { children } ) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /* Login */
  const login = async (credentials) => {
    try {

      dispatch({ type: AUTH_ACTION_TYPE.AUTH_START });
  
      const response = await axios.post("http://localhost:3001/api/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = response.data;
      if (response.status === 200) { 
        //localStorage.setItem("token", data.data.token);
        
        console.log('Token recibido:', data.data.token); // Verifica que hay token

        dispatch({
          type: AUTH_ACTION_TYPE.AUTH_SUCCESS,
          payload: { 
            user: data.data.usuario, 
            token: data.data.token 
          }
        });

        return { success: true, user: data.data.usuario };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error en el login:", error.message);
      dispatch({ type: AUTH_ACTION_TYPE.AUTH_ERROR, payload: error.message });
      return { success: false, message: error.message };
    }
  };
  

  /* Logout */
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: AUTH_ACTION_TYPE.LOGOUT });
  };
 

  /* Cliente HTTP autenticado */
  const authFetch = async (url, options = {}) => {
     // Verifica y muestra el token al momento de la petición
    console.log('Token en authFetch:', state.token);
    
    if (!state.token) {
      console.log("No hay token disponible");
      throw new Error("Token no valido");
    }
  
    try {
      const response = await axios({
        url,
        method: options.method || "GET",
        data: options.body || null,     // Cuerpo de la solicitud
        headers: {
          Authorization: `Bearer ${state.token}`,
          ...options.headers, // encabezados personalizados
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error en authFetch:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;