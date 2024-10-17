'use client';

import { useSelector } from 'react-redux';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    return (
        <div>
            <h2>Your Cart</h2>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.title} - {item.quantity} x ${item.price} = ${item.totalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
