// src/components/GeminiGenerator.jsx

import React, { useState } from 'react';

// Use this for local development with a Node.js backend
const BACKEND_URL = 'http://localhost:3001/api/generate-content';

// 🌈 Stylish glass and uniform violet gradient styles
const styles = {
    background: {
        // Use minHeight to ensure full screen, but allow expansion for long content
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column', // Stack content vertically
        // Center content horizontally only
        justifyContent: 'flex-start',
        alignItems: 'center',
        // New uniform deep violet gradient for a consistent look
        background: 'linear-gradient(135deg, #5D00B0, #7D26C4)',
        fontFamily: 'Inter, Poppins, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        color: 'white',
        padding: '40px 20px',
        boxSizing: 'border-box',
    },
    container: {
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '25px',
        padding: '50px',
        width: '100%',
        maxWidth: '900px',
        textAlign: 'center',
        marginTop: 'auto', // Push container to the top on short screens
        marginBottom: 'auto', // Center vertically on short screens
    },
    header: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        textShadow: '0 3px 10px rgba(0,0,0,0.5)',
        fontWeight: '800', // Extra bold
        color: 'white',
    },
    subHeader: {
        fontSize: '1.1rem',
        color: '#f0f0f0',
        marginBottom: '30px',
        fontWeight: '300',
    },
    form: {
        display: 'flex',
        gap: '15px',
        marginBottom: '30px',
        flexWrap: 'wrap', // Allow wrapping on small screens
    },
    input: {
        flexGrow: 1,
        padding: '14px 20px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        outline: 'none',
        fontSize: '16px',
        color: '#333',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '200px', // Ensure input is usable on mobile
    },
    button: {
        padding: '14px 30px',
        borderRadius: '10px',
        border: 'none',
        // High-contrast, vibrant button gradient
        background: 'linear-gradient(135deg, #00C6FF, #0072FF)', 
        color: 'white',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        flexShrink: 0,
    },
    responseBox: {
        background: 'rgba(255, 255, 255, 0.15)',
        padding: '25px',
        borderRadius: '15px',
        textAlign: 'left',
        boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
        color: '#fff',
    },
    responseHeader: {
        marginBottom: '15px',
        fontSize: '1.5rem',
        borderBottom: '2px solid rgba(255,255,255,0.4)',
        paddingBottom: '8px',
        fontWeight: '600',
        color: 'white',
    },
    responseText: {
        whiteSpace: 'pre-wrap',
        fontSize: '1.05rem',
        lineHeight: '1.8',
        color: '#ffffff',
    },
};


function Generator() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('Type a prompt and click Generate.');
    const [isLoading, setIsLoading] = useState(false);
    const [isHovering, setIsHovering] = useState(false); // New state for hover effect

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setResponse('⚙️ Generating response from Node.js Backend...');

        try {
            // Note: This fetch will fail unless a Node.js server is running at localhost:3001
            const res = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.text);
        } catch (error) {
            console.error("Fetch Error:", error);
            setResponse(`❌ Error: Could not connect or process your request.\nDetails: ${error.message}\n(Ensure your Node.js backend is running.)`);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate button style based on loading and hover state
    const buttonStyle = {
        ...styles.button,
        // Override background color when loading
        background: isLoading
            ? 'linear-gradient(135deg, #999, #888)'
            : styles.button.background,
        // Apply hover transformations
        transform: isHovering && !isLoading ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isHovering && !isLoading ? '0 8px 25px rgba(0, 0, 0, 0.4)' : styles.button.boxShadow,
    };


    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h1 style={styles.header}>⚡ AI Content Generator</h1>
                <p style={styles.subHeader}>Powered by Node.js + Gemini API</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="💬 Ask Gemini to explain something..."
                        disabled={isLoading}
                        style={styles.input}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={buttonStyle}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {isLoading ? 'Generating...' : 'Generate 🚀'}
                    </button>
                </form>

                <div style={styles.responseBox}>
                    <h2 style={styles.responseHeader}>🧠 Response:</h2>
                    <p style={styles.responseText}>{response}</p>
                </div>
            </div>
        </div>
    );
}

export default Generator;