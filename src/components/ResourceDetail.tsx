import { Resource } from '../types';
import { ArrowLeft, Phone, Mail, Globe, Clock, MapPin, ExternalLink } from 'lucide-react';

interface ResourceDetailProps {
  resource: Resource;
  onBack: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Working Families': 'bg-teal-100 text-teal-800',
  'Older Adults': 'bg-blue-100 text-blue-800',
  'Uninsured': 'bg-orange-100 text-orange-800',
  'Disability': 'bg-purple-100 text-purple-800',
};

export default function ResourceDetail({ resource, onBack }: ResourceDetailProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Resources
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.categories.map(cat => (
            <span key={cat} className={`text-xs font-medium px-3 py-1 rounded-full ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-700'}`}>
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{resource.name}</h1>
        <p className="text-lg text-gray-500 mb-6">{resource.subtitle}</p>
        <p className="text-gray-700 leading-relaxed">{resource.description}</p>

        <a
          href={resource.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Visit Official Website <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Services */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h2>
          <ul className="space-y-2">
            {resource.services.map(service => (
              <li key={service} className="flex items-start gap-2 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                <a href={`tel:${resource.phone.replace(/[^0-9+]/g, '')}`} className="text-gray-800 hover:text-teal-600 font-medium">
                  {resource.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                <span className="text-gray-800 font-medium break-all">{resource.email}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Website</p>
                <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium break-all">
                  {resource.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Hours</p>
                <p className="text-gray-800 font-medium whitespace-pre-line">{resource.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations with Google Maps */}
      <div className="space-y-6">
        {resource.locations.map((location, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 pb-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  {location.label && (
                    <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide mb-1">{location.label}</p>
                  )}
                  <p className="text-gray-800 font-medium">{location.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${location.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    Get Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
            {/* Google Maps Embed */}
            <div className="h-64 w-full">
              <iframe
                title={`Map for ${resource.name}${location.label ? ` - ${location.label}` : ''}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${location.mapQuery}&output=embed&z=15`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
