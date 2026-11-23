import { ExternalLink, MessageSquareQuote, Star } from 'lucide-react';
import { Link } from 'react-router';
import { businessConfig } from '../config/businessConfig';
import { RevealOnScroll } from './RevealOnScroll';

export function TestimonialsSection({ preview = false }: { preview?: boolean }) {
  const { reviewsUrl, verifiedRating, verifiedReviewCount, verifiedRatingCheckedOn } = businessConfig.googleProfile;
  const reviews = businessConfig.testimonials.filter((review) => !review.isPlaceholder);

  const visibleReviews = preview ? reviews.slice(0, 2) : reviews;

  return (
    <section id="reviews" className="border-y border-slate-200/70 bg-[#F5F8FC] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className="section-heading">What Parents Say</h2>
              {reviews.length === 0 && (
                <p className="mt-3 text-slate-600">Verified testimonials will appear here when available.</p>
              )}
              {verifiedRating !== null && (
                <p className="mt-3 flex items-center gap-2 font-semibold text-[#102A43]">
                  <Star className="size-5 fill-[#F4B942] text-[#956000]" aria-hidden="true" />
                  {verifiedRating.toFixed(1)} / 5 on Google
                  {verifiedReviewCount !== null && ` · ${verifiedReviewCount} reviews`}
                </p>
              )}
              {!preview && verifiedRating !== null && verifiedRatingCheckedOn && (
                <p className="mt-1 text-sm text-slate-600">
                  Checked on <time dateTime={verifiedRatingCheckedOn}>{new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(verifiedRatingCheckedOn))}</time>
                </p>
              )}
            </div>
            {preview && <Link to="/reviews" className="section-link">Read Parent Reviews</Link>}
            {!preview && reviewsUrl && (
              <div className="flex flex-wrap gap-3">
                <a
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white btn-3d-primary"
                >
                  Read Google reviews
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
                <a href={businessConfig.location.directionsUrl} target="_blank" rel="noopener noreferrer" className="section-link">
                  Google Business Profile
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {visibleReviews.map((review) => (
                <article key={review.id} className="card-3d rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1" role="img" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }, (_, index) => (
                        <Star key={index} className="size-4 fill-[#F4B942] text-[#956000]" aria-hidden="true" />
                      ))}
                    </span>
                    <MessageSquareQuote className="size-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <blockquote className="mt-4 leading-relaxed text-slate-600">&ldquo;{review.comment}&rdquo;</blockquote>
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <p className="font-semibold text-[#102A43]">{review.parentLabel}</p>
                    <p className="text-sm text-slate-600">{review.studentContext} · {review.sourceLabel}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
