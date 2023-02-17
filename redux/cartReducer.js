import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addToCart: (state, action) => {
      const cartItem = state.products.find(item => item.id === action.payload.id)
      if(cartItem){
        cartItem.quantity += 1
        return
      }
      state.products.push(action.payload)
    },
    increaseQuantity: (state, action) => {
      const cartItem = state.products.find(item => item.id === action.payload)
      cartItem.quantity += 1
    },
    decreaseQuantity: (state, action) => {
      const cartItem = state.products.find(item => item.id === action.payload)
      if(cartItem.quantity == 1){
        state.products = state.products.filter(item => item.id !== action.payload )
      }
      else{
        cartItem.quantity -= 1
      }
    },
    resetCart: (state) => {
      state.products = []
    }
  }
})

export const { addToCart, increaseQuantity, decreaseQuantity, resetCart } = cartSlice.actions

export default cartSlice.reducer