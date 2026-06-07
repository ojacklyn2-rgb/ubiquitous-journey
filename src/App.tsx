import { useState } from 'react';
import { ViewType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardHome from './components/DashboardHome';
import PublicServices from './components/PublicServices';
import BlogPlatform from './components/BlogPlatform';
import AboutPanel from './components/AboutPanel';

export default function App() {
  const [currentView, setView] = useState<ViewType>('home');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Orchestrator for mounting selected view block
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <DashboardHome 
            setView={setView} 
            setSelectedBlogId={setSelectedBlogId} 
          />
        );
      case 'services':
        return <PublicServices />;
      case 'blog':
        return (
          <BlogPlatform 
            selectedBlogId={selectedBlogId} 
            setSelectedBlogId={setSelectedBlogId} 
          />
        );
      case 'about':
        return <AboutPanel />;
      default:
        return (
          <DashboardHome 
            setView={setView} 
            setSelectedBlogId={setSelectedBlogId} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/40 flex flex-col justify-between" id="portal-frame-root">
      
      {/* Dynamic sticky Navigation standard bar */}
      <Navbar currentView={currentView} setView={(view) => {
        // If clicking Blog tab from menu, reset selectedBlogId to see list by default
        if (view === 'blog') {
          setSelectedBlogId(null);
        }
        setView(view);
      }} />

      {/* Main Container Core Viewport Wrapper */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16 relative z-10" id="portal-body-wrapper">
        <div className="transition-all duration-300">
          {renderActiveView()}
        </div>
      </main>

      {/* Dynamic responsive Navigation standard footer */}
      <Footer setView={(view) => {
        if (view === 'blog') {
          setSelectedBlogId(null);
        }
        setView(view);
      }} />

    </div>
  );
}
