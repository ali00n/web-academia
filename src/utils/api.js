// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth API
export const authAPI = {
    async register(userData) {
        return apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            skipAuth: true
        });
    },

    async login(credentials) {
        return apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            skipAuth: true
        });
    }
};

// Member API
export const memberAPI = {
    async createProfile(profileData) {
        return apiCall('/member/profile', {
            method: 'POST',
            body: JSON.stringify(profileData)
        });
    },

    async getProfile() {
        return apiCall('/member/profile');
    },

    async markAttendance(date = null, status = 'present') {
        return apiCall('/member/attendance', {
            method: 'POST',
            body: JSON.stringify({ date, status })
        });
    },

    async getAttendance(limit = 30) {
        return apiCall(`/member/attendance?limit=${limit}`);
    },

    async getStats() {
        return apiCall('/member/stats');
    }
};
