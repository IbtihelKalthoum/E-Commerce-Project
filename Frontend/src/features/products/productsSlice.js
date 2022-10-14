import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchParams: {
        keyword: '',
        min: 0,
        max: 0,
        category: ''
    }
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload.params
        }
    },
    extraReducers: {}
})

export const { setSearchParams } = productsSlice.actions

export default productsSlice.reducer