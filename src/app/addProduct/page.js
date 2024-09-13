'use client';

import AddProductForm from "@/components/addProductComponent/addProductForm";
import NavBar from "@/components/navBarComponent/navBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProduct() {
    const [showForm, setShowForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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

        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center', background: '#303030' }}>
            {/* {isAdmin && ( */}
            {!showForm &&
                <button
                    style={{
                        padding: '1rem',
                        backgroundColor: 'darkseagreen',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '1rem',
                        fontSize: '2rem',
                        color: '#000000'
                    }}
                    onClick={() => setShowForm(true)}>
                    Add Product
                </button>
            }
            {/* )} */}
            {showForm && <AddProductForm setShowForm={setShowForm} />}
        </div>
    </>;
}
