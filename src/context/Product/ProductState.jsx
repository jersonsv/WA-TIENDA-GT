import React, { useReducer} from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import axios from "axios";

// 2. Crear el Provide, para proveer el contexto
const ProductState = (props) => {
    const initialState = {
        products: []
    }

    const [state, dispatch]= useReducer(ProductReducer, initialState)

    const getProducts = async () => {
        const res = await axios.get('http://localhost:3001/api/products')
        dispatch({
         type: 'GET_PRODUCTS',
         payload: res.data.data
        })
     }

     return(
        <ProductContext.Provider value={{
            products: state.products,
            getProducts
        }}>
            { props.children }
        </ProductContext.Provider>
     )
}

export default ProductState;