import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import CVForm from './pages/CVForm';
import CVList from './pages/CVList';
import CVDetail from './pages/CVDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cv/new" element={<CVForm />} />
          <Route path="/cv/edit/:id" element={<CVForm />} />
          <Route path="/cvs" element={<CVList />} />
          <Route path="/cv/:id" element={<CVDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;