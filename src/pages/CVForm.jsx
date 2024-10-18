import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const port = process.env.PORT || '1001';
const apiUrl = process.env.apiUrl || 'http://localhost:3003';

const CVForm = ({ onSubmit, initialData }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the CV id from the URL if editing
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        description: '',
        experiences: [],
        education: [],
        skills: [],
        visible: true
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setFormData(prevData => ({ ...prevData, userId: storedUserId }));
        }
        if (id) {
            // If editing, fetch the CV data
            const fetchCV = async () => {
                try {
                    const response = await fetch(`${apiUrl}/api/cv/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch CV');
                    }
                    const cvData = await response.json();
                    setFormData(cvData);
                } catch (error) {
                    console.error('Error fetching CV:', error);
                }
            };
            fetchCV();
        } else if (initialData) {
            setFormData(initialData);
        }
    }, [id, initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (index, field, subfield, value) => {
        setFormData(prevData => {
            const newArray = [...prevData[field]];
            newArray[index] = { ...newArray[index], [subfield]: value };
            return { ...prevData, [field]: newArray };
        });
    };

    const addArrayItem = (field, emptyItem) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: [...prevData[field], emptyItem]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = id
                ? `${apiUrl}/api/cv/${id}`
                : `${apiUrl}/api/cv`;
            const method = id ? 'PUT' : 'POST';
            const token = localStorage.getItem('token'); // Retrieve the token again for the submit request


            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the request
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to save CV');
            }
            navigate('/cvs');
        } catch (error) {
            console.error('Error saving CV:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>{id ? 'Edit Your CV' : 'Create Your CV'}</h2>
            <input
                type="text"
                name="userId"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleChange}
                required
                style={{ display: 'none' }} // Hide the input
            />

            <input
                type="text"
                name="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <input
                type="text"
                name="surname"
                placeholder="Last Name"
                value={formData.surname}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
            />

            <h3 style={styles.sectionTitle}>Experiences</h3>
            {formData.experiences.map((exp, index) => (
                <div key={index} style={styles.arrayItem}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={exp.title}
                        onChange={(e) => handleArrayChange(index, 'experiences', 'title', e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleArrayChange(index, 'experiences', 'company', e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => handleArrayChange(index, 'experiences', 'location', e.target.value)}
                        required
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => handleArrayChange(index, 'experiences', 'description', e.target.value)}
                        required
                        style={styles.textarea}
                    />
                    <label style={styles.label}>
                        Start Date
                        <input
                            type="date"
                            value={exp.startDate || ''}
                            onChange={(e) => handleArrayChange(index, 'experiences', 'startDate', e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        End Date
                        <input
                            type="date"
                            value={exp.endDate || ''}
                            onChange={(e) => handleArrayChange(index, 'experiences', 'endDate', e.target.value)}
                            style={styles.input}
                        />
                    </label>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addArrayItem('experiences', { title: '', company: '', location: '', description: '', startDate: '', endDate: '' })}
                style={styles.button}
            >
                Add Experience
            </button>

            <h3 style={styles.sectionTitle}>Education</h3>
            {formData.education.map((edu, index) => (
                <div key={index} style={styles.arrayItem}>
                    <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange(index, 'education', 'degree', e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange(index, 'education', 'institution', e.target.value)}
                        required
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Description"
                        value={edu.description}
                        onChange={(e) => handleArrayChange(index, 'education', 'description', e.target.value)}
                        required
                        style={styles.textarea}
                    />
                    <label style={styles.label}>
                        Start Date
                        <input
                            type="date"
                            value={edu.startDate || ''}
                            onChange={(e) => handleArrayChange(index, 'education', 'startDate', e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        End Date
                        <input
                            type="date"
                            value={edu.endDate || ''}
                            onChange={(e) => handleArrayChange(index, 'education', 'endDate', e.target.value)}
                            style={styles.input}
                        />
                    </label>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addArrayItem('education', { degree: '', institution: '', description: '', startDate: '', endDate: '' })}
                style={styles.button}
            >
                Add Education
            </button>

            <input
                type="text"
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills.join(',')}
                onChange={(e) => setFormData(prevData => ({ ...prevData, skills: e.target.value.split(',') }))}
                style={styles.input}
            />
            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="visible"
                    checked={formData.visible}
                    onChange={handleChange}
                />
                Visible
            </label>
            <button type="submit" style={styles.submitButton}>
                {id ? 'Update CV' : 'Save CV'}
            </button>
        </form>
    );
};

const styles = {
    form: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        minHeight: '100px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#34495e',
        marginTop: '20px',
        marginBottom: '10px',
    },
    arrayItem: {
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#7f8c8d',
    },
    button: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginBottom: '15px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    submitButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        width: '100%',
    },
};

export default CVForm;