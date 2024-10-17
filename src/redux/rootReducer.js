'use client';

import { combineReducers } from 'redux';
import productReducer from './productSlice';
import cartReducer from './cartSlice'; // Import the cart reducer

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer, // Add the cart reducer here
});

export default rootReducer;
