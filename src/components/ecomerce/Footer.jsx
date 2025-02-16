import { useCart } from "../../hooks/useCart"
import { useFilters } from "../../hooks/useFilters"

export function Footer () {
  
  const { filters } = useFilters()
  const { cart } = useCart()
  return (
    <footer>
      {/* {
        JSON.stringify(filters,null, 2)
      } */}

      {
        JSON.stringify(cart, null, 2)
      }
      
      {/* <h4>Prueba tecnica de React * - 
      <span>@misalvador</span>
      </h4>
      <h5>Shopping Cart con usceContect y useReducer</h5> */}
    </footer>
  )
}