export const pages = [
  {
    path: '/',
    label: 'Home',
    heading: 'Helping Students Learn Better, Every Day.',
    title: 'Home Tuition in East Marredpally | Inspire Educational Institutions',
    description: 'Home tuition in East Marredpally, Secunderabad, with personal guidance, strong fundamentals, and regular practice. Enquire about a free demo at Inspire.',
  },
  {
    path: '/about',
    label: 'About',
    heading: 'Meet Our Teacher',
    title: 'About Our Tuition & Teaching Approach | Inspire East Marredpally',
    description: 'Learn how Inspire in East Marredpally, Secunderabad supports students with clear explanations, regular practice, and personal attention.',
  },
  {
    path: '/classes',
    label: 'Classes',
    heading: 'Tuition Classes & Subjects',
    title: 'Tuition Classes & Subjects in East Marredpally | Inspire',
    description: 'Explore primary, middle, and high school tuition options, subjects, education boards, example batch timings, and fee enquiries at Inspire Secunderabad.',
  },
  {
    path: '/study-materials',
    label: 'Study Materials',
    heading: 'Study Materials & Practice Worksheets',
    title: 'Study Materials & Practice Worksheets | Inspire Tuition',
    description: 'Find Inspire Tuition notes, formula sheets, and practice worksheets. Search by class, subject, and material type, then preview or download PDFs.',
  },
  {
    path: '/results',
    label: 'Results',
    heading: 'Student Results',
    title: 'Student Results & Academic Progress | Inspire Tuition',
    description: 'See how Inspire Tuition in Secunderabad presents student progress by class and subject with before-and-after marks and clearly labeled examples.',
  },
  {
    path: '/reviews',
    label: 'Reviews',
    heading: 'Parent Reviews',
    title: 'Parent Reviews | Inspire Educational Institutions',
    description: 'Find parent feedback for Inspire Educational Institutions in East Marredpally and open the tuition centre’s Google reviews.',
  },
  {
    path: '/gallery',
    label: 'Gallery',
    heading: 'Classroom Gallery',
    title: 'Classroom & Learning Photo Gallery | Inspire Tuition',
    description: 'See classroom photos, guided study sessions, and learning activities at Inspire Tuition in East Marredpally.',
  },
  {
    path: '/contact',
    label: 'Contact',
    heading: 'Contact Inspire',
    title: 'Contact Inspire Educational Institutions | East Marredpally',
    description: 'Find Inspire Educational Institutions opposite the HMWS Water Tank in East Marredpally, Secunderabad, get directions, or request a free demo class.',
  },
] as const;

export type PagePath = (typeof pages)[number]['path'];

export const notFoundPage = {
  path: '/404',
  heading: 'Page not found',
  title: 'Page Not Found | Inspire Tuition',
  description: 'Find tuition classes, study materials, and contact information for Inspire Educational Institutions.',
};

export function findPage(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  return pages.find((page) => page.path === normalized);
}

export function siteUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.origin;
  } catch {
    return undefined;
  }
}
