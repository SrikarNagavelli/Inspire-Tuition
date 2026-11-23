import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { pages } from '../config/pages';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CallAction } from './CallAction';

export function Navbar() {
  const { key } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMobileMenuOpen(false), [key]);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/88 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-8px_rgba(16,42,67,0.08)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] sm:h-[74px] flex items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <BrandLogo placement="header" onClick={handleMobileNavClick} />

        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-sm font-medium text-slate-600"
        >
          {pages.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className="site-nav-link whitespace-nowrap shrink-0 py-1 text-slate-600 hover:text-[#102A43] border-b-2 border-transparent hover:border-[#F4B942] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0 xl:justify-self-end">
          <CallAction className="btn-3d-primary hidden shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:inline-flex" />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#102A43] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="max-h-[calc(100dvh-74px)] overflow-y-auto border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg xl:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            {pages.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={handleMobileNavClick}
                className="site-nav-link px-3 py-2.5 rounded-lg border-b-2 border-transparent text-sm font-medium text-slate-700 hover:text-[#102A43] hover:bg-[#F5F8FC] transition-colors"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <CallAction
              onClick={handleMobileNavClick}
              className="btn-3d-primary inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            />
          </div>
        </nav>
      )}
    </header>
  );
}
