import { useState } from 'react';
import { Link } from 'react-router';
import {
  Award,
  BookOpen,
  Calculator,
  FlaskConical,
  GraduationCap,
  Languages,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { businessConfig, type OfferingItem } from '../config/businessConfig';
import type { DemoPrefill } from '../types/enquiry';
import { RevealOnScroll } from './RevealOnScroll';

interface ClassesSectionProps {
  onEnquireOffering?: (prefill: DemoPrefill) => void;
  preview?: boolean;
}

const filters = [
  { id: 'all', label: 'All options' },
  { id: 'level', label: 'Class levels' },
  { id: 'subject', label: 'Subjects' },
] as const;

const offeringIcons = {
  'book-open': BookOpen,
  'graduation-cap': GraduationCap,
  award: Award,
  calculator: Calculator,
  flask: FlaskConical,
  languages: Languages,
  layers: Layers,
} satisfies Record<OfferingItem['iconName'], typeof BookOpen>;

const subjectIconColors: Partial<Record<OfferingItem['iconName'], string>> = {
  calculator: 'bg-blue-100 text-blue-800',
  flask: 'bg-teal-100 text-teal-800',
  languages: 'bg-violet-100 text-violet-800',
  layers: 'bg-amber-100 text-amber-900',
};

const classLevels = businessConfig.offerings.filter((item) => item.category === 'level');
const subjects = businessConfig.offerings.filter((item) => item.category === 'subject');

function OfferingCard({ item, onEnquireOffering, preview }: ClassesSectionProps & { item: OfferingItem }) {
  const Icon = offeringIcons[item.iconName];
  const isClassLevel = item.category === 'level';
  const Title = preview ? 'h3' : 'h4';

  return (
    <article id={preview ? undefined : item.id} className={`feature-card card-3d flex h-full flex-col rounded-2xl border p-5 xl:p-6 ${
      isClassLevel
        ? 'class-level-card border-[#254561] text-white'
        : 'border-slate-200 bg-white text-[#102A43]'
    }`}>
      <div className="flex items-center gap-3">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${
          isClassLevel ? 'bg-white/10 text-[#FFDA86]' : subjectIconColors[item.iconName] ?? 'bg-blue-100 text-blue-800'
        }`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          {item.subtitle && (
            <p className={`text-sm font-semibold ${isClassLevel ? 'text-[#FFDA86]' : 'text-slate-600'}`}>
              {item.subtitle}
            </p>
          )}
          <Title className="text-lg font-semibold leading-snug">{item.title}</Title>
        </div>
      </div>
      <p className={`mt-3 grow text-sm leading-relaxed sm:text-base ${isClassLevel ? 'text-slate-200' : 'text-slate-600'}`}>
        {item.description}
      </p>
      {preview ? (
        <Link
          to={`/classes#${item.id}`}
          aria-label={`View details for ${item.title}`}
          className="mt-4 inline-flex min-h-11 items-center self-start rounded-lg border border-white/30 bg-white/10 px-3.5 text-sm font-bold text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA86]"
        >
          View Details
        </Link>
      ) : (
        <button
          type="button"
          onClick={() =>
            onEnquireOffering?.({
              studentClass: item.defaultClassOption,
              subject: item.defaultSubjectOption,
              sourceLabel: `Classes Card: ${item.title}`,
            })
          }
          aria-label={`Enquire about ${item.title}`}
          className={`mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 self-start rounded-lg border px-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
            isClassLevel
              ? 'border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-[#FFDA86]'
              : 'border-blue-100 bg-[#edf4ff] text-[#204d92] hover:bg-blue-100 focus-visible:outline-[#2563EB]'
          }`}
        >
          <MessageSquare className="size-4" aria-hidden="true" />
          Enquire
        </button>
      )}
    </article>
  );
}

export function ClassesSection({ onEnquireOffering, preview = false }: ClassesSectionProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');

  if (preview) {
    return (
      <section id="classes" className="border-y border-slate-200/70 bg-[#F5F8FC] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <RevealOnScroll>
            <h2 className="section-heading">Tuition for Every School Stage</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {classLevels.slice(0, 3).map((item) => <OfferingCard key={item.id} item={item} preview />)}
            </div>
            <Link to="/classes" className="section-link mt-6">Explore All Classes</Link>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section
      id="classes"
      aria-labelledby="classes-title"
      className="border-y border-slate-200/70 bg-gradient-to-br from-[#F2F7FF] via-[#F7FAFE] to-[#F2F6FC] py-13 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker">Classes &amp; Subjects</p>
              <h2 id="classes-title" className="section-heading">Learning Support for Every Stage</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                Find tuition by class level or choose a subject your child wants to strengthen.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter classes and subjects"
              className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit md:shrink-0"
            >
              {filters.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  aria-controls="class-options"
                  onClick={() => setFilter(id)}
                  className={`min-h-11 cursor-pointer rounded-lg px-2 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:px-3.5 ${
                    filter === id
                      ? 'bg-[#102A43] text-white'
                      : 'text-slate-600 hover:bg-[#edf4ff] hover:text-[#102A43]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div id="class-options" className="mt-8 space-y-8">
          {filter !== 'subject' && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-[#102A43]">Class levels</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {classLevels.map((item) => (
                  <OfferingCard key={item.id} item={item} onEnquireOffering={onEnquireOffering} />
                ))}
              </div>
            </div>
          )}

          {filter !== 'level' && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-[#102A43]">Subjects</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {subjects.map((item) => (
                  <OfferingCard key={item.id} item={item} onEnquireOffering={onEnquireOffering} />
                ))}
              </div>
            </div>
          )}
        </div>

        <RevealOnScroll delay={0.05}>
          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-[#edf4ff] p-5 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#102A43]">Education Boards</h3>
              <p className="mt-1 text-sm text-slate-600">Ask about availability for your child’s board.</p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-3">
              {businessConfig.boards.map((board) => (
                <li key={board.id} className="rounded-xl border border-blue-100 bg-white px-3.5 py-3">
                  <p className="text-sm font-bold text-[#102A43]">{board.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{board.fullName}</p>
                  {board.confirmed && <p className="mt-1 text-xs font-semibold text-emerald-800">Confirmed</p>}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
