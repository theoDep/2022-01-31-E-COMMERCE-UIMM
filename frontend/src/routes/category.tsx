import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductsCategory } from "../hooks/useProducts";
import useProductsContext from "../hooks/useProductsContext";
import ProductList from "../pages/productList";

export default () => {
  const { category } = useParams();
  const bootstrapProducts = useProductsCategory(category);
  const { products, setProducts } = useProductsContext();

  useEffect(() => {
    setProducts(bootstrapProducts);
  }, [bootstrapProducts]);

  return <ProductList products={products} category={category} />;
};
