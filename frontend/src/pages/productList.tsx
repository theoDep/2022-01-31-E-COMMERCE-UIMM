import { Link } from "react-router-dom";
import Card from "../components/card";
import Carousel from "../components/carousel";
import ContentBox from "../components/content-box";
import HorizonDivider from "../components/horizon-divider";

export default ({ products, category }) => {
  const categoryPath = category === "all" ? "" : category;
  return (
    <>
      <Carousel />
      <HorizonDivider content="" />
      <ContentBox content={`A selection of our best ${category} products !`} />
      <HorizonDivider content="" />
      {products &&
        products.map((product) => (
          <Link to={`/products/${categoryPath}/${product.id}`}>
            <Card key={product.id} product={product} />
          </Link>
        ))}
    </>
  );
};
