import { BlogPost, MedicalService, Resource, FAQItem, TimelineEvent } from './types';

export const COUNTIES = [
  'Atlantic', 'Bergen', 'Burlington', 'Camden', 'Cape May', 'Cumberland',
  'Essex', 'Gloucester', 'Hudson', 'Hunterdon', 'Mercer', 'Middlesex',
  'Monmouth', 'Morris', 'Ocean', 'Passaic', 'Salem', 'Somerset',
  'Sussex', 'Union', 'Warren'
];

export const LANGUAGES = [
  'English', 'Spanish', 'Portuguese', 'Arabic', 'Hindi', 'Korean', 'Creole', 'Tagalog'
];

export const BLOG_POSTS: BlogPost[] = [];

export const MEDICAL_SERVICES: MedicalService[] = [];

export const RESOURCES: Resource[] = [
  {
    id: 'apostles-house',
    name: "Apostles' House",
    subtitle: 'Supporting Newark families with emergency assistance, food access, and community care',
    description: "Apostles' House is a community-based organization in Newark, NJ providing emergency assistance, food support, and wraparound services to working families and individuals in need. Located in the heart of Newark, they serve as a trusted neighborhood resource for those facing hardship.",
    categories: ['Working Families'],
    services: ['Emergency assistance', 'Food support', 'Community referrals', 'Family services'],
    phone: '',
    hours: 'Contact for hours',
    locations: [
      {
        address: '24 Grant St, Newark, NJ 07104',
        mapQuery: '24+Grant+St+Newark+NJ+07104',
      }
    ],
  },
  {
    id: 'child-and-family-resources',
    name: 'Child and Family Resources',
    subtitle: 'Connecting NJ families to child welfare, parenting support, and community services',
    description: 'Child and Family Resources connects New Jersey families to essential child welfare, parenting support programs, family counseling, and community referral services. They serve Morris County and surrounding areas with comprehensive family-centered support.',
    categories: ['Working Families'],
    services: ['Child welfare support', 'Parenting programs', 'Family counseling', 'Community referrals'],
    website: 'https://cfrmorris.org/',
    phone: '973-398-1730',
    email: 'info@cfrmorris.org',
    hours: 'Mon–Fri: 9:00am – 4:00pm | Wed: 7:00am – 7:00pm',
    locations: [
      {
        address: '111 Howard Boulevard, Suite 104, Mount Arlington, NJ 07856',
        mapQuery: '111+Howard+Blvd+Suite+104+Mount+Arlington+NJ+07856',
      }
    ],
  },
  {
    id: 'ocean-health-initiative',
    name: 'Ocean Health Initiative',
    subtitle: 'Delivering accessible public health programs and preventive care services',
    description: 'Ocean Health Initiative delivers community-centered public health programs and preventive care services to residents of Ocean County. They focus on health education, wellness screenings, and connecting underserved residents to healthcare resources.',
    categories: ['Working Families'],
    services: ['Preventive care', 'Community health programs', 'Health education', 'Wellness screenings'],
    website: 'https://ohinj.org/',
    phone: '732-363-6655',
    email: 'info@ohinj.org',
    hours: 'Mon–Fri: 8:00am – 5:00pm',
    locations: [
      {
        address: '101 Second Street, Lakewood, NJ 08701',
        mapQuery: '101+Second+Street+Lakewood+NJ+08701',
      }
    ],
  },
  {
    id: 'central-jersey-family-health-consortium',
    name: 'Central Jersey Family Health Consortium',
    subtitle: 'Offering affordable primary care, prenatal services, and family health programs',
    description: 'Central Jersey Family Health Center offers affordable, high-quality primary care, prenatal services, pediatric care, and family health screenings to residents of Middlesex County and surrounding communities regardless of insurance status.',
    categories: ['Working Families'],
    services: ['Primary care', 'Prenatal services', 'Pediatric care', 'Family health screenings'],
    website: 'https://cjfhc.org/',
    phone: '732-937-5437',
    email: 'info@cjfhc.org',
    hours: 'Mon–Fri: 8:00am – 4:30pm',
    locations: [
      {
        address: '30 Silverline Drive, 2nd Floor, Suite 1, North Brunswick, NJ 08902',
        mapQuery: '30+Silverline+Drive+2nd+Floor+Suite+1+North+Brunswick+NJ+08902',
      }
    ],
  },
  {
    id: 'affordable-homes-new-jersey',
    name: 'Affordable Homes New Jersey',
    subtitle: 'Helping low- and moderate-income individuals and families access safe housing',
    description: 'Affordable Homes New Jersey helps low- and moderate-income individuals and families access safe, stable affordable housing through placement services, homeownership counseling, rental assistance, and housing advocacy programs.',
    categories: ['Working Families'],
    services: ['Affordable housing placement', 'Homeownership counseling', 'Rental assistance', 'Housing advocacy'],
    website: 'https://www.affordablehomesnewjersey.com/',
    phone: '609-664-2769',
    email: 'homes@cgph.net',
    hours: 'Mon–Fri: 8:30am – 5:00pm',
    locations: [
      {
        address: '1249 South River Road, Suite 301, Cranbury, NJ 08512',
        mapQuery: '1249+South+River+Rd+Suite+301+Cranbury+NJ+08512',
      }
    ],
  },
  {
    id: 'pace-nj',
    name: 'Program of All-Inclusive Care for the Elderly (PACE)',
    subtitle: 'Providing comprehensive medical and social services to older adults',
    description: 'The Program of All-Inclusive Care for the Elderly (PACE) provides comprehensive medical care coordination, physical therapy, prescription coverage, and social services to older adults who need nursing-home-level care but wish to remain in the community.',
    categories: ['Older Adults'],
    services: ['Medical care coordination', 'Physical therapy', 'Prescription coverage', 'Social services'],
    website: 'https://www.cms.gov/medicare/medicaid-coordination/about/pace',
    phone: '609-588-5960',
    email: 'doas@dhs.nj.gov',
    hours: 'Mon–Fri: 8:00am – 5:00pm',
    locations: [
      {
        address: '12D Quakerbridge Plaza, Mercerville, NJ 08619',
        mapQuery: '12D+Quakerbridge+Plaza+Hamilton+NJ+08619',
      }
    ],
  },
  {
    id: 'nj-charity-care',
    name: 'New Jersey Charity Care',
    subtitle: 'Assisting uninsured and underinsured NJ residents with free or reduced hospital care',
    description: 'New Jersey Charity Care assists uninsured and underinsured New Jersey residents in accessing free or reduced-cost hospital care through financial assistance applications. The program covers emergency care, inpatient, and outpatient hospital services.',
    categories: ['Uninsured'],
    services: ['Free hospital care', 'Reduced-cost medical services', 'Financial assistance applications'],
    website: 'https://www.nj.gov/health/hcf/charity-care/overview/',
    phone: '609-292-7837',
    email: 'njcharitycare@doh.nj.gov',
    hours: 'Varies by facility',
    locations: [
      {
        address: '55 North Willow Street, Trenton, NJ 08618',
        mapQuery: '55+North+Willow+Street+Trenton+NJ+08618',
      }
    ],
  },
  {
    id: 'newark-community-health-centers',
    name: 'Newark Community Health Centers, Inc.',
    subtitle: 'Providing community-centered primary care, behavioral health, and wellness services',
    description: 'Newark Community Health Centers provides comprehensive community-centered primary care, behavioral health, dental services, HIV/AIDS care, and substance use treatment to Newark residents regardless of ability to pay.',
    categories: ['Uninsured'],
    services: ['Primary care', 'Behavioral health', 'Dental services', 'HIV/AIDS care', 'Substance use treatment'],
    website: 'https://www.nchcfqhc.org/',
    phone: '973-483-1300',
    email: 'info@nchcfqhc.org',
    hours: 'Mon–Fri: 9:00am – 7:00pm | Sat: 9:00am – 4:00pm (1st & 3rd Saturday only)',
    locations: [
      {
        address: '741 Broadway, Newark, NJ 07104',
        mapQuery: '741+Broadway+Newark+NJ+07104',
      }
    ],
  },
  {
    id: 'njsave',
    name: 'NJSave',
    subtitle: 'Helping older adults and individuals with disabilities apply for prescription and utility assistance',
    description: 'NJSave helps older adults and individuals with disabilities apply for multiple benefit programs including prescription assistance, utility bill help, Medicare savings programs, and healthcare cost reduction — all through one application.',
    categories: ['Older Adults', 'Disability', 'Uninsured', 'Working Families'],
    services: ['Prescription assistance', 'Utility bill help', 'Medicare savings', 'Healthcare cost reduction'],
    website: 'https://www.nj.gov/humanservices/doas/services/l-p/njsave/',
    phone: '1-800-792-8820',
    email: 'njsave@dhs.nj.gov',
    hours: '24/7',
    locations: [
      {
        address: '222 South Warren Street, Trenton, NJ 08625',
        mapQuery: '222+South+Warren+Street+Trenton+NJ+08625',
      }
    ],
  },
  {
    id: 'nj211',
    name: 'NJ 2-1-1',
    subtitle: 'A free, confidential helpline connecting NJ residents to health and human services',
    description: 'NJ 2-1-1 is a free, confidential helpline and online directory connecting New Jersey residents to health, housing, food, mental health, crisis support, and social service resources 24 hours a day, 7 days a week.',
    categories: ['Working Families', 'Uninsured', 'Older Adults', 'Disability'],
    services: ['Crisis support', 'Social service referrals', 'Housing assistance', 'Food resources', 'Mental health referrals'],
    website: 'https://nj211.org/',
    phone: 'Dial 2-1-1',
    email: 'info@nj211.org',
    hours: '24/7',
    locations: [
      {
        address: '16 Wing Drive, Suite 201, Cedar Knolls, NJ 07927',
        mapQuery: '16+Wing+Drive+Suite+201+Cedar+Knolls+NJ+07927',
      }
    ],
  },
  {
    id: 'nj-family-care',
    name: 'NJ FamilyCare',
    subtitle: "New Jersey's Medicaid and CHIP program providing free or low-cost health coverage",
    description: "NJ FamilyCare is New Jersey's Medicaid and Children's Health Insurance Program (CHIP) providing free or low-cost health insurance, Medicaid enrollment, and prescription benefits to qualifying NJ residents including children, families, pregnant women, and adults.",
    categories: ['Working Families'],
    services: ['Free health insurance', 'Medicaid enrollment', 'CHIP coverage', 'Prescription benefits'],
    website: 'https://njfamilycare.dhs.state.nj.us/',
    phone: '1-800-701-0710',
    email: 'njfamilycare@dhs.nj.gov',
    hours: 'Mon & Thu: 8:00am – 8:00pm | Tue, Wed, Fri: 8:00am – 5:00pm',
    locations: [
      {
        address: '300 American Metro Blvd, Suite 170, Hamilton, NJ 08619',
        mapQuery: '300+American+Metro+Boulevard+Suite+170+Hamilton+NJ+08619',
      }
    ],
  },
  {
    id: 'nj-institute-for-disabilities',
    name: 'New Jersey Institute for Disabilities',
    subtitle: 'Offering educational, therapeutic, and community integration services for individuals with disabilities',
    description: 'The New Jersey Institute for Disabilities offers educational, therapeutic, and community integration services for individuals with developmental and physical disabilities, supporting independent living and quality of life.',
    categories: ['Disability'],
    services: ['Educational services', 'Therapeutic support', 'Community integration', 'Developmental disability programs'],
    website: 'https://www.njid.org/',
    phone: '732-246-2525',
    email: 'info@njid.org',
    hours: 'Mon–Fri: 8:00am – 5:00pm',
    locations: [
      {
        address: '10A Oak Drive, Roosevelt Park, Edison, NJ 08837',
        mapQuery: '10A+Oak+Drive+Roosevelt+Park+Edison+NJ+08837',
      }
    ],
  },
  {
    id: 'access-link-ada-paratransit',
    name: 'Access Link ADA Paratransit',
    subtitle: 'Providing accessible transportation services for individuals with disabilities',
    description: 'Access Link is NJ Transit\'s ADA paratransit service providing door-to-door transportation for individuals who are unable to use fixed-route public transportation due to a disability. Shared ride vehicles available statewide.',
    categories: ['Older Adults', 'Disability'],
    services: ['Door-to-door transportation', 'Trip scheduling', 'Shared ride vehicles', 'ADA certification'],
    website: 'https://www.njtransit.com/accessibility/access-link-ada-paratransit',
    phone: '973-491-4224',
    email: 'ADACertification@njtransit.com',
    hours: 'Mon–Fri: 8:30am – 5:00pm',
    locations: [
      {
        address: '1 Penn Plaza East, 7th Floor, Newark, NJ 07105',
        mapQuery: '1+Penn+Plaza+East+7th+Floor+Newark+NJ+07105',
      }
    ],
  },
  {
    id: 'central-jersey-medical-center',
    name: 'Central Jersey Medical Center',
    subtitle: 'Delivering quality medical care and health services to uninsured and underserved patients',
    description: 'Central Jersey Medical Center provides quality medical care including emergency care, primary care, and specialty referrals to uninsured and underserved patients across multiple New Jersey locations in Newark, Carteret, and Perth Amboy.',
    categories: ['Uninsured', 'Disability'],
    services: ['Emergency care', 'Primary care', 'Uninsured patient services', 'Specialty referrals'],
    website: 'https://www.cjmc.us/',
    phone: '609-586-7900',
    email: 'info@cjmc.us',
    hours: 'Mon–Fri: 8:00am – 5:00pm',
    locations: [
      {
        label: 'Newark',
        address: '359 13th Ave, Newark, NJ 07103',
        mapQuery: '359+13th+Ave+Newark+NJ+07103',
      },
      {
        label: 'Carteret',
        address: '1540 Roosevelt Ave, Carteret, NJ 07008',
        mapQuery: '1540+Roosevelt+Ave+Carteret+NJ+07008',
      },
      {
        label: 'Perth Amboy',
        address: '275 Hobart St, Perth Amboy, NJ 08861',
        mapQuery: '275+Hobart+St+Perth+Amboy+NJ+08861',
      }
    ],
  },
  {
    id: 'housing-partnership-nj',
    name: 'Housing Partnership NJ',
    subtitle: 'Supporting affordable housing development and homeownership opportunities',
    description: 'Housing Partnership NJ supports affordable housing development, homeownership programs, financial literacy, and foreclosure prevention services for working families, older adults, and individuals with disabilities across New Jersey.',
    categories: ['Working Families', 'Disability', 'Older Adults'],
    services: ['Affordable housing development', 'Homeownership programs', 'Financial literacy', 'Foreclosure prevention'],
    website: 'https://www.housingpartnershipnj.org/',
    phone: '732-389-2958',
    email: 'info@housingpartnership.net',
    hours: 'Mon–Fri: 8:00am – 5:00pm',
    locations: [
      {
        address: '2 East Blackwell Street, Suite 12, Dover, NJ 07801',
        mapQuery: '2+East+Blackwell+St+Suite+12+Dover+NJ+07801',
      }
    ],
  },
  {
    id: 'work-first-nj',
    name: 'Work First New Jersey / TANF',
    subtitle: 'Providing temporary financial assistance and employment support to low-income families',
    description: 'Work First New Jersey provides temporary financial assistance and employment training, job placement support, and case management services to low-income families and individuals through the Temporary Assistance for Needy Families (TANF) program.',
    categories: ['Working Families'],
    services: ['Temporary financial assistance', 'Employment training', 'Job placement support', 'Case management'],
    website: 'https://www.nj.gov/humanservices/wfnj/',
    phone: '1-800-792-8720',
    email: 'Apply at NJHelps.gov',
    hours: 'Mon–Fri: 8:30am – 4:30pm',
    locations: [
      {
        address: '6 Quakerbridge Plaza, Trenton, NJ 08625',
        mapQuery: '6+Quakerbridge+Plaza+Trenton+NJ+08625',
      }
    ],
  },
  {
    id: 'homefront-nj',
    name: 'HomeFront NJ',
    subtitle: 'Serving homeless and at-risk individuals and families with housing and support services',
    description: 'HomeFront serves homeless and at-risk individuals and families in Mercer County with emergency shelter, transitional housing, childcare assistance, and self-sufficiency programs to help families achieve stable, permanent housing.',
    categories: ['Working Families'],
    services: ['Emergency shelter', 'Transitional housing', 'Childcare assistance', 'Self-sufficiency programs'],
    website: 'https://www.homefrontnj.org/',
    phone: '609-989-9417',
    email: 'info@homefrontnj.org',
    hours: 'Mon–Fri: 9:00am – 5:00pm',
    locations: [
      {
        address: '1880 Princeton Avenue, Lawrenceville, NJ 08648',
        mapQuery: '1880+Princeton+Avenue+Lawrenceville+NJ+08648',
      }
    ],
  },
  {
    id: 'monmouth-family-health-center',
    name: 'Monmouth Family Health Center',
    subtitle: 'Providing comprehensive primary care and preventive health services to all patients',
    description: 'Monmouth Family Health Center provides comprehensive primary care, women\'s health, pediatrics, and chronic disease management to uninsured and underserved patients in Monmouth County regardless of ability to pay.',
    categories: ['Uninsured', 'Disability', 'Working Families'],
    services: ['Primary care', "Women's health", 'Pediatrics', 'Uninsured patient services', 'Chronic disease management'],
    website: 'https://www.mfhcnj.org/',
    phone: '732-870-5757',
    email: 'info@mfhcnj.org',
    hours: 'Mon, Wed, Fri: 8:00am – 5:30pm | Tue, Thu: 8:00am – 6:30pm | Sat: 8:00am – 4:00pm (1st & 3rd Saturday only)',
    locations: [
      {
        address: '270 Broadway, Long Branch, NJ 07740',
        mapQuery: '270+Broadway+Long+Branch+NJ+07740',
      }
    ],
  },
  {
    id: 'atlantic-health-developmental-disability',
    name: 'Atlantic Health Developmental Disability Centers',
    subtitle: 'Offering specialized clinical care and support services for individuals with developmental disabilities',
    description: 'Atlantic Health Developmental Disability Centers offers specialized clinical care, behavioral therapy, family support services, and community integration programs for individuals with developmental and intellectual disabilities in New Jersey.',
    categories: ['Disability'],
    services: ['Specialized clinical care', 'Behavioral therapy', 'Family support services', 'Community integration'],
    website: 'https://ahs.atlantichealth.org/conditions-treatments/developmental-disabilities.html',
    phone: '800-247-9580',
    email: 'info@atlantichealth.org',
    hours: 'Mon–Fri: 8:30am – 4:30pm',
    locations: [
      {
        address: '475 South Street, Morristown, NJ 07960',
        mapQuery: '475+South+Street+Morristown+NJ+07960',
      }
    ],
  },
  {
    id: 'section-8-housing-voucher',
    name: 'Section 8 Housing Choice Voucher',
    subtitle: 'Assisting low-income families, elderly, and disabled individuals in affording private housing',
    description: 'The Section 8 Housing Choice Voucher Program assists low-income families, elderly individuals, and persons with disabilities in affording safe, decent housing in the private market through rental assistance and landlord partnerships.',
    categories: ['Disability', 'Working Families'],
    services: ['Rental assistance', 'Housing placement', 'Landlord partnerships', 'Low-income eligibility'],
    website: 'https://www.nj.gov/dca/dhcr/offices/vouchers.shtml',
    phone: '1-800-654-6873',
    email: 'dca@dca.nj.gov',
    hours: 'Mon–Fri: 8:30am – 4:30pm',
    locations: [
      {
        address: '101 South Broad Street, Trenton, NJ 08625',
        mapQuery: '101+South+Broad+Street+Trenton+NJ+08625',
      }
    ],
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2020',
    title: 'Graduated: MPH in Epidemiology',
    subtitle: 'Rutgers School of Public Health',
    description: 'Focused studies on social determinants of maternal and child health in New Jersey\'s urban wards, documenting spatial disparities in healthcare access.'
  },
  {
    year: '2022',
    title: 'Lead Health Analyst & Community Liaison',
    subtitle: 'Passaic County Health Initiative',
    description: 'Coordinated local mobile outreach networks, launched translation support systems, and registered first-hand the devastating linguistic and transport gaps in the NJ medical system.'
  },
  {
    year: '2024',
    title: 'Advisory Panel Member',
    subtitle: 'NJ Health Equity State Workgroup',
    description: 'Contributed directly to policy briefs proposing statewide stable funding networks for Community Health Worker certifications and mobile fresh-produce markets.'
  },
  {
    year: '2026',
    title: 'Portal Launch: Ojacklyn',
    subtitle: 'Empowering Communities Directly',
    description: 'Consolidated personal consulting, research essays, and community resources into this transparent, public-benefit portal—freeing access to crucial public health care pathways.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Who is this site for?',
    answer: 'This site is designed specifically for New Jersey residents—especially those who are uninsured, underinsured, undocumented, bilingual, or experiencing housing or food insecurity. It simplifies finding local, quality healthcare. It is also a platform for community healthcare workers, policy advocates, and nursing professionals seeking essays on health equity.'
  },
  {
    question: 'How are the public resources verified?',
    answer: 'Every organization listed inside public-services.html is individually audited by Ojacklyn. We crosscheck physical address codes, active hotlines, active website domains, language capabilities, and actual sliding scale options. Our database is verified quarterly to prune outdated contacts.'
  },
  {
    question: 'How can I submit a resource or correction?',
    answer: 'If you are a community worker or represent an FQHC/pantry, you can submit details via the dynamic "Submit a Resource" portal inside our Public Services page. Once uploaded, it sits in state waiting for validation. For corrections to existing details, please send an inquiry using our About page contact form.'
  },
  {
    question: 'Does this site sell or share my data?',
    answer: 'Absolutely not. Ojacklyn is an independent, non-commercial, public-benefit service. There is no account sign-up required, no user tracking pixels, and zero profiling. Your searches, location queries, and form entries are strictly local to your browser session.'
  },
  {
    question: 'How can I collaborate with Ojacklyn?',
    answer: 'I would love to connect! I write policy memos, support local grant proposals, and speak at community resource panels. Please use the contact details on the About section or email ojacklyn2@gmail.com with your thoughts.'
  }
];
