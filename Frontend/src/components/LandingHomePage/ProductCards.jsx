import React from "react";
import '../LandingHomePage CSS/ProductCards.css'

const ProductCards = () => {
  return (
    <>
      {/* <div className= "d-flex flex-wrap container-xxl w-100 mt-2 gap-3 parentContainer">
        {[1, 2, 3, 4].map((_, containerIndex) => (
          <div key={containerIndex} className="d-flex flex-column flex-grow-1 p-3 imageContainer">
            <h5 className="pt-1 mb-3 heading" style={{paddingLeft: "1.5rem"}}>Heading {containerIndex + 1}</h5>
            <div className="gridContainer" style={{color: "#DEE2E6"}}>
              {[1, 2, 3, 4].map((_, imgIndex) => (
                <img key={imgIndex} src="http://assets.myntassets.com/v1/images/style/properties/7fc0dc0e751be847d706620fdd3802f7_images.jpg" alt={`Image ${imgIndex + 1}`} className="imageCSS"/>
              ))}
            </div>
          </div>
        ))}
      </div> */}

      <div className= "d-flex flex-wrap container-xxl w-100 mt-2 gap-3 parentContainer">
        {["Men", "Women", "Boys", "Girls"].map((category, containerIndex) => (
          <div key={containerIndex} className="d-flex flex-column flex-grow-1 p-3 imageContainer">
            <h5 className="pt-1 mb-3 heading" style={{paddingLeft: "1.5rem"}}> {category} </h5>
            <div className="gridContainer" style={{color: "#DEE2E6"}}>
              {[1, 2, 3, 4].map((_, imgIndex) => (
                <img key={imgIndex} src="http://assets.myntassets.com/v1/images/style/properties/7fc0dc0e751be847d706620fdd3802f7_images.jpg" alt={`Image ${imgIndex + 1}`} className="imageCSS"/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCards;



