import { useContext } from "react";
import { CartContext } from "../context/Cart/cart";

export const useCart = () => {
  const context = useContext(CartContext)

  if(context === undefined){
    throw new Errot('useCart debe usarse dentro de un CartProvider')
  }

  return context
}