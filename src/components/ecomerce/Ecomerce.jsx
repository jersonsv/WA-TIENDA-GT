import React, { useContext, useEffect } from "react";
import Products from "./Products";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { IS_DEVELOPMENT } from "../../config";
import { useFilters } from "../../hooks/useFilters";
import { useProduct } from "../../hooks/useProduct";
import { Cart } from "./cart/Cart";

const Ecomerce = () => {
  const { products, getProducts } = useProduct();
  const { filterProducts} = useFilters()
  
  const filteredProducts = filterProducts(products);
 
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      { IS_DEVELOPMENT && <Footer /> } 
    </>
  );
};

export default Ecomerce;
