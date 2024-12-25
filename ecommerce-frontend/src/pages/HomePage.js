import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className={styles.loadingContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.errorContainer}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Products</h1>
            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product._id} className={styles.productCard}>
                        <Link to={`/product/${product._id}`} className={styles.productLink}>
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                            )}
                            <p className={styles.productName}>{product.name}</p>
                            <p className={styles.productPrice}>${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;