import { useState } from 'react';
import { ViewType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardHome from './components/DashboardHome';
import PublicServices from './components/PublicServices';
import BlogPlatform from './components/BlogPlatform';
import AboutPanel from './components/AboutPanel';
import ResourceDetail from './components/ResourceDetail';
import { RESOURCES } from './data';

export default function App() {
  const [currentView, setView] = useState<ViewType>('home');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

  const handleSetView = (view: ViewType) => {
    if (view === 'blog') setSelectedBlogId(null);
    if (view !== 'resource-detail') setSelectedResourceId(null);
    setView(view);
  };

  const handleSelectResource = (id: string) => {
    setSelectedResourceId(id);
    setView('resource-detail');
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome setView={handleSetView} setSelectedBlogId={setSelectedBlogId} />;
      case 'services':
        return <PublicServices onSelectResource={handleSelectResource} />;
      case 'resource-detail': {
        const resource = RESOURCES.find(r => r.id === selectedResourceId);
        if (!resource) return <PublicServices onSelectResource={handleSelectResource} />;
        return (
          <ResourceDetail
            resource={resource}
            onBack={() => { setView('services'); setSelectedResourceId(null); }}
          />
        );
      }
      case 'blog':
        return <BlogPlatform selectedBlogId={selectedBlogId} setSelectedBlogId={setSelectedBlogId} />;
      case 'about':
        return <AboutPanel />;
      default:
        return <DashboardHome setView={handleSetView} setSelectedBlogId={setSelectedBlogId} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/40 flex flex-col justify-between" id="portal-frame-root">
      <Navbar currentView={currentView} setView={handleSetView} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16 relative z-10" id="portal-body-wrapper">
        <div className="transition-all duration-300">
          {renderActiveView()}
        </div>
      </main>
      <Footer setView={handleSetView} />
    </div>
  );
}
