import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { REDIRECTS, type Alias, FALLBACK_URL } from "@/config/redirects";
import { devOverrideAlias, parseHostname } from "@/lib/hostname";

/**
 * Base domain this service owns. Defaults to `manojgowda.qzz.io` and is
 * overridden by the `REDIRECT_BASE_DOMAIN` environment variable.
 */
const BASE_DOMAIN = process.env.REDIRECT_BASE_DOMAIN ?? "manojgowda.qzz.io";

/**
 * Resolve the redirect destination for an alias, optionally preserving the
 * request path for portfolio routes.
 *
 * Social links and the resume never preserve the path — their plain root
 * URL is the only supported route. Portfolio routes (github, skills,
 * experience, projects, contact) append any extra path segments, e.g.
 * `github.manojgowda.qzz.io/foo` → `https://manojgowda.in/github/foo`.
 */
function resolveDestination(alias: Alias, pathname: string): string {
  const base = REDIRECTS[alias];

  if (pathname === "/" || pathname === "") {
    return base;
  }

  const segments = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!segments) {
    return base;
  }

  return `${base}/${segments}`;
}

/**
 * Returns true when the hostname belongs to this service's own domain
 * (the bare root, `www`, or any `*.baseDomain` subdomain).
 */
function isOwnDomain(hostname: string): boolean {
  const host = hostname.toLowerCase();
  const base = BASE_DOMAIN.toLowerCase();
  return host === base || host === `www.${base}` || host.endsWith(`.${base}`);
}

function logRedirect(
  hostname: string,
  alias: Alias | null,
  destination: string
): void {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[redirect] ${hostname} → alias=${alias ?? "(fallback)"} → ${destination}`
    );
  }
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const hostname = nextUrl.hostname;

  // Local development has no DNS for *.manojgowda.qzz.io, so a request
  // header can force a specific alias. This only applies on localhost and
  // never in production. The destination still comes from the allowlist.
  const alias =
    devOverrideAlias({ headers: request.headers, hostname }) ??
    parseHostname(hostname, BASE_DOMAIN).alias;

  if (alias) {
    const destination = resolveDestination(alias, nextUrl.pathname);
    logRedirect(hostname, alias, destination);
    return NextResponse.redirect(new URL(destination), { status: 308 });
  }

  // Not a recognized alias. Any host on our own domain (root, www, or an
  // unknown subdomain) falls back to the canonical portfolio. A host that
  // is not one of our domains serves the 200 landing page instead.
  if (isOwnDomain(hostname)) {
    logRedirect(hostname, null, FALLBACK_URL);
    return NextResponse.redirect(new URL(FALLBACK_URL), { status: 308 });
  }

  // No redirect — let the app render the fallback page (HTTP 200).
  return;
}

export const config = {
  matcher: [
    // Run on every request except the app's own assets and API routes, so
    // redirects never block CSS, JS, images, or fonts from loading.
    "/((?!api|_next/static|_next/image|_next/data|.*\\.(png|jpe?g|gif|webp|svg|ico|css|js|woff2?|ttf|otf)$).*)",
  ],
};