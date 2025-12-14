import React, { useState, useEffect } from 'react';
import { getDailyChallenge, completeChallenge } from '../services/challengeService'; // <--- Import the new service
import { logoutUser } from '../services/authService'; // Assuming this function is available for clean logout
import '../style.css';

function ChallengePage() {
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ message: 'Initializing...', type: 'info' });
    const [isCompleting, setIsCompleting] = useState(false);
    
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    useEffect(() => {
        if (isLoggedIn) {
            handleFetchDailyChallenge();
        } else {
            setLoading(false);
            setStatus({ message: 'Please log in to view the daily challenge.', type: 'error' });
        }
    }, [isLoggedIn]);

    const handleFetchDailyChallenge = async () => {
        setLoading(true);
        setStatus({ message: 'Fetching today\'s challenge...', type: 'info' });
        
        try {
            const data = await getDailyChallenge();
            setChallenge(data);
            setStatus({ message: 'Challenge ready!', type: 'info' });

        } catch (error) {
            console.error("Error fetching daily challenge:", error);
            setStatus({ message: error.message, type: 'error' });
            
            // If authentication fails, force a logout to clear the bad token
            if (error.message.includes("Session expired") || error.message.includes("Authentication required")) {
                 // logoutUser(); // Call your existing function to remove the token
            }
            
            setChallenge(null); 
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!challenge || isCompleting) return;
        
        setIsCompleting(true);
        setStatus({ message: 'Submitting challenge for validation...', type: 'info' });
        
        try {
            const message = await completeChallenge(challenge.id);
            
            setStatus({ message: message, type: 'success' });
            setChallenge(null); // Mark as completed on the UI

        } catch (error) {
            console.error("Error completing challenge:", error);
            setStatus({ message: error.message, type: 'error' });
            
            // If authentication fails, force a logout
            if (error.message.includes("Session expired")) {
                 // logoutUser(); 
            }

        } finally {
            setIsCompleting(false);
        }
    };
    
    // --- JSX Render Logic ---
    let challengeContent;

    if (!isLoggedIn) {
        challengeContent = (
            <div className="status-message error">
                <h2>Access Denied</h2>
                <p>Please log in to participate in the Green India Challenges.</p>
            </div>
        );
    } else if (loading) {
        challengeContent = <p>Loading Daily Challenge Data...</p>;
    } else if (!challenge) {
        challengeContent = <h2>Daily Challenge Status</h2>;
    } else {
        challengeContent = (
            <>
                <div className="challenge-card">
                    <h2>{challenge.title}</h2>
                    <p>{challenge.description}</p>
                    <p>Category: <strong>{challenge.category}</strong></p>
                    <p className="points">Reward: {challenge.pointsReward} EcoPoints</p>
                </div>
                
                <button 
                    onClick={handleComplete} 
                    disabled={isCompleting}
                >
                    {isCompleting ? 'Processing...' : 'I Completed This! Earn Points'}
                </button>
            </>
        );
    }

    return (
        <div className="container">
            <h1>🌱 Green India Challenge Tracker</h1>
            
            {challengeContent}

            {status.message && (
                <div className={`status-message ${status.type}`}>
                    {status.message}
                </div>
            )}
        </div>
    );
}

export default ChallengePage;