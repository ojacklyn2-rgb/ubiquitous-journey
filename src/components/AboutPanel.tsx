import { Mail, ArrowRight, Code2, Layers, Wind, Zap, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';

const TECH_STACK = [
  { name: 'React', icon: Code2 },
  { name: 'TypeScript', icon: Layers },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Vite', icon: Zap },
  { name: 'GitHub Pages', icon: Github },
];

export default function AboutPanel() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">

      {/* ── Hero Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white p-12 md:p-16 text-center"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="relative z-10">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-teal-300 mb-4">About This Platform</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Full Story</h1>
          <div className="w-12 h-1 bg-teal-400 mx-auto rounded-full" />
        </div>
      </motion.div>

      {/* ── Story ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12"
      >
        <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">
          <p>
            Growing up in New Jersey and witnessing the realities of caregiving, healthcare navigation, and community health challenges firsthand shaped the foundation of this project. Personal experiences supporting family members and observing how factors such as mobility, financial strain, transportation, and access to care affect everyday life sparked a deeper interest in public health and preventative healthcare. Alongside academic experiences in health policy research and healthcare exposure, these experiences led to a growing interest in understanding how local systems, resources, and social conditions influence long-term wellbeing.
          </p>
          <p>
            This platform began as an effort to better understand the everyday obstacles that shape health outcomes throughout New Jersey. From transportation limitations and gaps in medical coverage to the challenges faced by aging populations and working families, many critical issues affecting wellbeing often remain overlooked or difficult to navigate. By bringing together local insights, data visualization, and public-facing discussion, this project aims to highlight the connection between social conditions, healthcare systems, and quality of life. It was created with the belief that informed communities are better equipped to advocate for healthier and more equitable futures.
          </p>
        </div>

        {/* Built With */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-6 font-semibold">Built With</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map(({ name, icon: Icon }) => (
              <span key={name} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-full text-sm text-gray-600 font-medium hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                <Icon size={14} className="text-teal-500" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Values Row ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'Community First', desc: 'Every resource is chosen for people who need it — not for engagement metrics.' },
          { label: 'Verified & Current', desc: 'Listings are cross-checked against active phone numbers, websites, and addresses.' },
          { label: 'No Barriers', desc: 'No login, no tracking, no cost. Just information — the way it should be.' },
        ].map((v) => (
          <div key={v.label} className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
            <div className="w-2 h-2 rounded-full bg-teal-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1.5">{v.label}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Contact Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12"
      >
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Let's Work Together</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Whether you're a community health worker, policymaker, or a resident with a resource to share — reach out.
          </p>
        </div>

        {!submitted ? (
          <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <input
                type="email"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none"
                placeholder="How can we work together?"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              Send Message <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="max-w-lg bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight size={20} className="text-teal-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Message Sent</h3>
            <p className="text-sm text-gray-500">Thanks for reaching out. I'll be in touch soon.</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-400">
          <Mail size={14} />
          <span>Ojacklyn · All rights reserved</span>
        </div>
      </motion.div>

    </div>
  );
}
