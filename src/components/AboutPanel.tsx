import { FAQ_ITEMS, TIMELINE_EVENTS } from '../data';
import { 
  CheckCircle, Landmark, Shield, Users, Mail, Phone, 
  MapPin, HelpCircle, GraduationCap, Award, Compass, Send, 
  MessageSquareDiff, FileHeart, CheckCircle2
} from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function AboutPanel() {
  // Frequently Asked Questions Collapsible Accordeon state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const valuesAndPrinciples = [
    {
      title: 'Structural Dignity',
      desc: 'No signups required, no cookie tracking, and zero profiling. This directory respects undocumented residents and families in acute distress.',
      icon: Shield,
      bgColor: 'bg-brand-teal-light text-brand-teal'
    },
    {
      title: 'Rigorous Verification',
      desc: 'We do not mass scrape stale databases. Every clinic phone line, walk-in rule, and language coordinate is manually vetted quarterly.',
      icon: CheckCircle,
      bgColor: 'bg-brand-green-light text-brand-green'
    },
    {
      title: 'Community Anchored',
      desc: 'Maintained in partnership with local community health workers. We adjust details quickly in response to direct grassroots feedback.',
      icon: Users,
      bgColor: 'bg-brand-blue-light text-brand-blue'
    }
  ];

  const toggleFAQ = (idx: number) => {
    if (openFAQIndex === idx) {
      setOpenFAQIndex(null);
    } else {
      setOpenFAQIndex(idx);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsSent(true);
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');
  };

  return (
    <div className="space-y-16 py-8" id="about-panel-view">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-brand-teal bg-brand-teal-light uppercase border border-brand-teal/10">
          Founder Profile &amp; Mission
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-brand-primary">
          Hello, I'm Ojacklyn.
        </h1>
        <p className="text-[#515151] text-lg leading-relaxed">
          Public health researcher, writer, and New Jersey native—on a personal mission to make health resources simple to locate and easy to trust.
        </p>
      </div>

      {/* Profile Section Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center relative overflow-hidden">
          
          <div className="md:col-span-4 flex justify-center">
            {/* Visual Profile Avatar */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-brand-teal-light/50 border-4 border-brand-teal/15 flex items-center justify-center relative shadow-sm shrink-0">
              <div className="w-40 h-40 rounded-full bg-brand-teal flex flex-col items-center justify-center text-brand-cream text-3xl font-extrabold select-none tracking-tight">
                OJ
                <span className="text-[10px] uppercase font-mono tracking-wide font-normal mt-1 opacity-70">New Jersey</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-brand-green text-white p-2 rounded-full border-2 border-white shadow-sm" title="Vetted Researcher">
                <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-teal uppercase">Principal Platform Architect</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary">Lived Experience meets Academic Strategy</h2>
              <p className="text-sm font-semibold text-brand-text-sec">MPH Graduate &amp; Independent Health Consultant • Newark / Jersey City</p>
            </div>

            <p className="text-sm text-brand-text-sec leading-relaxed text-left">
              Growing up in New Jersey, I watched first-hand how family members and neighbors struggled to navigate the baffling American medical system. For many, a simple dentist visit or renewing state insurance involved decrypting circular government mailers, confronting languages they didn’t speak, or facing clinicians who didn’t understand their home lives. 
            </p>

            <p className="text-sm text-brand-text-sec leading-relaxed text-left">
              After completing my Master of Public Health, I realized that the true solution didn’t always reside in clinical labs; it started by bringing **clear, actionable transparency directly to the sidewalk**. This website, Ojacklyn, is my personal, non-commercial public benefit service to democratize healthcare pathways and advocate for birth equity, stable nutrition housing, and dignity for every under-represented resident in NJ.
            </p>

            {/* Micro-Contact Line */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-brand-border/60 text-xs font-mono font-semibold text-brand-text-sec">
              <span className="inline-flex items-center gap-1"><GraduationCap className="w-4 h-4 text-brand-teal" /> Rutgers School of Public Health</span>
              <span className="inline-flex items-center gap-1"><Award className="w-4 h-4 text-brand-green" /> Certified Health Analyst</span>
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4 text-brand-teal" /> Manually Audited Counties</span>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values / What Guides This Work */}
      <section className="bg-brand-sage/30 border-y border-brand-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider text-brand-green bg-brand-green-light border border-brand-green/10 uppercase">
              Ethical Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary">Our Core Directives</h2>
            <p className="text-sm text-brand-text-sec">
              Public health is a covenant of trust. These three clear principles guide every resource listed and every essay published on this platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valuesAndPrinciples.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-white border border-brand-border p-6 rounded-2xl shadow-sm space-y-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${val.bgColor}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-primary">{val.title}</h3>
                  <p className="text-xs text-brand-text-sec leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Path to Portal / Chronology Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-brand-teal bg-brand-teal-light uppercase border border-brand-teal/10">
              Chronology
            </span>
            <h2 className="text-3xl font-display font-bold text-brand-primary leading-tight">The path here.</h2>
            <p className="text-sm text-brand-text-sec leading-relaxed">
              A brief timeline of the real-world education and grassroots activities that formed my research perspective.
            </p>
            <div className="bg-brand-cream border border-brand-border p-4 rounded-2xl shadow-sm space-y-2">
              <p className="text-xs font-bold text-brand-primary">Vetting Standard:</p>
              <p className="text-[11px] text-brand-[##505F5C] leading-normal font-mono">
                My work is informed by rigorous, quantitative demographic data coupled with qualitative interviews with local organizers in Paterson, Newark, and Camden.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6 relative ml-4">
              
              {TIMELINE_EVENTS.map((event, idx) => (
                <div key={idx} className="relative pl-8 timeline-line group">
                  {/* Timeline bullet dot */}
                  <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full border-4 border-brand-cream bg-brand-teal shadow p-0.5 flex items-center justify-center text-white z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                  </div>

                  <div className="space-y-1 text-left">
                    <span className="font-mono text-xs font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded-md border border-brand-green/10 inline-block">{event.year}</span>
                    <h3 className="font-display font-bold text-base text-brand-primary group-hover:text-brand-teal transition-colors">{event.title}</h3>
                    <p className="text-xs font-semibold text-brand-text-sec">{event.subtitle}</p>
                    <p className="text-xs text-brand-text-muted leading-relaxed mt-1">{event.description}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions accordion */}
      <section className="bg-brand-sage/30 border-y border-brand-border py-16" id="faq-section">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider text-brand-teal bg-brand-teal-light border border-brand-teal/10 uppercase">
              Assistance FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary">Frequently Asked Questions</h2>
            <p className="text-sm text-brand-text-sec">
              Critical clarifications concerning verification, data security, and collaborative outreach.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 flex justify-between items-center bg-white cursor-pointer select-none border-b border-brand-border/20 hover:bg-brand-sage/10"
                  aria-expanded={openFAQIndex === idx}
                >
                  <span className="font-display font-bold text-sm text-brand-primary leading-snug">{faq.question}</span>
                  <HelpCircle className={`w-4 h-4 text-brand-text-muted transition-transform shrink-0 ml-4 ${openFAQIndex === idx ? 'rotate-180 text-brand-teal' : ''}`} />
                </button>

                {openFAQIndex === idx && (
                  <div className="p-5 bg-brand-cream border-t border-brand-border/30 text-xs sm:text-sm text-brand-text-sec leading-relaxed text-left animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DISPATCH TERMINAL / CONTACT FORM */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-wider text-brand-green uppercase bg-brand-green-light px-2.5 py-1 rounded">
              <MessageSquareDiff className="w-3.5 h-3.5" /> Dispatch Terminal
            </span>
            <h3 className="font-display font-bold text-xl text-brand-primary">Collaborate or Ask a Question</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              Have a clinical details correction to suggest? Writing a local health grant and need a policy consultant? Reach out to me directly below.
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleContactSubmit} className="space-y-4" id="about-contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-text-sec mb-1 font-mono uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexis Jordan"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-text-sec mb-1 font-mono uppercase tracking-wider">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alexis@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-brand-cream border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-text-sec mb-1 font-mono uppercase tracking-wider">Inquiry Subject</label>
                <input
                  type="text"
                  placeholder="e.g. South Jersey Birthing Doula Inquiry"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-brand-[#FAF9F6] border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-text-sec mb-1 font-mono uppercase tracking-wider">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can Ojacklyn help support your community health project?"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-brand-[#FAF9F6] border border-brand-border focus:border-brand-teal px-3 py-2.5 rounded-lg text-xs font-semibold focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-mono text-brand-text-muted leading-none select-none">Encrypted secure direct dispatch</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-teal hover:bg-brand-accent text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl inline-flex items-center gap-1.5 shadow-sm hover:shadow cursor-pointer transition-all"
                  id="submit-contact"
                >
                  <Send className="w-3.5 h-3.5" /> Send Dispatch
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 px-4 space-y-4 animate-scaleUp" id="contact-success-pane">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center text-brand-green mx-auto">
                <CheckCircle2 className="w-8 h-8 font-bold" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-base text-brand-primary">Dispatch Placed Successfully</h4>
                <p className="text-xs text-brand-text-sec max-w-sm mx-auto leading-relaxed">
                  Thank you Alexis, your message has been safely logged in Ojacklyn’s terminal. We will respond back within 24 business hours as scheduling permits!
                </p>
              </div>
              <button
                onClick={() => setIsSent(false)}
                className="mt-2 px-4 py-2 bg-brand-cream border border-brand-border hover:border-brand-teal text-brand-primary text-xs font-semibold rounded-lg cursor-pointer"
              >
                Send New Message
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
