import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [totalProducts, setTotalProducts] = useState("")
    const [filter, setFilter] = useState({
        page: 0,
        parentCategory: "Apparel",
        subCategory: "",
        productID: "",
        color: "Black",
        productType: "",
        image: "",
        gender: "Boys",
        brand: "",
        minPrice: "",
        maxPrice: "",
        keyword: ""
    })

    const [loading, setLoading] = useState(true)

    const filterToBeSentAsParameter = useMemo(() => {
        const filteredParams = {}
        for (const key in filter) {
            if (filter[key] != "") {
                filteredParams[key] = filter[key]
            }
        }
        return filteredParams
    }, [filter])

   // return filter
   
    useEffect(() => {
        const fetchData = async() => {
            try {
                setLoading(true)
                const productInfo = await axios.get(
                    "http://localhost:8000/api/v1/getProducts/getProducts",
                    { params: filterToBeSentAsParameter }
                )
                setProducts(productInfo.data.products)
                setCurrentPage(productInfo.data.currentPage)
                setTotalPages(productInfo.data.totalPages)
                setTotalProducts(productInfo.data.totalProducts)

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [filterToBeSentAsParameter]);

    useEffect(() => {
        console.log("Current Page:", currentPage);
        console.log("Total Pages:", totalPages);
        console.log("Total Products:", totalProducts);
        console.log("Products:", products);
      }, [currentPage, totalPages, totalProducts, products]);
    
    if (loading) return <div>Loading...</div>
  
  return <div>  </div>;
};

export default Products;
