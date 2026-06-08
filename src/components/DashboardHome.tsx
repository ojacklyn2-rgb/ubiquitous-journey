import { ViewType } from '../types';
import { RESOURCES, BLOG_POSTS } from '../data';
import { motion } from 'motion/react';
import { Users, Heart, ShieldOff, Accessibility, ArrowRight, CheckCircle, Search, MapPin, BookOpen, Calendar } from 'lucide-react';

interface DashboardHomeProps {
  setView: (view: ViewType) => void;
  setSelectedBlogId: (id: string | null) => void;
}

const AUDIENCE_CARDS = [
  { category: 'Working Families' as const, icon: Users,         color: 'teal',   headline: 'Working Families', desc: 'Housing, TANF, childcare, food access, and health coverage for low-income households.' },
  { category: 'Older Adults'     as const, icon: Heart,         color: 'blue',   headline: 'Older Adults',     desc: 'Medicare savings, prescription help, paratransit, and senior care navigation.' },
  { category: 'Uninsured'        as const, icon: ShieldOff,     color: 'orange', headline: 'Uninsured',        desc: 'Free clinics, Charity Care, community health centers, and sliding-scale services.' },
  { category: 'Disability'       as const, icon: Accessibility, color: 'purple', headline: 'Disability',       desc: 'Developmental services, adaptive transit, vocational support, and housing vouchers.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse Resources',  desc: 'Filter 19 verified NJ organizations by who they serve.',              icon: Search     },
  { step: '02', title: 'View Full Details', desc: 'Services, contact info, hours, and an interactive map per location.', icon: MapPin     },
  { step: '03', title: 'Get Connected',     desc: 'Call, visit the site, or get directions — no signup, no cost.',       icon: CheckCircle },
];

const colorMap: Record<string, { bg: string; text: string; badge: string; badgeText: string; border: string; hover: string }> = {
  teal:   { bg: 'bg-teal-50',   text: 'text-teal-700',   badge: 'bg-teal-100',   badgeText: 'text-teal-800',   border: 'border-teal-200',   hover: 'hover:border-teal-300' },
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   badge: 'bg-blue-100',   badgeText: 'text-blue-800',   border: 'border-blue-200',   hover: 'hover:border-blue-300' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100', badgeText: 'text-orange-800', border: 'border-orange-200', hover: 'hover:border-orange-300' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100', badgeText: 'text-purple-800', border: 'border-purple-200', hover: 'hover:border-purple-300' },
};

const catColor = (cat: string) =>
  cat === 'Working Families' ? 'bg-teal-50 text-teal-700 border-teal-100' :
  cat === 'Older Adults'     ? 'bg-blue-50 text-blue-700 border-blue-100' :
  cat === 'Uninsured'        ? 'bg-orange-50 text-orange-700 border-orange-100' :
                               'bg-purple-50 text-purple-700 border-purple-100';

