import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import axios from "axios";
import HeaderBar from "../LandingHomePage/HeaderBar.jsx";
import FilterSideBar from "./FilterSideBar.jsx";
import ProductPage from "./ProductPage.jsx";

const MainProductPage = () => {
    const initialFilter = useSelector((state) => state.filterSlicer.filter)
    const [fetchFilterResponse, setFetchFilterResponse] = useState({})
    const [expandedSections, setExpandedSections] = useState({})
    const [filtersSelected, setFiltersSelected] = useState({})
    const [products, setProducts] = useState({})
    const [totalProducts, setTotalProducts] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
        const fetchFilters = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/getProducts/getFilters", { params: initialFilter })
            if (response.status === 200)
              setFetchFilterResponse(response.data) 
        } catch (error) {
          throw new Error("Unable to fetch filters from backend: ", error)
        }}
        fetchFilters()
    }, [])

    const toggleSection = (key) => {
        setExpandedSections((prev) => ({
          ...prev,
          [key]: !prev[key],
        }))
    }

    const filterSelectionMethod = (event, key, value) => {
      setFiltersSelected((prevFilters) => {
        const newFilters = { ...prevFilters }
        if (event.target.checked) {
          if (!Array.isArray(newFilters[key])) {
            newFilters[key] = []; 
          }
          newFilters[key] = [...newFilters[key], value];
        } else {
          if (Array.isArray(newFilters[key])) {
            newFilters[key] = newFilters[key].filter((item) => item !== value)
            if (newFilters[key].length === 0) 
              delete newFilters[key];
          } else 
            console.warn(`Unexpected type for newFilters[${key}]:`, newFilters[key])
        }

        return newFilters
      })
    };

    useEffect(() => {
      const filtersInDesiredFormat = {}
      if (filtersSelected["ParentCategory"])
        filtersInDesiredFormat["parentCategory"] = filtersSelected["ParentCategory"]
      if (filtersSelected["SubCategory"])
        filtersInDesiredFormat["subCategory"] = filtersSelected["SubCategory"]
      if (filtersSelected["Brand"])
        filtersInDesiredFormat["brand"] = filtersSelected["Brand"]
      if (filtersSelected["Color"])
        filtersInDesiredFormat["color"] = filtersSelected["Color"]
      if (filtersSelected["ProductType"])
        filtersInDesiredFormat["productType"] = filtersSelected["ProductType"]
      if (filtersSelected["Gender"])
        filtersInDesiredFormat["gender"] = filtersSelected["Gender"]
      if (filtersSelected["MaxPrice"])
        filtersInDesiredFormat["maxPrice"] = filtersSelected["MaxPrice"]
      if (filtersSelected["MinPrice"])
        filtersInDesiredFormat["minPrice"] = filtersSelected["MinPrice"]
      
      filtersInDesiredFormat["page"] = currentPage
  
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/getProducts/getProducts", { params: filtersInDesiredFormat })
          if (response.status === 200) 
            console.log("Successfully fetched these products from backend")
            console.log(response.data.ProductDetails)
            setProducts(response.data.ProductDetails)
            setCurrentPage(response.data.CurrentPage)
            setTotalPages(response.data.TotalPages)
            setTotalProducts(response.data.TotalProducts)
        } catch (error) {
          console.error("Unable to fetch products from backend:", error)
        }
      };
  
      fetchProducts();
    }, [filtersSelected, currentPage]);

    const handlePageChange = (event) => {
      setCurrentPage(event)
    }

    

    return (
      <div className="page-container">
        {/* <HeaderBar /> */}
          <div className="d-flex flex-grow-1">
            <FilterSideBar
              fetchFilterResponse={fetchFilterResponse}
              setFetchFilterResponse={setFetchFilterResponse}
              expandedSections={expandedSections}
              setExpandedSections={setExpandedSections}
              toggleSection={toggleSection}
              filtersSelected = {filtersSelected}
              setFiltersSelected = {setFiltersSelected}
              filterSelectionMethod = {filterSelectionMethod}
            />
            <div className="d-flex flex-column gap-3">
              <ProductPage products={products}/>
              <div className="d-flex justify-content-center">
                  <Pagination current = {currentPage} total = {totalProducts} onChange= {(event) => {handlePageChange(event)}} showSizeChanger={false}/>
              </div>
            </div>
        </div>
      </div>
    );
}

export default MainProductPage
