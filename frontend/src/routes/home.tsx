import ProductList from "../pages/ProductList";
import { useProductsBest } from "../hooks/useProducts";

export default () => {
  const products = useProductsBest();
  return <ProductList products={products} />;
};
