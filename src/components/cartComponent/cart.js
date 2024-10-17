'use client';

import { useEffect, useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Load cart from local storage when component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            setCartItems(cart.items ?? []);
            setTotalQuantity(cart.totalQuantity ?? 0);
            setTotalPrice(cart.totalPrice ?? 0);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div>
            <h2>Your Cart</h2>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <ul>
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <li key={item._id}>
                            {item.product_title} - {item.product_brand} - Selling Price: ${item.product_selling_price} - {item.quantity} x ${item.product_price} = ${(item.product_price * item.quantity).toFixed(2)}
                        </li>
                    ))
                ) : (
                    <li>Your cart is empty.</li>
                )}
            </ul>
        </div>
    );
};

export default Cart;
