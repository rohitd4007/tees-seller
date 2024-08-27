'use client';

import ImageSlider from '@/components/imageSlider/imageSlider';
import NavBar from '@/components/navBarComponent/navBar';
import TopBrands from '@/components/topBrandsComponent/topBrands';
import TopProducts from '@/components/topProductComponent/topProduct';
import { useRouter } from 'next/navigation';
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


    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            verifyToken(token);
        } else {
            router.push('/login')
        }
    }, [router]);

    const verifyToken = async (token) => {
        try {
            const response = await fetch('https://user-auth-orpin-ten.vercel.app/api/auth/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                router.push('/dashboard');
            } else {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData')
                setError('Session expired. Please log in again.');
                router.push('/login');
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            setError('An error occurred. Please log in again.');
        }
    };

    return (
        <div>
            <NavBar />
            <ImageSlider />
            <TopBrands />
            <TopProducts products={productData} />
        </div>
    );
}
