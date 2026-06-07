import { MedicalService, ServiceSubmission } from '../types';
import { MEDICAL_SERVICES, COUNTIES, LANGUAGES } from '../data';
import { 
  Building2, Search, MapPin, Phone, Globe, ShieldCheck, 
  Plus, X, HeartHandshake, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';

export default function PublicServices() {
  const [services, setServices] = useState<MedicalService[]>([]);
  
  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Submission modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<ServiceSubmission>({
    name: '',
    description: '',
    category: 'Primary Care',
    county: 'Essex',
    city: '',
    address: '',
    phone: '',
    website: '',
    languages: [],
    eligibility: '',
    cost: 'Free',
    submittedByEmail: ''
  });

  // Init and load local storage integrations
  useEffect(() => {
    const localLocalStr = localStorage.getItem('ojacklyn_custom_services');
    if (localLocalStr) {
      try {
        const customItems: MedicalService[] = JSON.parse(localLocalStr);
        setServices([...MEDICAL_SERVICES, ...customItems]);
      } catch (e) {
        setServices(MEDICAL_SERVICES);
      }
    } else {
      setServices(MEDICAL_SERVICES);
    }
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter lists dynamically
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCounty = selectedCounty === '' || service.county.toLowerCase() === selectedCounty.toLowerCase() || service.city.toLowerCase() === 'statewide helpline';
    const matchesLanguage = selectedLanguage === '' || service.languages.some(l => l.toLowerCase() === selectedLanguage.toLowerCase()) || service.languages.join(' ').toLowerCase().includes('all languages');
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCounty && matchesLanguage && matchesCategory;
  });

  const handleCheckboxLanguage = (lang: string) => {
    const isExist = formData.languages.includes(lang);
    if (isExist) {
      setFormData({
        ...formData,
        languages: formData.languages.filter(l => l !== lang)
      });
    } else {
      setFormData({
        ...formData,
        languages: [...formData.languages, lang]
      });
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.submittedByEmail) return;

    // Map submission to standard service database item
    const newService: MedicalService = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      description: formData.description || 'No description supplied. Manual auditing pending.',
      category: formData.category as any,
      county: formData.county,
      city: formData.city || 'NJ City',
      address: formData.address || 'NJ Address',
      phone: formData.phone,
      website: formData.website || '#',
      languages: formData.languages.length > 0 ? formData.languages : ['English'],
      eligibility: formData.eligibility || 'Open to all residents.',
      cost: formData.cost as any,
      verifiedDate: 'Pending Verification',
      tags: ['Community Submission', formData.county, formData.category],
    };

    const localLocalStr = localStorage.getItem('ojacklyn_custom_services');
    let customArr: MedicalService[] = [];
    if (localLocalStr) {
      try {
        customArr = JSON.parse(localLocalStr);
      } catch (e) {}
    }
    customArr.push(newService);
    localStorage.setItem('ojacklyn_custom_services', JSON.stringify(customArr));

    // Refresh list locally
    setServices([...MEDICAL_SERVICES, ...customArr]);
    setSubmissionSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: 'Primary Care',
      county: 'Essex',
      city: '',
      address: '',
      phone: '',
      website: '',
      languages: [],
      eligibility: '',
      cost: 'Free',
      submittedByEmail: ''
    });
  };

  const getCategoryIconColor = (cat: string) => {
    switch (cat) {
      case 'Primary Care': return 'bg-brand-teal-light text-brand-teal ring-brand-teal/10';
      case 'Mental Health': return 'bg-brand-blue-light text-brand-blue ring-brand-blue/10';
      case 'Food Access': return 'bg-brand-green-light text-brand-green ring-brand-green/10';
      case 'Housing': return 'bg-orange-50 text-orange-700 ring-orange-600/10';
      case 'Women\'s Health': return 'bg-rose-50 text-rose-700 ring-rose-600/10';
      case 'Children & Family': return 'bg-amber-50 text-amber-700 ring-amber-600/10';
      default: return 'bg-brand-sage text-brand-text-sec ring-brand-border';
    }
  };

  const categories = [
    'All', 'Primary Care', 'Mental Health', 'Food Access', 'Housing', 'Substance Use', 'Women\'s Health', 'Children & Family', 'Dental', 'Vision'
  ];

  return (
    <div className="space-y-12 py-8" id="public-services-view">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-brand-teal bg-brand-teal-light uppercase border border-brand-teal/10">
          Vetted National &amp; State Directory
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-brand-primary">
          NJ Public Health Directory
        </h1>
        <p className="text-[#515151] text-lg leading-relaxed">
          Explore manually vetted free clinics, sliding-scale practitioners, infant nutrition networks, and recovery resources in all 21 counties.
        </p>
      </div>

      {/* Main Search Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white border border-brand-border rounded-3xl shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clinics, medical centers, services, or food programs..."
                className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal pl-10 pr-4 py-3 rounded-xl text-xs font-medium focus:outline-none transition-colors"
                id="search-input-field"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3.5 py-3 rounded-xl text-xs font-semibold focus:outline-none transition-colors"
                id="search-county-select"
              >
                <option value="">County: All Locations</option>
                {COUNTIES.map(c => (
                  <option key={c} value={c}>{c} County</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3.5 py-3 rounded-xl text-xs font-semibold focus:outline-none transition-colors"
                id="search-lang-select"
              >
                <option value="">Language: All Options</option>
                {LANGUAGES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick tab filters */}
          <div className="border-t border-brand-border/60 pt-5">
            <h4 className="text-[10px] font-mono font-bold tracking-wider text-brand-text-sec uppercase mb-3">Vetted Pathways Filter</h4>
            <div className="flex flex-wrap gap-1.5" id="category-tab-bar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-teal text-brand-cream shadow-sm'
                      : 'bg-brand-sage/50 text-brand-text-sec hover:bg-brand-sage hover:text-brand-primary'
                  }`}
                  id={`cat-tab-${cat.replace(/\s+/g, '-').replace(/['"&]/g, '')}`}
                >
                  {cat === 'All' ? 'All Services' : cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Grid display of services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Info and Top CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="text-xs font-mono font-medium text-brand-text-sec select-none">
            Displaying <span className="text-brand-teal font-bold">{filteredServices.length}</span> manually vetted resources
          </div>
          
          <button
            onClick={() => {
              setSubmissionSuccess(false);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#faf9f6] bg-brand-green hover:bg-brand-green-dark rounded-xl cursor-pointer shadow-sm shadow-brand-green/10"
            id="trigger-add-service"
          >
            <Plus className="w-4 h-4" />
            Suggest Missing Resource
          </button>
        </div>

        {/* Directory cards */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="services-grid-pane">
            {filteredServices.map(service => (
              <div 
                key={service.id}
                className="bg-white border border-brand-border rounded-2xl p-5 sm:p-6 space-y-4 hover:border-brand-teal hover:shadow-md transition-all relative block"
                id={`service-card-${service.id}`}
              >
                {/* Visual badge top line */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold font-mono tracking-wide uppercase stroke-1 ring-1 ring-inset ${getCategoryIconColor(service.category)}`}>
                      {service.category}
                    </span>
                    {service.county !== 'Statewide' && (
                      <span className="inline-flex items-center rounded-md bg-brand-sage px-2 py-0.5 text-[10px] font-semibold text-brand-text-sec ring-1 ring-inset ring-brand-border">
                        {service.county} County
                      </span>
                    )}
                  </div>
                  
                  <div className="text-right flex items-center gap-1.5 text-[10px] font-mono font-semibold text-brand-text-sec">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-green fill-brand-green/5" />
                    <span>{service.verifiedDate}</span>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg text-brand-primary leading-snug">{service.name}</h3>
                  <p className="text-xs text-brand-text-sec leading-relaxed">{service.description}</p>
                </div>

                {/* Details Matrix */}
                <div className="bg-brand-cream border border-brand-border/60 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider">Physical Address</span>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(service.address)}`}
                        target="_blank"
                        rel="referrer"
                        className="font-medium text-brand-primary hover:text-brand-teal inline-flex items-center gap-1 mt-0.5 leading-snug text-left"
                      >
                        <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                        {service.address}
                      </a>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider">Contact Phone</span>
                      <a 
                        href={`tel:${service.phone.replace(/[^0-9]/g, '')}`}
                        className="font-semibold text-brand-teal hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        {service.phone}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider">Access Requirements</span>
                      <p className="font-medium text-brand-text-sec mt-0.5 leading-normal">{service.eligibility}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase tracking-wider">Portal Website</span>
                      {service.website && service.website !== '#' ? (
                        <a 
                          href={service.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand-teal hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <Globe className="w-3.5 h-3.5 shrink-0" />
                          Visit Web Portal
                        </a>
                      ) : (
                        <span className="text-brand-text-muted italic inline-flex items-center gap-1 mt-0.5">
                          <Globe className="w-3.5 h-3.5 text-brand-text-muted/40" />
                          No active website
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags and translation parameters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-brand-border/40 gap-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] font-mono font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded border border-brand-green/10">
                      Payment: {service.cost}
                    </span>
                    {service.languages.map(l => (
                      <span key={l} className="text-[10px] font-mono font-medium text-brand-text-sec bg-brand-sage/60 px-2 py-0.5 rounded border border-brand-border/10">
                        {l}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-brand-text-muted tracking-tight">Active verification code: SNJ-{service.id.slice(0, 4)}</span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white border border-brand-border rounded-3xl" id="services-empty-pane">
            <HelpCircle className="w-12 h-12 text-brand-text-muted mx-auto mb-4" />
            <h3 className="font-display font-medium text-lg text-brand-primary">No directory clinic matches your filter.</h3>
            <p className="text-sm text-brand-text-sec max-w-sm mx-auto mt-2">
              For continuous safety, try setting the county to "All Locations" or category to "All Services" to broaden pathways.
            </p>
            <button
              onClick={() => {
                setSelectedCounty('');
                setSelectedLanguage('');
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-6 px-5 py-2.5 bg-brand-teal text-brand-cream text-xs font-semibold rounded-xl hover:bg-brand-accent cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* Persistent submission card below */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-teal-light border border-brand-teal/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 max-w-xl text-center md:text-left">
            <h3 className="font-display font-bold text-lg text-brand-primary">Are we missing a valuable public health asset?</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              This database flourishes with community-vetted submissions. If you know of an active local pantry, FQHC, or counseling unit, add it to our directory structure today.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmissionSuccess(false);
              setIsModalOpen(true);
            }}
            className="px-5 py-3 bg-brand-teal hover:bg-brand-accent text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow cursor-pointer transition-all shrink-0"
            id="suggestion-panel-trigger"
          >
            Submit Vetted Resource
          </button>
        </div>
      </section>

      {/* SUGGESTION / PORTAL MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center p-4" 
          aria-modal="true"
          role="dialog"
          id="submission-dialog-frame"
        >
          <div className="bg-[#faf9f6] border border-brand-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-xl relative animate-scaleUp">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg border border-brand-border/80 hover:bg-brand-sage text-brand-text-sec cursor-pointer transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {!submissionSuccess ? (
              <form onSubmit={handleFormSubmit} className="space-y-5" id="suggestion-submit-form">
                
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-brand-green uppercase bg-brand-green-light px-2 py-0.5 rounded">
                    <HeartHandshake className="w-3 h-3" /> Collaborative Portal
                  </span>
                  <h3 className="text-xl font-bold font-display text-brand-primary">Suggest a Community Resource</h3>
                  <p className="text-xs text-brand-text-sec">
                    Submit public clinics, free services, or support desks. All information is held in verification state prior to auditing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Organization Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jersey City Medical Center ObGyn"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Vetted Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    >
                      <option>Primary Care</option>
                      <option>Mental Health</option>
                      <option>Food Access</option>
                      <option>Housing</option>
                      <option>Substance Use</option>
                      <option>Women's Health</option>
                      <option>Children &amp; Family</option>
                      <option>Dental</option>
                      <option>Vision</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Access Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe specific services offered, physical office details, walk-in constraints, or registration limitations."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">New Jersey County *</label>
                    <select
                      value={formData.county}
                      onChange={(e) => setFormData({...formData, county: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none animate-fadeIn"
                    >
                      {COUNTIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Access Costs *</label>
                    <select
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    >
                      <option value="Free">Fully Free Services</option>
                      <option value="Sliding Scale">Income Sliding Scale</option>
                      <option value="Medicaid/NJ FamilyCare">NJ FamilyCare (Medicaid)</option>
                      <option value="Low Cost">Subsidized / Low Cost</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">City Placement *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paterson"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 104 Main St, Paterson"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 973-555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Web Portal Link</label>
                    <input
                      type="url"
                      placeholder="e.g. https://website.org"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-brand-text-sec mb-2 font-mono uppercase">Languages Supported</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['English', 'Spanish', 'Portuguese', 'Arabic', 'Hindi', 'Korean'].map(lang => (
                      <label key={lang} className="flex items-center gap-1.5 text-xs text-brand-text-sec font-medium select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang)}
                          onChange={() => handleCheckboxLanguage(lang)}
                          className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal border-brand-border"
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-brand-border pt-4">
                  <label className="block text-[11px] font-semibold text-brand-text-sec mb-1 font-mono uppercase">Your Submitter Email Address *</label>
                  <p className="text-[10px] text-brand-text-muted mb-2">Required so we can email you when vetting passes audit.</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.submittedByEmail}
                      onChange={(e) => setFormData({...formData, submittedByEmail: e.target.value})}
                      className="flex-1 bg-white border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-brand-teal hover:bg-brand-accent text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-lg shadow cursor-pointer transition-colors"
                    >
                      Propose Registry
                    </button>
                  </div>
                </div>

              </form>
            ) : (
              <div className="text-center py-10 px-4 space-y-6 animate-scaleUp" id="suggestion-feedback-pane">
                <div className="w-16 h-16 bg-brand-green-light text-brand-green rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-medium text-xl text-brand-primary">Resource Proposed Successfully</h3>
                  <p className="text-xs text-brand-text-sec max-w-md mx-auto leading-relaxed">
                    Thank you immensely! Your submission has been saved to your browser session &amp; local storage. It is active in your dashboard list labeled as <span className="text-brand-teal font-mono">"Pending Verification"</span>. Ojacklyn will audit these details shortly.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 bg-brand-teal hover:bg-brand-accent text-brand-cream text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Return to Directory
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
