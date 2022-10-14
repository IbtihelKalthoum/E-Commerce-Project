import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openFilterDrawer: false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {

        setFilterDrawerVisible: (state, action) => {
            state.openFilterDrawer = action.payload.visible
        }

    }
})

export const { setFilterDrawerVisible } = themeSlice.actions

export default themeSlice.reducer