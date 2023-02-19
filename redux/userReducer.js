import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInfo: {
    userID: "",
    isAdmin: false,
    userName: "",
    profileUrl: ""
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    deleteUserInfo: (state) => {
      state.userInfo = {...initialState.userInfo}
    }
  }
})

export const { saveUserInfo, deleteUserInfo } = userSlice.actions

export default userSlice.reducer