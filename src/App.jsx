import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/login'
import Signup from './Components/signup'
import ForgotPassword from './Components/forgotpassword'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DemonGuardian from './pages/DemonGuardian'
import UserManagement from './pages/UserManagement'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/demon-guardian" element={<DemonGuardian />} />
        <Route path="/users" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
