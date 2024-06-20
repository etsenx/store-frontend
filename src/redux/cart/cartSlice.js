import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartCount: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { items, cartCount, itemCount } = action.payload;
      state.items = items;
      state.cartCount = cartCount;
      state.itemCount = itemCount;
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        state.cartCount -= existingItem.quantity;
        existingItem.quantity = action.payload.quantity;
      } else {
        state.items.push({ _id: action.payload._id, productId: action.payload.productId, quantity: action.payload.quantity });
        state.itemCount += 1;
      }
      state.cartCount += action.payload.quantity;
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;

      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        state.cartCount -= existingItem.quantity;
        state.items = state.items.filter(item => item.productId !== productId);
        state.itemCount -= 1;
      }
    },
    updateQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.id);
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

export const { setCart, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
