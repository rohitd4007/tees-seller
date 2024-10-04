"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import styles from './navBar.module.css';

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const router = useRouter();

    const toggleDropdown = () => setIsDropdownVisible(prev => !prev);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    const handleBtnClick = (route) => {
        router.push(route);
        closeSidebar(); // Close sidebar when a link is clicked
    }

    const logoutUser = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        router.push('/login');
    }

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        setCurrentUser(JSON.parse(userData)?.username || '');
    }, [router]);

    return (
        <>
            <div className={styles.navBarContainer}>
                <div
                    className={styles.myLogin}
                    onClick={() => currentUser ? toggleDropdown() : handleBtnClick('/login')}
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                >
                    <span>{currentUser || 'Login'}</span>
                    {currentUser && isDropdownVisible && (
                        <div className={styles.dropdownContent} onMouseLeave={toggleDropdown}>
                            <div className={styles.dropdownItem}>My Profile</div>
                            <div className={styles.dropdownItem}>My Orders</div>
                            <div className={styles.dropdownItem}>Cart Items</div>
                            <div className={styles.dropdownItem} onClick={logoutUser}>Log Out</div>
                        </div>
                    )}
                </div>
                <div className={styles.menuIcon} onClick={toggleSidebar}>
                    &#9776;
                </div>
                <div className={styles.navLinks}>
                    {['/', '/register', '/allProducts', '/addProduct', '/about-us', '/contact-me'].map((route, index) => (
                        <div key={index} onClick={() => handleBtnClick(route)}>{route === '/' ? 'Home' : route.split('/')[1].replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}</div>
                    ))}
                </div>
            </div>

            <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.closeIcon} onClick={toggleSidebar}>
                    &times;
                </div>
                {['/', '/register', '/allProducts', '/addProduct', '/about-us', '/contact-me'].map((route, index) => (
                    <div key={index} onClick={() => handleBtnClick(route)}>{route === '/' ? 'Home' : route.split('/')[1].replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}</div>
                ))}
            </div>

            {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
        </>
    );
};

export default NavBar;
