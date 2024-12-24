import React from 'react'

const LeftHalfOfLandingPage = () => {
    console.log("LeftHalf is triggered")
    return (
<div
  className="container m-2 rounded-5 d-flex flex-column align-items-center justify-content-center p-2 text-light"
  style={{
    maxWidth: "50%",
    border: "2px solid black",
    boxSizing: "border-box",
    backgroundColor: "#23272F"
    
  }}
>
<div className="container m-2 d-flex align-items-center flex-wrap justify-content-center justify-content-lg-between">
  {/* Logo Section */}
  <div className="d-flex flex-grow-1 justify-content-center justify-content-lg-start p-3">
    <div className="fs-4 fw-bold text-light">Topup</div>
    <div className="fs-4 text-primary">Online</div>
  </div>

  {/* Navigation Section */}
  <div className="d-flex flex-wrap justify-content-center justify-content-lg-end gap-3 p-3">
    <div className="text-center fw-bold text-light">Browse Products</div>
    <div className="text-center fw-bold text-light">Become a Seller</div>
    <div className="text-center fw-bold text-light">About Us</div>
  </div>
</div>

  {/* Main Content */}
  <div className="container text-center mt-1">
    <div
      className="fs-5 fw-semibold text-wrap px-3 text-light"
      style={{ marginTop: "5%" }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam optio eius
      soluta dolore iusto ipsum deserunt dolor voluptatum labore velit? Eaque
      est totam nulla, vel repellat aperiam molestiae praesentium porro.
    </div>
  </div>

  {/* Secondary Text */}
  <div className="container text-center mt-4">
    <div className="fs-5 text-wrap text-secondary px-3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
      obcaecati unde consequuntur, voluptates ea consectetur molestias, deleniti
      modi quas eos cumque. Quae eveniet sequi minima voluptatem iusto,
      quibusdam harum numquam.
    </div>
  </div>

  {/* Button Section */}
  <div className="container mt-5 d-flex justify-content-center">
    <button
      type="button"
      className="btn btn-light btn-sm text-wrap rounded-2"
    >
      Subscribe to our Newsletter
    </button>
  </div>
</div>

  )
}

export default LeftHalfOfLandingPage
