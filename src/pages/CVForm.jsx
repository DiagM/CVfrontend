import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../App.css';

const CVForm = ({ onSubmit, initialData }) => {
    const navigate = useNavigate(); // Initialiser useNavigate
    const [name, setName] = useState(initialData?.name || '');
    const [surname, setSurname] = useState(initialData?.surname || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [experiences, setExperiences] = useState(initialData?.experiences || []);
    const [education, setEducation] = useState(initialData?.education || []);
    const [skills, setSkills] = useState(initialData?.skills || []);
    const [visible, setVisible] = useState(initialData?.visible || true);

    const handleExperienceChange = (index, field, value) => {
        const newExperiences = [...experiences];
        newExperiences[index][field] = value;
        setExperiences(newExperiences);
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...education];
        newEducation[index][field] = value;
        setEducation(newEducation);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cvData = { name, surname, email, phone, description, experiences, education, skills, visible };
        onSubmit(cvData);
        navigate('/cvs'); // Redirection vers la liste des CVs
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer Votre CV !</h2>
            <input type="text" placeholder="Prénom" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Nom" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            {/* Add experience input fields */}
            {experiences.map((exp, index) => (
                <div key={index}>
                    <input type="text" placeholder="Titre" value={exp.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} required />
                    <input type="text" placeholder="Entreprise" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} required />
                    <input type="text" placeholder="Lieu" value={exp.location} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} required />
                    <textarea placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} required />
                    
                    <label htmlFor={`experienceStart-${index}`}>Date de début de l'expérience</label>
                    <input
                        type="date"
                        id={`experienceStart-${index}`}
                        value={exp.startDate || ''}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        required
                    />

                    <label htmlFor={`experienceEnd-${index}`}>Date de fin de l'expérience</label>
                    <input
                        type="date"
                        id={`experienceEnd-${index}`}
                        value={exp.endDate || ''}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={() => setExperiences([...experiences, { title: '', company: '', location: '', description: '', startDate: '', endDate: '' }])}>
                Ajouter une expérience
            </button>

            {/* Add education input fields */}
            {education.map((edu, index) => (
                <div key={index}>
                    <input type="text" placeholder="Diplôme" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} required />
                    <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} required />
                    <textarea placeholder="Description" value={edu.description} onChange={(e) => handleEducationChange(index, 'description', e.target.value)} required />
                    
                    <label htmlFor={`educationStart-${index}`}>Date de début de l'éducation</label>
                    <input
                        type="date"
                        id={`educationStart-${index}`}
                        value={edu.startDate || ''}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        required
                    />

                    <label htmlFor={`educationEnd-${index}`}>Date de fin de l'éducation</label>
                    <input
                        type="date"
                        id={`educationEnd-${index}`}
                        value={edu.endDate || ''}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={() => setEducation([...education, { degree: '', institution: '', description: '', startDate: '', endDate: '' }])}>
                Ajouter une formation
            </button>

            <input type="text" placeholder="Compétences (séparées par des virgules)" onChange={(e) => setSkills(e.target.value.split(','))} />
            <label>
                <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} /> Visible
            </label>
            <button type="submit">Sauvegarder le CV</button>
        </form>
    );
};

export default CVForm;
