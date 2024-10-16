import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await axios.post('http://localhost:3003/api/auth/login', { email, password });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.user.token);
            localStorage.setItem('userId', response.data.user.id);
            console.log(response.data.user.id);

            localStorage.setItem('userName', response.data.user.lastname);  // Assuming the last name is in the user object


            // Show success message and redirect after 2 seconds
            setSuccess(true);
            setTimeout(() => {
                navigate('/cvs'); // Redirect to /cvs after login
            }, 2000);

            // Optionally store token/user data
            // localStorage.setItem('token', response.data.user.token);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Login failed. Please try again.');
        }
    };

    const pageStyle = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Arial, sans-serif',
    };

    const contentStyle = {
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    };

    const formContainerStyle = {
        flex: 1,
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const imageContainerStyle = {
        flex: 1,
        backgroundColor: '#2c3e50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #cbd5e0',
        borderRadius: '4px',
        fontSize: '1rem',
    };

    const buttonStyle = {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    return (
        <div style={pageStyle}>
            <div style={contentStyle}>
                <div style={formContainerStyle}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2c3e50' }}>
                        Login to CV Generator
                    </h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Login successful! Redirecting...</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <button type="submit" style={buttonStyle}>
                            Log In
                        </button>
                    </form>
                    <p style={{ marginTop: '1rem', textAlign: 'center', color: '#718096' }}>
                        Don't have an account?
                        <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Sign up</Link>
                    </p>
                </div>
                <div style={imageContainerStyle}>
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 9H9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
