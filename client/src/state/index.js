// Importing createSlice from redux toolkit 
import { createSlice } from "@reduxjs/toolkit";

// Initial state for auth reducer 
const initialState = {
  user: null,
  token: null,
  savedRecipes: [],
};
// Creating auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user login data
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Clear user login data
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.savedRecipes = [];
    },
    // Set user saved recipes data
    setSavedRecipes: (state, action) => {
      if (state.user && state.token) {
        state.savedRecipes = action.payload.savedRecipes;
      } else {
        console.error("Saved recipes not found :(");
      }
    },
  },
});
// Exporting authSlice actions
export const { setLogin, setLogout, setSavedRecipes } =
  authSlice.actions;
// Exporting auth reducer
export default authSlice.reducer;