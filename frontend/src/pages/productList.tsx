import { Link } from "react-router-dom";
import Card from "../components/card";
import Carousel from "../components/carousel";
import ContentBox from "../components/content-box";
import HorizonDivider from "../components/horizon-divider";
import Select from "../components/select";
import useCategories from "../hooks/useCategories";

export default ({ products, category = "" }) => {
  const categories = useCategories();

  return (
    <>
      <Carousel />
      <HorizonDivider content="" />
      <ContentBox content={`A selection of our best ${category} products !`} />
      <Select options={categories} />
      <HorizonDivider content="" />
      {products &&
        products.map((product) => (
          <Link
            to={`/products/${product.attributes.category.data.attributes.name}/${product.id}`}
          >
            <Card key={product.id} product={product} />
          </Link>
        ))}
    </>
  );
};
