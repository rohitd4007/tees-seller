'use client';

import NavBar from "@/components/navBarComponent/navBar";
import ProductDetail from "@/components/productDetailsComponent/productDetails";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetails() {

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

            if (!response.ok) {
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
    return <>
        <NavBar />
        <ProductDetail />
    </>;
}
