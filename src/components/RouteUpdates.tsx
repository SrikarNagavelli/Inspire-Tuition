import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { findPage, notFoundPage, siteUrl } from '../config/pages';

export function RouteUpdates() {
  const { key, pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef<string | null>(null);
  const positions = useRef(new Map<string, number>());

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useLayoutEffect(() => {
    const focusMain = previousPath.current !== null && previousPath.current !== pathname;
    previousPath.current = pathname;

    const savedPosition = navigationType === 'POP' ? positions.current.get(key) : undefined;
    const scrollToAnchor = () => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      target?.scrollIntoView({ behavior: 'instant' });
      return Boolean(target);
    };
    let observer: MutationObserver | undefined;
    if (savedPosition !== undefined) {
      window.scrollTo({ top: savedPosition, behavior: 'instant' });
    } else if (!scrollToAnchor()) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const main = document.getElementById('main-content');
      if (hash && main) {
        observer = new MutationObserver(() => {
          if (scrollToAnchor()) observer?.disconnect();
        });
        observer.observe(main, { childList: true, subtree: true });
      }
    }
    if (focusMain && !document.querySelector('[role="dialog"][aria-modal="true"]')) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }

    const saveScroll = () => positions.current.set(key, window.scrollY);
    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', saveScroll);
    };
  }, [hash, key, navigationType, pathname]);

  useEffect(() => {
    const page = findPage(pathname);
    const { title, description, path } = page ?? notFoundPage;
    const configuredOrigin = siteUrl(import.meta.env.VITE_SITE_CANONICAL_URL);
    const origin = configuredOrigin ?? window.location.origin;
    const canonical = new URL(path, origin).href;
    document.title = title;

    function setMeta(attribute: 'name' | 'property', key: string, value: string) {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    }

    setMeta('name', 'description', description);
    setMeta('name', 'robots', page ? 'index, follow' : 'noindex, follow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [pathname]);

  return null;
}
