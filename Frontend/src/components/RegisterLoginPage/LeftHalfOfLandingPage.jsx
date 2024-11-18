import React from 'react'

const LeftHalfOfLandingPage = () => {
    console.log("LeftHalf is triggered")
    return (
        <div className="container m-2 rounded-5 d-flex flex-column" style={{ width: "55%", backgroundColor: "white" }}>
            <div className="container m-2 mt-4 d-flex justify-content-between align-items-center">
        <div>
            <span className={"fs-3"} style={{ color: "darkblue", fontWeight: "bold" }}>Topup</span>
            <span className={"fs-3 text-primary"}>Online</span>
        </div>
        <div className="d-flex p-3" >
            <div className="me-4" style={{ fontWeight: "bold" }}>Browse Products</div>
            <div className="me-4" style={{ fontWeight: "bold" }}>Become a Seller</div>
            <div style={{ fontWeight: "bold" }}>About Us</div>
        </div>
        </div>

        <div className="container ml-2" style = {{marginTop: "10%"}}>
        <div className="fs-3 text-wrap fw-semibold" style={{ color: "darkblue" }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam optio eius soluta dolore iusto ipsum deserunt dolor voluptatum labore velit? Eaque est totam nulla, vel repellat aperiam molestiae praesentium porro.</div>
        </div>

        <div className="container mt-5">
        <div className="fs-6 text-wrap text-secondary"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis obcaecati unde consequuntur, voluptates ea consectetur molestias, deleniti modi quas eos cumque. Quae eveniet sequi minima voluptatem iusto, quibusdam harum numquam.</div>
        </div>

        <div className="container mt-5 d-flex justify-content-center" style = {{paddingTop: "50px"}}>
        <button type="button" className="btn btn-primary text-wrap rounded-2">Subscribe to our Newsletter</button>
        </div>

    </div>
  )
}

export default LeftHalfOfLandingPage
