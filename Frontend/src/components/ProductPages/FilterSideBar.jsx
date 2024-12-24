import React, {useState, useEffect, useRef, useCallback, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFilter, clearFilters } from "../../filterSlice.js";
import axios from "axios";
import _ from 'lodash'
import HeaderBar from "../LandingHomePage/HeaderBar.jsx";
import '../ProductPages CSS/FilterSideBar.css' 

const FilterSideBar = () => {
  const [filters, setFilters] = useState({})
  const [showMore, setShowMore] = useState({})
  const [products, setProducts] = useState({}) //products
  const [productDetails, setProductDetails] = useState([])

  // const filtersReceivedFromPreviousPage = useSelector((state) => state.filterSlicer.filter)
  // console.log("filtersReceivedFromPreviousPage", filtersReceivedFromPreviousPage)
  // const [filtersReceived, setFiltersReceived] = useState(filtersReceivedFromPreviousPage);

  // query: {
  //   parentCategory: [ 'Apparel' ],
  //   subCategory: [ 'Topwear' ],
  //   color: [ 'Grey' ],
  //   productType: [ 'Jackets' ]
  // },

  const [filtersReceived, setFiltersReceived] = useState({
    parentCategory: ["Apparel"],
  });

  // ref_Filters basically stores all the filters, including the filters that user selects from the filter sidebar
  const ref_Filters = useRef(filtersReceived) 

  useEffect(() => {
    const fetch_filters = async () => {
      try {
        const api_result = await axios.get(
          "http://localhost:8000/api/v1/getProducts/getFilters",
          { params: filtersReceived }
        );
        if (api_result.data) {
          setFilters(api_result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_filters();
  }, [filtersReceived]);

  // product method  
  useEffect(() => {
    const fetch_products = async () => {
      try {
        const products_result = await axios.get("http://localhost:8000/api/v1/getProducts/getProducts", { params: filtersReceived })
        if (products_result) {
          setProducts(products_result.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetch_products()
  }, [filtersReceived])  // pending: config/setup for pagination, add appropriate parameter to load products on the next page if user clicks on the next page icon 

  useEffect(() => {
    setProductDetails(products.ProductDetails)
  }, [products])

  useEffect(() => {
    console.log("Updated product details state:", productDetails)
  }, [productDetails])

  const filterObject = useMemo(() => {
    return {
      "parentCategory": filters.filtered_parentCategory,
      "subCategory": filters.filtered_subCategory,
      "color": filters.filtered_color,
      "productType": filters.filtered_productType,
      "gender": filters.filtered_gender,
      "brand": filters.filtered_brand,
      "maxPrice": filters.filtered_maxPrice,
      "minPrice": filters.filtered_minPrice,
    };
  }, [filters]);

  const handleCheckBox = useCallback((key, item) => {
    const updatedFilters = { ...ref_Filters.current }

    if (updatedFilters[key]?.includes(item)) {
      updatedFilters[key] = updatedFilters[key].filter((val) => val !== item)
    } else {
      updatedFilters[key] = updatedFilters[key] ? [...updatedFilters[key], item]: [item];
    }
    ref_Filters.current = updatedFilters
    setFiltersReceived({ ...updatedFilters })
  }, [ref_Filters]);




  return (
    <div className="d-flex flex-column vh-100">
      <HeaderBar />
      <div className="d-flex flex-grow-1 mt-2">
        <div className="h-screen sidebar">
          <ul className="list-unstyled">
            {Object.entries(filterObject).map(([key, value], index) => (
              <li className="mb-1" key={index}>
                <button
                  className="btn btn-toggle d-inline-flex align-items-center border-0 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                >
                  <i className="bi bi-filter me-2"></i> {key}
                </button>

                <div className="collapse" id={`collapse-${index}`}>
                  <ul className="list-unstyled fw-normal pb-1 small">
                    {Array.isArray(value) ? (
                      <>
                        {value
                          .slice(0, showMore[key] ? value.length : 6)
                          .map((item, idx) => (
                            <li key={idx} className="form-check">
                              <input
                                className="form-check-input ms-3"
                                type="checkbox"
                                id={`checkbox-${key}-${idx}`}
                                value={item}
                                checked={
                                  ref_Filters.current[key]?.includes(item) ||
                                  false
                                }
                                onChange={() => handleCheckBox(key, item)}
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor={`checkbox-${key}-${idx}`}
                              >
                                {item}
                              </label>
                            </li>
                          ))}
                        {value.length > 6 && (
                          <li>
                            <button
                              className="btn btn-link p-0"
                              style={{ marginLeft: "40px" }}
                              onClick={() =>
                                setShowMore((prev) => ({
                                  ...prev,
                                  [key]: !prev[key],
                                }))
                              }
                            >
                              {showMore[key] ? "See Less" : "See More"}
                            </button>
                          </li>
                        )}
                      </>
                    ) : (
                      <li className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`checkbox-${key}`}
                          value={value || "N/A"}
                          checked={
                            ref_Filters.current[key]?.includes(value) || false
                          }
                          onChange={() => handleCheckBox(key, value)}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor={`checkbox-${key}`}
                        >
                          {value || "N/A"}
                        </label>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="container main-content ms-2">
          <p className="fs-3">Welcome to the Main Content</p>
          <p>
            This is where the main content will go. The sidebar is collapsible
            and fully functional.
          </p>
        </div> */}

        <div className="container w-screen d-flex">
          <div className="d-flex flex-wrap gap-4">
            {Array.isArray(productDetails) && productDetails.length > 0 ? (
              productDetails.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column"
                  style={{
                    width: "207px",
                    margin: "10px", 
                    height: "auto",
                    flexShrink: 0, 
                  }}
                >
                  <img
                    src={item.imageURL}
                    style={{ width: "100%", height: "259px", objectFit: "cover" }}
                    alt="product"
                  />
                  <div className="d-flex flex-column gap-1 p-2">
                    <span className="text-wrap" style={{ fontWeight: "600", fontSize: "16px" }}>
                      {item.brand}
                    </span>
                    <span className="text-wrap" style={{ fontSize: "16px" }}>
                      {item.name}
                    </span>
                    <div className="d-flex text-wrap">
                      <span style={{ fontSize: "13px" }}>$</span>
                      <span style={{ fontSize: "28px" }}>{item.price}</span>
                    </div>
                    <div className="d-flex text-wrap gap-1">
                      <span style={{ fontSize: "14px" }}>FREE delivery</span>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>
                        Sun, Dec 15
                      </span>
                    </div>
                    <button
                      className="bg-warning rounded-3"
                      style={{
                        fontSize: "13px",
                        width: "87px",
                        height: "30px",
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;























































// {filterObject.map((key) => {
//   <ul class="list-unstyled">
//     <li class="mb-1">
//       <button
//         class="btn btn-toggle d-inline-flex align-items-center border-0 collapsed"
//         data-bs-toggle="collapse"
//         data-bs-target="#home-collapse"
//         aria-expanded="false"
//       >
//         <i class="bi bi-house me-2"></i> Home
//       </button>

//       <div class="collapse" id="home-collapse">
//         <ul class="list-unstyled fw-normal pb-1 small">
//           <li>
//             <a
//               href="#"
//               class="link-body-emphasis d-inline-flex text-decoration-none rounded"
//             >
//               Overview
//             </a>
//           </li>

//           <li>
//             <a
//               href="#"
//               class="link-body-emphasis d-inline-flex text-decoration-none rounded"
//             >
//               Updates
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               class="link-body-emphasis d-inline-flex text-decoration-none rounded"
//             >
//               Reports
//             </a>
//           </li>
//         </ul>
//       </div>
//     </li>
//   </ul>;
// })}
// </div>