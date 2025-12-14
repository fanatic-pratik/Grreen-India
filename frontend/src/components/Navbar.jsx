import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { logoutUser } from "../services/authService"; // Import the logout function
import { toast } from "react-toastify"; // <<< 3. IMPORT TOAST HERE

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate hook

    // 1. Check Auth State: Check if a token exists in local storage
    const isAuthenticated = !!localStorage.getItem('jwtToken'); 

    const linkClass = (path) =>
        location.pathname === path
            ? "text-primary-600 font-semibold"
            : "text-gray-600 hover:text-primary-600";

    // 2. Logout Handler: Clears the token and redirects
    const handleLogout = () => {
        logoutUser(); // This removes the JWT from localStorage
        
        // Optional: Add a simple confirmation alert
        toast.success("Logout successful! 🌱");

        // Redirect to the login page or home page
        navigate("/login"); 
        
        // Force a re-render of the navbar by navigating, or you can use state management
        // to force update if needed (not strictly necessary with this simple check).
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl">🌱</span>
                    <span className="text-xl font-extrabold text-gray-900">
                        Green<span className="text-primary-600">India</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm">
                    <Link className={linkClass("/")} to="/">Home</Link>
                    <Link className={linkClass("/how-it-works")} to="/how-it-works">How It Works</Link>
                    <Link className={linkClass("/about")} to="/about">About</Link>
                    <Link className={linkClass("/impact")} to="/impact">Impact</Link>
                    <Link className={linkClass("/faq")} to="/faq">FAQ</Link>
                    
                    {/* NEW: Link to the Dashboard/Profile when logged in */}
                    {isAuthenticated && (
                        <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
                    )}
                </nav>

                {/* 3. Conditional Auth Buttons */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        // --- STATE: LOGGED IN (Show Logout) ---
                        <button
                            onClick={handleLogout} // Attach the handler to the button
                            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 shadow transition duration-150"
                        >
                            Logout
                        </button>
                    ) : (
                        // --- STATE: LOGGED OUT (Show Login & Register) ---
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 shadow"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;