import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('userToken');

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>E-Commerce</h1>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/cart" className={styles.link}>Cart</Link>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/register" className={styles.link}>Register</Link>
                    </>
                ) : (
                    <button onClick={handleSignOut} className={styles.signOut}>
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
