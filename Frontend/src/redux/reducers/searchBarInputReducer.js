import { SET_SEARCHBAR_INPUT } from "../actions/searchBarInputAction.js";

const initialState = {
    query: ""
}

const searchBarInputReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCHBAR_INPUT:
            return {
                ...state,
                query: action.payload
            }
        default:
            return state
    }
}

export { searchBarInputReducer }

