import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { PageId } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ContentAgentPage } from './pages/ContentAgentPage';
import { CopywritingAgentPage } from './pages/CopywritingAgentPage';
import { VideoAgentPage } from './pages/VideoAgentPage';
import { SamplesPage } from './pages/SamplesPage';
import { DemoPage } from './pages/DemoPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';
import { api } from './services/api';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [isApiConfigured, setIsApiConfigured] = useState<boolean>(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const health = await api.checkHealth();
        setIsApiConfigured(Boolean(health.api_key_configured));
      } catch (err) {
        setIsApiConfigured(false);
      }
    };

    fetchHealth();
    // Periodic check every 15 seconds
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} isApiConfigured={isApiConfigured} />;
      case 'content-agent':
        return <ContentAgentPage />;
      case 'copywriting-agent':
        return <CopywritingAgentPage />;
      case 'video-agent':
        return <VideoAgentPage />;
      case 'samples':
        return <SamplesPage />;
      case 'demo':
        return <DemoPage />;
      case 'about':
        return <AboutPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={setCurrentPage} isApiConfigured={isApiConfigured} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      isApiConfigured={isApiConfigured}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
