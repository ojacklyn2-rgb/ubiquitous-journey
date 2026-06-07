import { ViewType } from '../types';
import { Activity, Mail, Heart, Shield, Landmark } from 'lucide-react';

interface FooterProps {
  setView: (view: ViewType) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleNavigate = (view: ViewType) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-primary text-brand-cream border-t border-brand-teal-dark" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Footer Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-brand-teal-dark/50 gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavigate('home')}>
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center text-brand-cream">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight">Ojacklyn</span>
              <p className="text-xs text-brand-text-muted mt-0.5">Democratizing health equity pathways in New Jersey.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="mailto:ojacklyn2@gmail.com" 
              className="inline-flex items-center gap-1.5 text-xs text-brand-text-muted hover:text-brand-cream bg-white/5 px-4 py-2 rounded-xl transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              ojacklyn2@gmail.com
            </a>
            <div className="inline-flex items-center gap-1 text-xs text-brand-green bg-brand-green-light/10 border border-brand-green/20 px-3 py-2 rounded-xl">
              <Shield className="w-3.5 h-3.5" />
              Community-Verified
            </div>
          </div>
        </div>

        {/* Footer Main Matrix */}
        <div className="grid grid-cols-2 gap-8 py-8 max-w-xl">
          
          {/* Col 1 */}
          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider uppercase text-brand-text-muted mb-3">Navigate</h4>
            <ul className="space-y-2 text-xs text-brand-text-muted">
              <li><button onClick={() => handleNavigate('home')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Home Portal</button></li>
              <li><button onClick={() => handleNavigate('blog')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Blog &amp; Essays</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Public Services Directory</button></li>
              <li><button onClick={() => handleNavigate('about')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">About Ojacklyn</button></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display text-xs font-semibold tracking-wider uppercase text-brand-text-muted mb-3">Core Care</h4>
            <ul className="space-y-2 text-xs text-brand-text-muted">
              <li><button onClick={() => handleNavigate('services')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Primary Clinician Care</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Behavioral &amp; Mental Health</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Emergency Food Pantries</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-brand-cream cursor-pointer text-left transition-colors">Crisis Housing Help</button></li>
            </ul>
          </div>

        </div>

        {/* Footer Sub-bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-brand-teal-dark/40 text-xs text-brand-text-muted gap-4">
          <p className="inline-flex items-center gap-1">
            © 2026 Ojacklyn. Built with care and dedication in New Jersey. 
            <Heart className="w-3.5 h-3.5 text-brand-green fill-brand-green" />
          </p>
          <div className="flex gap-4">
            <span className="hover:text-brand-cream cursor-default">Transparency Commitment</span>
            <span>·</span>
            <span className="hover:text-brand-cream cursor-default">100% Free Public Access</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
