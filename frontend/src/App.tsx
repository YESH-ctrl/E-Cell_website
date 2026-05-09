import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthProvider }     from './contexts/AuthContext';
import ProtectedRoute       from './components/ProtectedRoute';
import GlobalBackground     from './components/GlobalBackground';
import CustomCursor         from './components/CustomCursor';
import LoadingScreen        from './components/LoadingScreen';
import Navbar               from './components/Navbar';
import Hero                 from './components/Hero';
import About                from './components/About';
import Initiatives          from './components/Initiatives';
import Contact              from './components/Contact';
import Footer               from './components/Footer';
import Login                from './pages/Login';
import Signup               from './pages/Signup';
import StudentDashboard     from './pages/StudentDashboard';
import EcellDashboard       from './pages/EcellDashboard';
import Testimonials         from './components/Testimonials';
import JoinUsPage           from './pages/JoinUsPage';
import GalleryPage          from './pages/GalleryPage';
import TeamPage             from './pages/TeamPage';
import ChangePassword       from './pages/ChangePassword';
import Speakers             from './components/Speakers';
import InitiativesPage      from './pages/InitiativesPage';
import BestLanding          from './pages/BestLanding';
import BestStudentDashboard from './pages/BestStudentDashboard';
import BestAdminDashboard   from './pages/BestAdminDashboard';

// ── Dashboard Redirect ────────────────────────────────────────────────────────
function DashboardRedirect() {
  const { userRole, roleLoading } = useAuth();
  
  if (roleLoading) return null;
  
  return <Navigate to={userRole === 'ecell_member' ? '/ecell-dashboard' : '/student-dashboard'} replace />;
}

// ── Home page ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Initiatives limit={3} />
        <Speakers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <GlobalBackground />
        <CustomCursor />
        <LoadingScreen isLoading={loading} />

        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen"
            >
              <Routes>
                {/* ── Public ─────────────────────────────────────────────── */}
                <Route path="/"         element={<HomePage />} />
                <Route path="/login"    element={<Login />}    />
                <Route path="/signup"   element={<Signup />}   />
                
                {/* ── New Pages ──────────────────────────────────────────── */}
                <Route
                  path="/join"
                  element={
                    <ProtectedRoute>
                      <JoinUsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <ProtectedRoute>
                      <GalleryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <ProtectedRoute>
                      <TeamPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/initiatives" element={<InitiativesPage />} />
                
                {/* ── BEST Ecosystem (Member Only) ─────────────────────────── */}
                <Route 
                  path="/best" 
                  element={
                    <ProtectedRoute requiredRole="ecell_member">
                      <BestLanding />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/best/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="ecell_member">
                      <BestStudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/best/admin" 
                  element={
                    <ProtectedRoute requiredRole="ecell_member">
                      <BestAdminDashboard />
                    </ProtectedRoute>
                  } 
                />

                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />

                {/* ── Student dashboard (role-gated) ─────────────────────── */}
                <Route
                  path="/student-dashboard"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* ── E-Cell member dashboard (role-gated) ───────────────── */}
                <Route
                  path="/ecell-dashboard"
                  element={
                    <ProtectedRoute requiredRole="ecell_member">
                      <EcellDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* ── Generic /dashboard → redirect based on role ─────────── */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardRedirect />
                    </ProtectedRoute>
                  }
                />

                {/* ── Catch-all ──────────────────────────────────────────── */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}
