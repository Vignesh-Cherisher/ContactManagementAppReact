import { createSlice } from "@reduxjs/toolkit/react"

type responsiveUiType = {
  isDrawerOpen: boolean,
  isDarkMode: 'light' | 'dark'
}

const responsiveUiInitialState :responsiveUiType = {
  isDrawerOpen: false,
  isDarkMode: 'light'
}

const responsiveUiSlice = createSlice({
  name: "responsiveUi",
  initialState: responsiveUiInitialState,
  reducers: {
    toggleDrawer(state,action) {
      state.isDrawerOpen = action.payload
    },
    toggleisDarkMode(state) {
      state.isDarkMode = (state.isDarkMode === 'light' ? 'dark' : 'light');
    }
  },
  selectors: {
    selectDrawerOpenState: (state) => state.isDrawerOpen,
    selectDarkMode: (state) => state.isDarkMode === 'light' ? false : true
  }
})

export const {
  selectDrawerOpenState,
  selectDarkMode
} = responsiveUiSlice.selectors

export const responsiveUiActions = responsiveUiSlice.actions

export default responsiveUiSlice