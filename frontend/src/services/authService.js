const API_URL = "http://localhost:8080/api/auth";

// --- Registration Logic ---
export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Handle backend validation or server errors (e.g., 400 or 500)
        throw new Error(data.message || 'Registration failed');
    }

    // On successful registration, the backend returns a JWT token
    // Example response: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    localStorage.setItem('jwtToken', data.token);
    return data;
};


// --- Login Logic (for later use) ---
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
    }

    // On successful login, store the new JWT token
    localStorage.setItem('jwtToken', data.token);
    return data;
};


// --- Logout Logic (Client-Side) ---
export const logoutUser = () => {
    // Client-side removal of the token is the 'logout' action for JWTs
    localStorage.removeItem('jwtToken');
    console.log("User logged out, token removed.");
};