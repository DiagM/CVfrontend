import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3003/api/auth/register', {
                firstname,
                lastname,
                email,
                password,
            });
            console.log('Registration successful:', response.data);

            // Display success notification
            toast.success('Registration successful!', {
                position: "top-right",
                autoClose: 3000, // Automatically close after 3 seconds
            });

            // Redirect to login after a delay (for the toast to display)
            setTimeout(() => {
                navigate('/login');
            }, 2000); // 3-second delay before redirection

        } catch (err) {
            console.error('Registration failed:', err.response ? err.response.data : err.message);
            setError('Registration failed. Please try again.');
            toast.error('Registration failed. Please try again.', {
                position: "top-right",
            });
        }
    }

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
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2c3e50' }}>Create Your CV Account</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            style={inputStyle}
                        />
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
                            Create Account
                        </button>
                    </form>
                    <p style={{ marginTop: '1rem', textAlign: 'center', color: '#718096' }}>
                        Already have an account?
                        <Link to="/login" style={{ color: '#3498db', textDecoration: 'none' }}>Sign in</Link>
                    </p>
                </div>
                <ToastContainer /> {/* Toast container to show notifications */}
            </div>
        </div>
    );
}
