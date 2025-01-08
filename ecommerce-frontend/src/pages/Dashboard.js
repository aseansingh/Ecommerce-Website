import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            // Redirect to login if not authenticated
            navigate('/login');
        }
    }, [navigate]);

    return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;
