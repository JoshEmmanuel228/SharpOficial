import { API_URL } from '../config';

const AUTH_URL = `${API_URL}/users`;

const register = async (userData) => {
    const response = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error registering user');
    }

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

const login = async (userData) => {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error logging in');
    }

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getProfile = async (token) => {
    const response = await fetch(`${AUTH_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return await response.json();
};

const updateProfile = async (userData, token) => {
    // Note: The /profile endpoint is at /api/users/profile or /api/auth/profile depending on route, 
    // but authService usually points to /api/users.
    // The previous code had `${API_URL}/profile` where API_URL was .../api/users.
    // So target is `.../api/users/profile`.
    const response = await fetch(`${AUTH_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to update profile');
    }

    return await response.json();
};

const authService = {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
};

export default authService;
