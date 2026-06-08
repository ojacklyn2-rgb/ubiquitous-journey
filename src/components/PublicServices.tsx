import { useState } from 'react';
import { RESOURCES } from '../data';
import { ChevronRight, MapPin } from 'lucide-react';

interface PublicServicesProps {
  onSelectResource: (id: string) => void;
}

type CategoryFilter = 'All' | 'Working Families' | 'Older Adults' | 'Uninsured' | 'Disability';

const CATEGORY_COLORS: Record<string, string> = {
  'Working Families': 'bg-teal-100 text-teal-800',
  'Older Adults': 'bg-blue-100 text-blue-800',
  'Uninsured': 'bg-orange-100 text-orange-800',
  'Disability': 'bg-purple-100 text-purple-800',
};

const FILTER_ACTIVE: Record<string, string> = {
  'All': 'bg-gray-900 text-white',
  'Working Families': 'bg-teal-600 text-white',
  'Older Adults': 'bg-blue-600 text-white',
  'Uninsured': 'bg-orange-500 text-white',
  'Disability': 'bg-purple-600 text-white',
};

export default function PublicServices({ onSelectResource }: PublicServicesProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');

  const filtered = activeFilter === 'All'
    ? RESOURCES
    : RESOURCES.filter(r => r.categories.includes(activeFilter));

  const filters: CategoryFilter[] = ['All', 'Working Families', 'Older Adults', 'Uninsured', 'Disability'];

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Public Health Resources</h1>
        <p className="text-gray-500 text-lg">
          {RESOURCES.length} verified resources serving New Jersey communities. Click any resource to view full details, locations, and contact information.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? FILTER_ACTIVE[filter]
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
            {filter !== 'All' && (
              <span className="ml-1 opacity-70">
                ({RESOURCES.filter(r => r.categories.includes(filter as any)).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Resource count */}
      <p className="text-sm text-gray-400 mb-6">
        Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
        {activeFilter !== 'All' ? ` for "${activeFilter}"` : ''}
      </p>

      {/* Resource grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(resource => (
          <button
            key={resource.id}
            onClick={() => onSelectResource(resource.id)}
            className="card-lift text-left bg-white rounded-2xl border border-gray-100 p-6 flex flex-col group cursor-pointer"
          >
            {/* Category badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {resource.categories.map(cat => (
                <span key={cat} className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat]}`}>
                  {cat}
                </span>
              ))}
            </div>

            {/* Name & subtitle */}
            <h2 className="font-display text-base font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors leading-snug">
              {resource.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
              {resource.subtitle}
            </p>

            {/* Services preview */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {resource.services.slice(0, 3).map(s => (
                  <span key={s} className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-md">
                    {s}
                  </span>
                ))}
                {resource.services.length > 3 && (
                  <span className="text-xs text-gray-400">+{resource.services.length - 3} more</span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={12} />
                <span>{resource.locations.length > 1 ? `${resource.locations.length} locations` : resource.locations[0].address.split(',').slice(-2).join(',').trim()}</span>
              </div>
              <span className="text-xs font-semibold text-teal-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                View Details <ChevronRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
