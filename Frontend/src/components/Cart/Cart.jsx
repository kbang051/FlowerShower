import React, {useState} from 'react'
import axios from 'axios'
import MakePayment from './StripeInterface.jsx'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { handleUpdateQuantity } from './cartOperations.js'
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../cartSlice.js"
import { Spin } from 'antd'


const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const totalItems = cart.reduce((acc, item) => acc + Number(item.quantity), 0)
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price)*Number(item.quantity), 0).toFixed(2)

  const handleUpdateQuantityOperation = async (event, productId) => {
    try {
      const operation = (event.target.innerText === "+") ? "increase" : "decrease"
      const updatedCartItem = await handleUpdateQuantity(operation, productId)
      if (updatedCartItem)
        if (operation === "increase")
          dispatch(increaseQuantity({ productId }))
        else
          dispatch(decreaseQuantity({ productId }))
    } catch (error) {
      console.log("Unable to update quantity: ", error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      console.log("Before sending request to remove product")
      console.log(`item to be deleted ${productId}`)
      const response = await axios.post("http://localhost:8000/api/v1/cart/removeFromCart", {productId}, { withCredentials: true })
      console.log("After response from backend to remove product")
      if (response.status === 200)
        dispatch(removeFromCart({productId}))
    } catch (error) {
      console.log("Unable to remove item from cart: ", error)
    }
  }

  return (
    <Spin spinning={isLoading} tip="Processing payment...">
      <div className="d-flex flex-column h-100 w-100 position-relative">
        <div className="container-lg mt-3 p-3 border rounded bg-white shadow position-relative">
          <button className="btn btn-close position-absolute top-0 end-0 m-2"></button>
          <h1 className="h4">Shopping Cart</h1>
          <hr />

          {cart.map((item, index) => {
            return (
              <>
                <div
                  className="d-flex flex-row align-items-center justify-content-between border rounded p-3 mb-3"
                  key={index}
                >
                  <img
                    src={item.imageURL}
                    alt={item.productType}
                    className="img-fluid rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex flex-column flex-grow-1 mx-3">
                    <h5 className="h6 text-wrap mb-1">{item.name}</h5>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={(event) =>
                          handleUpdateQuantityOperation(event, item._id)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={(event) =>
                          handleUpdateQuantityOperation(event, item._id)
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => removeItemFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="fw-bold text-end">{`$${item.price}`}</span>
                </div>
              </>
            );
          })}

          <hr />
          <div className="d-flex justify-content-between">
            <span className="fw-bold">{`SubTotal (${totalItems} items):`}</span>
            <span className="fw-bold">{`$${totalPrice}`}</span>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-success btn-sm ms-3" onClick={() => { MakePayment() }} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Cart
