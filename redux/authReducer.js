import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  authToken: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    authSuccessful: (state, action) => {
      state.authToken = action.payload
    },
    logoutSuccessful: (state) => {
      state.authToken = ""
    }
  }
})

export const { authSuccessful, logoutSuccessful } = authSlice.actions

export default authSlice.reducer