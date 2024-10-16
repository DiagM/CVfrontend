// src/components/RecommendationForm.jsx
import React, { useState } from 'react';
import '../App.css'; // Importez le CSS

const RecommendationForm = ({ cvId }) => {
    const [recommendation, setRecommendation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/cv/${cvId}/recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: recommendation }), // Envoyez le texte de la recommandation
            });
            if (response.ok) {
                setRecommendation('');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la recommandation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Écrire une recommandation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                required
            />
            <button type="submit">Soumettre</button>
        </form>
    );
};

export default RecommendationForm;
