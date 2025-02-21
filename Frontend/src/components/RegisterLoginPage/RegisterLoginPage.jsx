import React from 'react'
import LeftHalfOfLandingPage from "./LeftHalfOfLandingPage.jsx";
import RightPartOfLandingPage from "./RightPartOfLandingPage.jsx";
import NewLoginRegisterPage from './NewLoginRegisterPage.jsx';

const RegisterLoginPage = () => {
  return (
    <>
      {/* <div className="container-fluid h-100 d-flex justify-content-center align-items-center flex-wrap" style={{backgroundImage: "conic-gradient(from 90deg at -10% 100%, #2b303b 0deg, #2b303b 90deg, #16181d 1turn)", color: "#DEE2E6"}}>        
        <LeftHalfOfLandingPage/>
        <RightPartOfLandingPage/>       
      </div> */}
      <NewLoginRegisterPage />
    </>
  )
}

export default RegisterLoginPage
