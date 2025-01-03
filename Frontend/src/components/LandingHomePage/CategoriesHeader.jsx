import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFilter, clearFilters } from "../../filterSlice.js";
import { useNavigate } from "react-router-dom";
import MensImageIcon from "../../assets/MensClothingIcon.svg";
import BoysClothingIcon from "../../assets/BoysClothingIcon.svg";
import GirlsClothingIcon from "../../assets/GirlsClothingIcon.svg";
import WomensClothingIcon from "../../assets/WomensClothingIcon.svg";
import "../LandingHomePage CSS/CategoriesHeader.css";

const CategoriesHeader = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectionCategory = (label) => {
    if (label === "Men" || label === "Boys") {
      dispatch(addFilter({ key: "gender", value: ["Men","Boys"] }));
    } else if (label === "Women" || label === "Girls"){
      dispatch(addFilter({ key: "gender", value: ["Women","Girls"] }));
    } else {
      dispatch(clearFilters())
    }

    setTimeout(()=> { navigate(`/mainProductPage`) }, 0)
  };
  
  const reduxFilter = useSelector((state) => state.filterSlicer.filter) 
  console.log(reduxFilter)

  const iconMap = [
    { src: MensImageIcon, alt: "Men", label: "Men" },
    { src: WomensClothingIcon, alt: "Women", label: "Women" },
    { src: BoysClothingIcon, alt: "Boys", label: "Boys" },
    { src: GirlsClothingIcon, alt: "Girls", label: "Girls" },
  ];

  return (
    <div className="container-xxl d-flex justify-content-around align-items-center mt-2 p-1">
      {iconMap.map((item, index) => (
        <div key={index} className="d-flex flex-column justify-content-center align-items-center h-100 text-center" style={{color: "#DEE2E6"}}>
          <img src={item.src} alt={item.alt} className="img-fluid imgCategories objectShadow" onClick={() => selectionCategory(item.label)}/>
          <p className="fw-bold m-0" style={{cursor:"pointer"}} onClick={() => selectionCategory(item.label)}>{item.label}</p>{" "}
        </div>
      ))}
    </div>
  );
};

export default CategoriesHeader;
