import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import RecommendationForm from './RecommendationForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const port = process.env.PORT || '3000';

export default function CVDetails() {
    const { cvId } = useParams();
    const [cv, setCv] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await fetch(`http://localhost:${port}/api/cv/${cvId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const cvData = await response.json();
                setCv(cvData);
            } catch (error) {
                console.error('Error fetching CV:', error);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`http://localhost:${port}/api/recommendation/${cvId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const recommendationsData = await response.json();
                setRecommendations(recommendationsData);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchCV();
        fetchRecommendations();
    }, [cvId]);

    const handleSuccess = () => {
        toast.success('Recommendation added successfully!');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this CV?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:${port}/api/cv/${cvId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the request
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                toast.success('CV deleted successfully!');
                setTimeout(() => {
                    navigate('/cvs');
                }, 2000);
            } catch (error) {
                console.error('Error deleting CV:', error);
                toast.error('Failed to delete CV');
            }
        }
    };

    if (!cv) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.name}>{cv.name} {cv.surname}</h1>
                <p style={styles.contact}><strong>Email:</strong> {cv.email} | <strong>Phone:</strong> {cv.phone || 'Not provided'}</p>
                {userId === cv.userId && (
                    <div style={styles.buttonContainer}>
                        <Link to={`/cv/edit/${cvId}`} style={styles.editButton}>
                            Edit CV
                        </Link>
                        <button onClick={handleDelete} style={styles.deleteButton}>
                            Delete CV
                        </button>
                    </div>
                )}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Description</h2>
                <p>{cv.description || 'No description provided'}</p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Professional Experience</h2>
                {cv.experiences.map((exp, index) => (
                    <div key={index} style={styles.item}>
                        <h3 style={styles.itemTitle}>{exp.title} at {exp.company}</h3>
                        <p style={styles.itemSubtitle}>{exp.location} | {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                        <p style={styles.itemDescription}>{exp.description}</p>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Education</h2>
                {cv.education.map((edu, index) => (
                    <div key={index} style={styles.item}>
                        <h3 style={styles.itemTitle}>{edu.degree} at {edu.institution}</h3>
                        <p style={styles.itemSubtitle}>{edu.location} | {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</p>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Skills</h2>
                <ul style={styles.skillsList}>
                    {cv.skills.map((skill, index) => (
                        <li key={index} style={styles.skillItem}>{skill}</li>
                    ))}
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Recommendations</h2>
                <ToastContainer />
                {recommendations.length > 0 ? (
                    <ul style={styles.recommendationList}>
                        {recommendations.map((rec, index) => (
                            <li key={index} style={styles.recommendationItem}>
                                <strong>{rec.firstname}</strong> <strong>{rec.lastname}</strong>: {rec.comment}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recommendations yet.</p>
                )}

                <RecommendationForm cvId={cvId} userId={userId} onSuccess={handleSuccess} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.2rem',
        marginTop: '20px',
    },
    header: {
        marginBottom: '20px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    name: {
        fontSize: '2.5rem',
        color: '#2c3e50',
        marginBottom: '10px',
    },
    contact: {
        fontSize: '1rem',
        color: '#7f8c8d',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        padding: '10px 20px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        borderBottom: '1px solid #bdc3c7',
        paddingBottom: '5px',
        marginBottom: '15px',
    },
    item: {
        marginBottom: '20px',
    },
    itemTitle: {
        fontSize: '1.2rem',
        color: '#34495e',
        marginBottom: '5px',
    },
    itemSubtitle: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginBottom: '5px',
    },
    itemDescription: {
        fontSize: '1rem',
        lineHeight: '1.4',
    },
    skillsList: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    skillItem: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '15px',
        margin: '0 10px 10px 0',
        fontSize: '0.9rem',
    },
    recommendationList: {
        listStyle: 'none',
        padding: 0,
    },
    recommendationItem: {
        backgroundColor: '#ecf0f1',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        fontSize: '0.95rem',
        lineHeight: '1.4',
    },
};