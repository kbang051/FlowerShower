//action type
export const SET_SEARCHBAR_INPUT = "SET_SEARCHBAR_INPUT"

// Action creator to set search query
export const setSearchBarInput = (query) => {
    return {
        type: SET_SEARCHBAR_INPUT,
        payload: query // Pass the user input
    }
}

