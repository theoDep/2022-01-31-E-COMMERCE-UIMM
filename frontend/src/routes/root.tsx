import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import Footer from "../components/footer";
import HorizonDivider from "../components/horizon-divider";
import useProductsContext from "../hooks/useProductsContext";

export default () => {
  const { setProducts } = useProductsContext();
  const { category } = useParams();
  const onSubmit = async (data) => {
    const response = await fetch(
      category
        ? `http://localhost:1337/api/products?populate=*&filters[category][name][$eqi]=${category}&filters[name][$containsi]=${data.Search}`
        : `http://localhost:1337/api/products?populate=*&filters[name][$containsi]=${data.Search}`
    );
    const products = await response.json();
    setProducts(products.data);
  };

  return (
    <>
      <Navbar />
      <HorizonDivider content="" />
      <Searchbar onSubmit={onSubmit} />
      <HorizonDivider content="" />
      <Outlet />
      <Footer />
    </>
  );
};
