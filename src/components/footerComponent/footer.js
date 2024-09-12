import React from 'react';
import styles from './footer.module.css';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faInstagram, faSquareXTwitter, faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.logoLinksSection}>
                <div className={styles.logo}>
                    <FontAwesomeIcon icon={faCoffee} />
                </div>
                <div className={styles.logo}>
                    <FontAwesomeIcon icon={faInstagram} />
                </div>
                <div className={styles.logo}>
                    <FontAwesomeIcon icon={faTelegram} />
                </div>
            </div>

            <div className={styles.footerLinks}>
                <div className={styles.linkColumn}>
                    <h4>Quick Links</h4>
                    <a href="/about-us">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>
                <div className={styles.linkColumn}>
                    <h4>Resources</h4>
                    <a href="/blog">Blog</a>
                    <a href="/help">Help Center</a>
                    <a href="/faq">FAQ</a>
                </div>
                <div className={styles.linkColumn}>
                    <h4>Connect with us</h4>
                    <a href="https://www.facebook.com">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.twitter.com">
                        <FontAwesomeIcon icon={faSquareXTwitter} />
                    </a>
                    <a href="https://www.linkedin.com">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
