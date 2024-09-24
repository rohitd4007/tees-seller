'use client'

import TopProducts from '@/components/topProductComponent/topProduct';
import { useEffect, useState } from 'react';

export default function AllProducts({ params }) {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await fetch('https://user-auth-orpin-ten.vercel.app/api/product/all-products');
            let products = await res.json();
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <TopProducts products={products} headerTitle={"All Products"} />
        </div>
    );
}