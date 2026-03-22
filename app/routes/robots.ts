import type { Route } from "./+types/robots";

export async function loader({ request }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const robots = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", origin).toString()}
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
