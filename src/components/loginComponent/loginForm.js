'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './loginForm.module.css'; // Import the CSS file
import toast from 'react-hot-toast';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            setError('An error occurred. Please log in again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://user-auth-orpin-ten.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify({
                    username: data.name,
                    userEmail: data.email,
                    userMobile: data?.mobile || ''
                }));
                toast.success('User Logged in Successfully')
                router.push('/dashboard');
            } else {
                const errMessage = await response.text();
                setError(errMessage || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <button type="submit" className={styles.button}>Login</button>
                <p className={styles.linkText}>Not User ? Sign Up here - <a href='/register' style={{ color: 'blue' }}>Register</a></p>
            </form>
        </div>
    );
}

export default LoginForm;
