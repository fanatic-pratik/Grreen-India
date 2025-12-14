const API_BASE_URL = "http://localhost:8080/api/challenges";

/**
 * Helper function to retrieve the JWT token from local storage.
 * @returns {string | null} The JWT token.
 */
const getToken = () => {
    return localStorage.getItem('jwtToken');
};

/**
 * Standardized function to fetch the user's daily challenge.
 * @returns {Promise<object>} The challenge data.
 * @throws {Error} If fetching fails or authentication is required.
 */
export const getDailyChallenge = async () => {
    const token = getToken();
    if (!token) {
        throw new Error("Authentication required. Please log in.");
    }

    const response = await fetch(`${API_BASE_URL}/daily`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error("Session expired. Please log in again.");
    }

    if (response.status === 500) {
        throw new Error("Configuration error: No daily challenges defined in the database.");
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch challenge: ${response.status} - ${errorText}`);
    }

    return response.json();
};


/**
 * Standardized function to mark a challenge as complete.
 * @param {number} challengeId The ID of the challenge to complete.
 * @returns {Promise<string>} The success message from the backend.
 * @throws {Error} If completion fails or authentication is required.
 */
export const completeChallenge = async (challengeId) => {
    const token = getToken();
    if (!token) {
        throw new Error("Authentication required. Please log in.");
    }

    const response = await fetch(`${API_BASE_URL}/${challengeId}/complete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    
    // The backend returns text, not JSON, for the success/error message
    const message = await response.text(); 

    if (response.status === 401 || response.status === 403) {
        throw new Error("Session expired. Cannot complete challenge.");
    }

    if (!response.ok) {
        throw new Error(message || 'Completion failed due to a server error.');
    }

    return message; // This is the success message like "Challenge completed! You earned the reward."
};