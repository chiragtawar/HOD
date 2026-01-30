import config from '../config';

// Utility function to get authentication headers for admin API calls
export const getAuthHeaders = () => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
        throw new Error('No authentication token found');
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
    };
};

// Fetch wrapper with authentication
export const authFetch = async (url, options = {}) => {
    const headers = getAuthHeaders();
    const fullUrl = url.startsWith('http') ? url : `${config.API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });

    if (response.status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('auth');
        window.location.href = '/admin/login';
        throw new Error('Unauthorized');
    }

    return response;
};
