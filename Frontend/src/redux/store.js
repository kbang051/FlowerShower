import { configureStore } from '@reduxjs/toolkit'
import { searchBarInputReducer } from './reducers/searchBarInputReducer.js'

export const store = configureStore({
    reducer: {
        search: searchBarInputReducer
    }
})

