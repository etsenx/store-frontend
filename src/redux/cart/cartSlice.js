import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Only store item IDs and quantities
  cartCount: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.reqCount;
      } else {
        state.items.push({ _id: action.payload._id, quantity: action.payload.reqCount });
        state.itemCount += 1;
      }
      state.cartCount += action.payload.reqCount;
    },
    removeItem: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === _id);
      if (existingItem) {
        if (quantity >= existingItem.quantity) {
          state.cartCount -= existingItem.quantity;
          state.items = state.items.filter(item => item._id !== _id);
          state.itemCount -= 1;
        } else {
          existingItem.quantity -= quantity;
          state.cartCount -= quantity;
        }
      }
    },
    updateQuantity: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        state.cartCount += action.payload.quantity - existingItem.quantity;
        existingItem.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.cartCount = 0;
      state.itemCount = 0;
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
