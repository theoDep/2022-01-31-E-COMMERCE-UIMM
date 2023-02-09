import { useParams } from "react-router-dom";
import { useProductsCategory } from "../hooks/useProducts";
import ProductList from "../pages/productList";

export default () => {
  const { category } = useParams();
  const products = useProductsCategory(category);
  return <ProductList products={products} category={category} />;
};
