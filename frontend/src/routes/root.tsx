import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import Footer from "../components/footer";
import HorizonDivider from "../components/horizon-divider";

export default () => {
  return (
    <>
      <Navbar />
      <HorizonDivider content="" />
      <Searchbar />
      <HorizonDivider content="" />
      <Outlet />
      <Footer />
    </>
  );
};
