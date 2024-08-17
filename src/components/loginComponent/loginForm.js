'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            // Verify token (for example, call an API to validate the token)
            verifyToken(token);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            // Example API call to verify token
            const response = await fetch('https://user-auth-orpin-ten.vercel.app/api/auth/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Token is valid, redirect to a protected route
                router.push('/dashboard');
            } else {
                // Token is invalid, clear token and show error
                localStorage.removeItem('authToken');
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
            // Call the login API to authenticate the user
            const response = await fetch('https://user-auth-orpin-ten.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage
                localStorage.setItem('authToken', data.token);
                // Redirect to a protected route
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
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
