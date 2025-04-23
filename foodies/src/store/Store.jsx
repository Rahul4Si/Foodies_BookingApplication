import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import quantityReducer from '../slice/QuantitySlice';
import foodReducer from '../slice/FoodSlice';
import { combineReducers } from 'redux';

// Combine your reducers
const rootReducer = combineReducers({
  quantity: quantityReducer,
  food: foodReducer,
});

// Configure redux-persist
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,     // Use localStorage to persist data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // Export persistor
export default store;