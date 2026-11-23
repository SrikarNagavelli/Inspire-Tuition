import { MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';
import { BrandLogo } from './BrandLogo';
import { CallAction } from './CallAction';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Teacher', href: '/about' },
  { label: 'Classes & Subjects', href: '/classes' },
  { label: 'Study Materials', href: '/study-materials' },
  { label: 'Why Choose Inspire', href: '/about#why-us' },
  { label: 'Batch Timings & Fees', href: '/classes#schedule' },
  { label: 'FAQ', href: '/about#faq' },
  { label: 'Contact & Map', href: '/contact' },
  { label: 'Classroom Gallery', href: '/gallery' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#102A43] to-[#0B1E30] text-slate-300 pt-14 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-700/70">
          <div className="md:col-span-5">
            <BrandLogo placement="footer" />

            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-md">
              Home-based tuition center in East Marredpally focused on personal attention, concept clarity, and steady student confidence.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#F4B942] shrink-0 mt-1" aria-hidden="true" />
              <span>{businessConfig.location.fullAddress}</span>
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-display font-semibold text-sm text-white">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-[#F4B942] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col justify-between items-start">
            <div>
              <h3 className="font-display font-semibold text-sm text-white">
                Speak With Inspire
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Call to ask about classes, batch timings, or a free demo.
              </p>
            </div>
            <CallAction className="btn-3d-gold mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA86]" />
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {businessConfig.brand.name}. All rights reserved.
          </p>
          <p>East Marredpally, Secunderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  );
}
