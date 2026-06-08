import { ViewType, BlogPost, MedicalService } from '../types';
import { BLOG_POSTS, MEDICAL_SERVICES, COUNTIES } from '../data';
import { motion } from 'motion/react';
import { 
  Building, MapPin, Phone, Globe, ChevronRight, FileText, 
  HelpCircle, Sparkles, Filter, CheckCircle2, Bookmark, Flame
} from 'lucide-react';
import { useState, FormEvent } from 'react';

interface DashboardHomeProps {
  setView: (view: ViewType) => void;
  setSelectedBlogId: (id: string | null) => void;
}

export default function DashboardHome({ setView, setSelectedBlogId }: DashboardHomeProps) {
  // Widget states
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCost, setSelectedCost] = useState('');
  const [widgetResult, setWidgetResult] = useState<MedicalService[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = [
    { title: 'Primary Care', desc: 'FQHCs, free health centers, walk-in diagnostic clinics', count: '3 locations', color: 'teal', icon: Building },
    { title: 'Mental Health', desc: 'Counseling, peer recovery, 24/7 helpline referral services', count: '2 locations', color: 'blue', icon: Bookmark },
    { title: 'Food Access', desc: 'Nutritional food banks, SNAP registration checkpoints', count: '2 locations', color: 'green', icon: Sparkles },
    { title: 'Housing', desc: 'Emergency shelters, eviction counseling, youth temporary homes', count: '2 locations', color: 'teal', icon: Flame },
  ];

  const handleWidgetSearch = (e: FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    let results = MEDICAL_SERVICES;

    if (selectedCounty) {
      results = results.filter(s => s.county.toLowerCase() === selectedCounty.toLowerCase() || s.city.toLowerCase() === 'statewide helpline');
    }
    if (selectedCategory) {
      results = results.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    if (selectedCost) {
      results = results.filter(s => s.cost === selectedCost);
    }

    setWidgetResult(results.slice(0, 3)); // show top 3 recommended
  };

  const handleResetWidget = () => {
    setSelectedCounty('');
    setSelectedCategory('');
    setSelectedCost('');
    setWidgetResult(null);
    setHasSearched(false);
  };

  const handleBlogClick = (id: string) => {
    setSelectedBlogId(id);
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-12 py-6" id="dashboard-home-view">
      
      {/* 1. SEO-Optimized Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-brand-teal uppercase bg-brand-teal-light border border-brand-teal/10">
          New Jersey Public Health Resource
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-primary leading-[1.12]">
          Free Health Resources for <span className="text-brand-teal">NJ Communities</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-text-sec leading-relaxed max-w-2xl mx-auto">
          Find verified public health services, housing support, and community resources — built for underserved communities across New Jersey.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <button
            onClick={() => setView('services')}
            className="px-6 py-3.5 bg-brand-teal hover:bg-brand-accent text-brand-cream text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            id="hero-services-btn"
          >
            Browse 19 Resources →
          </button>
          <button
            onClick={() => setView('about')}
            className="px-6 py-3.5 border border-brand-border bg-white text-brand-text-main hover:border-brand-teal text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            id="hero-about-btn"
          >
            Our Story
          </button>
        </div>

        <p className="text-xs font-mono text-brand-text-muted">
          19 Verified Resources · 4 Service Categories · 100% Free to Use
        </p>
      </section>

      {/* 2. Low-Profile State Metrics Bar */}
      <section className="bg-brand-primary py-6 text-brand-cream rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-brand-teal-dark/40">
          <div className="py-2 md:py-0">
            <span className="block text-3xl font-display font-bold text-brand-green">{MEDICAL_SERVICES.length}+</span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-text-muted mt-0.5">Vetted Clinics &amp; Hotlines</span>
          </div>
          <div className="pt-4 md:pt-0 pb-2 md:pb-0">
            <span className="block text-3xl font-display font-bold text-brand-green">21 / 21</span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-text-muted mt-0.5">NJ Counties Vetted &amp; Covered</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="block text-3xl font-display font-bold text-brand-green">{BLOG_POSTS.length}+</span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-brand-text-muted mt-0.5">Research Articles Published</span>
          </div>
        </div>
      </section>

      {/* 3. Integrated Care Finder Widget Section */}
      <section className="max-w-xl mx-auto px-4">
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-brand-green-light flex items-center justify-center text-brand-green">
              <Filter className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-display text-base font-bold text-brand-primary">Care Finder Assistant</h3>
          </div>
          <p className="text-xs text-brand-text-sec mb-4">
            Select parameters below to instantly find local free clinics, food resources, or active treatment lines.
          </p>

          {/* Dynamic Widget */}
          {!hasSearched ? (
            <form onSubmit={handleWidgetSearch} className="space-y-3" id="home-finder-widget">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-brand-text-sec font-mono uppercase tracking-wider mb-1">NJ County</label>
                  <select 
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full bg-brand-sage/40 border border-brand-border focus:border-brand-teal px-3 py-2 rounded-lg text-xs font-medium focus:outline-none transition-colors"
                  >
                    <option value="">All Counties</option>
                    {COUNTIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-brand-text-sec font-mono uppercase tracking-wider mb-1">Clinic Focus</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-brand-sage/40 border border-brand-border focus:border-brand-teal px-3 py-2 rounded-lg text-xs font-medium focus:outline-none transition-colors"
                  >
                    <option value="">All Care Types</option>
                    <option value="Primary Care">Primary Clinic</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Food Access">Food Storage</option>
                    <option value="Housing">Housing Assist</option>
                    <option value="Substance Use">Substance Use</option>
                    <option value="Women's Health">Maternal Support</option>
                    <option value="Dental">Oral Clinicals</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-brand-text-sec font-mono uppercase tracking-wider mb-1">Cost Preference</label>
                <select
                  value={selectedCost}
                  onChange={(e) => setSelectedCost(e.target.value as any)}
                  className="w-full bg-brand-sage/40 border border-brand-border focus:border-brand-teal px-3 py-2 rounded-lg text-xs font-medium focus:outline-none transition-colors"
                >
                  <option value="">Any Payment Option</option>
                  <option value="Free">Fully Free Resources</option>
                  <option value="Sliding Scale">Income Sliding Scale</option>
                  <option value="Medicaid/NJ FamilyCare">NJ FamilyCare (Medicaid)</option>
                  <option value="Low Cost">Subsidized / Low Cost</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-teal hover:bg-brand-accent text-brand-cream text-xs font-semibold tracking-wide uppercase rounded-lg transition-all cursor-pointer shadow-sm"
              >
                Launch Recommendation
              </button>
            </form>
          ) : (
            <div className="space-y-3 animate-fadeIn" id="widget-results-pane">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-teal font-mono uppercase tracking-wider block">Found {widgetResult?.length || 0} Matches</span>
                <button onClick={handleResetWidget} className="text-xs text-brand-teal font-medium hover:underline cursor-pointer">
                  Back to filters
                </button>
              </div>

              {widgetResult && widgetResult.length > 0 ? (
                <div className="space-y-2">
                  {widgetResult.map(item => (
                    <div key={item.id} className="p-2.5 bg-brand-cream border border-brand-border rounded-lg space-y-0.5 hover:border-brand-teal transition-all">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-display font-semibold text-xs text-brand-primary line-clamp-1">{item.name}</h4>
                        <span className="text-[8px] px-1 py-0.2 px-1 rounded bg-brand-teal-light text-brand-teal font-mono whitespace-nowrap">{item.cost}</span>
                      </div>
                      <p className="text-[10px] text-brand-text-sec line-clamp-1">{item.description}</p>
                      <div className="flex items-center gap-3 text-[9px] text-brand-text-muted pt-0.5">
                        <span className="inline-flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-brand-teal" /> {item.city}</span>
                        <span className="inline-flex items-center gap-0.5"><Phone className="w-2.5 h-2.5" /> {item.phone}</span>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setView('services')} 
                    className="w-full text-center py-2 bg-brand-sage border border-brand-border hover:border-brand-teal text-brand-text-main text-[10px] font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    View All Public Services List
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 px-3 bg-brand-sage/40 border border-brand-border rounded-xl">
                  <HelpCircle className="w-6 h-6 text-brand-text-muted mx-auto mb-1.5" />
                  <p className="text-xs text-brand-text-sec font-medium">No direct match found under strict bounds.</p>
                  <p className="text-[10px] text-brand-text-muted mt-0.5">Try resetting the filters to view the full state database.</p>
                  <button
                    onClick={handleResetWidget}
                    className="mt-3 px-3 py-1.5 bg-brand-teal text-brand-cream text-xs rounded-lg hover:bg-brand-accent cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. Compact Topic Hub Grid */}
      <section className="max-w-7xl mx-auto px-4" id="home-categories">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider text-brand-green bg-brand-green-light border border-brand-green/10 uppercase">
            Topic Hubs
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-primary">How can we help your family?</h2>
          <p className="text-xs text-brand-text-sec">
            Find direct directories, bilingual clinical care, and regional channels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div 
                key={idx}
                onClick={() => setView('services')}
                className="bg-white border border-brand-border hover:border-brand-teal p-5 rounded-xl cursor-pointer hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    cat.color === 'teal' ? 'bg-brand-teal-light text-brand-teal' :
                    cat.color === 'blue' ? 'bg-brand-blue-light text-brand-blue' :
                    'bg-brand-green-light text-brand-green'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-brand-primary">{cat.title}</h3>
                    <p className="text-xs text-brand-text-sec leading-relaxed mt-1">{cat.desc}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-brand-border/60">
                  <span className="text-[9px] font-mono font-semibold text-brand-text-sec uppercase">{cat.count}</span>
                  <span className="text-xs text-brand-teal font-semibold flex items-center gap-0.5 group">
                    Directory
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Minimalist Flagship Essay Spotlight */}
      <section className="max-w-3xl mx-auto px-4" id="home-featured-essay">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider text-brand-teal bg-brand-teal-light border border-brand-teal/10 uppercase">
              Curated Research Spotlight
            </span>
          </div>
          
          {BLOG_POSTS.slice(0, 1).map((post) => (
            <div 
              key={post.id}
              onClick={() => handleBlogClick(post.id)}
              className="p-5 bg-white border border-brand-border hover:border-brand-teal hover:shadow-sm cursor-pointer rounded-2xl space-y-3 transition-colors"
              id={`featured-post-${post.id}`}
            >
              <div className="flex items-center justify-between pointer-events-none">
                <span className="text-xs font-semibold text-brand-green">{post.category} · State Policy</span>
                <span className="text-xs text-brand-text-muted">{post.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-brand-primary hover:text-brand-teal text-left">{post.title}</h3>
              <p className="text-xs sm:text-sm text-brand-text-sec line-clamp-3 text-left leading-relaxed">{post.excerpt}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-brand-border/60 pointer-events-none">
                <span className="text-xs font-semibold text-brand-text-sec flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-teal" />
                  Read Full Research &amp; Policy Essay
                </span>
                <span className="text-[11px] font-mono text-brand-text-muted">{post.date}</span>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <button
              onClick={() => setView('blog')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-accent cursor-pointer group"
            >
              Browse All Research Essays
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Clean Newsletter Card */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="relative bg-brand-primary text-brand-cream rounded-2xl p-6 sm:p-10 overflow-hidden border border-brand-teal-dark">
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-lg">
              <span className="inline-block px-2 py-0.5 rounded bg-brand-teal-dark font-mono text-[9px] font-semibold text-brand-green uppercase">
                Vetted Bulletin
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium">Quarterly reports, direct to email</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Receive immediate notice when clinical listings are verified and public essays publish. Explicitly spam-free.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto" id="home-newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="E-mail Address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="px-3.5 py-2.5 bg-white/10 text-white placeholder-brand-text-muted border border-brand-teal-dark focus:border-brand-green rounded-lg text-xs font-medium focus:outline-none transition-all w-full sm:w-56"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="text-center py-3 px-5 bg-white/5 border border-brand-teal-dark rounded-xl flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <div className="text-left">
                    <h5 className="text-xs font-semibold text-[#fcfbf9]">Subscription Confirmed</h5>
                    <p className="text-[10px] text-brand-text-muted">You will receive the next quarterly update.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
