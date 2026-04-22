import { Navigate, Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DemonGuardian from './pages/DemonGuardian'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/privacy-policy" replace />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/demon-guardian" element={<DemonGuardian />} />
      <Route path="*" element={<Navigate to="/privacy-policy" replace />} />
    </Routes>
  )
}

export default App
