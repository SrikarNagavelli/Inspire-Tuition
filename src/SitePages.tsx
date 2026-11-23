import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router';
import { ClassesSection } from './components/ClassesSection';
import { EnquiryCta } from './components/EnquiryCta';
import { FaqSection } from './components/FaqSection';
import { HeroSection } from './components/HeroSection';
import { PageBanner } from './components/PageBanner';
import { ResultsSection } from './components/ResultsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { StudyMaterialsSection } from './components/StudyMaterialsSection';
import { TeacherSection } from './components/TeacherSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { notFoundPage } from './config/pages';
import type { DemoPrefill, EnquiryApiResponse } from './types/enquiry';

const ContactSection = lazy(() => import('./components/ContactSection').then(({ ContactSection }) => ({ default: ContactSection })));
const GallerySection = lazy(() => import('./components/GallerySection').then(({ GallerySection }) => ({ default: GallerySection })));
const sectionLoading = <p role="status" className="mx-auto max-w-7xl px-5 py-10 text-slate-600 sm:px-8">Loading section…</p>;

interface SitePagesProps {
  onOpenDemo: (prefill?: DemoPrefill) => void;
  onContactSetupNotice: (channel: string) => void;
  onSubmittedSuccess: (response: EnquiryApiResponse) => void;
  quotaExceeded: boolean;
}

const legacySections: Record<string, string> = {
  '#about': '/about',
  '#why-us': '/about#why-us',
  '#classes': '/classes',
  '#schedule': '/classes#schedule',
  '#study-materials': '/study-materials',
  '#results': '/results',
  '#reviews': '/reviews',
  '#gallery': '/gallery',
  '#faq': '/about#faq',
  '#contact': '/contact',
  '#contact-map': '/contact#contact-map',
};

function HomePage({ onContactSetupNotice }: Pick<SitePagesProps, 'onContactSetupNotice'>) {
  const { hash, search } = useLocation();

  if (legacySections[hash]) {
    const [pathname, anchor] = legacySections[hash].split('#');
    return <Navigate to={{ pathname, search, hash: anchor ? `#${anchor}` : '' }} replace />;
  }

  return (
    <>
      <HeroSection onContactSetupNotice={onContactSetupNotice} />
      <TeacherSection preview />
      <ClassesSection preview />
      <WhyChooseSection preview />
      <StudyMaterialsSection preview />
      <ResultsSection preview />
      <TestimonialsSection preview />
      <EnquiryCta onContactSetupNotice={onContactSetupNotice} showContactDetails />
    </>
  );
}

export function SitePages({ onOpenDemo, onContactSetupNotice, onSubmittedSuccess, quotaExceeded }: SitePagesProps) {
  return (
    <Routes>
      <Route path="/" element={<HomePage onContactSetupNotice={onContactSetupNotice} />} />
      <Route path="/about" element={(
        <>
          <PageBanner path="/about">Get to know Inspire’s teaching approach and the support students receive in East Marredpally.</PageBanner>
          <TeacherSection />
          <WhyChooseSection />
          <FaqSection />
          <EnquiryCta />
        </>
      )} />
      <Route path="/classes" element={(
        <>
          <PageBanner path="/classes">Find class and subject options, then check batch timings and fees with the teacher.</PageBanner>
          <ClassesSection onEnquireOffering={onOpenDemo} />
          <WhyChooseSection />
          <ScheduleSection onAskAboutFees={onOpenDemo} />
          <EnquiryCta />
        </>
      )} />
      <Route path="/study-materials" element={(
        <>
          <PageBanner path="/study-materials">Find notes, practice questions, and revision PDFs by class or subject.</PageBanner>
          <StudyMaterialsSection />
        </>
      )} />
      <Route path="/results" element={(
        <>
          <PageBanner path="/results">See how before-and-after marks can show progress over time and which topics a student worked on.</PageBanner>
          <ResultsSection />
          <EnquiryCta />
        </>
      )} />
      <Route path="/reviews" element={(
        <>
          <PageBanner path="/reviews">Read feedback from families and find Inspire on Google.</PageBanner>
          <TestimonialsSection />
          <EnquiryCta />
        </>
      )} />
      <Route path="/gallery" element={(
        <>
          <PageBanner path="/gallery">See the classroom, guided study sessions, and practice activities at Inspire.</PageBanner>
          <Suspense fallback={sectionLoading}><GallerySection /></Suspense>
        </>
      )} />
      <Route path="/contact" element={(
        <>
          <PageBanner path="/contact">Enquire about a free demo or find directions to the tuition centre in East Marredpally, Secunderabad.</PageBanner>
          <Suspense fallback={sectionLoading}>
            <ContactSection
              quotaExceeded={quotaExceeded}
              onSubmittedSuccess={onSubmittedSuccess}
              onContactSetupNotice={onContactSetupNotice}
            />
          </Suspense>
          <FaqSection questionIds={['faq-1', 'faq-5', 'faq-7', 'faq-9']} title="Visiting and Booking FAQs" />
        </>
      )} />
      <Route path="*" element={(
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h1 className="section-heading">{notFoundPage.heading}</h1>
          <Link to="/" className="section-link mt-5">Return to the homepage</Link>
        </section>
      )} />
    </Routes>
  );
}
