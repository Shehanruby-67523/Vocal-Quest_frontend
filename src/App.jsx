import ProfilePage from "./pages/Profile";
import ManageVoicePrint from "./pages/ManageVoicePrint";
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/login'
import Signup from './Components/signup'
import ForgotPassword from './Components/forgotpassword'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DemonGuardian from './pages/DemonGuardian'
import WhisperingWoods from './pages/WhisperingWoods'
import UserManagement from './pages/UserManagement'
import NotFound from './pages/NotFound'
import CommandCenter from './pages/CommandCenter'
import VocalQuestAdmin from './admin_components/narrativeLogicDesign'
import PlaceholderAdminPage from './pages/PlaceholderAdminPage'
import GameHub from './pages/GameHub'
import PlayerJourney from './pages/PlayerJourney'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/player-journey" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/player-journey" element={<PlayerJourney />} />
        <Route path="/demon-guardian" element={<DemonGuardian />} />
        <Route path="/whispering-woods" element={<WhisperingWoods />} />
        <Route path="/game-hub" element={<GameHub />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/voice-print" element={<ManageVoicePrint />} />
        <Route path="/users" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/command-center" replace />} />
        <Route path="/admin/command-center" element={<CommandCenter />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/story-logic" element={<VocalQuestAdmin />} />
        <Route path="/admin/quiz-database" element={<PlaceholderAdminPage title="Quiz Database" />} />
        <Route path="/admin/game-analytics" element={<PlaceholderAdminPage title="Game Analytics" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
