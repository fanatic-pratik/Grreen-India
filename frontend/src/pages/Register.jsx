import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify"; // <<< 3. IMPORT TOAST HERE

const Register = () => {
    // 4. State for form inputs and error/loading status
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate(); // Hook for redirection

    // 5. Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 6. Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Call the service function
            await registerUser(formData.name, formData.email, formData.password);
            
            // ** SUCCESS: Replaced alert() with toast.success() **
            toast.success("Registration successful! Welcome to Green India! 🌱");
            navigate("/"); // Redirecting to /dashboard as planned

        } catch (err) {
            // Failure: Display error message
            // Note: The error display in the component remains the same, but the error source is the backend.
            setError(err.message || "An unknown error occurred during registration.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Join Green India 🌍
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Start your journey toward sustainability
                </p>

                {/* 7. Error Message Display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {/* 8. Attach onSubmit handler to a form element */}
                <form onSubmit={handleSubmit}>
                    <input 
                        className="w-full mb-3 p-3 border rounded-lg" 
                        placeholder="Name" 
                        name="name" // Use name attribute for identification
                        value={formData.name} 
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className="w-full mb-3 p-3 border rounded-lg" 
                        placeholder="Email" 
                        name="email" // Use name attribute
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className="w-full mb-6 p-3 border rounded-lg" 
                        placeholder="Password" 
                        name="password" // Use name attribute
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange}
                        required
                    />

                    <button 
                        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                        type="submit" // Set type to submit
                        disabled={isLoading} // Disable while loading
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;