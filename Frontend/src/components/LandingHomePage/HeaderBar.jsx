import React, {useState} from "react";
import "../LandingHomePage CSS/HeaderBar.css";

const HeaderBar = () => {
  const [searchBarInput, setInput] = useState("")

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
          onChange={(event) => {setInput(event.target.value)}}
        />
        <button className="btn btn-primary searchButton"> Search </button>
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


//#23272f
