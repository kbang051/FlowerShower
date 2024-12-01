import React from "react";
import CategoriesHeader from "./CategoriesHeader.jsx";
import ProductCards from "./ProductCards.jsx";
import CategoriesCarousels from "./CategoriesCarousels.jsx";
import Products from "../Products/Products.jsx";

const ContentArea = () => {
  return (
    <div className="d-flex flex-column h-screen w-100 bg-light">      
      <CategoriesHeader/>
      <ProductCards/>
      <CategoriesCarousels/>
    </div>
  );
};

export default ContentArea;

// const ContentArea = () => {                                                                     for landing page (home page)
//   return (
//     <div className="d-flex flex-column h-screen w-100 bg-light">
//       <CategoriesHeader/>
//       <ProductCards/>
//       <CategoriesCarousels/>
//     </div>
//   );
// };
