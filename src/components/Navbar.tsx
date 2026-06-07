import { ViewType } from '../types';
import { Activity, Menu, X, Landmark } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links: { id: ViewType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'blog', label: 'Blog & Essays' },
    { id: 'services', label: 'Public Services' },
    { id: 'about', label: 'About Ojacklyn' },
  ];

  const handleNavigate = (viewId: ViewType) => {
    setView(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e2e8e5]/80 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-logo-btn"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center text-brand-cream shadow-sm group-hover:bg-brand-accent transition-colors duration-200">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-brand-primary">Ojacklyn</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono font-medium tracking-wide text-brand-green uppercase bg-brand-green-light px-2 py-0.5 rounded-full border border-brand-green/10">NJ Public Health</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1.5" id="desktop-nav-links">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavigate(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                  currentView === link.id
                    ? 'bg-brand-teal text-brand-cream shadow-sm'
                    : 'text-brand-text-sec hover:text-brand-teal hover:bg-brand-teal-light'
                }`}
                id={`nav-${link.id}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 rounded-xl md:hidden text-brand-text-sec hover:text-brand-teal hover:bg-brand-teal-light focus:outline-none transition-colors"
          aria-label="Toggle menu"
          id="mobile-nav-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 border-b border-brand-border bg-[#faf9f6]/98 backdrop-blur-md px-4 py-4 space-y-2 md:hidden flex flex-col shadow-lg animate-fadeIn"
          id="mobile-nav-drawer"
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentView === link.id
                  ? 'bg-brand-teal text-brand-cream'
                  : 'text-brand-text-sec hover:text-brand-teal hover:bg-brand-teal-light'
              }`}
              id={`mobile-nav-${link.id}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
