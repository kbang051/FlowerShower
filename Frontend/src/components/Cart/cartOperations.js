import axios from "axios"

const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/cart/addToCart", { productId }, { withCredentials: true })
      if (response.status === 200) {
        console.log("Product added to cart successfully:", response.data)
      }
    } catch (error) {
      console.log("Unable to add product to cart: ", error)
    }
}

const handleUpdateQuantity = async (operation, productId) => {
    try {
    // const operation = event.target.innerText
    const response = await axios.post("http://localhost:8000/api/v1/cart/updateQuantity", {operation: operation, productId: productId}, { withCredentials: true })
    if (response.status === 200) {
      console.log("Cart updated successfully:", response.data)
      return (response.data)
    }
    //   (operation === "+") ? dispatch(increaseQuantity({productId})) : dispatch(decreaseQuantity({productId}))
    } catch (error) {
      console.log("Unable to decrease quantity: ", error)    
      return null 
    }
}

export { handleAddToCart, handleUpdateQuantity }

