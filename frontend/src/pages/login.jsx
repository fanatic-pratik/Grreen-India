import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify"; // <<< IMPORT TOAST HERE

const Login = () => {
    // State to hold the form data (email and password)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate(); // Hook for redirection after login

    // Handler for updating state when input changes
    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value // Uses the input's 'name' attribute
        });
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Call the service function to authenticate and store the token
            await loginUser(formData.email, formData.password);
            
            // ** SUCCESS: Replaced alert() with toast.success() **
            toast.success("Login successful! Welcome back 🌱");
            console.log("Login successful. JWT stored.");
            
            // Redirect to the secured dashboard
            navigate("/"); 

        } catch (err) {
            // Failure: Display the error message from the backend
            setError(err.message || "Login failed. Check your network or server connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Welcome Back 🌱
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Login to continue making sustainable choices
                </p>

                {/* Display any login errors */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Attach the onSubmit handler to the form element */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email" // <--- Required for state management
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mb-4 p-3 border rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password" // <--- Required for state management
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full mb-6 p-3 border rounded-lg"
                        required
                    />

                    <button 
                        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                        type="submit" // Set type to submit
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-primary-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;