import { useContext } from "react";
import EstadoContext from "../context/Estado/EstadoContext";

export const useEstado = () => {
  const context = useContext(EstadoContext);
  if(context === undefined){
    throw new Error("useEstado debe de usarse dentro de un AuthProvider");
  }

  return context;
}