import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Products</h1>
            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product._id} className={styles.productCard}>
                        <Link to={`/product/${product._id}`} className={styles.productLink}>
                            <p className={styles.productName}>{product.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
