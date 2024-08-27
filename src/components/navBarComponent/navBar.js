"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import styles from './navBar.module.css';

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const router = useRouter();

    const handleBtnClick = (route) => {
        router.push(route);
        closeSidebar(); // Close sidebar when a link is clicked
    }

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        console.log("userDATA : ", JSON.parse(userData))
        setCurrentUser(JSON.parse(userData)?.username)

    }, [router]);

    return (
        <>
            <div className={styles.navBarContainer}>
                <div className={styles.myLogin} onClick={() => currentUser ? '' : handleBtnClick('/login')}>
                    {currentUser ? currentUser : 'Login'}
                </div>
                <div className={styles.menuIcon} onClick={toggleSidebar}>
                    &#9776;
                </div>
                <div className={styles.navLinks}>
                    <div onClick={() => handleBtnClick('/')}>Home</div>
                    <div onClick={() => handleBtnClick('/register')}>Register</div>
                    <div onClick={() => handleBtnClick('/login')}>Login</div>
                    <div onClick={() => handleBtnClick('/addProduct')}>Add Product</div>
                    <div onClick={() => handleBtnClick('/about-us')}>About us</div>
                    <div onClick={() => handleBtnClick('/contact-me')}>Contact</div>
                </div>
            </div>

            <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.closeIcon} onClick={toggleSidebar}>
                    &times;
                </div>
                <div onClick={() => handleBtnClick('/')}>Home</div>
                <div onClick={() => handleBtnClick('/register')}>Register</div>
                <div onClick={() => handleBtnClick('/login')}>Login</div>
                <div onClick={() => handleBtnClick('/addProduct')}>Add Product</div>
                <div onClick={() => handleBtnClick('/about-us')}>About us</div>
                <div onClick={() => handleBtnClick('/contact-me')}>Contact</div>
            </div>

            {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
        </>
    );
};

export default NavBar;
