import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>E-Commerce</h1>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/cart" className={styles.link}>Cart</Link> {/* Added Cart link */}
                <Link to="/login" className={styles.link}>Login</Link>
                <Link to="/register" className={styles.link}>Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
