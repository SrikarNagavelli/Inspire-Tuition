/**
 * Central Business Configuration for Inspire Educational Institutions
 * -------------------------------------------------------------------
 * Edit this single file to replace prototype placeholders and sample stock
 * photographs with verified client information prior to production launch.
 */

export interface OfferingItem {
  id: string;
  category: 'level' | 'subject';
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  isSampleStockImage: boolean;
  iconName:
    | 'book-open'
    | 'graduation-cap'
    | 'award'
    | 'calculator'
    | 'flask'
    | 'languages'
    | 'layers';
  confirmed: boolean;
  defaultClassOption: string;
  defaultSubjectOption: string;
}

export interface BoardItem {
  id: string;
  name: string;
  fullName: string;
  confirmed: boolean;
}

export interface BenefitItem {
  number: string;
  title: string;
  description: string;
  iconName:
    | 'user-check'
    | 'users'
    | 'lightbulb'
    | 'clipboard-check'
    | 'message-square'
    | 'map-pin';
  confirmed: boolean;
}

export interface StudentResultSample {
  id: string;
  studentLabel: string;
  classLevel: string;
  subject: string;
  previousScore: number;
  improvedScore: number;
  maxScore: number;
  improvementLabel: string;
  story: string;
  isDemoSample: boolean;
}

export interface ReviewItem {
  id: string;
  parentLabel: string;
  initials: string;
  studentContext: string;
  rating: number;
  comment: string;
  sourceLabel: string;
  isPlaceholder: boolean;
}

export interface BatchScheduleRow {
  id: string;
  classGroup: string;
  batchName: string;
  timing: string;
  days: string;
  availability: string;
  isExample: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  statusNote: string;
}

const googleMapsListingUrl =
  'https://www.google.com/maps/place/Inspire+Educational+Institutions+(Tuition+Centre)/@17.4462971,78.5096908,981m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bcb9b20b2008fe9:0x676112cf2bf261ff!8m2!3d17.4462971!4d78.5096908!16s%2Fg%2F11g10gnyvt';

