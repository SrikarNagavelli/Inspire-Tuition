import { BookOpen, PencilLine, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';
import { RevealOnScroll } from './RevealOnScroll';
import { CallAction } from './CallAction';

interface TeacherSectionProps {
  preview?: boolean;
}

const teachingApproach = [
  { label: 'Clear explanations', description: 'Break down new ideas and work through a few examples together.', Icon: BookOpen },
  { label: 'Consistent practice', description: 'Practise each skill and revisit the steps that need another look.', Icon: PencilLine },
  { label: 'Space for questions', description: 'Make time to ask questions and get help at a comfortable pace.', Icon: MessagesSquare },
];

export function TeacherSection({ preview = false }: TeacherSectionProps) {
  const { teacher } = businessConfig;
  const hasConfiguredPhoto = Boolean(teacher.photoUrl);

  return (
    <section id="about" className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="grid items-center gap-7 md:grid-cols-2 lg:gap-14">
          <figure className="teacher-photo card-3d rounded-3xl border border-slate-200 bg-white p-2">
            <img
              src={hasConfiguredPhoto ? teacher.photoUrl : '/assets/gallery/teaching-session.jpg'}
              alt={hasConfiguredPhoto ? teacher.photoAlt : 'A tutor and student working on an assignment together at a desk'}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-2xl object-cover object-center"
            />
            <figcaption className="px-2 pb-1 pt-2 text-sm text-slate-600">
              {hasConfiguredPhoto && !teacher.isSampleStockImage ? teacher.photoCaption : 'Illustrative tutoring photo'}
            </figcaption>
          </figure>
          <div>
            <p className="section-kicker">About the teacher</p>
            <h2 className="section-heading">A Better Way to Learn.</h2>
            {teacher.isConfirmed && (
              <div className="mt-4 space-y-1 text-slate-600">
                <p className="text-lg font-bold text-[#102A43]">{teacher.name}</p>
                <p>{teacher.role}</p>
                {teacher.qualifications && <p>{teacher.qualifications}</p>}
                {teacher.experienceYears && <p>{teacher.experienceYears}</p>}
              </div>
            )}
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              {preview
                ? 'Every student learns differently. We focus on clear explanations, consistent practice, and supportive guidance.'
                : teacher.philosophy}
            </p>
            {!preview && !teacher.isConfirmed && (
              <p className="mt-3 text-sm text-slate-600">Meet the teacher at a free demo to learn more about their background and experience.</p>
            )}
            <ul className="mt-5 space-y-3">
              {teachingApproach.map(({ label, description, Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#EDF4FF] text-[#285DB2]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-[#102A43]">{label}</p>
                    {!preview && <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>}
                  </div>
                </li>
              ))}
            </ul>
            {preview ? (
              <Link to="/about" className="section-link mt-6">Meet Our Teacher</Link>
            ) : (
              <CallAction className="section-link mt-6" />
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
