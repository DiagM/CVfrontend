import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f0f4f8',
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        fontFamily: 'Arial, sans-serif',
    };

    const headingStyle = {
        fontSize: '2.5rem',
        color: '#2c3e50',
        marginBottom: '1rem',
    };

    const paragraphStyle = {
        fontSize: '1.2rem',
        color: '#34495e',
        maxWidth: '800px',
        textAlign: 'center',
        lineHeight: '1.6',
        marginBottom: '2rem',
    };

    const buttonStyle = {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    };

    return (
        <div style={pageStyle}>
            <h1 style={headingStyle}>Welcome to CV Generator</h1>
            <p style={paragraphStyle}>
                Create professional CVs in minutes with our easy-to-use CV Generator.
                Whether you're a recent graduate or an experienced professional, our
                tool helps you showcase your skills and experience in the best light.
                Get started today and take the next step in your career!
            </p>
            <Link to="/cv/new" style={buttonStyle}>
                Create Your CV Now
            </Link>
        </div>
    );
}