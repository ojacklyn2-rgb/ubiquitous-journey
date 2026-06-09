import { ViewType } from '../types';
import { RESOURCES, BLOG_POSTS } from '../data';
import { motion } from 'motion/react';
import { Users, Heart, ShieldOff, Accessibility, ArrowRight, CheckCircle, Search, MapPin, BookOpen, Calendar } from 'lucide-react';

interface DashboardHomeProps {
  setView: (view: ViewType) => void;
  setSelectedBlogId: (id: string | null) => void;
}

const AUDIENCE_CARDS = [
  { category: 'Working Families' as const, icon: Users,         color: 'teal',   headline: 'Working Families', desc: 'Housing, TANF, childcare, food access, and health coverage for low-income households — including women and children.' },
  { category: 'Older Adults'     as const, icon: Heart,         color: 'blue',   headline: 'Older Adults',     desc: 'Medicare savings, prescription help, paratransit, and senior care navigation.' },
  { category: 'Uninsured'        as const, icon: ShieldOff,     color: 'orange', headline: 'Uninsured',        desc: 'Free clinics, Charity Care, community health centers, and sliding-scale services.' },
  { category: 'Disability'       as const, icon: Accessibility, color: 'purple', headline: 'Disability',       desc: 'Developmental services, adaptive transit, vocational support, and housing vouchers.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse Resources',  desc: 'Filter 20 verified NJ organizations by who they serve.',              icon: Search     },
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
    <div className="space-y-20 py-10" id="dashboard-home-view">

      {/* ── Hero ── */}
      <section className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-[1.07] mb-6 tracking-tight">
            Free Health Resources<br />
            for <span className="text-teal-600 accent-underline">NJ Communities</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-8">
            Verified public health services, housing support, and community resources — built for underserved communities across New Jersey.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setView('services')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              Resource Database <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setView('blog')}
              className="px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={15} /> Read the Blog
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-b border-gray-100 py-8">
          {[
            { value: '20',   label: 'Verified resources' },
            { value: '4',    label: 'Service categories' },
            { value: '21',   label: 'NJ counties' },
            { value: '100%', label: 'Free to use' },
          ].map((stat, i) => (
            <div key={i}>
              <span className="block text-3xl font-extrabold text-gray-900">{stat.value}</span>
              <span className="block text-sm text-gray-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest Writing ── */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Latest Writing</h2>
          <button
            onClick={() => setView('blog')}
            className="text-sm font-medium text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-1"
          >
            {recentPosts.length > 0 ? 'All essays' : 'Visit blog'} <ArrowRight size={13} />
          </button>
        </div>

        {recentPosts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => { setSelectedBlogId(post.id); setView('blog'); }}
                className="w-full text-left py-5 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-teal-600 font-medium">{post.category}</span>
                    <h3 className="font-bold text-gray-900 text-base mt-0.5 group-hover:text-teal-700 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="text-xs text-gray-400 shrink-0 flex items-center gap-1 mt-1">
                    <Calendar size={11} />
                    <span>{post.date}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="border border-gray-100 rounded-2xl p-8 bg-white">
            <span className="text-xs text-teal-600 font-medium">Public Health · NJ Policy · Community</span>
            <p className="text-xl font-bold text-gray-900 mt-2 mb-2 leading-snug">
              Essays on the everyday obstacles that shape health outcomes in New Jersey.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              From maternal care deserts to Medicaid renewal gaps — written from the ground up, not from a think tank.
            </p>
            <button
              onClick={() => setView('blog')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
            >
              <BookOpen size={14} /> Go to Blog <ArrowRight size={13} />
            </button>
          </div>
        )}
      </section>

      {/* ── Who I Serve ── */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Who I Serve</h2>
        <p className="text-gray-500 text-sm mb-6">Every resource is organized around the people who need it most.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AUDIENCE_CARDS.map((card) => {
            const c = colorMap[card.color];
            const Icon = card.icon;
            const count = RESOURCES.filter(r => r.categories.includes(card.category)).length;
            return (
              <button
                key={card.category}
                onClick={() => setView('services')}
                className={`text-left border ${c.border} ${c.hover} rounded-xl p-5 flex items-start gap-4 cursor-pointer transition-colors hover:bg-gray-50`}
              >
                <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{card.headline}</h3>
                    <span className={`text-xs ${c.badgeText} ${c.badge} px-1.5 py-0.5 rounded-full`}>{count}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">How It Works</h2>
        <p className="text-gray-500 text-sm mb-6">No account. No form. Just a clear path to the help you need.</p>

        <div className="space-y-4">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Highlighted Resources ── */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Highlighted Resources</h2>
            <p className="text-sm text-gray-500">A few of the organizations I've verified for NJ communities.</p>
          </div>
          <button
            onClick={() => setView('services')}
            className="text-sm font-medium text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-1 shrink-0"
          >
            See all 20 <ArrowRight size={13} />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {showcaseResources.map((resource) => (
            <div key={resource.id} className="py-5">
              <div className="flex flex-wrap gap-1 mb-2">
                {resource.categories.slice(0, 2).map(cat => (
                  <span key={cat} className={`text-xs font-medium px-2 py-0.5 rounded-full border ${catColor(cat)}`}>{cat}</span>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{resource.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-2">{resource.subtitle}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={11} />
                <span>{resource.locations.length > 1 ? `${resource.locations.length} locations` : resource.locations[0]?.address.split(',').slice(-2).join(',').trim()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setView('services')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Browse All 20 Resources <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── About Teaser ── */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="border-t border-gray-100 pt-10">
          <p className="text-xs text-teal-600 font-medium mb-3">About This Platform</p>
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
            Built from lived experience in New Jersey.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mb-5">
            Growing up witnessing the realities of caregiving and healthcare navigation, I built this platform to make public health resources visible, accessible, and human.
          </p>
          <button
            onClick={() => setView('about')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
          >
            My Story <ArrowRight size={14} />
          </button>
        </div>
      </section>

    </div>
  );
}
