import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/breadcrumbs";
import DetailsCard from "../components/details-card";

export default () => {
  let currentPath = useLocation();
  currentPath = currentPath.pathname
    .substring(1, currentPath.length)
    .split("/");

  return (
    <>
      <Breadcrumbs currentPath={currentPath} />
      <div className="container p-5">
        <DetailsCard
          img="https://picsum.photos/seed/picsum/300"
          price="20.00"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate massa eu magna suscipit interdum quis non mauris. Sed pretium efficitur felis eu sodales. Maecenas congue fringilla elit, eget gravida augue tempus eu. Quisque et metus dui. In faucibus felis non odio vestibulum, sit amet pharetra tortor finibus. Nulla venenatis urna quis lobortis porttitor. In porttitor ac ex eu fringilla. Nam faucibus molestie euismod. Praesent suscipit vel felis non varius. Cras imperdiet vitae nunc eget ornare. Integer ut tellus tincidunt, volutpat sem eu, pulvinar dolor. Quisque nec condimentum sem, a luctus sem."
        />
      </div>
    </>
  );
};
