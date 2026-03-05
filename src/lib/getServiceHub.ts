import { sanityClient } from "./sanity";

export type ServiceHubPage = {
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  body: unknown[];
};

export async function getServiceHub(slug: string): Promise<ServiceHubPage | null> {
  return sanityClient.fetch(
    `
    *[_type == "serviceHub" && slug.current == $slug][0]{
      title,
      seoTitle,
      seoDescription,
      body
    }
  `,
    { slug }
  );
}
