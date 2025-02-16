import React, { useReducer } from "react";
import { productReducer, initialState } from "../../reducer/ProductReducer";
import ProductContext from "./ProductContext";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

// 2. Crear el Provider
const ProductState = (props) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const {  authFetch } = useAuth(); // Acceder a contexto de autenticación

  const getProducts = async () => {
    try {
      const res = await authFetch("http://localhost:3001/api/products");
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        getProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
