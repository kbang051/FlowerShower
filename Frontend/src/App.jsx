import { useState } from "react";
import RegisterLoginPage from "./components/RegisterLoginPage/RegisterLoginPage.jsx";
import MainLandingPage from "./components/LandingHomePage/MainLandingPage.jsx";
import { register } from "swiper/element/bundle"; // import function to register Swiper custom elements
import FilterSideBar from "./components/ProductPages/FilterSideBar.jsx";
import MainProductPage from "./components/ProductPages/MainProductPage.jsx";
import HeaderBar from "./components/LandingHomePage/HeaderBar.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

register(); // register Swiper custom elements

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <RegisterLoginPage/> </>
    },
    {
      path: "/mainLandingPage",
      element: <> <MainLandingPage/> </>
    },
    {
      path: "/filterSideBar",
      element: <> <FilterSideBar/> </>
    },
    {
      path: "/mainProductPage",
      element: <> <MainProductPage/> </>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

      
{/* <RegisterLoginPage/> */}
{/* <MainLandingPage/> */}
{/* <FilterSideBar/> */}
