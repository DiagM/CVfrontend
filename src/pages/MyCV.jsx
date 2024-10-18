import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const port = process.env.PORT || '3000';

const MyCV = () => {
    const [cvs, setCvs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const fetchCVs = async () => {
            try {
                // If using query params
                // const response = await fetch(`http://localhost:${port}/api/cv/my?userId=${storedUserId}`);

                // OR if using dynamic routes
                const response = await fetch(`http://localhost:${port}/api/cv/user/${storedUserId}`);

                const cvData = await response.json();
                setCvs(cvData);
            } catch (error) {
                console.error('Error fetching CVs:', error);
            }
        };

        fetchCVs();
    }, []);

    const filteredCvs = cvs.filter(cv =>
        `${cv.name} ${cv.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>CV List</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />
            <div style={styles.cardContainer}>
                {filteredCvs.map((cv) => (
                    <Link to={`/cv/${cv._id}`} key={cv._id} style={styles.cardLink}>
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>{cv.name} {cv.surname}</h3>
                            <p style={styles.cardDetail}><strong>Email:</strong> {cv.email}</p>
                            <p style={styles.cardDetail}><strong>Phone:</strong> {cv.phone || 'Not provided'}</p>
                            <p style={styles.cardDetail}><strong>Skills:</strong> {cv.skills.slice(0, 3).join(', ')}{cv.skills.length > 3 ? '...' : ''}</p>
                            <p style={styles.cardDescription}>{cv.description ? cv.description.substring(0, 100) + '...' : 'No description provided'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    cardLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
    },
    cardTitle: {
        fontSize: '1.2rem',
        color: '#2c3e50',
        marginBottom: '10px',
    },
    cardDetail: {
        fontSize: '0.9rem',
        color: '#34495e',
        marginBottom: '5px',
    },
    cardDescription: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginTop: '10px',
    },
};

export default MyCV;