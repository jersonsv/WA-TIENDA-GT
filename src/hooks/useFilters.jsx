import { useContext } from "react";
import FiltersContext  from "../context/Product/Filters.Context";


export function useFilters() {
  
    const {filters, setFilters } = useContext(FiltersContext);
  
    const filterProducts = (products) => {
      console.log('products que llega a filter', products)
      console.log('filters valores',filters)
      return products.filter((product) => {
        return (
          product.Precio >= filters.minPrice &&
          (filters.category === "all" || product.Categoria === filters.category)
        );
      });
    };
  
    return { filters, filterProducts, setFilters };
  }