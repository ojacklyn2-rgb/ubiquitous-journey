import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPanel() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Hero banner */}
      <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-teal-800 to-teal-600 text-white p-12 text-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">About This Platform</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Full Story</h1>
          <div className="w-16 h-1 bg-teal-300 mx-auto rounded-full" />
        </div>
      </div>

      {/* Story content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 mb-10"
      >
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            Growing up in New Jersey and witnessing the realities of caregiving, healthcare navigation, and community health challenges firsthand shaped the foundation of this project. Personal experiences supporting family members and observing how factors such as mobility, financial strain, transportation, and access to care affect everyday life sparked a deeper interest in public health and preventative healthcare. Alongside academic experiences in health policy research and healthcare exposure, these experiences led to a growing interest in understanding how local systems, resources, and social conditions influence long-term wellbeing.
          </p>
          <p>
            This platform began as an effort to better understand the everyday obstacles that shape health outcomes throughout New Jersey. From transportation limitations and gaps in medical coverage to the challenges faced by aging populations and working families, many critical issues affecting wellbeing often remain overlooked or difficult to navigate. By bringing together local insights, data visualization, and public-facing discussion, this project aims to highlight the connection between social conditions, healthcare systems, and quality of life. It was created with the belief that informed communities are better equipped to advocate for healthier and more equitable futures.
          </p>
        </div>

        {/* Credibility bar */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-6 font-semibold">Built With</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub Pages'].map(tech => (
              <span key={tech} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Let's Work Together */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border border-teal-100 p-8 md:p-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Work Together</h2>
        <p className="text-gray-500 mb-8">Get in touch so we can start working together.</p>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none"
              placeholder="Tell me how we can work together..."
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Send <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-teal-100 flex items-center gap-2 text-sm text-gray-400">
          <Mail size={14} />
          <span>Ojacklyn · All rights reserved</span>
        </div>
      </motion.div>
    </div>
  );
}
