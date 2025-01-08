import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5001/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/users/login`,
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const { success, token, message, user } = response.data;

            if (success && token) {
                localStorage.setItem('userToken', token);

                // Store additional user data if provided
                if (user) {
                    localStorage.setItem('userRole', user.role);
                    localStorage.setItem('userName', user.name);
                }

                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                throw new Error(message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                'Unable to login. Please check your credentials and try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isLoggedIn ? 'Welcome back!' : 'Sign in to your account'}
                </h2>
                {isLoggedIn ? (
                    <div className="space-y-6">
                        <button
                            onClick={handleSignOut}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
