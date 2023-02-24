import { Fragment } from "react";
import Navbar from "../Components/Navbar";
import ProductList from "../Components/ProductsList";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <ProductList />
    </Fragment>
  );
};

export default Home;
