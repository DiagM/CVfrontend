import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');  // Get the user's name from localStorage
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Remove the token and userName from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navStyle = {
        backgroundColor: '#2c3e50',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 1rem',
        fontSize: '1rem',
    };

    const logoStyle = {
        ...linkStyle,
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };

    const dropdownStyle = {
        position: 'relative',
        display: 'inline-block',
    };

    const dropdownContentStyle = {
        display: dropdownOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        minWidth: '160px',
        boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
        zIndex: 1,
    };

    const dropdownItemStyle = {
        color: 'black',
        padding: '12px 16px',
        textDecoration: 'none',
        display: 'block',
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>CV Generator</Link>
            <div>
                {token ? (
                    <>
                        <Link to="/cv/mycv" style={linkStyle}>My CVs</Link>
                        <Link to="/cvs" style={linkStyle}>All CVs</Link>
                        <Link to="/cv/new" style={linkStyle}>Create CV</Link>
                        <Link to="/api-docs" style={linkStyle}>docs</Link>

                        {/* Dropdown for User's Name and Logout */}
                        <div style={dropdownStyle}>
                            <button
                                onClick={toggleDropdown}
                                style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {userName || "User"} {/* Display the user's name or 'User' if not available */}
                            </button>
                            <div style={dropdownContentStyle}>
                                <Link to="/profile" style={dropdownItemStyle}>Profile</Link>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        ...dropdownItemStyle,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