export const businessConfig = {
  brand: {
    name: 'Inspire Educational Institutions',
    shortName: 'Inspire Tuition',
    tagline: 'Home-Based Tuition Center · East Marredpally',
    typeLabel: 'Home Tuition Center',
    logoUrl: '/assets/aistudio/image_ebb13c8c.png',
    logoAlt:
      'Inspire Educational Institutions official logo — Learn to Lead, Since 2013',
  },

  location: {
    addressLine1: 'Opposite HMWS Water Tank',
    area: 'East Marredpally',
    city: 'Secunderabad',
    state: 'Telangana',
    country: 'India',
    fullAddress:
      'Opposite HMWS Water Tank, East Marredpally, Secunderabad, Telangana, India',
    coordinates: { lat: 17.4462971, lng: 78.5096908 },
    directionsUrl: googleMapsListingUrl,
    embedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s7449255939652346367!3m1!1sen!5m1!1sen',
  },

  /**
   * Phone is listed on the centre’s Google Business Profile.
   * Add a WhatsApp number once that channel is confirmed.
   */
  contact: {
    phoneDisplay: '+91 99123 42261',
    phoneE164: '+919912342261',
    whatsappE164: '',
    whatsappPrefillMessage:
      'Hello Inspire Educational Institutions, I am interested in tuition classes for my child. I would like to know more about the classes and free demo session.',
    email: '',
    businessHours: 'To be confirmed with parent enquiry (Morning & Evening Batches)',
    isPhoneConfirmed: true,
    isHoursConfirmed: false,
  },

  /**
   * Record a dated snapshot from the live Google Business Profile.
   */
  googleProfile: {
    reviewsUrl: 'https://www.google.com/maps/place//data=!4m4!3m3!1s0x3bcb9b20b2008fe9:0x676112cf2bf261ff!9m1!1b1',
    verifiedRating: 4.9 as number | null,
    verifiedReviewCount: 123 as number | null,
    verifiedRatingCheckedOn: '2026-11-23',
    fallbackTrustLabel: 'Trusted by Local Parents',
  },

  hero: {
    headline: 'Quality Home Tuition in East Marredpally',
    subheadline:
      'Personal guidance, strong fundamentals, and consistent practice to help your child learn with confidence.',
    imageUrl: '/assets/classroom-homepage.jpg',
    imageAlt: 'Students writing in notebooks in a classroom with bookshelves behind them',
  },

  teacher: {
    name: 'Lead Educator (Profile Pending Client Details)',
    role: 'Founder & Primary Mentor · Inspire Educational Institutions',
    qualifications: 'Academic Qualifications (To Be Updated by Client)',
    experienceYears: 'Teaching Experience (To Be Updated by Client)',
    photoUrl: '/assets/inspire-study-session.jpg',
    photoAlt: 'Students writing in their notebooks during a small-group tuition session at Inspire',
    photoCaption: 'Study session at Inspire Educational Institutions',
    isSampleStockImage: false,
    philosophy:
      'Every student understands concepts at their own pace when given patient explanation, clear fundamentals, and consistent practice without classroom pressure.',
    approachPoints: [
      'Calm, home-style study environment where students feel comfortable asking doubts freely.',
      'Step-by-step focus on core fundamentals before moving to exam-level problem solving.',
      'Regular check-ins with parents so families always stay informed on progress and attendance.',
    ],
    isConfirmed: false,
  },

  offerings: [
    {
      id: 'primary-tuition',
      category: 'level',
      title: 'Primary School Tuition',
      subtitle: 'Classes 1 to 5',
      description:
        'Reading, writing, arithmetic, and homework support.',
      imageUrl:
        'https://images.pexels.com/photos/29210041/pexels-photo-29210041.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of primary school students writing and learning at a wooden desk',
      isSampleStockImage: true,
      iconName: 'book-open',
      confirmed: false,
      defaultClassOption: 'Classes 1 – 5 (Primary)',
      defaultSubjectOption: 'All Subjects',
    },
    {
      id: 'middle-tuition',
      category: 'level',
      title: 'Middle School Tuition',
      subtitle: 'Classes 6 to 8',
      description:
        'Clear concepts and better study habits across core subjects.',
      imageUrl:
        'https://images.pexels.com/photos/8422236/pexels-photo-8422236.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of middle school students studying attentively at classroom desks',
      isSampleStockImage: true,
      iconName: 'graduation-cap',
      confirmed: false,
      defaultClassOption: 'Classes 6 – 8 (Middle)',
      defaultSubjectOption: 'All Subjects',
    },
    {
      id: 'high-tuition',
      category: 'level',
      title: 'High School Tuition',
      subtitle: 'Classes 9 to 10',
      description:
        'Chapter tests, revision, and exam-writing practice.',
      imageUrl:
        'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of an Indian high school student focused on exam preparation at home',
      isSampleStockImage: true,
      iconName: 'award',
      confirmed: false,
      defaultClassOption: 'Classes 9 – 10 (High School)',
      defaultSubjectOption: 'All Subjects',
    },
    {
      id: 'mathematics',
      category: 'subject',
      title: 'Mathematics',
      subtitle: '',
      description:
        'Step-by-step problem solving and formula practice.',
      imageUrl:
        'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of handwritten mathematics equations and problem solutions on paper',
      isSampleStockImage: true,
      iconName: 'calculator',
      confirmed: false,
      defaultClassOption: 'Classes 6 – 8 (Middle)',
      defaultSubjectOption: 'Mathematics',
    },
    {
      id: 'science',
      category: 'subject',
      title: 'Science',
      subtitle: '',
      description:
        'Physics, chemistry, and biology concepts from the school syllabus.',
      imageUrl:
        'https://images.pexels.com/photos/19083260/pexels-photo-19083260.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of a chemistry textbook and science homework notebook on a desk',
      isSampleStockImage: true,
      iconName: 'flask',
      confirmed: false,
      defaultClassOption: 'Classes 9 – 10 (High School)',
      defaultSubjectOption: 'Science',
    },
    {
      id: 'english',
      category: 'subject',
      title: 'English',
      subtitle: '',
      description:
        'Grammar, reading comprehension, and structured writing.',
      imageUrl:
        'https://images.pexels.com/photos/5427862/pexels-photo-5427862.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of students in an interactive English grammar and language class',
      isSampleStockImage: true,
      iconName: 'languages',
      confirmed: false,
      defaultClassOption: 'Classes 1 – 5 (Primary)',
      defaultSubjectOption: 'English',
    },
    {
      id: 'other-subjects',
      category: 'subject',
      title: 'Other Subjects',
      subtitle: 'On request',
      description:
        'Subject and homework support by class and board.',
      imageUrl:
        'https://images.pexels.com/photos/7107435/pexels-photo-7107435.jpeg?auto=compress&cs=tinysrgb&w=900',
      imageAlt:
        'Sample stock photograph of open school textbooks and organized study notes on a desk',
      isSampleStockImage: true,
      iconName: 'layers',
      confirmed: false,
      defaultClassOption: 'Other / Custom',
      defaultSubjectOption: 'Other',
    },
  ] as OfferingItem[],

  boards: [
    {
      id: 'cbse',
      name: 'CBSE',
      fullName: 'Central Board of Secondary Education',
      confirmed: false,
    },
    {
      id: 'icse',
      name: 'ICSE',
      fullName: 'Indian Certificate of Secondary Education',
      confirmed: false,
    },
    {
      id: 'telangana-ssc',
      name: 'Telangana State Board',
      fullName: 'Telangana SSC & State Curriculum',
      confirmed: false,
    },
  ] as BoardItem[],

  whyChoose: [
    {
      number: '01.',
      title: 'Personal Attention',
      description:
        'Focused one-on-one doubt clearing so quieter students are never overlooked in a large crowd.',
      iconName: 'user-check',
      confirmed: false,
    },
    {
      number: '02.',
      title: 'Small Batch Learning',
      description:
        'Limited seats per session to maintain a calm, distraction-free study atmosphere at home.',
      iconName: 'users',
      confirmed: false,
    },
    {
      number: '03.',
      title: 'Concept-Based Teaching',
      description:
        'Prioritizing clear understanding over rote memorization so students can tackle unfamiliar exam questions.',
      iconName: 'lightbulb',
      confirmed: false,
    },
    {
      number: '04.',
      title: 'Regular Practice Tests',
      description:
        'Frequent topic-wise revisions and mock tests to build steady exam temperament and accuracy.',
      iconName: 'clipboard-check',
      confirmed: false,
    },
    {
      number: '05.',
      title: 'Parent Progress Updates',
      description:
        'Direct communication with parents on homework consistency, test marks, and areas needing support.',
      iconName: 'message-square',
      confirmed: false,
    },
    {
      number: '06.',
      title: 'Convenient Local Location',
      description:
        'Located opposite the HMWS Water Tank in East Marredpally for a safe, short neighborhood commute.',
      iconName: 'map-pin',
      confirmed: true,
    },
  ] as BenefitItem[],

  resultsSamples: [
    {
      id: 'sample-1',
      studentLabel: 'Mathematics example',
      classLevel: 'Class 8',
      subject: 'Mathematics',
      previousScore: 58,
      improvedScore: 84,
      maxScore: 100,
      improvementLabel: '+26 marks',
      story:
        'Focus area: problem-solving practice and concept revision.',
      isDemoSample: true,
    },
    {
      id: 'sample-2',
      studentLabel: 'Science example',
      classLevel: 'Class 10',
      subject: 'Science',
      previousScore: 64,
      improvedScore: 89,
      maxScore: 100,
      improvementLabel: '+25 marks',
      story:
        'Focus area: chapter revision and diagram practice.',
      isDemoSample: true,
    },
    {
      id: 'sample-3',
      studentLabel: 'English example',
      classLevel: 'Class 5',
      subject: 'English',
      previousScore: 68,
      improvedScore: 90,
      maxScore: 100,
      improvementLabel: '+22 marks',
      story:
        'Focus area: guided reading and comprehension.',
      isDemoSample: true,
    },
  ] as StudentResultSample[],

  testimonials: [
    {
      id: 'rev-1',
      parentLabel: 'Parent Feedback Slot 01 (Placeholder)',
      initials: 'P1',
      studentContext: 'East Marredpally Parent · Sample Layout',
      rating: 5,
      comment:
        'Placeholder card reserved for verified parent feedback once authentic Google Business Profile reviews are connected.',
      sourceLabel: 'Prototype Preview',
      isPlaceholder: true,
    },
    {
      id: 'rev-2',
      parentLabel: 'Parent Feedback Slot 02 (Placeholder)',
      initials: 'P2',
      studentContext: 'Secunderabad Parent · Sample Layout',
      rating: 5,
      comment:
        'Placeholder card ready to display parent remarks on concept clarity, punctuality, and regular progress updates.',
      sourceLabel: 'Prototype Preview',
      isPlaceholder: true,
    },
    {
      id: 'rev-3',
      parentLabel: 'Parent Feedback Slot 03 (Placeholder)',
      initials: 'P3',
      studentContext: 'Local Resident Parent · Sample Layout',
      rating: 5,
      comment:
        'Placeholder card ready for parent-approved review text and link to the verified Google Business Profile.',
      sourceLabel: 'Prototype Preview',
      isPlaceholder: true,
    },
  ] as ReviewItem[],

  scheduleExamples: [
    {
      id: 'batch-1',
      classGroup: 'Primary School (Classes 1–5)',
      batchName: 'Afternoon Batch A (Example)',
      timing: '4:00 PM – 5:30 PM',
      days: 'Mon – Sat',
      availability: 'Confirm via Enquiry',
      isExample: true,
    },
    {
      id: 'batch-2',
      classGroup: 'Middle School (Classes 6–8)',
      batchName: 'Evening Batch B (Example)',
      timing: '5:30 PM – 7:00 PM',
      days: 'Mon – Sat',
      availability: 'Confirm via Enquiry',
      isExample: true,
    },
    {
      id: 'batch-3',
      classGroup: 'High School (Classes 9–10)',
      batchName: 'Evening Batch C (Example)',
      timing: '7:00 PM – 8:30 PM',
      days: 'Mon – Sat',
      availability: 'Confirm via Enquiry',
      isExample: true,
    },
    {
      id: 'batch-4',
      classGroup: 'Morning Revision / Doubt Support',
      batchName: 'Morning Slot (Example)',
      timing: '6:30 AM – 8:00 AM',
      days: 'Mon – Fri',
      availability: 'Confirm via Enquiry',
      isExample: true,
    },
  ] as BatchScheduleRow[],

  faqs: [
    {
      id: 'faq-1',
      question: 'Is a free demo class available?',
      answer:
        'Yes. Select Call Us to ask about a free demo for your child.',
      statusNote: 'Confirmed',
    },
    {
      id: 'faq-2',
      question: 'Which classes are taught?',
      answer:
        'Ask about availability for primary (Classes 1–5), middle (Classes 6–8), or high school (Classes 9–10).',
      statusNote: 'Please contact us to confirm',
    },
    {
      id: 'faq-3',
      question: 'Which subjects are available?',
      answer:
        'Ask about mathematics, science, English, or all-subject support for your child’s class.',
      statusNote: 'Please contact us to confirm',
    },
    {
      id: 'faq-4',
      question: 'What education boards are supported?',
      answer:
        'Ask about CBSE, ICSE, or Telangana State Board support when you enquire.',
      statusNote: 'Please contact us to confirm',
    },
    {
      id: 'faq-5',
      question: 'What are the batch timings?',
      answer:
        'See Batch Timings & Fees for examples, then enquire about availability.',
      statusNote: 'Please contact us to confirm',
    },
    {
      id: 'faq-6',
      question: 'How much are the tuition fees?',
      answer:
        'Tuition fees depend on the student’s class level, subjects chosen, and batch format. Please contact us for fee details after booking a free demo enquiry.',
      statusNote: 'Contact us for fee details',
    },
    {
      id: 'faq-7',
      question: 'Where is the tuition located?',
      answer:
        'Inspire Educational Institutions is a home-based tuition center located Opposite HMWS Water Tank, East Marredpally, Secunderabad, Telangana, India.',
      statusNote: 'Confirmed location',
    },
    {
      id: 'faq-8',
      question: 'Are online classes available?',
      answer:
        'Classes are primarily conducted in person at our East Marredpally home tuition center. Please contact us to confirm if any online or hybrid support is available.',
      statusNote: 'Please contact us to confirm',
    },
    {
      id: 'faq-9',
      question: 'How can parents contact the teacher?',
      answer:
        'Parents can call the centre or send an online enquiry through the Contact page.',
      statusNote: 'Enquiry form active',
    },
  ] as FaqItem[],

  formOptions: {
    studentClasses: [
      'Classes 1 – 5 (Primary)',
      'Classes 6 – 8 (Middle)',
      'Classes 9 – 10 (High School)',
      'Classes 11 – 12 / Intermediate',
      'Other / Custom',
    ],
    subjects: [
      'All Subjects',
      'Mathematics',
      'Science',
      'English',
      'Mathematics & Science',
      'Other',
    ],
    preferredTimes: [
      'Evening Batch (4:00 PM – 6:30 PM)',
      'Late Evening (6:30 PM – 8:30 PM)',
      'Morning Batch (6:30 AM – 8:00 AM)',
      'Weekend / Flexible',
    ],
  },
};
