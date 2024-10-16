import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendationList = ({ cvId }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const response = await axios.get(`http://localhost:3000/api/cv/${cvId}/recommendations`);
            setRecommendations(response.data);
        };
        fetchRecommendations();
    }, [cvId]);

    return (
        <ul>
            {recommendations.map(rec => (
                <li key={rec._id}>{rec.comment}</li>
            ))}
        </ul>
    );
};

export default RecommendationList;
