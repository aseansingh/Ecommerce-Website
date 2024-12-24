import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return <p>Your cart is empty. <Link to="/">Go shopping!</Link></p>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item._id}>
                        <p>{item.name} - ${item.price} x {item.quantity}</p>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
};

export default CartPage;
