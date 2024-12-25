import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';
import { CartContext } from '../context/CartContext';
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
        }
    };

    if (loading) {
        return <div className={styles.loadingContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.errorContainer}>{error}</div>;
    }

    if (!product) {
        return <div className={styles.errorContainer}>Product not found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.productDetails}>
                {product.image && (
                    <div className={styles.imageContainer}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productImage}
                        />
                    </div>
                )}
                <div className={styles.infoContainer}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Price: ${product.price}</p>
                    <p className={styles.productStock}>
                        Stock: {product.stock || product.countInStock}
                    </p>

                    <div className={styles.addToCartContainer}>
                        <div className={styles.quantitySelector}>
                            <label htmlFor="quantity">Quantity:</label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className={styles.quantitySelect}
                            >
                                {[...Array(Math.min(10, product.stock || product.countInStock)).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className={styles.addToCartButton}
                            onClick={handleAddToCart}
                            disabled={!product.stock && !product.countInStock}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;