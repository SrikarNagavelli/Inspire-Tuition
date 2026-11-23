import { ClipboardCheck, Lightbulb, MessageSquareText, UserCheck } from 'lucide-react';
import { Link } from 'react-router';
import { RevealOnScroll } from './RevealOnScroll';

const benefits = [
  { title: 'Personal Attention', description: 'Focused guidance for every learner.', Icon: UserCheck },
  { title: 'Strong Fundamentals', description: 'Build confidence through clear concepts.', Icon: Lightbulb },
  { title: 'Regular Practice', description: 'Learn, practice, and improve.', Icon: ClipboardCheck },
  { title: 'Supportive Environment', description: 'A comfortable place to ask and learn.', Icon: MessageSquareText },
];

export function WhyChooseSection({ preview = false }: { preview?: boolean }) {
  return (
    <section id="why-us" className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll>
          <h2 className="section-heading">Why Parents Choose Inspire</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ title, description, Icon }) => (
              <article key={title} className="feature-card card-3d rounded-2xl border border-slate-200 bg-white p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-[#fff4db] text-[#75511a]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#102A43]">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
          {preview && <Link to="/about#why-us" className="section-link mt-6">Learn More About Us</Link>}
        </RevealOnScroll>
      </div>
    </section>
  );
}
