import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import Navigation from './components/section/Navigation'
import Home from './pages/Home'
import About from './components/section/About'
import Experience from './components/section/Experience'
import Projects from './components/section/Projects'
import Skills from './components/section/Skills'
import Certifications from './components/section/Certifications'
import ProjectDetails from './pages/ProjectDetails'
import Contact from './pages/Contact'
import FloatingChatbot from './components/ui/FloatingChatbot'
import './App.css'

const Footer = lazy(() => import('./components/Footer'))

// CSS-based native transition wrapper for routes - 100% bug-free and thread-safe
const AnimatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="w-full min-h-screen animate-page">
      {children}
    </div>
  );
};

function AppContent() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Navigation />
      <div className="app transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#101727' : undefined }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content" className="main-content">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
              <Route path="/about" element={<AnimatedRoute><About /></AnimatedRoute>} />
              <Route path="/experience" element={<AnimatedRoute><Experience /></AnimatedRoute>} />
              <Route path="/projects" element={<AnimatedRoute><Projects /></AnimatedRoute>} />
              <Route path="/projects/:projectId" element={<AnimatedRoute><ProjectDetails /></AnimatedRoute>} />
              <Route path="/skills" element={<AnimatedRoute><Skills /></AnimatedRoute>} />
              <Route path="/certifications" element={<AnimatedRoute><Certifications /></AnimatedRoute>} />
              <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Floating AI Resume Chatbot */}
        <FloatingChatbot />

        <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

export default App