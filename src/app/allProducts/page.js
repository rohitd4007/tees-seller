'use client'

import NavBar from '@/components/navBarComponent/navBar';
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
        <>
            <NavBar />
            <div style={{ background: '#303030', height: '100vh', paddingTop: '1rem' }}>
                <TopProducts products={products} headerTitle={"All Products"} />
            </div>
        </>
    );
}