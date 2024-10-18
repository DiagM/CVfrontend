import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
const port = process.env.PORT || '3000';

export default function EditProfile() {
    const navigate = useNavigate();

    // States for the form fields
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [userFirstName, setUserFirstName] = useState(localStorage.getItem('userFirstName') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState('');

    // State for loading
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');  // Fetch the userId from local storage

        const userData = {
            userId, // Include the userId in the request body
            name: userName,
            firstName: userFirstName,
            email: email,
            password: password,  // In production, ensure the password is secure
        };

        try {
            setIsLoading(true); // Set loading state

            const response = await fetch(`http://localhost:${port}/api/auth/profile/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the request
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success('Profile updated successfully');  // Show success toast
                setPassword('');  // Clear the password field
                setTimeout(() => {
                    navigate('/');  // Redirect to Home after 2 seconds
                }, 2000);
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to update profile');  // Show error toast
            }
        } catch (error) {
            toast.error('Network error. Please try again later.');  // Show error toast
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">LastName:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userFirstName">FirstName:</label>
                    <input
                        type="text"
                        id="userFirstName"
                        value={userFirstName}
                        onChange={(e) => setUserFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </form>

            {/* Include the ToastContainer to render the toasts */}
            <ToastContainer />
        </div>
    );
}
