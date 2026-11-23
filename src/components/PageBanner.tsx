import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { findPage, type PagePath } from '../config/pages';

interface PageBannerProps {
  path: Exclude<PagePath, '/'>;
  children: ReactNode;
}

export function PageBanner({ path, children }: PageBannerProps) {
  const page = findPage(path)!;

  return (
    <header className="detail-banner">
      <div className="mx-auto max-w-7xl px-5 py-11 sm:px-8 sm:py-15">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-slate-300">
          <Link to="/" className="text-white underline-offset-4 hover:underline">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.label}</span>
        </nav>
        <h1 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.045em] text-white">
          {page.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">{children}</p>
      </div>
    </header>
  );
}
