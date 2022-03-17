import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: 0 },
  reducers: {
    add(state) {
      state.cartItems = state.cartItems + 1;
    },
    rem(state) {
      state.cart--;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
