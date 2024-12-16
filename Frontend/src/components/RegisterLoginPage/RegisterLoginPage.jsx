import React from 'react'
import LeftHalfOfLandingPage from "./LeftHalfOfLandingPage.jsx";
import RightPartOfLandingPage from "./RightPartOfLandingPage.jsx";

const RegisterLoginPage = () => {
  return (
    <>
      <div className="container-fluid h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>        
        <LeftHalfOfLandingPage/>
        <RightPartOfLandingPage/>       
      </div>
    </>
  )
}

export default RegisterLoginPage
