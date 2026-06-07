export type ViewType = 'home' | 'services' | 'blog' | 'about';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  category: 'Health Equity' | 'Policy' | 'Community' | 'Personal' | 'Resources';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  thumbnail: string;
  tags: string[];
}

export interface MedicalService {
  id: string;
  name: string;
  description: string;
  category: 'Primary Care' | 'Mental Health' | 'Food Access' | 'Housing' | 'Substance Use' | 'Women\'s Health' | 'Children & Family' | 'Dental' | 'Vision';
  county: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  languages: string[];
  eligibility: string;
  cost: 'Free' | 'Sliding Scale' | 'Medicaid/NJ FamilyCare' | 'Low Cost';
  verifiedDate: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface ServiceSubmission {
  name: string;
  description: string;
  category: string;
  county: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  languages: string[];
  eligibility: string;
  cost: string;
  submittedByEmail: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}
