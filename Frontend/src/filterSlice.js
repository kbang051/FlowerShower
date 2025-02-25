import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filterSlicer',
    initialState: {
        filter: { parentCategory: ["Apparel"] }
    },
    reducers: {
        initializeFilters: (state, action) => {
            state.filter = action.payload 
        },
        updateFilters: (state, action) => {
            state.filter = action.payload
        },
        addFilter: (state, action) => {
            const { key, value } = action.payload
            if (!state.filter[key]) {
                state.filter[key] = Array.isArray(value) ? [...value] : [value]  
            } else if (Array.isArray(state.filter[key])) {
                state.filter[key].push(value)
            } else {
                console.error(`Key "${key}" exists but is not an array.`)
            }
        },
        clearFilters: (state) => {
            state.filter = {}
        }
    }
})

export const { addFilter, initializeFilters, updateFilters, clearFilters } = filterSlice.actions
export default filterSlice.reducer

