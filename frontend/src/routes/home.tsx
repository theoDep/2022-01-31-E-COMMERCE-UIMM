import Card from "../components/card";
import Carousel from "../components/carousel";
import ContentBox from "../components/content-box";
import HorizonDivider from "../components/horizon-divider";

export default () => {
  return (
    <>
      <Carousel />
      <HorizonDivider />
      <ContentBox content="Nos meilleures ventes" />
      <HorizonDivider />
      <Card />
      <Card />
    </>
  );
};
