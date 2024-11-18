import React from "react";
import MensImageIcon from "../../assets/MensClothingIcon.svg";
import BoysClothingIcon from "../../assets/BoysClothingIcon.svg";
import GirlsClothingIcon from "../../assets/GirlsClothingIcon.svg";
import WomensClothingIcon from "../../assets/WomensClothingIcon.svg";
import "../LandingHomePage CSS/CategoriesHeader.css";

const CategoriesHeader = () => {
  const iconMap = [
    { src: MensImageIcon, alt: "Mens", label: "Men" },
    { src: WomensClothingIcon, alt: "Women", label: "Women" },
    { src: BoysClothingIcon, alt: "Boys", label: "Boys" },
    { src: GirlsClothingIcon, alt: "Girls", label: "Girls" },
  ];

  return (
    <div className="container-xxl d-flex justify-content-around align-items-center mt-2 bg-light parentContainer p-1">
      {iconMap.map((item, index) => (
        <div key={index} className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
          <img src={item.src} alt={item.alt} className="img-fluid imgCategories"/>
            <p className="fw-bold m-0">{item.label}</p>{" "}
        </div>
      ))}
    </div>
  );
};

export default CategoriesHeader;
