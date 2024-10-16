// src/components/CVDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecommendationForm from './RecommendationForm';
import '../App.css'; // Importez le CSS

const CVDetails = () => {
    const { cvId } = useParams();
    const [cv, setCv] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await fetch(`/api/cv/${cvId}`);
                const cvData = await response.json();
                setCv(cvData);
            } catch (error) {
                console.error('Erreur lors de la récupération du CV:', error);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`/api/cv/${cvId}/recommendations`);
                const recommendationsData = await response.json();
                setRecommendations(recommendationsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des recommandations:', error);
            }
        };

        fetchCV();
        fetchRecommendations();
    }, [cvId]);

    if (!cv) return <div>Chargement...</div>;

    return (
        <div>
            <h2>{cv.name} {cv.surname}</h2>
            <p>Email: {cv.email}</p>
            <p>Téléphone: {cv.phone}</p>
            <p>Description: {cv.description}</p>

            <h3>Recommandations</h3>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec.text}</li>
                ))}
            </ul>
            <RecommendationForm cvId={cvId} />
        </div>
    );
};

export default CVDetails;
