// src/pages/robots.txt.ts
export const prerender = true;

export function GET() {
  const body = `User-agent: *
Disallow: /
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
