'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './registrationForm.module.css'; // Import the CSS file

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
        try {
            const response = await fetch('https://user-auth-orpin-ten.vercel.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                router.push('/login');
            } else {
                const errMessage = await response.text();
                console.error('Error during registration:', errMessage);
            }
        } catch (err) {
            console.error('Error during registration:', err);
        }

        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Mobile:</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

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

                <div className={styles.formGroup}>
                    <label className={styles.label}>PIN:</label>
                    <input
                        type="password"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <button type="submit" className={styles.button}>Register</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
