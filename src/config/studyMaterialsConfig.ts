export type StudyClassCategory =
  | 'Class 1–5'
  | 'Class 6–8'
  | 'Class 9'
  | 'Class 10'
  | 'Class 11'
  | 'Class 12';

export type StudySubject =
  | 'Mathematics'
  | 'Science'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'English'
  | 'Social Studies';

export type StudyMaterialType =
  | 'Chapter-wise Notes'
  | 'Practice Worksheets'
  | 'Important Questions'
  | 'Previous Year Question Papers'
  | 'Sample Papers'
  | 'Revision Notes'
  | 'Formula Sheets';

export interface StudyMaterialItem {
  id: string;
  title: string;
  classLabel: string;
  classCategory: StudyClassCategory;
  subject: StudySubject;
  chapter: string;
  topic: string;
  materialType: StudyMaterialType;
  description: string;
  filePath: string;
  fileSize: string;
  uploadDate: string;
  isSampleResource: boolean;
}

export type StorageProviderMode = 'local' | 'firebase' | 'supabase';

export const studyMaterialsConfig = {
  heading: 'Learn Beyond the Classroom',
  subtitle:
    'Find helpful notes, worksheets, and revision resources in one place.',

  /**
   * Storage configuration prepared for future Firebase Storage or Supabase Storage
   * integration. In prototype mode, files are served from /public/materials/*.pdf.
   */
  storage: {
    provider: 'local' as StorageProviderMode,
    remoteBaseUrl: '', // e.g., 'https://firebasestorage.googleapis.com/v0/b/<bucket>/o/'
  },

  classCategories: [
    'Class 1–5',
    'Class 6–8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12',
  ] as StudyClassCategory[],

  subjects: [
    'Mathematics',
    'Science',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Social Studies',
  ] as StudySubject[],

  materialTypes: [
    'Chapter-wise Notes',
    'Practice Worksheets',
    'Important Questions',
    'Previous Year Question Papers',
    'Sample Papers',
    'Revision Notes',
    'Formula Sheets',
  ] as StudyMaterialType[],

  materials: [
    {
      id: 'mat-10-math-quad',
      title: 'Class 10 Mathematics – Quadratic Equations Notes',
      classLabel: 'Class 10',
      classCategory: 'Class 10',
      subject: 'Mathematics',
      chapter: 'Chapter 4: Quadratic Equations',
      topic: 'Standard form, factorization, quadratic formula & discriminant',
      materialType: 'Chapter-wise Notes',
      description:
        'Concise summary of quadratic equation solving techniques with worked examples and quick board-level practice questions.',
      filePath: '/materials/class-10-maths-quadratic-equations-notes.pdf',
      fileSize: '3.5 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-10-sci-chem',
      title: 'Class 10 Science – Chemical Reactions Worksheet',
      classLabel: 'Class 10',
      classCategory: 'Class 10',
      subject: 'Science',
      chapter: 'Chapter 1: Chemical Reactions & Equations',
      topic: 'Balancing equations, combination, displacement & redox reactions',
      materialType: 'Practice Worksheets',
      description:
        'Structured practice sheet covering equation balancing drills, reaction classification, and short conceptual questions.',
      filePath: '/materials/class-10-science-chemical-reactions-worksheet.pdf',
      fileSize: '3.7 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-9-math-poly',
      title: 'Class 9 Mathematics – Polynomials Practice Questions',
      classLabel: 'Class 9',
      classCategory: 'Class 9',
      subject: 'Mathematics',
      chapter: 'Chapter 2: Polynomials',
      topic: 'Degree, zeroes, factor theorem & algebraic identities',
      materialType: 'Important Questions',
      description:
        'Focused practice set on polynomial factorization, zeroes verification, and essential Class 9 algebraic identities.',
      filePath: '/materials/class-9-maths-polynomials-practice-questions.pdf',
      fileSize: '3.0 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-8-sci-force',
      title: 'Class 8 Science – Force and Pressure Notes',
      classLabel: 'Class 8',
      classCategory: 'Class 6–8',
      subject: 'Science',
      chapter: 'Force and Pressure',
      topic: 'Contact forces, non-contact forces, liquid & atmospheric pressure',
      materialType: 'Chapter-wise Notes',
      description:
        'Easy-to-revise explanation of force interactions, pressure formula applications, and everyday science reasoning questions.',
      filePath: '/materials/class-8-science-force-and-pressure-notes.pdf',
      fileSize: '3.5 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-12-phy-formula',
      title: 'Class 12 Physics – Important Formula Sheet',
      classLabel: 'Class 12',
      classCategory: 'Class 12',
      subject: 'Physics',
      chapter: 'Electrostatics, Current, Magnetism & Optics',
      topic: 'Key equations & constants for quick board and entrance revision',
      materialType: 'Formula Sheets',
      description:
        'Single-glance formula reference covering Coulomb’s law, capacitors, drift velocity, Lorentz force, and lens equations.',
      filePath: '/materials/class-12-physics-important-formula-sheet.pdf',
      fileSize: '2.9 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-10-eng-grammar',
      title: 'Class 10 English – Grammar Practice Worksheet',
      classLabel: 'Class 10',
      classCategory: 'Class 10',
      subject: 'English',
      chapter: 'Applied Grammar & Editing',
      topic: 'Subject-verb concord, tenses, modals & reported speech',
      materialType: 'Practice Worksheets',
      description:
        'Exam-style grammar exercises covering fill-in-the-blanks, direct-to-indirect speech conversion, and sentence error editing.',
      filePath: '/materials/class-10-english-grammar-practice-worksheet.pdf',
      fileSize: '3.3 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-9-sci-motion',
      title: 'Class 9 Science – Motion Chapter Notes',
      classLabel: 'Class 9',
      classCategory: 'Class 9',
      subject: 'Science',
      chapter: 'Chapter 7: Motion',
      topic: 'Distance vs displacement, velocity, acceleration & equations of motion',
      materialType: 'Revision Notes',
      description:
        'Clear concept breakdown of uniform and non-uniform motion along with the three kinematic equations and a solved numerical.',
      filePath: '/materials/class-9-science-motion-chapter-notes.pdf',
      fileSize: '3.3 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
    {
      id: 'mat-8-math-algebra',
      title: 'Class 8 Mathematics – Algebra Practice Questions',
      classLabel: 'Class 8',
      classCategory: 'Class 6–8',
      subject: 'Mathematics',
      chapter: 'Algebraic Expressions & Identities',
      topic: 'Monomials, binomials, polynomial addition & identity simplification',
      materialType: 'Important Questions',
      description:
        'Step-by-step algebra practice problems helping middle school students master expression multiplication and standard identities.',
      filePath: '/materials/class-8-maths-algebra-practice-questions.pdf',
      fileSize: '2.9 KB',
      uploadDate: 'Nov 2026',
      isSampleResource: true,
    },
  ] as StudyMaterialItem[],
};

/**
 * Resolves a study material URL cleanly based on the active storage provider.
 * Supports local /public/materials/*.pdf today and external cloud buckets later.
 */
export function resolveMaterialUrl(material: StudyMaterialItem): string {
  const { provider, remoteBaseUrl } = studyMaterialsConfig.storage;
  if (provider === 'local' || !remoteBaseUrl) {
    return material.filePath;
  }
  const cleanBase = remoteBaseUrl.replace(/\/+$/, '');
  const cleanPath = material.filePath.replace(/^\/+/, '');
  return `${cleanBase}/${cleanPath}`;
}
