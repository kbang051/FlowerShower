import RegisterLoginPage from "./components/RegisterLoginPage/RegisterLoginPage.jsx"
import MainLandingPage from "./components/LandingHomePage/MainLandingPage.jsx"
import FilterSideBar from "./components/ProductPages/FilterSideBar.jsx"
import MainProductPage from "./components/ProductPages/MainProductPage.jsx"
import HeaderBar from "./components/LandingHomePage/HeaderBar.jsx"
import { register } from "swiper/element/bundle"; // import function to register Swiper custom elements
import { useState } from "react";
import { Outlet, useLocation } from 'react-router-dom'

register(); // register Swiper custom elements

const RootLayout = () => {
  const location = useLocation()
  const noHeaderRoutes = ["/"]
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname)
  const [showCart, setShowCart] = useState(false); // to handle the display of cart
  return (
    <>
      {shouldShowHeader && <HeaderBar showCart={showCart} setShowCart= {setShowCart}/>}
      <Outlet/>
    </>
  )
}

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout/>}>
          <Route path="/" element={<RegisterLoginPage />} />
          <Route path="/mainLandingPage" element={<MainLandingPage />} />
          <Route path="/filterSideBar" element={<FilterSideBar />} />
          <Route path="/mainProductPage" element={<MainProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;


// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <> <RegisterLoginPage/> </>
//     },
//     {
//       path: "/mainLandingPage",
//       element: <> <MainLandingPage/> </>
//     },
//     {
//       path: "/filterSideBar",
//       element: <> <FilterSideBar/> </>
//     },
//     {
//       path: "/mainProductPage",
//       element: <> <MainProductPage/> </>
//     }
//   ])
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }


// export default App;

      
{/* <RegisterLoginPage/> */}
{/* <MainLandingPage/> */}
{/* <FilterSideBar/> */}
