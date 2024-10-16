import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>CV Generator</Link>
            <div>
                <Link to="/cvs" style={linkStyle}>My CVs</Link>
                <Link to="/cv/new" style={linkStyle}>Create CV</Link>
                <Link to="/login" style={linkStyle}>Login</Link>
                <Link to="/register" style={linkStyle}>Register</Link>
            </div>
        </nav>
    );
}