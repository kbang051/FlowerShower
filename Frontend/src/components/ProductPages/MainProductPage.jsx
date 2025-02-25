import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { initializeFilters, updateFilters } from "../../filterSlice.js";
import axios from "axios";
import FilterSideBar from "./FilterSideBar.jsx";
import ProductPage from "./ProductPage.jsx";

// allFilters = [parentCategory, subCategory, brand, color, productType, gender, maxPrice, minPrice] ---array
// Initial Filter stored in redux : { "parentCategory": [ "Apparel" ], "gender": ["Men", "Boys"] } ---object

const MainProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Read Filters from URL and store them in redux
  useEffect(() => {
    const allFilters = [
      { key : "parentCategory", values: searchParams.getAll("parentCategory") },
      { key : "subCategory", values: searchParams.getAll("subCategory") },
      { key : "brand", values: searchParams.getAll("brand") },
      { key : "color", values: searchParams.getAll("color") },
      { key : "productType", values: searchParams.getAll("productType") },
      { key : "gender", values: searchParams.getAll("gender") },
    ]
    const filters = {}
    allFilters.forEach(({key, values}) => {
      if (values.length > 0) {
        filters[key] = values
      }
    })

    dispatch(initializeFilters(filters))
  }, [dispatch, searchParams])

  
  // Read Filters from redux
  
  const initialFilter = useSelector((state) => state.filterSlicer.filter)
  const [filtersSelected, setFiltersSelected] = useState(initialFilter)

  console.log("filtersSelected sent to fetchFilters and fetchProducts as initial parameters")
  console.log(filtersSelected)

  const [fetchFilterResponse, setFetchFilterResponse] = useState({})
  const [products, setProducts] = useState({})
  const [totalProducts, setTotalProducts] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const [expandedSections, setExpandedSections] = useState({})

  //Fetch filters for filterSideBar
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/getProducts/getFilters", { params: filtersSelected })
        if (response.status == 200) {
          console.log("Response of fetchFilter sidebar")
          console.log(response.data)
          setFetchFilterResponse(response.data)
        }
      } catch (error) {
        console.error("Unable to fetch filters from backend: ", error)
      }
    }
    fetchFilters()
  }, [filtersSelected])

  // Fetch Products Whenever Filters Change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/getProducts/getProducts", { params: filtersSelected })
        if (response.status == 200) {
          setProducts(response.data.ProductDetails)          
          setCurrentPage(response.data.CurrentPage)
          setTotalPages(response.data.TotalPages)
          setTotalProducts(response.data.TotalProducts)
        }
      } catch (error) {
        console.error("Unable to fetch products from the backend: ", error)
      }
    }
    fetchProducts()
  }, [filtersSelected, currentPage])
  

  //Update Filters and URL
  const filterSelectionMethod = async (event, key, value) => {
    setFiltersSelected((prevFilters) => {
      const keyMap = {
        parentcategory: "parentCategory",
        subcategory: "subCategory",
        color: "color",
        producttype: "productType",
        gender: "gender",
        brand: "brand",
        minprice: "minPrice",
        maxprice: "maxPrice",
      }

      const newKey = keyMap[String(key).toLowerCase()] || key
      const newFilters = {...prevFilters}
      if (event.target.checked) {
        if (!Array.isArray(newFilters[newKey])) {
          newFilters[newKey] = []
        }
        if (!newFilters[newKey].includes(value)) {
          newFilters[newKey] = newFilters[newKey] ? [...newFilters[newKey], value] : [value]
        }
      }
      else {
        if (Array.isArray(newFilters[newKey])) {
          newFilters[newKey] = newFilters[newKey].filter((item) => item !== value)
          if (newFilters[newKey].length == 0)
            delete newFilters[newKey]
        }
      }
      
      return newFilters
    })
  }

  useEffect(() => {
      dispatch(updateFilters(filtersSelected))
      const newSearchParams = new URLSearchParams();
      Object.entries(filtersSelected).forEach(([filterKey, values]) => {
        values.forEach((val) => newSearchParams.append(filterKey, val))
      })
      navigate({
        pathname: "/mainLandingPage/mainProductPage",
        search: newSearchParams.toString(),
      })
  }, [filtersSelected, dispatch, navigate])

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handlePageChange = (event) => {
    setCurrentPage(event)
  }

  return (
    <div className="page-container">
      <div className="d-flex flex-grow-1">
        <FilterSideBar
          fetchFilterResponse={fetchFilterResponse}
          setFetchFilterResponse={setFetchFilterResponse}
          expandedSections={expandedSections} //present
          setExpandedSections={setExpandedSections} //present
          toggleSection={toggleSection}  //present
          filtersSelected={filtersSelected}  //present but not used
          setFiltersSelected={setFiltersSelected} //present but not used
          filterSelectionMethod={filterSelectionMethod}  //present
        />
        <div className="d-flex flex-column gap-3">
          <ProductPage products={products} />
          <div className="d-flex justify-content-center">
            <Pagination
              current={currentPage}
              total={totalProducts}
              onChange= {(event) => {handlePageChange(event)}}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainProductPage;









// {
//   "ParentCategory": [
//       "Apparel"
//   ],
//   "SubCategory": [
//       "Topwear",
//       "Bottomwear",
//       "Socks",
//       "Apparel Set",
//       "Innerwear"
//   ],
//   "Brand": [
//       "Doodle",
//       "Gini",
//       "Chhota",
//       "Avengers",
//       "Disney",
//       "United",
//       "Madagascar",
//       "Ben",
//       "Batman",
//       "Ant",
//       "Nike",
//       "Jungle",
//       "Mr.Men",
//       "Marvel",
//       "Rcb",
//       "Palm",
//       "Superman",
//       "Fabindia",
//       "The",
//       "U.S.",
//       "Adidas",
//       "Kkr",
//       "Tantra",
//       "Dc",
//       "Do",
//       "Reebok",
//       "Allen"
//   ],
//   "Color": [
//       "Black",
//       "Blue",
//       "White",
//       "Red",
//       "Multi",
//       "Green",
//       "Maroon",
//       "Grey",
//       "Navy Blue",
//       "Yellow",
//       "Khaki",
//       "Brown",
//       "Off White",
//       "Beige",
//       "Pink",
//       "Rust",
//       "Olive",
//       "Cream",
//       "Orange",
//       "Purple",
//       "Grey Melange"
//   ],
//   "ProductType": [
//       "Tshirts",
//       "Jeans",
//       "Booties",
//       "Shirts",
//       "Clothing Set",
//       "Jackets",
//       "Blazers",
//       "Shorts",
//       "Rompers",
//       "Kurtas",
//       "Waistcoat",
//       "Sweatshirts",
//       "Capris",
//       "Churidar",
//       "Leggings",
//       "Kurta Sets",
//       "Innerwear Vests",
//       "Trousers"
//   ],
//   "Gender": [
//       "Boys"
//   ],
//   "MaxPrice": [],
//   "MinPrice": []
// }

























































// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Pagination } from "antd";
// import { useSearchParams, createSearchParams } from "react-router-dom";
// import axios from "axios";
// import HeaderBar from "../LandingHomePage/HeaderBar.jsx";
// import FilterSideBar from "./FilterSideBar.jsx";
// import ProductPage from "./ProductPage.jsx";

// // allFilters = [parentCategory, subCategory, brand, color, productType, gender, maxPrice, minPrice] ---array
// // Initial Filter stored in redux : { "parentCategory": [ "Apparel" ], "gender": ["Men", "Boys"] } ---object

// const MainProductPage = () => {

//     const initialFilter = useSelector((state) => state.filterSlicer.filter)
    
//     const [searchParams, setSearchParams] = useSearchParams()

//     // -----------------------------------Initialize URL parameters----------------------------------------

//     const allFilters = [
//       { key: "gender", values: searchParams.getAll("gender") },
//       { key: "parentCategory", values: searchParams.getAll("parentCategory") },  //getAll returns an array. If size==0, eliminate the filter
//       { key: "subCategory", values: searchParams.getAll("subCategory") },
//       { key: "brand", values: searchParams.getAll("brand") },
//       { key: "color", values: searchParams.getAll("color") },
//       { key: "productType", values: searchParams.getAll("productType") }
//     ]
    
//     const filters = {}
    
//     allFilters.forEach(({ key, values }) => {  // filters = { gender: Array(2), parentCategory: Array(1) }
//       if (values.length > 0) {
//         filters[key] = values
//       }
//     })

//     //-----------------------------------------------------------------------------------------------------
    
//     const [fetchFilterResponse, setFetchFilterResponse] = useState({})
//     const [expandedSections, setExpandedSections] = useState({})
//     const [filtersSelected, setFiltersSelected] = useState({ ...initialFilter })

//     const [products, setProducts] = useState({})
//     const [totalProducts, setTotalProducts] = useState(null)
//     const [totalPages, setTotalPages] = useState(null)
//     const [currentPage, setCurrentPage] = useState(1)
    
//     // Filters are fetched as soon as we visit the productPage
//     useEffect(() => {   
//         const fetchFilters = async () => {
//         try {
//             // const response = await axios.get("http://localhost:8000/api/v1/getProducts/getFilters", { params: filters })
//             // const response = await axios.get("http://localhost:8000/api/v1/getProducts/getFilters", { params: initialFilter })
//             if (response.status === 200)
//               setFetchFilterResponse(response.data) 
//               console.log("Data present in fetch filter response")
//               console.log(response.data)
//         } catch (error) {
//           throw new Error("Unable to fetch filters from backend: ", error)
//         }}
//         fetchFilters()
//     }, []) 

//     const toggleSection = (key) => {
//         setExpandedSections((prev) => ({
//           ...prev,
//           [key]: !prev[key],
//         }))
//     }

//     const filterSelectionMethod = (event, key, value) => {
      
//       setFiltersSelected((prevFilters) => {
//         const newFilters = { ...prevFilters }
//         if (event.target.checked) {
//           if (!Array.isArray(newFilters[key])) {
//             newFilters[key] = []; 
//           }
//           newFilters[key] = [...newFilters[key], value];
//         } else {
//           if (Array.isArray(newFilters[key])) {
//             newFilters[key] = newFilters[key].filter((item) => item !== value)
//             if (newFilters[key].length === 0) 
//               delete newFilters[key];
//           } else 
//             console.warn(`Unexpected type for newFilters[${key}]:`, newFilters[key])
//         }

//         return newFilters
//       })
//     };

//     useEffect(() => {
//       const filtersInDesiredFormat = {}
//       if (filtersSelected["ParentCategory"])
//         filtersInDesiredFormat["parentCategory"] = filtersSelected["ParentCategory"]
//       if (filtersSelected["SubCategory"])
//         filtersInDesiredFormat["subCategory"] = filtersSelected["SubCategory"]
//       if (filtersSelected["Brand"])
//         filtersInDesiredFormat["brand"] = filtersSelected["Brand"]
//       if (filtersSelected["Color"])
//         filtersInDesiredFormat["color"] = filtersSelected["Color"]
//       if (filtersSelected["ProductType"])
//         filtersInDesiredFormat["productType"] = filtersSelected["ProductType"]
//       if (filtersSelected["Gender"])
//         filtersInDesiredFormat["gender"] = filtersSelected["Gender"]
//       if (filtersSelected["MaxPrice"])
//         filtersInDesiredFormat["maxPrice"] = filtersSelected["MaxPrice"]
//       if (filtersSelected["MinPrice"])
//         filtersInDesiredFormat["minPrice"] = filtersSelected["MinPrice"]
      
//       filtersInDesiredFormat["page"] = currentPage
  
//       const fetchProducts = async () => {
//         try {
//           const response = await axios.get("http://localhost:8000/api/v1/getProducts/getProducts", { params: filtersInDesiredFormat })
//           if (response.status === 200) 
//             setProducts(response.data.ProductDetails)
//             setCurrentPage(response.data.CurrentPage)
//             setTotalPages(response.data.TotalPages)
//             setTotalProducts(response.data.TotalProducts)
//         } catch (error) {
//           console.error("Unable to fetch products from backend:", error)
//         }
//       }
  
//       fetchProducts();
//     }, [filtersSelected, currentPage]);

//     const handlePageChange = (event) => {
//       setCurrentPage(event)
//     }

//     return (
//       <div className="page-container">
//         {/* <HeaderBar /> */}
//           <div className="d-flex flex-grow-1">
//             <FilterSideBar
//               fetchFilterResponse={fetchFilterResponse}
//               setFetchFilterResponse={setFetchFilterResponse}
//               expandedSections={expandedSections}
//               setExpandedSections={setExpandedSections}
//               toggleSection={toggleSection}
//               filtersSelected = {filtersSelected}
//               setFiltersSelected = {setFiltersSelected}
//               filterSelectionMethod = {filterSelectionMethod}
//             />
//             <div className="d-flex flex-column gap-3">
//               <ProductPage products={products}/>
//               <div className="d-flex justify-content-center">
//                   <Pagination current = {currentPage} total = {totalProducts} onChange= {(event) => {handlePageChange(event)}} showSizeChanger={false}/>
//               </div>
//             </div>
//         </div>
//       </div>
//     );
// }

// export default MainProductPage
