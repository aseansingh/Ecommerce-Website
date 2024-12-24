import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api'; // Correctly import the named export
import { CartContext } from '../context/CartContext';
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id); // Use the imported function
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.productDetails}>
                <h1 className={styles.productName}>{product.name}</h1>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>Price: ${product.price}</p>
                <p className={styles.productStock}>Stock: {product.stock}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductPage;
