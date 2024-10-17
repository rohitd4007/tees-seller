'use client'; // Mark this as a client component

import { Provider } from 'react-redux';
import store from '../../redux/store'; // Import the store
import Cart from './Cart';

export default function CartPage() {
    return (
        <Provider store={store}>
            <Cart />
        </Provider>
    );
}
