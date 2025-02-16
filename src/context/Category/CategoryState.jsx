import { CATEGORY_ACTION_TYPES } from "../../actions/types";
import React, { useReducer } from "react";
import { useAuth } from "../../hooks/useAuth";
import CategoryContext from "./CategoryContext";
import { categoryReducer, initialState } from "../../reducer/CategoryReducer";

const CategoryState = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const { authFetch } = useAuth();

  const getCategorys = async () => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/categoriaProducto"
      );
      dispatch({
        type: CATEGORY_ACTION_TYPES.GET_CATEGORYS,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error al obtener categorias", error.message);
    }
  };

  const getCategory = async (categoriaID) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/categoriaProducto/" + categoriaID
      );
      dispatch({
        type: CATEGORY_ACTION_TYPES.GET_CATEGORY,
        payload: res.data[0],
      });
    } catch (error) {
      console.log("Error al obtener categoria ", error.message);
    }
  };

  const addCategory = async (categoriaProducto) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/categoriaProducto",
        {
          method: "POST",
          body: categoriaProducto,
        }
      );

      dispatch({
        type: CATEGORY_ACTION_TYPES.ADD_CATEGORY,
        payload: res,
      });
    } catch (error) {
      console.log("Error al guardar categoria ", error.message);
    }
  };

  const updateCategory = async (categoriaProducto) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/categoriaProducto",
        {
          method: "PUT",
          body: categoriaProducto,
        }
      );

      dispatch({
        type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY,
        payload: res,
      });
    } catch (error) {
      console.log("Error al actualizar categoria: ", error.message);
    }
  };

  const deleteCategory = async (categoriaProductoDelete) => {
    try {
      const res = await authFetch(
        "http://localhost:3001/api/products/eliminarCategoriaProducto",
        {
          method: "POST",
          body: categoriaProductoDelete,
        }
      );

      dispatch({
        type: CATEGORY_ACTION_TYPES.DELETE_CATEGORY,
        payload: res,
      });
    } catch (error) {
      console.log("Error al elminar categoria");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        ...state,
        getCategory,
        getCategorys,
        addCategory,
        updateCategory,
        deleteCategory
      }}
      >
        { children }
      </CategoryContext.Provider>
  );
};

export default CategoryState;
