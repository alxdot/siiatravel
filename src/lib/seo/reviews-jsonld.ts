export type AggregateRatingInput = {
  ratingValue: number;
  reviewCount: number;
};

export type ReviewsJsonLdInput = {
  name: string;
  url: string;
  image?: string;
  description?: string;
  aggregate: AggregateRatingInput;
};

export function buildReviewsJsonLd(input: ReviewsJsonLdInput): object | null {
  const reviewCount = Math.trunc(input.aggregate.reviewCount);
  if (reviewCount <= 0) return null;

  const rawRating = input.aggregate.ratingValue;
  if (!Number.isFinite(rawRating)) return null;

  const clampedRating = Math.min(5, Math.max(1, rawRating));
  const roundedRating = clampedRating.toFixed(1);

  // Tour pages can call this with already-approved, visible review totals.
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    ...(input.description ? { description: input.description } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: roundedRating,
      reviewCount: String(reviewCount),
    },
  };
}

export function stringifyJsonLd(jsonld: object): string {
  // Intended for <script type="application/ld+json"> on tours/[slug].astro later.
  return JSON.stringify(jsonld);
}
