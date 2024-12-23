import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>E-Commerce</h1>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/login" style={styles.link}>Login</Link>
                <Link to="/register" style={styles.link}>Register</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
    },
};

export default Navbar;
