import React from 'react';

const SwaggerLink = () => {
    const port = process.env.PORT || '3000';
    const swaggerUrl = `http://localhost:${port}/api-docs`;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>API Documentation</h2>
            <p style={styles.description}>
                Explore our comprehensive API documentation to integrate CV Generator features into your applications.
            </p>
            <a
                href={swaggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
            >
                View API Docs
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={styles.icon}
                >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '10px',
    },
    description: {
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: '20px',
    },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    icon: {
        marginLeft: '8px',
    },
};

export default SwaggerLink;