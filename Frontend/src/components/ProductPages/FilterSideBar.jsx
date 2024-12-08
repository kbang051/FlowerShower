import React, {useState, useEffect, useMemo} from "react";
import axios from "axios";
import '../ProductPages CSS/FilterSideBar.css'

const FilterSideBar = () => {
  const [filters, setFilters] = useState({})
  const [showMore, setShowMore] = useState({})
  
  const parentCategory = "Apparel" //to be dynamic
  const gender = "Boys" //to be dynamic
  const keyword = "gini jacket" //to be dynamic

  useEffect(() => {
    const fetch_filters = async () => {
      try {
        const api_result = await axios.get(
          "http://localhost:8000/api/v1/getProducts/getFilters",
          {
            params: {
              parentCategory: parentCategory,
              gender: gender,
              keyword: keyword,
            },
          }
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
  }, [parentCategory, gender, keyword]);

  console.log("filters")
  console.log(filters)

  const filterObject = useMemo(() => {
    return {
      "Parent Category": filters.filtered_parentCategory,
      "Subcategory": filters.filtered_subCategory,
      "Product": filters.filtered_productType,
      "Color": filters.filtered_color,
      "Gender": filters.filtered_gender,
      "Maximum Price": filters.filtered_maxPrice,
      "Minimum Price": filters.filtered_minPrice,
    };
  }, [filters]);

  console.log("filterObject:")
  console.log(filterObject)

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
                              style={{ marginLeft: "15px" }}
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
                        style={{ marginLeft: "15px" }}
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