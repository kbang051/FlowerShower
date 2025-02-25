import React from "react";
import CategoriesHeader from "./CategoriesHeader.jsx";
import ProductCards from "./ProductCards.jsx";
import CategoriesCarousels from "./CategoriesCarousels.jsx";
import Products from "../Products/Products.jsx";

const ContentArea = () => {
  return (
    <div className="d-flex flex-column h-screen w-100" style={{backgroundImage: "conic-gradient(from 90deg at -10% 100%, #2b303b 0deg, #2b303b 90deg, #16181d 1turn)"}}>      
      <CategoriesHeader/>
      <ProductCards/>
      <CategoriesCarousels/>
    </div>
  );
};

export default ContentArea;


