import { useLocation, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import Breadcrumbs from "../components/breadcrumbs";
import DetailsCard from "../components/details-card";

export default () => {
  const currentPath = useLocation();
  const { pathname } = currentPath;
  const path = pathname.substring(1, pathname.length).split("/");

  if (typeof useParams().id === "string") {
    const id = parseInt(useParams().id!);
    const product = useProduct(id);

    if (!product) return <div>Product not found</div>;

    return (
      product && (
        <>
          <Breadcrumbs currentPath={path} />
          <div className="container p-5">
            <DetailsCard product={product} />
          </div>
        </>
      )
    );
  }
};
