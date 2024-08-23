'use client';

import ImageSlider from '@/components/imageSlider/imageSlider';
import NavBar from '@/components/navBarComponent/navBar';
import TopProducts from '@/components/topProductComponent/topProduct';
import { useEffect, useState } from 'react';

export default function Page() {

    const [productData, setProductData] = useState([])

    const getProducts = async () => {
        try {
            const res = await fetch('https://user-auth-orpin-ten.vercel.app/api/product/all-products')
            let products = await res.json();
            setProductData(products)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <NavBar />
            <ImageSlider />
            <TopProducts products={productData} />
        </div>
    );
}
