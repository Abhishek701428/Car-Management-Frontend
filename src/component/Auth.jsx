import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Auth({ mode, setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            navigate('/');
        }
    }, [navigate, setIsAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = mode === 'login' ? 'https://car-management-backend.onrender.com/api/docs/login' : 'https://car-management-backend.onrender.com/api/docs/register';

        try {
            const response = await axios.post(url, { email, password });
            sessionStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="auth-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="auth-input"
                    />
                    <button type="submit" className="auth-button">
                        {mode === 'login' ? 'Login' : 'Register'}
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        {mode === 'login' ? 'Don’t have an account? ' : 'Already have an account? '}
                        <span onClick={() => navigate(mode === 'login' ? '/register' : '/login')} className="auth-link">
                            {mode === 'login' ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Auth;
