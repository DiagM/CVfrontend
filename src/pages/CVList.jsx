// src/components/CVList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importez le CSS

const CVList = () => {
    const [cvs, setCvs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const response = await fetch('/api/cvs');
                const cvData = await response.json();
                setCvs(cvData);
            } catch (error) {
                console.error('Erreur lors de la récupération des CVs:', error);
            }
        };

        fetchCVs();
    }, []);

    const filteredCvs = cvs.filter(cv =>
        `${cv.name} ${cv.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Liste des CVs</h2>
            <input
                type="text"
                placeholder="Rechercher par nom et prénom"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredCvs.map(cv => (
                    <li key={cv.id}>
                        <Link to={`/cv/${cv.id}`}>{cv.name} {cv.surname}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CVList;
