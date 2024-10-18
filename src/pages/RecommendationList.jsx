import React, { useEffect, useState } from 'react';
import axios from 'axios';
const port = process.env.PORT || '1001';

const RecommendationList = ({ cvId }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const response = await axios.get(`http://localhost:${port}/api/cv/${cvId}/recommendations`);
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