export default function DashboardHome({ setView, setSelectedBlogId }: DashboardHomeProps) {
  const showcaseResources = RESOURCES.filter(r => r.isFeatured).slice(0, 3).length >= 3
    ? RESOURCES.filter(r => r.isFeatured).slice(0, 3)
    : RESOURCES.slice(0, 3);

  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <div className="space-y-24 py-10" id="dashboard-home-view">

      {/* ── Hero ── */}
      <section className="relative max-w-3xl mx-auto px-4 text-center overflow-visible">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-16 -left-24 w-72 h-72 rounded-full bg-teal-200 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -top-8 -right-20 w-64 h-64 rounded-full bg-emerald-200 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-teal-100 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-teal-700 bg-teal-50 border border-teal-200 uppercase font-mono">
            New Jersey Public Health
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.07] mb-6 tracking-tight"
        >
          Free Health Resources<br />
          for <span className="text-teal-600 accent-underline">NJ Communities</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-8"
        >
          Verified public health services, housing support, and community resources — built for underserved communities across New Jersey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => setView('services')}
            className="px-7 py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Browse 19 Resources <ArrowRight size={16} />
          </button>
          <button
            onClick={() => setView('blog')}
            className="px-7 py-3.5 border border-gray-200 bg-white text-gray-700 hover:border-teal-400 text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen size={15} /> Read the Blog
          </button>
          <button
            onClick={() => setView('about')}
            className="px-7 py-3.5 border border-gray-200 bg-white text-gray-700 hover:border-teal-400 text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            My Story
          </button>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative grain bg-gray-900 py-8 rounded-2xl max-w-5xl mx-auto px-4 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y-2 md:divide-y-0 md:divide-x divide-gray-700/50 relative z-10">
          {[
            { value: '19',   label: 'Verified Resources' },
            { value: '4',    label: 'Service Categories' },
            { value: '21',   label: 'NJ Counties Covered' },
            { value: '100%', label: 'Free to Use' },
          ].map((stat, i) => (
            <div key={i} className="py-2 md:py-0 px-4">
              <span className="block text-3xl font-extrabold text-teal-400">{stat.value}</span>
              <span className="block text-xs font-mono uppercase tracking-wider text-gray-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who I Serve ── */}
      <section className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Who I Serve</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Every resource is organized around the people who need it most. Find your category and get directly to what applies to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUDIENCE_CARDS.map((card, i) => {
            const c = colorMap[card.color];
            const Icon = card.icon;
            const count = RESOURCES.filter(r => r.categories.includes(card.category)).length;
            return (
              <motion.button
                key={card.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setView('services')}
                className={`card-lift text-left bg-white border ${c.border} ${c.hover} rounded-2xl p-6 flex flex-col gap-4 cursor-pointer`}
              >
                <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>
                <div>
                  <span className={`text-xs font-semibold ${c.badgeText} ${c.badge} px-2 py-0.5 rounded-full border ${c.border}`}>
                    {count} resources
                  </span>
                  <h3 className="font-bold text-gray-900 mt-2 mb-1 text-base">{card.headline}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
                <span className={`text-xs font-semibold ${c.text} flex items-center gap-1 mt-auto`}>
                  View resources <ArrowRight size={12} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            No account. No form. Just a clear path to the help you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl border border-gray-100 p-7 shadow-sm overflow-hidden"
              >
                <span className="text-6xl font-black text-gray-50 absolute top-4 right-5 select-none leading-none">{step.step}</span>
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Highlighted Resources ── */}
      <section className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">Highlighted Resources</h2>
            <p className="text-sm text-gray-500">A few of the organizations I've verified for NJ communities.</p>
          </div>
          <button
            onClick={() => setView('services')}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
          >
            See all 19 <ArrowRight size={14} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {showcaseResources.map((resource, i) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-lift bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 cursor-default"
            >
              <div className="flex flex-wrap gap-1">
                {resource.categories.slice(0, 2).map(cat => (
                  <span key={cat} className={`text-xs font-medium px-2 py-0.5 rounded-full border ${catColor(cat)}`}>{cat}</span>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug">{resource.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-grow">{resource.subtitle}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400 pt-2 border-t border-gray-50">
                <MapPin size={12} />
                <span>{resource.locations.length > 1 ? `${resource.locations.length} locations` : resource.locations[0]?.address.split(',').slice(-2).join(',').trim()}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setView('services')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Browse All 19 Resources <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Latest Writing ── */}
      <section className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <span className="block text-xs font-mono font-semibold uppercase tracking-widest text-teal-600 mb-2">From the Journal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Latest Writing</h2>
          </div>
          {recentPosts.length > 0 && (
            <button
              onClick={() => setView('blog')}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
            >
              All essays <ArrowRight size={14} />
            </button>
          )}
        </motion.div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentPosts.map((post, i) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => { setSelectedBlogId(post.id); setView('blog'); }}
                className="card-lift text-left bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 cursor-pointer"
              >
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-600">{post.category}</span>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-grow">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-50">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                  <span className="mx-1">·</span>
                  <span>{post.readTime}</span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="relative grain bg-gray-900 rounded-3xl overflow-hidden p-10 md:p-14 text-white">
            <div className="relative z-10 max-w-xl">
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Essays on health equity, NJ policy, maternal care deserts, and the everyday obstacles that shape wellbeing — written from the ground up, not from a think tank.
              </p>
              <p className="text-2xl font-bold text-white italic mb-6 leading-snug">
                "Informed communities are better equipped to advocate for healthier, more equitable futures."
              </p>
              <button
                onClick={() => setView('blog')}
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-semibold transition-colors cursor-pointer"
              >
                <BookOpen size={16} /> Writing coming soon
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── About Teaser ── */}
      <section className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative grain bg-teal-800 rounded-3xl overflow-hidden p-10 md:p-14 text-white"
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <span className="block text-xs font-mono font-semibold uppercase tracking-widest text-teal-300">About This Platform</span>
              <h2 className="text-3xl font-extrabold leading-tight">
                Built from lived experience<br className="hidden sm:block" /> in New Jersey.
              </h2>
              <p className="text-teal-100 text-sm leading-relaxed max-w-md">
                Growing up witnessing the realities of caregiving and healthcare navigation, I built this platform to make public health resources visible, accessible, and human.
              </p>
              <button
                onClick={() => setView('about')}
                className="inline-flex items-center gap-2 bg-white text-teal-800 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors cursor-pointer"
              >
                My Story <ArrowRight size={15} />
              </button>
            </div>
            <div className="hidden md:flex flex-col gap-3 shrink-0">
              {[
                { icon: BookOpen,    text: 'Health equity focused' },
                { icon: CheckCircle, text: 'Quarterly verified listings' },
                { icon: MapPin,      text: 'All 21 NJ counties' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3 text-sm font-medium text-white">
                  <Icon size={16} className="text-teal-300 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
