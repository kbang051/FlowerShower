import React from "react";
import "../LandingHomePage CSS/HeaderBar.css";

const HeaderBar = () => {
  return (
    <div className="container-xxl d-flex justify-content-center align-items-center gap-4 px-4 parentContainer">
      <div className="d-flex justify-content-center align-items-center fs-4 fw-bold text-primary categoryIconStyling">
        FlowerShower
      </div>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <input
          type="search"
          className="form-control w-100"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
      <div className="d-flex justify-content-end align-items-center categoryIconStyling">
        <ul className="nav nav-pills">
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Login
            </a>
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
                <a className="dropdown-item" href="#">
                  My Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  My Orders
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  My Wishlist
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Cart
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Become a Seller
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBar;
