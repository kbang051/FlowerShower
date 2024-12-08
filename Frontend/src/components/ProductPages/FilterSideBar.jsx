import React, {useState, useEffect, useRef, useMemo} from "react";
import axios from "axios";
import _ from 'lodash'
import '../ProductPages CSS/FilterSideBar.css' 

const FilterSideBar = () => {
  const [filters, setFilters] = useState({})
  const [showMore, setShowMore] = useState({})
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
        } else {
          console.log("Unable to fetch data from the filter api");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_filters();
  }, [filtersReceived]);

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

  const handleCheckBox = (key, item) => {
    const updatedFilters = { ...ref_Filters.current }

    if (updatedFilters[key]?.includes(item)) {
      updatedFilters[key] = updatedFilters[key].filter((val) => val !== item)
    } else {
      updatedFilters[key] = updatedFilters[key] ? [...updatedFilters[key], item]: [item];
    }
    ref_Filters.current = updatedFilters
    setFiltersReceived({ ...updatedFilters })
  };

  return (
    <div className="d-flex">
      <div className="vh-100 sidebar">
        <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
          <i className="bi bi-bootstrap fs-4 me-2"></i>
          <span className="fs-5 fw-semibold">Collapsible Sidebar</span>
        </div>

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
                              className="form-check-input"
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

      <div className="container main-content ms-2">
        <p className="fs-3">Welcome to the Main Content</p>
        <p>
          This is where the main content will go. The sidebar is collapsible and
          fully functional.
        </p>
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