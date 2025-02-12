import React from "react";
import ContentArea from "./ContentArea.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCart } from "../../cartSlice.js";

const MainLandingPage = () => {
  /* ................................................................ */
  // Fetch cart content from backend and initialize cart state
  const dispatch = useDispatch()  
  useEffect(() => {
    const getCartContent = async() => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/cart/viewCart", { withCredentials: true })
        if (response.status === 200) {
          dispatch(initializeCart({data: response.data}))
          console.log("Cart initialized successfully with data: ", response.data)
        }
      } catch (error) {
        console.log("Unable to initialize cart:")
        console.log(error)
      }
    }
    getCartContent()
  }, [])
  /* ................................................................ */

  return (
    <>
      <ContentArea/>
    </>
  );
};

export default MainLandingPage;
