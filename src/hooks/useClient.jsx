import { useContext } from "react";
import ClientContext from "../context/Client/ClientContext";

export const useClient = () => {
    const context = useContext(ClientContext)

    if(context === undefined){
        throw new Error("useClient debe usarse dentro de un AuthProvider");
    }

    return context;
}