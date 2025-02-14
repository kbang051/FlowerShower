import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        // addToCart: (state, action) => {
        //     const {productId, quantity = 1} = action.payload 
        //     const existingProduct = state.find((item) => item.productId === productId) 
        //     if (existingProduct) 
        //         existingProduct.quantity += quantity 
        //     else 
        //         state.push({productId, quantity})
        // },

        addToCart: (state, action) => {
            const {productId, quantity = 1} = action.payload 
            const existingProduct = state.find((item) => item._id === productId) 
            if (existingProduct) 
                existingProduct.quantity += quantity 
            else 
                state.push({_id: productId, quantity})
        },

        // increaseQuantity: (state, action) => {
        //     console.log("State of redux:")
        //     console.log(JSON.stringify(state))
        //     const {productId, quantity = 1} = action.payload 
        //     console.log("Product ID Received in Redux upon click: ", productId)
        //     const existingProduct = state.find((item) => String(item.productId) === String(productId)) 
        //     console.log("Existing Product: ", existingProduct)
        //     if (existingProduct) 
        //         existingProduct.quantity += quantity 
        //     else 
        //         state.push({productId, quantity})
        // },

        increaseQuantity: (state, action) => {
            console.log("State of redux:")
            console.log(JSON.stringify(state))
            const {productId, quantity = 1} = action.payload 
            console.log("Product ID Received in Redux upon click: ", productId)
            const existingProduct = state.find((item) => String(item._id) === String(productId)) 
            console.log("Existing Product: ", existingProduct)
            if (existingProduct) 
                existingProduct.quantity += quantity 
            else 
                state.push({_id: productId, quantity})
                // state.push({productId, quantity})
        },

        decreaseQuantity: (state, action) => {
            const {productId} = action.payload 
            const existingProduct = state.find((item) => String(item._id) === String(productId))
            if (existingProduct)
                existingProduct.quantity -= 1 
            if (existingProduct.quantity === 0)
                return state.filter((item) => item._id !== productId) 
        },

        // decreaseQuantity: (state, action) => {
        //     const {productId} = action.payload 
        //     const existingProduct = state.find((item) => String(item.productId) === String(productId))
        //     if (existingProduct)
        //         existingProduct.quantity -= 1 
        //     if (existingProduct.quantity === 0)
        //         return state.filter((item) => item.productId !== productId) 
        // },

        removeFromCart: (state, action) => {
            const {productId} = action.payload
            return state.filter((item) => String(item._id) !== String(productId))
        },

        // removeFromCart: (state, action) => {
        //     const {productId} = action.payload
        //     return state.filter((item) => String(item.productId) !== String(productId))
        // },

        initializeCart: (state, action) => {
            return action.payload.data 
        }
    }
})

export const { addToCart,increaseQuantity,decreaseQuantity,removeFromCart,initializeCart} = cartSlice.actions 
export default cartSlice.reducer 
