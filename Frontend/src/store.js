import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice.js'
import cartReducer from './cartSlice.js'

const store = configureStore({
  reducer: {
    filterSlicer: filterReducer,
    cart: cartReducer
  },
})

export default store