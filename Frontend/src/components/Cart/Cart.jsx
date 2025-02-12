import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  return (
      <div className="d-flex flex-column h-100 w-100 position-relative">
        <div className="container-lg mt-3 p-3 border rounded bg-white shadow position-relative">
          <button className="btn btn-close position-absolute top-0 end-0 m-2"></button>
          <h1 className="h4">Shopping Cart</h1>
          <hr />
          
          <div className="d-flex flex-row align-items-center justify-content-between border rounded p-3 mb-3">
            <img
              src="http://assets.myntassets.com/v1/images/style/properties/7fc0dc0e751be847d706620fdd3802f7_images.jpg"
              alt="Product"
              className="img-fluid rounded"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div className="d-flex flex-column flex-grow-1 mx-3">
              <h5 className="h6 text-wrap mb-1">Product Title</h5>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-outline-secondary btn-sm">-</button>
                <span>7</span>
                <button className="btn btn-outline-secondary btn-sm">+</button>
                <button className="btn btn-danger btn-sm ms-3">Remove</button>
              </div>
            </div>
            <span className="fw-bold text-end">$20.78</span>
          </div>

          <hr />
          <div className="d-flex justify-content-between">
            <span className="fw-bold">SubTotal (2 items):</span>
            <span className="fw-bold">$41.56</span>
          </div>
        </div>
      </div>
  )
}

export default Cart
