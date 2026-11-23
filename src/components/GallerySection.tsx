import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { galleryPhotos } from '../config/gallery';

const categories = ['All photos', ...new Set(galleryPhotos.map((photo) => photo.category))];
const lightboxButton = 'grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export function GallerySection() {
  const [category, setCategory] = useState('All photos');
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const photos = category === 'All photos' ? galleryPhotos : galleryPhotos.filter((photo) => photo.category === category);
  const activePhoto = selected === null ? null : photos[selected];

  function movePhoto(offset: number) {
    setSelected((index) => index === null ? index : (index + offset + photos.length) % photos.length);
  }

  return (
    <section className="bg-[#F5F8FC] py-10 sm:py-14" aria-label="Gallery photographs">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div role="group" aria-label="Filter gallery photos" className="mb-6 flex flex-wrap gap-2">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={`min-h-11 cursor-pointer rounded-xl border px-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${category === name ? 'border-[#102A43] bg-[#102A43] text-white' : 'border-slate-200 bg-white text-[#204D92] hover:bg-blue-50'}`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Enlarge ${photo.title} photo`}
              onClick={() => {
                setSelected(index);
                dialog.current?.showModal();
              }}
              className="feature-card card-3d group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2563EB]"
            >
              <span className="relative block overflow-hidden bg-slate-100">
                <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform motion-safe:group-hover:scale-105" />
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg bg-white/95 text-[#102A43]" aria-hidden="true">
                  <Maximize2 className="size-4" />
                </span>
              </span>
              <span className="flex flex-wrap items-center justify-between gap-2 p-4">
                <span className="font-display text-lg font-semibold text-[#102A43]">{photo.title}</span>
                {photo.isSample && <span className="text-sm text-slate-600">Sample photo</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Gallery photo viewer"
        onClose={(event) => {
          if (!event.currentTarget.open) setSelected(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (photos.length < 2) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
        className="gallery-lightbox fixed inset-0 m-auto max-h-[94dvh] w-[min(96vw,72rem)] max-w-none overflow-y-auto rounded-2xl border border-white/25 bg-[#0B2136] p-3 text-white shadow-2xl backdrop:bg-[#071524]/90 sm:p-5"
      >
        <div className="flex items-center justify-between gap-3 pb-3">
          <div aria-live="polite">
            <p className="font-semibold">{activePhoto?.title}</p>
            <p className="text-sm text-slate-300">{activePhoto?.isSample && 'Sample photo · '}{selected === null ? '' : `${selected + 1} of ${photos.length}`}</p>
          </div>
          <button type="button" aria-label="Close photo viewer" onClick={() => dialog.current?.close()} className={lightboxButton}>
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {activePhoto && <img src={activePhoto.src} alt={activePhoto.alt} className="h-[min(64dvh,44rem)] w-full rounded-lg bg-[#08192B] object-contain" />}
        <div className="mt-3 flex items-center justify-between gap-2">
          {activePhoto && (
            <a href={activePhoto.source} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 underline underline-offset-4">
              {activePhoto.isSample ? `Photo by ${activePhoto.credit}` : 'View on Google Maps'}
            </a>
          )}
          {photos.length > 1 && (
            <div className="flex gap-2">
              <button type="button" aria-label="Previous photo" onClick={() => movePhoto(-1)} className={lightboxButton}><ChevronLeft className="size-5" aria-hidden="true" /></button>
              <button type="button" aria-label="Next photo" onClick={() => movePhoto(1)} className={lightboxButton}><ChevronRight className="size-5" aria-hidden="true" /></button>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
