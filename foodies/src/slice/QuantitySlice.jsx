import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const QuantitySlice = createSlice({
  name: "cartQuantity",
  initialState,
  reducers: {
    increment: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId] += 1;
      } else {
        state.items[itemId] = 1;
      }
    },
    decrement: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId] && state.items[itemId] > 0) {
        state.items[itemId] -= 1;
        // Remove the item if its quantity becomes zero
        if (state.items[itemId] === 0) {
          delete state.items[itemId]; // Remove the item from the cart
        }
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      delete state.items[itemId]; // Remove the item from the cart
    },
    reset: (state) => {
      state.items = {}; // Clear all items
    },
  },
});

export const { increment, decrement, removeItem , reset } = QuantitySlice.actions;
export default QuantitySlice.reducer;