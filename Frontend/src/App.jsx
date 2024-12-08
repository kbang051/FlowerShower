import { useState } from "react";
import RegisterLoginPage from "./components/RegisterLoginPage/RegisterLoginPage.jsx";
import MainLandingPage from "./components/LandingHomePage/MainLandingPage.jsx";
import { register } from "swiper/element/bundle"; // import function to register Swiper custom elements
import Products from "./components/Products/Products.jsx";
import FilterSideBar from "./components/ProductPages/FilterSideBar.jsx";

register(); // register Swiper custom elements

function App() {
  return (
    <>
      {/* <RegisterLoginPage/> */}
      {/* <MainLandingPage/> */}
      {/* <Products /> */}

      <FilterSideBar/>
    </>
  );
}

export default App;
