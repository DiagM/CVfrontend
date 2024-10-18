import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import CVForm from './pages/CVForm';
import MyCV from './pages/MyCV';
import CVList from './pages/CVList';
import CVDetail from './pages/CVDetails';
import Profile from './pages/EditProfile';
import Apidocs from './pages//ApiDocs';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cvs" element={<CVList />} />
          <Route path="/cv/:cvId" element={<CVDetail />} />
          {/* Protect the following routes */}
          <Route path="/cv/mycv" element={<ProtectedRoute><MyCV /></ProtectedRoute>} />
          <Route path="/cv/new" element={<ProtectedRoute><CVForm /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/api-docs" element={<ProtectedRoute><Apidocs /></ProtectedRoute>} />
          <Route path="/cv/edit/:id" element={<ProtectedRoute><CVForm /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
