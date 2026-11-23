import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  Download,
  Eye,
  FileText,
  RotateCcw,
  Search,
} from 'lucide-react';
import {
  resolveMaterialUrl,
  studyMaterialsConfig,
  type StudyMaterialItem,
  type StudySubject,
} from '../config/studyMaterialsConfig';
import { PdfPreviewModal } from './PdfPreviewModal';
import { RevealOnScroll } from './RevealOnScroll';

const subjectColors: Partial<Record<StudySubject, string>> = {
  Mathematics: 'bg-blue-100 text-blue-800',
  Science: 'bg-teal-100 text-teal-800',
  Physics: 'bg-violet-100 text-violet-800',
  English: 'bg-amber-100 text-amber-900',
};

const featuredMaterials = studyMaterialsConfig.materials.slice(0, 3);
const recentlyAddedMaterials = [...studyMaterialsConfig.materials]
  .filter((item) => !featuredMaterials.includes(item))
  .sort((a, b) => Date.parse(b.uploadDate) - Date.parse(a.uploadDate))
  .slice(0, 2);

function materialTitle(item: StudyMaterialItem) {
  const prefix = `${item.classLabel} ${item.subject} – `;
  return item.title.startsWith(prefix) ? item.title.slice(prefix.length) : item.title;
}

export function StudyMaterialsSection({ preview = false }: { preview?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [previewMaterial, setPreviewMaterial] =
    useState<StudyMaterialItem | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredMaterials = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return studyMaterialsConfig.materials.filter((item) => {
      if (selectedClass !== 'all' && item.classCategory !== selectedClass) {
        return false;
      }
      if (selectedSubject !== 'all' && item.subject !== selectedSubject) {
        return false;
      }
      if (selectedType !== 'all' && item.materialType !== selectedType) {
        return false;
      }
      if (query) {
        const searchable = [
          item.title,
          item.subject,
          item.chapter,
          item.topic,
          item.classLabel,
          item.materialType,
          item.description,
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedClass, selectedSubject, selectedType]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedClass !== 'all' ||
    selectedSubject !== 'all' ||
    selectedType !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedClass('all');
    setSelectedSubject('all');
    setSelectedType('all');
  };

  const handleDownload = async (material: StudyMaterialItem) => {
    setDownloadError(null);
    setDownloadingId(material.id);
    const fileUrl = resolveMaterialUrl(material);

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Study file not found (${response.status})`);
      }
      const blob = await response.blob();
      if (!blob.size) {
        throw new Error('The requested PDF file is empty.');
      }

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${material.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      setDownloadError(
        `Could not download "${material.title}". Please try again.`
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const closePreview = () => setPreviewMaterial(null);

  if (preview) {
    return (
      <section id="study-materials" className="border-y border-slate-200/70 bg-[#F5F8FC] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <RevealOnScroll>
            <p className="section-kicker">Study Materials</p>
            <h2 className="section-heading">{studyMaterialsConfig.heading}</h2>
            <p className="mt-3 text-slate-600">{studyMaterialsConfig.subtitle}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {featuredMaterials.map((item) => (
                <article key={item.id} className="feature-card card-3d flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-800">
                      <FileText className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-[#204d92]">{item.classLabel} · {item.subject}</span>
                  </div>
                  <h3 className="mt-3 grow text-lg font-semibold text-[#102A43]">{materialTitle(item)}</h3>
                  {item.filePath && (
                    <button
                      type="button"
                      onClick={() => setPreviewMaterial(item)}
                      aria-label={`Preview ${item.title}`}
                      className="section-link mt-4 cursor-pointer self-start"
                    >
                      <Eye className="size-4" aria-hidden="true" />
                      Preview PDF
                    </button>
                  )}
                </article>
              ))}
            </div>
            <Link to="/study-materials" className="btn-3d-primary mt-6 inline-flex min-h-12 items-center rounded-xl px-5 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]">
              Explore Study Materials
            </Link>
          </RevealOnScroll>
          {downloadError && <p role="alert" className="mt-4 text-sm text-red-800">{downloadError}</p>}
        </div>
        <PdfPreviewModal material={previewMaterial} onClose={closePreview} onDownload={handleDownload} />
      </section>
    );
  }

  const filters = [
    { id: 'study-class-filter', label: 'Class', allLabel: 'All classes', options: studyMaterialsConfig.classCategories, value: selectedClass, setValue: setSelectedClass },
    { id: 'study-subject-filter', label: 'Subject', allLabel: 'All subjects', options: studyMaterialsConfig.subjects, value: selectedSubject, setValue: setSelectedSubject },
    { id: 'study-type-filter', label: 'Material type', allLabel: 'All types', options: studyMaterialsConfig.materialTypes, value: selectedType, setValue: setSelectedType },
  ];

  return (
    <section
      id="study-materials"
      aria-labelledby="study-materials-title"
      className="border-y border-slate-200/70 bg-gradient-to-br from-[#F2F7FF] via-[#F7FAFE] to-[#F2F6FC] py-13 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-4 border-b border-slate-200 bg-[#EDF4FF] px-5 py-5 sm:px-8 sm:py-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center lg:gap-8">
              <h2 id="study-materials-title" className="flex items-center gap-3 text-xl font-bold text-[#102A43]">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#102A43] text-[#FFDA86]">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
                Find a Resource
              </h2>
              <div className="min-w-0">
                <label htmlFor="study-search" className="mb-2 block text-sm font-semibold text-[#102A43]">
                  Search by topic, subject, or chapter
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#285DB2]" aria-hidden="true" />
                  <input
                    id="study-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="e.g. Algebra or Motion"
                    className="min-h-13 w-full rounded-xl border border-white bg-white py-3 pl-12 pr-4 text-base text-[#102A43] placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 items-end gap-3 p-5 sm:grid-cols-3 sm:px-8 lg:gap-4">
              {filters.map(({ id, label, allLabel, options, value, setValue }) => (
                <div key={id} className="min-w-0 last:col-span-2 sm:last:col-span-1">
                  <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#102A43]">{label}</label>
                  <div className="relative">
                    <select
                      id={id}
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      className="min-h-11 w-full appearance-none rounded-lg border border-slate-300 bg-[#F7FAFE] py-2.5 pl-3 pr-8 text-sm font-medium text-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                    >
                      <option value="all">{allLabel}</option>
                      {options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {!hasActiveFilters && (
          <RevealOnScroll className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Featured materials', items: featuredMaterials },
              { title: 'Recently added', items: recentlyAddedMaterials },
            ].filter(({ items }) => items.length > 0).map(({ title, items }) => (
              <section key={title} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#102A43]">{title}</h3>
                <ul className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 py-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#102A43]">{materialTitle(item)}</p>
                        <p className="mt-0.5 text-sm text-slate-600">{item.classLabel} · {item.subject}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewMaterial(item)}
                        aria-label={`Preview ${item.title}`}
                        className="section-link shrink-0 cursor-pointer"
                      >
                        Preview
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </RevealOnScroll>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-lg font-semibold text-[#102A43]">Resources</h3>
            <p role="status" aria-label="Matching resources" className="text-sm text-slate-600">
              {filteredMaterials.length} of {studyMaterialsConfig.materials.length}
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[#204d92] hover:bg-[#edf4ff] focus-visible:outline-2 focus-visible:outline-[#2563EB] disabled:cursor-default disabled:text-slate-500 disabled:hover:bg-transparent sm:px-3"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset filters
          </button>
        </div>

        {downloadError && (
          <div role="alert" className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{downloadError}</span>
          </div>
        )}

        {filteredMaterials.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center">
            <Search className="mx-auto mb-3 size-8 text-[#285DB2]" aria-hidden="true" />
            <h4 className="text-lg font-semibold text-[#102A43]">No matching resources</h4>
            <p className="mt-2 text-sm text-slate-600">Try a different search or clear your filters.</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-3d-primary mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset all filters
            </button>
          </div>
        ) : (
          <div id="study-library-results" className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMaterials.map((item) => {
              const cardTitle = materialTitle(item);
              const isDownloading = downloadingId === item.id;

              return (
                <article key={item.id} className="feature-card card-3d flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${subjectColors[item.subject] ?? 'bg-slate-100 text-slate-700'}`}>
                      <FileText className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#204d92]">{item.classLabel} · {item.subject}</p>
                      <p className="text-sm text-slate-600">{item.materialType}</p>
                    </div>
                  </div>

                  <h4 className="mt-4 text-lg font-semibold leading-snug text-[#102A43]">{cardTitle}</h4>
                  <p className="mt-2 grow text-sm leading-relaxed text-slate-600">{item.topic}</p>

                  <p className="mb-3 mt-4 border-t border-slate-100 pt-3 text-sm text-slate-600">
                    PDF · {item.fileSize}{item.isSampleResource && ' · Sample'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewMaterial(item)}
                      aria-label={`Preview ${item.title}`}
                      className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-[#edf4ff] px-2 text-sm font-bold text-[#204d92] transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                    >
                      <Eye className="size-4 shrink-0" aria-hidden="true" />
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(item)}
                      disabled={isDownloading}
                      aria-label={`Download ${item.title}`}
                      className="btn-3d-primary inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] disabled:opacity-60"
                    >
                      <Download className="size-4 shrink-0" aria-hidden="true" />
                      {isDownloading ? 'Saving…' : 'Download'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <PdfPreviewModal
        material={previewMaterial}
        onClose={closePreview}
        onDownload={handleDownload}
      />
    </section>
  );
}
