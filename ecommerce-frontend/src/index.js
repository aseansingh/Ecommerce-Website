import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import './index.css';
import App from './App';
import CartProvider from './context/CartContext';

// Create the root with React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with CartProvider
root.render(
    <React.StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </React.StrictMode>
);
