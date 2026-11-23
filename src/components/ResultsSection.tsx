import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';
import { RevealOnScroll } from './RevealOnScroll';
import { TiltCard3D } from './TiltCard3D';

export function ResultsSection({ preview = false }: { preview?: boolean }) {
  const verifiedResults = businessConfig.resultsSamples.filter((sample) => !sample.isDemoSample);
  const results = verifiedResults.length > 0 ? verifiedResults : businessConfig.resultsSamples;
  const visibleResults = preview ? results.slice(0, 3) : results;
  const showingExamples = results.length > 0 && verifiedResults.length === 0;

  return (
    <section
      id="results"
      className="py-10 sm:py-14 bg-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealOnScroll>
          <h2 className="section-heading">{preview ? 'Student Results' : 'Progress by Subject'}</h2>
          {showingExamples && (
            <p className="mt-3 text-slate-600">Fictional scores illustrate how student progress can be tracked.</p>
          )}
          {results.length === 0 && (
            <p className="mt-3 text-slate-600">Verified student results will be shared when available.</p>
          )}
        </RevealOnScroll>

        {results.length > 0 && (
          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleResults.map((sample) => (
              <TiltCard3D key={sample.id} className="h-full" maxTiltDeg={3}>
                <article className="h-full bg-white rounded-2xl border border-slate-200/90 card-3d p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-x-3 gap-y-2 flex-wrap">
                      <div>
                        <h3 className="font-display font-semibold text-base text-[#102A43]">
                          {sample.studentLabel}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {sample.classLevel}{!sample.isDemoSample && ` · ${sample.subject}`}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 font-mono-nums shrink-0">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        {sample.improvementLabel}
                      </div>
                    </div>

                    {/* Before / After Score Row with Subtle Inset Depth */}
                    <div className="mt-5 grid grid-cols-2 gap-3 p-4 rounded-xl bg-gradient-to-br from-[#F5F8FC] to-[#EDF3FB] border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(16,42,67,0.04)]">
                      <div>
                        <p className="text-xs text-slate-500">Previous Marks</p>
                        <p className="mt-1 font-mono-nums text-xl font-semibold text-slate-700">
                          {sample.previousScore}
                          <span className="text-xs font-normal text-slate-400">
                            /{sample.maxScore}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Improved Marks</p>
                        <p className="mt-1 font-mono-nums text-xl font-bold text-[#102A43] inline-flex items-center gap-1">
                          {sample.improvedScore}
                          <span className="text-xs font-normal text-slate-400">
                            /{sample.maxScore}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                        </p>
                      </div>
                    </div>

                    {!preview && (
                      <>
                        <meter
                          className="result-meter mt-4 block h-2 w-full"
                          min={0}
                          max={sample.maxScore}
                          value={sample.improvedScore}
                          aria-label={`${sample.subject} follow-up score`}
                        />
                        <p className="mt-4 text-sm leading-relaxed text-slate-600">{sample.story}</p>
                      </>
                    )}
                  </div>

                  <p className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                    {sample.isDemoSample ? 'Sample data' : 'Parent-approved result'}
                  </p>
                </article>
              </TiltCard3D>
            ))}
          </div>
        )}
        {preview && <Link to="/results" className="section-link mt-6">View All Results</Link>}
      </div>
    </section>
  );
}
