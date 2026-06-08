import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';

export default function AboutPanel() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-12">

      {/* ── Hero Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative grain bg-teal-800 rounded-3xl overflow-hidden text-white px-10 py-16 md:px-16 md:py-20"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="relative z-10">
          <span className="block text-xs font-mono font-semibold uppercase tracking-widest text-teal-300 mb-4">About This Platform</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">The Full Story</h1>
          <div className="w-10 h-0.5 bg-teal-400 rounded-full" />
        </div>
      </motion.div>

      {/* ── Story ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        <div className="space-y-6 text-gray-700 leading-relaxed text-[15.5px] font-sans">
          <p>
            Growing up in New Jersey and witnessing the realities of caregiving, healthcare navigation, and community health challenges firsthand shaped the foundation of this project. Personal experiences supporting family members and observing how factors such as mobility, financial strain, transportation, and access to care affect everyday life sparked a deeper interest in public health and preventative healthcare. Alongside academic experiences in health policy research and healthcare exposure, these experiences led to a growing interest in understanding how local systems, resources, and social conditions influence long-term wellbeing.
          </p>
          <p>
            This platform began as an effort to better understand the everyday obstacles that shape health outcomes throughout New Jersey. From transportation limitations and gaps in medical coverage to the challenges faced by aging populations and working families, many critical issues affecting wellbeing often remain overlooked or difficult to navigate. By bringing together local insights, data visualization, and public-facing discussion, this project aims to highlight the connection between social conditions, healthcare systems, and quality of life. It was created with the belief that informed communities are better equipped to advocate for healthier and more equitable futures.
          </p>
        </div>
      </motion.div>

      {/* ── Pull Quote ── */}
      <motion.blockquote
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="border-l-4 border-teal-400 pl-6 py-1"
      >
        <p className="font-display text-xl md:text-2xl text-gray-800 italic leading-snug">
          "Informed communities are better equipped to advocate for healthier and more equitable futures."
        </p>
      </motion.blockquote>

      {/* ── Values ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'Community First',    desc: 'Every resource is chosen for people who need it — not for engagement metrics.' },
          { label: 'Verified & Current', desc: 'Listings are cross-checked against active phone numbers, websites, and addresses.' },
          { label: 'No Barriers',        desc: 'No login, no tracking, no cost. Just information — the way it should be.' },
        ].map((v) => (
          <div key={v.label} className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
            <div className="w-2 h-2 rounded-full bg-teal-500 mb-3" />
            <h3 className="font-display font-bold text-gray-900 mb-1.5">{v.label}</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">{v.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Contact Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10"
      >
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Let's Work Together</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed font-sans">
          Whether you're a community health worker, policymaker, or a resident with a resource to share — reach out.
        </p>

        {!submitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input type="text" placeholder="Jane"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition font-sans" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input type="text" placeholder="Doe"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition font-sans" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <input type="email" required placeholder="jane@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition font-sans" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea rows={4} placeholder="How can we work together?"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none font-sans" />
            </div>
            <button type="submit"
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer">
              Send Message <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowRight size={18} className="text-teal-600" />
            </div>
            <h3 className="font-display font-bold text-gray-900 mb-1">Message Sent</h3>
            <p className="text-sm text-gray-500 font-sans">Thanks for reaching out. I'll be in touch soon.</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-400 font-sans">
          <Mail size={14} />
          <span>Ojacklyn · All rights reserved</span>
        </div>
      </motion.div>

    </div>
  );
}
