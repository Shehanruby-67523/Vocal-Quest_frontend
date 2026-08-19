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
import StoryLogicPage from './pages/StoryLogic'
import PlaceholderAdminPage from './pages/PlaceholderAdminPage'
import GameHub from './pages/GameHub'
import PlayerJourney from './pages/PlayerJourney'
import Settings from './pages/Settings'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import QuizDatabase from './pages/QuizDatabase'
import GameAnalytics from './pages/GameAnalytics'
import AdminProfile from './pages/AdminProfile'
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
        <Route path="/player-journey" element={<PlayerJourney />} />
        <Route path="/demon-guardian" element={<DemonGuardian />} />
        <Route path="/whispering-woods" element={<WhisperingWoods />} />
        <Route path="/game-hub" element={<GameHub />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/achievements" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/voice-print" element={<ManageVoicePrint />} />
        <Route path="/users" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/command-center" replace />} />
        <Route path="/admin/command-center" element={<CommandCenter />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/story-logic" element={<StoryLogicPage />} />
        <Route path="/admin/quiz-database" element={<QuizDatabase />} />
        <Route path="/admin/game-analytics" element={<GameAnalytics />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
