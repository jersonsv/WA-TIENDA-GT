import { useContext } from "react";
import OrdenContext from "../context/Orden/OrdenContext";

export const useOrden = () => {
    const context = useContext(OrdenContext)
    if(context === undefined){
        throw new Error("useClient debe usarse dentro de un AuthProvider");
    }

    return context;
}