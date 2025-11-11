// src/components/LoginPage.jsx

import React, { useState } from 'react';

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // ✅ Allow any user to log in if both fields are filled
        if (username.trim() !== '' && password.trim() !== '') {
            onLoginSuccess(username);
        } else {
            setError('Please enter both username and password.');
        }
    };

    return (
        <div style={styles.background}>
            <div style={styles.card}>
                <h2 style={styles.header}>AI Generator Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Log In
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                    <p style={styles.hint}>You can use any username and password.</p>
                </form>
            </div>
        </div>
    );
}


const styles = {
    background: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        fontFamily: 'Poppins, sans-serif',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '15px',
        padding: '40px 30px',
        textAlign: 'center',
        width: '350px',
        color: 'white',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    header: {
        marginBottom: '25px',
        fontSize: '1.8rem',
        letterSpacing: '1px',
        color: '#fff',
        textShadow: '0 2px 5px rgba(0,0,0,0.3)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px 15px',
        borderRadius: '8px',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        color: '#333',
    },
    button: {
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.3s ease, transform 0.2s ease',
    },
    error: {
        color: '#ff6666',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    hint: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#ddd',
    },
};

export default LoginPage;
