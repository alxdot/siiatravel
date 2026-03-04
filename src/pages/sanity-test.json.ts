import type { APIRoute } from "astro";
import { sanityClient } from "../lib/sanity";

export const GET: APIRoute = async () => {
  try {
    const count = await sanityClient.fetch<number>("count(*)");

    return new Response(
      JSON.stringify(
        {
          ok: true,
          count,
          projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
          dataset: import.meta.env.PUBLIC_SANITY_DATASET,
        },
        null,
        2
      ),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify(
        {
          ok: false,
          error: err?.message ?? String(err),
        },
        null,
        2
      ),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
