import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import useProductsContext from "../hooks/useProductsContext";
import ProductList from "../pages/productList";

export default () => {
  const bootstrapProducts = useProducts();
  const { products, setProducts } = useProductsContext();

  useEffect(() => {
    setProducts(bootstrapProducts);
  }, [bootstrapProducts]);

  return <ProductList products={products} />;
};
