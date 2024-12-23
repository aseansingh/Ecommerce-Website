const BASE_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    return response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
};

// New post method
export const post = async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
};
