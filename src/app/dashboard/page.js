'use client';

import AddProductForm from '@/components/addProductComponent/addProductForm';
import ImageSlider from '@/components/imageSlider/imageSlider';
import NavBar from '@/components/navBarComponent/navBar';
import TopProducts from '@/components/topProductComponent/topProduct';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { getUserRole } from '../utils/auth'; // Assume this function checks the user's role from a JWT or session

export default function Page() {
    // const router = useRouter();

    // useEffect(() => {
    //     // Check if the user is an admin
    //     const role = getUserRole(); // Implement this function to get the user's role from JWT or session
    //     if (role === 'admin') {
    //         setIsAdmin(true);
    //     } else {
    //         router.push('/'); // Redirect to home if not admin
    //     }
    // }, []);

    return (
        <div>
            <NavBar />
            <ImageSlider />
            <TopProducts />
        </div>
    );
}
