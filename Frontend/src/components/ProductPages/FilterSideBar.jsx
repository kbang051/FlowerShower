import React from "react";
import HeaderBar from "../LandingHomePage/HeaderBar.jsx";
import '../ProductPages CSS/FilterSideBar.css' 

const FilterSideBar = ({ fetchFilterResponse, expandedSections, setExpandedSections, toggleSection, filtersSelected, setFiltersSelected, filterSelectionMethod }) => {
  return (
    <>
        <aside className="filter-sidebar">
          <div className="filter-container">
            <div className="filter-header">
              <h2 className="filter-title">Filters</h2>
            </div>
            <div className="filter-sections">
              {Object.entries(fetchFilterResponse).map(([key, values]) => (
                <div key={key} className="filter-section">
                  <button className="filter-section-header" onClick={() => toggleSection(key)}>
                    <span>{key}</span>
                    <i className={`bi bi-chevron-down ${ expandedSections[key] ? "rotated" : ""}`}></i>
                  </button>

                  <div className={`filter-options ${expandedSections[key] ? "show" : ""}`}>
                    <div className="filter-options-grid">
                      {values.map((value, index) => (
                        <div key={index} className="form-check filter-option">
                          <input type="checkbox" className="form-check-input" id={`${key}-${index}`} onChange={(event) => filterSelectionMethod(event, key, value)}/>
                          <label className="form-check-label" htmlFor={`${key}-${index}`}> {value} </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
    </>
  );
};


// const FilterSideBar = ({ fetchFilterResponse, expandedSections, setExpandedSections, toggleSection, filtersSelected, setFiltersSelected, filterSelectionMethod }) => {
//   return (
//     <>
//       <div className="page-container">
//         <HeaderBar />
//         {/* Left sidebar */}
//         <aside className="filter-sidebar">
//           <div className="filter-container">
//             <div className="filter-header">
//               <h2 className="filter-title">Filters</h2>
//             </div>
//             <div className="filter-sections">
//               {Object.entries(fetchFilterResponse).map(([key, values]) => (
//                 <div key={key} className="filter-section">
//                   <button className="filter-section-header" onClick={() => toggleSection(key)}>
//                     <span>{key}</span>
//                     <i className={`bi bi-chevron-down ${ expandedSections[key] ? "rotated" : ""}`}></i>
//                   </button>

//                   <div className={`filter-options ${expandedSections[key] ? "show" : ""}`}>
//                     <div className="filter-options-grid">
//                       {values.map((value, index) => (
//                         <div key={index} className="form-check filter-option">
//                           <input type="checkbox" className="form-check-input" id={`${key}-${index}`} onChange={(event) => filterSelectionMethod(event, key, value)}/>
//                           <label className="form-check-label" htmlFor={`${key}-${index}`}> {value} </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// };

export default FilterSideBar































// // "http://localhost:8000/api/v1/getProducts/getFilters"
// // "http://localhost:8000/api/v1/getProducts/getProducts"

// const FilterSidebar = () => {
//   const filterForFilterSidebar = useSelector((state) => state.filterSlicer.filter)
//   const [filter, setFilter] = useState({});
//   const [filterOptions, setFilterOptions] = useState(filterForFilterSidebar);
//   // const [filterOptions, setFilterOptions] = useState({ parentCategory: ["Apparel"] });
//   const [expandedSections, setExpandedSections] = useState({});
//   const filterSideBar = useRef({});
  
//   const [filtersSelectedFromSideBar, setfiltersSelectedFromSideBar] = useState({});
//   useEffect(() => {
//     setfiltersSelectedFromSideBar(filterForFilterSidebar);
//   }, [filterForFilterSidebar]);

//   const [productsFetched, setProductsFetched] = useState({})
//   const [productDetails, setProductDetails] = useState([])

//   console.log("Filter from redux store: ")
//   console.log(filterForFilterSidebar.parentCategory)


//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/v1/getProducts/getFilters",
//           { params: filterOptions }
//         );
//         if (response.data) {
//           setFilter(response.data);
//           if (Object.keys(filterSideBar.current).length === 0) {
//             filterSideBar.current = response.data;
//           }
//         }
//       } catch (error) {
//         console.error("Unable to fetch filters:", error);
//       }
//     };
//     fetchFilters();
//   }, []);

//   const toggleSection = (key) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));
//   };

//   const filterProductSelection = (event, key, value) => {
//     setfiltersSelectedFromSideBar(() => {
//       const filterSelected = { ...filtersSelectedFromSideBar }
//       const isSelected = event.target.checked
//       if (isSelected) {
//         if (key in filterSelected) 
//           filterSelected[key] = filterSelected[key].includes(value) ? filterSelected[key] : [...filterSelected[key], value]
//         else 
//           filterSelected[key] = [value];
//       } else {
//         if (key in filterSelected) {
//           const updatedValues = filterSelected[key].filter((item) => item !== value)
//           if (updatedValues.length > 0) 
//             filterSelected[key] = updatedValues;
//           else 
//             delete filterSelected[key]
//         }
//       }
//       return filterSelected 
//     })
//   }

//   useEffect(() => {
//     const refinedProductFilter = {}
//     for (const i in filtersSelectedFromSideBar) {
//       if (i === "ParentCategory")
//         refinedProductFilter[parentCategory] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "SubCategory") 
//         refinedProductFilter[subCategory] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "Brand") 
//         refinedProductFilter[brand] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "Color") 
//         refinedProductFilter[color] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "ProductType") 
//         refinedProductFilter[productType] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "Gender") 
//         refinedProductFilter[gender] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "MaxPrice") 
//         refinedProductFilter[maxPrice] = {...filtersSelectedFromSideBar[i]}
//       else if (i === "MinPrice") 
//         refinedProductFilter[minPrice] = {...filtersSelectedFromSideBar[i]}
//     }

//     const fetchProducts = async () => {
//       try {
//           const response = await axios.get("http://localhost:8000/api/v1/getProducts/getProducts", { params: refinedProductFilter })
//           if (response.data) {
//             setProductsFetched(response.data)
//             setProductDetails(response.data.ProductDetails)
//           }
//       } catch (error) {
//         console.error("Unable to fetch products from the backend: ", error)
//       }
//     }
//     fetchProducts()
//   }, [filtersSelectedFromSideBar])


//   return (
//     <div className="page-container">
//       <HeaderBar />
//       {/* Main content area */}
//       <div className="d-flex flex-grow-1">
//         {/* Left sidebar */}
//         <aside className="filter-sidebar">
//           <div className="filter-container">
//             <div className="filter-header">
//               <h2 className="filter-title">Filters</h2>
//             </div>
//             <div className="filter-sections">
//               {Object.entries(filterSideBar.current).map(([key, values]) => (
//                 <div key={key} className="filter-section">
//                   <button
//                     className="filter-section-header"
//                     onClick={() => toggleSection(key)}
//                   >
//                     <span>{key}</span>
//                     <i className={`bi bi-chevron-down ${expandedSections[key] ? 'rotated' : ''}`}></i>
//                   </button>
                  
//                   <div className={`filter-options ${expandedSections[key] ? 'show' : ''}`}>
//                     <div className="filter-options-grid">
//                       {values.map((value, index) => (
//                         <div key={index} className="form-check filter-option">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id={`${key}-${index}`}
//                             onChange={(event) => filterProductSelection(event, key, value)}
//                             checked={filtersSelectedFromSideBar[key]?.includes(value) || false}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor={`${key}-${index}`}
//                           >
//                             {value}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Product Grid */}
//         <div className="flex-grow-1 p-4">
//           <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
//             {Array.isArray(productDetails) && productDetails.length > 0 ? (
//               productDetails.map((item, index) => (
//                 <div key={index} className="col">
//                   <div className="card h-100 shadow-sm">
//                     <img
//                       src={item.imageURL}
//                       className="card-img-top"
//                       alt={item.name}
//                       style={{ height: "260px", objectFit: "cover" }}
//                     />
//                     <div className="card-body d-flex flex-column">
//                       <h6 className="card-title fw-bold mb-1">{item.brand}</h6>
//                       <p className="card-text text-muted mb-2">{item.name}</p>
//                       <div className="d-flex align-items-baseline mb-2">
//                         <small className="text-muted me-1">$</small>
//                         <span className="fs-4 fw-bold">{item.price}</span>
//                       </div>
//                       <div className="mb-3">
//                         <small className="text-muted">
//                           FREE delivery
//                           <span className="fw-bold ms-1">Sun, Dec 15</span>
//                         </small>
//                       </div>
//                       <button className="btn btn-warning mt-auto w-100">
//                         Add to cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center py-5">
//                 <p className="text-muted">No products available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           .page-container {
//             min-height: 100vh;
//             display: flex;
//             flex-direction: column;
//           }

//           .card {
//             transition: transform 0.2s ease-in-out;
//             border: 1px solid #dee2e6;
//           }
          
//           .card:hover {
//             transform: translateY(-5px);
//           }
          
//           .card-img-top {
//             transition: transform 0.2s ease-in-out;
//           }
          
//           .btn-warning {
//             background-color: #ffd814;
//             border-color: #ffd814;
//             color: #000;
//           }
          
//           .btn-warning:hover {
//             background-color: #f5c000;
//             border-color: #f5c000;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default FilterSidebar;



















































