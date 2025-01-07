import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import ProductContext from "../../context/Product/ProductContext";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { IS_DEVELOPMENT } from "../../config";
import { useFilters } from "../../hooks/useFilters";

const Ecomerce = () => {
  const { products, getProducts } = useContext(ProductContext);
  const { filterProducts} = useFilters()
  
  const filteredProducts = filterProducts(products);
 
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      { IS_DEVELOPMENT && <Footer /> } 
    </>
  );
};

export default Ecomerce;
