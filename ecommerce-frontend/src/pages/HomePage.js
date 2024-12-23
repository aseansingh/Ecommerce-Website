import React, { useEffect, useState } from 'react';
import { getProducts } from '../api';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
