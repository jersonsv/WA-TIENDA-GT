import { useContext } from "react";
import { CartContext } from "../context/Cart/cart";

export const useCart = () => {
  const context = useContext(CartContext)

  if(context === undefined){
    throw new Errot('useCart must be used within a CartProvider')
  }

  return context
}