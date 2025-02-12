import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const {productId, quantity = 1} = action.payload 
            const existingProduct = state.find((item) => item.productId === productId) 
            if (existingProduct) 
                existingProduct.quantity += quantity 
            else 
                state.push({productId, quantity})
        },

        increaseQuantity: (state, action) => {
            const {productId, quantity = 1} = action.payload 
            const existingProduct = state.find((item) => item.productId === productId) 
            if (existingProduct) 
                existingProduct.quantity += quantity 
            else 
                state.push({productId, quantity})
        },

        decreaseQuantity: (state, action) => {
            const {productId} = action.payload 
            const existingProduct = state.find((item) => item.productId === productId)
            if (existingProduct)
                existingProduct.quantity -= 1 
            if (existingProduct.quantity === 0)
                return state.filter((item) => item.productId !== productId) 
        },

        removeFromCart: (state, action) => {
            const {productId} = action.payload
            return state.filter((item) => item.productId !== productId)
        },

        initializeCart: (state, action) => {
            return action.payload.data 
        }
    }
})

export const { addToCart,increaseQuantity,decreaseQuantity,removeFromCart,initializeCart} = cartSlice.actions 
export default cartSlice.reducer 
