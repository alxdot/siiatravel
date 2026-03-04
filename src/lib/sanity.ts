import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION;

// Fail fast if env is missing (helps avoid silent “undefined” bugs)
if (!projectId) throw new Error("Missing PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing PUBLIC_SANITY_DATASET");
if (!apiVersion) throw new Error("Missing PUBLIC_SANITY_API_VERSION");

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // For public website reads, CDN is good. (Studio edits may take a moment to reflect.)
  useCdn: true,
});

// Optional helper for Sanity images (we'll use it later)
const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: unknown) => builder.image(source);
