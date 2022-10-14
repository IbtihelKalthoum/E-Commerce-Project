import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addProduct: (state, action) => {
            state.cart.push(action.payload.pro)
        },

        changeQuantity: (state, action) => {


            const arr = [...state.cart]

            for (let i in arr) {
                if (arr[i].product._id === action.payload.data.id) {

                    arr[i].qte += action.payload.data.value
                }
            }

            state.cart = arr

        },

        deletePrduct: (state, action) => {
            state.cart = state.cart.filter(p => p.product._id !== action.payload.id)
        },
        resetCart: (state, action) => {
            state.cart = []
        }

    },
    extraReducers: {}
})

export const { addProduct, changeQuantity, deletePrduct, resetCart } = cartSlice.actions

export default cartSlice.reducer