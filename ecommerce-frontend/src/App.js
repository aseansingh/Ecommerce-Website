import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

// Loading component
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
    </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-xl text-red-600">
                        Something went wrong. Please refresh the page.
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <Suspense fallback={<LoadingFallback />}>
                    <Navbar />
                    <div className="container mx-auto px-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product/:id" element={<ProductPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard */}
                        </Routes>
                    </div>
                </Suspense>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
