import { useContext } from "react";
import ProductContext from '../context/Product/ProductContext'

export const useProduct = () => {
    const context = useContext(ProductContext)
    if(context === undefined){
        throw new Error("useProduct debe usarse dentro de un ProductContext.Provider");
    }

    return context;
}