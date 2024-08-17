'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        pin: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API or perform validation
        try {
            // Call the login API to authenticate the user
            const response = await fetch('https://user-auth-orpin-ten.vercel.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage
                // localStorage.setItem('authToken', data.token);
                // Redirect to a protected route
                router.push('/login');
            } else {
                const errMessage = await response.text();
                console.error('Error during Reg:', errMessage);

                // setError(errMessage || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            // setError('An error occurred. Please try again.');
        }


        console.log('Form Data Submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Mobile:</label>
                <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                />
            </div>

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

            <div>
                <label>PIN:</label>
                <input
                    type="password"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
