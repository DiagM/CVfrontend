import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
const port = process.env.PORT || '1001';
const apiUrl = process.env.apiUrl || 'http://localhost:3003';

const RecommendationForm = ({ cvId, userId, onSuccess }) => { // Accept onSuccess as a prop
    const [recommendation, setRecommendation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/recommendation`, {
                cvId, // Include cvId in the request body
                userId: userId, // Use actual userId
                comment: recommendation, // Send the recommendation text as comment
            });

            if (response.status === 201) {
                setRecommendation(''); // Clear the input field on success
                onSuccess(); // Call onSuccess to show the toast message and reload
            }
        } catch (error) {
            console.error('Error adding recommendation:', error);
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
