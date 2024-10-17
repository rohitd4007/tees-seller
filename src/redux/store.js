'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import your cart reducer

const store = configureStore({
    reducer: {
        cart: cartReducer, // Add the cart reducer here
    },
});

export default store;
