import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice.js'

const store = configureStore({
  reducer: {
    filterSlicer: filterReducer,
  },
})

export default store