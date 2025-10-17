import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Sidebar from './components/Sidebar';
import DoctorApplications from './components/DoctorApplications';
import DoctorManagement from './components/DoctorManagement';
import ClinicManagement from './components/ClinicManagement';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';
import AdminSettings from './components/AdminSettings';

function App() {
  const [activeSection, setActiveSection] = useState('applications');
  // Persist authentication across page reloads using localStorage.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('isAuthenticated');
      return stored === 'true';
    } catch (e) {
      return false;
    }
  });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Initialize authMode from the URL when app mounts (so /signup or /login can open the correct view)
  useEffect(() => {
    try {
      const path = window.location.pathname;
      if (!isAuthenticated) {
        if (path === '/signup') setAuthMode('signup');
        else setAuthMode('login');
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL with the current authMode when the user is not authenticated
  useEffect(() => {
    try {
      if (!isAuthenticated) {
        const desired = authMode === 'signup' ? '/signup' : '/login';
        if (window.location.pathname !== desired) {
          window.history.pushState(null, '', desired);
        }
      }
    } catch (e) {
      // ignore
    }
  }, [authMode, isAuthenticated]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'applications':
        return <DoctorApplications />;
      case 'doctors':
        return <DoctorManagement />;
      case 'clinics':
        return <ClinicManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DoctorApplications />;
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem('isAuthenticated', 'true');
    } catch (e) {
      // ignore localStorage errors
    }
    // after login, navigate to the app root
    try {
      if (window.location.pathname !== '/') window.history.pushState(null, '', '/');
    } catch (e) {
      // ignore
    }
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem('isAuthenticated', 'true');
    } catch (e) {
      // ignore
    }
    // after signup, navigate to the app root
    try {
      if (window.location.pathname !== '/') window.history.pushState(null, '', '/');
    } catch (e) {
      // ignore
    }
  };

  const handleLogout = () => {
    // Only clear auth when user explicitly clicks logout
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('isAuthenticated');
    } catch (e) {
      // ignore
    }
    setActiveSection('applications');
  };

  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignUp={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <SignUpPage
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  return (
  <div className="flex h-screen bg-blue-50">
  <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-blue-100 px-4 py-3 md:px-6 md:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-3 pl-11">
              <img
                src="https://files.catbox.moe/cctahm.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
              <h1 className="text-lg md:text-2xl font-semibold text-gray-900 ">
                Dental Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="bg-blue-50 text-blue-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                Admin Portal
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 bg-blue-50">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default App;
