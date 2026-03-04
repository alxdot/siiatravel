import type { APIRoute } from "astro";
import { createClient } from "@sanity/client";

export const prerender = false;

type ReviewPayload = {
  name?: unknown;
  rating?: unknown;
  text?: unknown;
  honeypot?: unknown;
};

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitStore = new Map<string, RateLimitEntry>();

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION;
const token = import.meta.env.SANITY_API_TOKEN;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return ip;
  }
  return "local";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return true;
}

async function parseBody(request: Request): Promise<ReviewPayload> {
  const raw = await request.text();

  // Debug: detect empty body
  if (!raw || raw.trim().length === 0) {
    throw new Error(
      JSON.stringify({
        debug: true,
        reason: "empty_body",
        contentType: request.headers.get("content-type"),
        contentLength: request.headers.get("content-length"),
      })
    );
  }

  // Try JSON
  try {
    return JSON.parse(raw);
  } catch {
    // Try form encoded
    const params = new URLSearchParams(raw);

    if (params.size > 0) {
      return {
        name: params.get("name"),
        rating: params.get("rating"),
        text: params.get("text"),
        honeypot: params.get("honeypot"),
      };
    }

    // Not JSON or form
    throw new Error(
      JSON.stringify({
        debug: true,
        reason: "unparseable_body",
        contentType: request.headers.get("content-type"),
        contentLength: request.headers.get("content-length"),
        bodyPreview: raw.slice(0, 120),
      })
    );
  }
}

export const ALL: APIRoute = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  let body: ReviewPayload;

  try {
    body = await parseBody(request);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    return json({ ok: false, error: "invalid_json", debug: message }, 400);
  }

  const honeypot =
    typeof body.honeypot === "string" ? body.honeypot.trim() : "";

  if (honeypot.length > 0) {
    return json({ ok: true }, 200);
  }

  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const rating =
    typeof body.rating === "number" ? body.rating : Number(body.rating);

  const details: string[] = [];

  if (name.length < 2) details.push("name_min_2");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    details.push("rating_integer_1_5");
  if (text.length < 10) details.push("text_min_10");

  if (details.length > 0) {
    return json({ ok: false, error: "invalid_input", details }, 400);
  }

  if (!projectId || !dataset || !apiVersion || !token) {
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }

  const sanity = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  try {
    await sanity.create({
      _type: "review",
      name,
      rating,
      text,
      date: new Date().toISOString(),
      status: "pending",
    });

    return json({ ok: true }, 201);
  } catch {
    return json({ ok: false, error: "upstream_error" }, 500);
  }
};
