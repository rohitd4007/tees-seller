'use client';

import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast

// Ensure we're in a browser environment before accessing local storage
const isBrowser = typeof window !== 'undefined';

// Load cart from local storage only on the client side
const loadCartFromLocalStorage = () => {
    if (!isBrowser) return { items: [], totalQuantity: 0, totalPrice: 0 }; // Fallback for SSR
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0, totalPrice: 0 };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(), // Load the cart from local storage
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            // Ensure state.items exists before using .find
            const existingItem = state.items ? state.items.find(item => item._id === newItem._id) : null;
            if (existingItem) {
                existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 1; // Safely increment quantity
            } else {
                // Instead of reassigning state.items, directly push new item if state.items exists
                if (!state.items) {
                    state.items = []; // Initialize array if not present
                }
                state?.items?.push({ ...newItem, quantity: 1 }); // Add new item to cart
            }

            // Safely increment totalQuantity, fallback to 0 if undefined
            // state.totalQuantity = state.totalQuantity ? state.totalQuantity + 1 : 1;
            // Safely increment totalPrice, fallback to 0 if undefined
            // state.totalPrice = state.totalPrice ? state.totalPrice + newItem.price : newItem.price;

            // Show toast notification after adding item to cart
            toast.success("Product Added to Cart"); // Update this line

            // Save updated cart to local storage (ensure client-side execution)
            console.log(" TEST : ", newItem, isBrowser, state, existingItem)

            if (isBrowser) {
                console.log(" TEST 22 : ", JSON.stringify(state))
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        // removeItemFromCart(state, action) {
        //     const id = action.payload;
        //     // Ensure state.items exists before using .find
        //     const existingItem = state.items ? state.items.find(item => item.id === id) : null;

        //     if (existingItem) {
        //         // Safely decrement totalQuantity and totalPrice, fallback to 0 if undefined
        //         state.totalQuantity = state.totalQuantity ? state.totalQuantity - 1 : 0;
        //         state.totalPrice = state.totalPrice ? state.totalPrice - existingItem.price : 0;

        //         if (existingItem.quantity === 1) {
        //             // Instead of reassigning state.items, use filter method directly
        //             state.items = state.items ? state.items.filter(item => item.id !== id) : [];
        //         } else {
        //             existingItem.quantity--; // Decrement quantity
        //         }

        //         // Update local storage (ensure client-side execution)
        //         if (isBrowser) {
        //             localStorage.setItem('cart', JSON.stringify(state));
        //         }
        //     }
        // },
        // clearCart(state) {
        //     // Reset items array and other properties directly
        //     state.items.length = 0; // Use this to clear the array in Immer-compatible way
        //     state.totalQuantity = 0;
        //     state.totalPrice = 0;

        //     // Clear local storage
        //     if (isBrowser) {
        //         localStorage.removeItem('cart');
        //     }
        // },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
