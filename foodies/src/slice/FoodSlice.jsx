import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodItems: [], // Array to store food items
};

const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload; // Set the food items array
    },
    addFoodItem: (state, action) => {
      state.foodItems.push(action.payload); // Add a new food item
    },
    updateFoodItem: (state, action) => {
      const updatedItem = action.payload;
      const index = state.foodItems.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.foodItems[index] = updatedItem; // Update the food item
      }
    },
    removeFoodItem: (state, action) => {
      const itemId = action.payload;
      state.foodItems = state.foodItems.filter((item) => item.id !== itemId); // Remove the food item
    },
    reset: (state) => {
      state.foodItems = []; // Reset the food items array
    }
  },
});

export const { setFoodItems, addFoodItem, updateFoodItem, removeFoodItem,reset } = FoodSlice.actions;
export default FoodSlice.reducer;