import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/login'; 
import Signup from './Components/signup';
import ForgotPassword from './Components/forgotpassword';
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsofService'
import DemonGuardian from './pages/DemonGuardian'
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/demon-guardian" element={<DemonGuardian />} />
          <Route path="*" element={<Navigate to="/privacy-policy" replace />} />
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;