import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import Loader from "../components/Loader";
import { uploadPhoto } from "../api";
import { toast } from "react-toastify";

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    // Authentication Check
    const isAuthenticated = !!localStorage.getItem('jwtToken');

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        // Essential check: If not authenticated, prompt login (though button is already conditional)
        if (!isAuthenticated) {
            toast.error("Please log in to start the analysis.");
            navigate("/login");
            return;
        }

        if (!selectedFile) {
            toast.error("Please select an image first!");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userId", "1"); 

            // Assuming uploadPhoto handles Authorization header
            const response = await uploadPhoto(formData);

            toast.success("AI analysis completed successfully 🌱");
            navigate("/results", { state: { data: response } });
        } catch (error) {
            console.error("Upload error:", error);

            if (error.response) {
                const message = error.response.data.message || "Server error";
                toast.error(`Upload failed: ${message}`);
            } else if (error.request) {
                toast.error(
                    "Cannot reach the server. Please ensure the backend is running on http://localhost:8080"
                );
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsUploading(false);
        }
    };

    // Handler for the "Login First" button
    const handleLoginClick = () => {
        toast.info("Logging in grants access to AI analysis and impact tracking.");
        navigate("/login");
    };


    // Helper component to render the main action button based on state
    const MainActionButton = () => {
        if (!isAuthenticated) {
            // State 1: Not Logged In
            return (
                <button
                    onClick={handleLoginClick}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform 
                                bg-red-500 hover:bg-red-600 text-white hover:-translate-y-1 shadow-lg hover:shadow-2xl`}
                >
                    Login First to Analyze 🔒
                </button>
            );
        }

        // State 2: Logged In (Show Analyze Button)
        return (
            <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                    selectedFile
                        ? "bg-primary-600 hover:bg-primary-700 text-white hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                {selectedFile
                    ? "Analyze Image with AI 🌱"
                    : "Select an Image to Continue"}
            </button>
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
            <div className="max-w-6xl mx-auto px-4 py-14">

                {/* ================= HERO SECTION (Visible Always) ================= */}
                <div className="text-center mb-20">
                    <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                        AI for Sustainable Living
                    </span>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Turn Waste Into{" "}
                        <span className="text-primary-600">Wise Choices</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Upload a photo and let our AI identify waste items and suggest
                        eco-friendly alternatives that help reduce pollution and protect
                        the planet.
                    </p>

                    {/* Hero Feature Cards */}
                    <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { title: "Upload Image", icon: "📸" },
                            { title: "AI Detection", icon: "🤖" },
                            { title: "Eco Suggestions", icon: "🌍" },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition text-center"
                            >
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h4 className="font-semibold">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= MAIN CARD ================= */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                    
                    {/* Conditional rendering based on UPLOADING state only. Upload form and How It Works are ALWAYS visible. */}
                    {isUploading ? (
                        /* State: Uploading */
                        <div className="py-16">
                            <Loader message="AI is detecting objects and generating eco-friendly alternatives..." />
                        </div>
                    ) : (
                        /* State: Ready to Upload/Login */
                        <>
                            {/* Upload Section (Visible Always) */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Upload an Image
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    Upload a photo of waste, plastic items, or everyday objects.
                                    Our AI will analyze it and generate sustainable suggestions.
                                </p>

                                <FileUpload
                                    onFileSelect={handleFileSelect}
                                    selectedFile={selectedFile}
                                />

                                <p className="text-sm text-gray-500 mt-3">
                                    Supported formats: JPG, PNG · Max size: 5MB
                                </p>
                            </div>

                            {/* Action Button (Conditional based on Auth State) */}
                            <MainActionButton />

                            {/* How It Works (Visible Always) */}
                            <div className="mt-12 pt-10 border-t border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                    How Green India Works
                                </h3>

                                <div className="grid md:grid-cols-4 gap-6">
                                    {[
                                        { step: "1", text: "Upload an image of waste items" },
                                        { step: "2", text: "AI detects and classifies objects" },
                                        { step: "3", text: "Get eco-friendly alternatives" },
                                        { step: "4", text: "Give feedback to improve results" },
                                    ].map((item) => (
                                        <div
                                            key={item.step}
                                            className="p-5 rounded-xl bg-green-50 border hover:shadow-md transition"
                                        >
                                            <div className="w-8 h-8 mb-3 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                                                {item.step}
                                            </div>
                                            <p className="text-gray-700 text-sm">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* ================= IMPACT SECTION ================= */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-xl bg-green-50 border hover:shadow-lg transition">
                        <h3 className="font-bold text-lg mb-2">🌍 Environmental Impact</h3>
                        <p className="text-gray-600">
                            Reduce landfill waste and carbon footprint through smarter daily
                            choices.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-blue-50 border hover:shadow-lg transition">
                        <h3 className="font-bold text-lg mb-2">🤖 AI-Driven Insights</h3>
                        <p className="text-gray-600">
                            Computer vision meets sustainability intelligence.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-yellow-50 border hover:shadow-lg transition">
                        <h3 className="font-bold text-lg mb-2">🇮🇳 Local Relevance</h3>
                        <p className="text-gray-600">
                            Designed for Indian lifestyle and consumption habits.
                        </p>
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="mt-14 text-center text-gray-600 text-sm">
                    🌱 Together, we can build a cleaner and greener India 🌍
                </div>
            </div>
        </div>
    );
};

export default Home;