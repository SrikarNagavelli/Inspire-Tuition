import { ClipboardCheck, Lightbulb, MapPin, UserRoundCheck } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { WhatsAppAction } from './EnquiryCta';
import { CallAction } from './CallAction';

interface HeroSectionProps {
  onContactSetupNotice: (channel: string) => void;
}

const trustHighlights = [
  { label: 'Personal Attention', Icon: UserRoundCheck },
  { label: 'Strong Fundamentals', Icon: Lightbulb },
  { label: 'Regular Practice', Icon: ClipboardCheck },
  { label: 'Convenient Location', Icon: MapPin },
];

export function HeroSection({
  onContactSetupNotice,
}: HeroSectionProps) {
  const { hero } = businessConfig;

  return (
    <section id="home" className="home-hero">
      <img
        className="home-hero-background"
        src={hero.imageUrl}
        alt={hero.imageAlt}
        fetchPriority="high"
      />
      <div className="home-hero-inner mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="home-hero-copy">
          <p className="home-hero-location">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {hero.headline}
          </p>
          <h1 className="home-hero-heading">
            Helping Students<br className="hidden sm:block" />{' '}
            Learn Better,<br />{' '}
            <span>Every Day.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-200 sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 max-[380px]:grid">
            <CallAction className="btn-3d-gold inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-5" />
            <WhatsAppAction onContactSetupNotice={onContactSetupNotice} />
          </div>
        </div>

        <ul className="home-trust" aria-label="Tuition highlights">
          {trustHighlights.map(({ label, Icon }) => (
            <li key={label}>
              <span><Icon className="size-5" strokeWidth={1.8} aria-hidden="true" /></span>
              {label}
            </li>
          ))}
        </ul>
        <p className="home-hero-credit">Illustrative classroom photo</p>
      </div>
    </section>
  );
}
