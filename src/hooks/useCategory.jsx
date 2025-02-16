import { useContext } from "react";
import CategoryContext from "../context/Category/CategoryContext";

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if(context === undefined){
    throw new Error("useCategory debe de usarse dentro de un AuthProvider");
  }

  return context;
}