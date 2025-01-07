import { useContext } from "react";
import { FiltersContext } from "../context/Product/filters";


export function useFilters() {
  
    const {filters, setFilters } = useContext(FiltersContext);
  
    const filterProducts = (products) => {
      return products.filter((product) => {
        return (
          product.Precio >= filters.minPrice &&
          (filters.category === "all" || product.Categoria === filters.category)
        );
      });
    };
  
    return { filters, filterProducts, setFilters };
  }