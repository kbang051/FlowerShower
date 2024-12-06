import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { searchBarInputReducer } from './reducers/searchBarInputReducer.js'

// Combine reducers (useful for scalability)

export const store = configureStore({
    reducer: {
        search: searchBarInputReducer
    }
})

