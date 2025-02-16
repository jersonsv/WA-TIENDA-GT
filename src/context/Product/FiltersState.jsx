import { useState } from "react";
import FiltersContext from "./Filters.Context";


// 2. Crear el Provide, para proveer el contexto: este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }) {

  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

    return (
      <FiltersContext.Provider value={{
        filters,
        setFilters 
      }}
      >
        { children }
      </FiltersContext.Provider>
      
    )
}