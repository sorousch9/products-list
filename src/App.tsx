import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart";

import ProductList from "./Components/ProductsList";
import Product from "./Pages/product";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
