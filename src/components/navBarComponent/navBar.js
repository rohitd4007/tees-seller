"use client";

// src/components/ImageSlider.js
import { useRouter } from 'next/navigation';
import React from "react";
import styles from './navBar.module.css'; // Assuming you have CSS modules enabled


const NavBar = () => {
    const router = useRouter();

    const handleBtnClick = (route) => {
        router.push(route);
    }

    return (
        <div className={styles.navBarContainer}>
            <div onClick={() => handleBtnClick('/')}>Home</div>
            <div onClick={() => handleBtnClick('/register')}>Register</div>
            <div onClick={() => handleBtnClick('/login')}>Login</div>
            <div onClick={() => handleBtnClick('/add-product')}>Add Product</div>
            <div onClick={() => handleBtnClick('/about-us')}>About us</div>
            <div onClick={() => handleBtnClick('/contact-me')}>Contact</div>
        </div>
    );
};

export default NavBar;
