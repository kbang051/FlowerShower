import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeCart } from "../../cartSlice.js";
import "../LandingHomePage CSS/HeaderBar.css";

const HeaderBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const fetchCartData = async() => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/cart/viewCart", { withCredentials: true })
      if (response.status === 200) {
        dispatch(initializeCart({data: response.data}))
        console.log("Cart initialized successfully with data: ", response.data)
      }
    } catch (error) {
      console.log("Unable to initialize cart: ", error)
    }
  }
  
  const handleCartDisplay = async () => {
    try {
      await fetchCartData()
      navigate("/cart")
    } catch (error) {
      console.log("Error in handleCartDisplay function: ", error)
    }
  }

  const headerBarDesign = () => {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center gap-4 px-4 parentContainer">
        <div className="d-flex justify-content-center align-items-center fs-4 fw-bold text-primary categoryIconStyling">
          FlowerShower
        </div>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center searchButton">
          <input
            type="search"
            className="form-control w-100 searchButton"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-primary searchButton"> Search </button>
        </div>
        <div className="d-flex justify-content-end align-items-center categoryIconStyling">
          <ul className="nav nav-pills">
            <li className="nav-item dropdown">
              <button
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {`${ localStorage.getItem('UserName') ? localStorage.getItem('UserName') : 'Login'}`}
              </button>
              <ul className="dropdown-menu">
                <li className="d-flex justify-content-between">
                  <a className="dropdown-item" href="#">
                    New Customer?
                  </a>
                  <a className="dropdown-item" href="#">
                    Sign Up
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" href="#">
                    My Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" href="#">
                    My Orders
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" href="#">
                    My Wishlist
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleCartDisplay}>
                Cart
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link">
                Become a Seller
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      {headerBarDesign()}
    </>
  );
};

export default HeaderBar;


//#23272f
