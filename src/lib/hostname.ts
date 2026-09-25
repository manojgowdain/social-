import type { Alias } from "@/config/redirects";

/**
 * Parse the request hostname into a redirect alias.
 *
 * The redirect service lives behind a wildcard DNS record
 * (`*.manojgowda.qzz.io`), so every request looks like:
 *
 *   <alias>.manojgowda.qzz.io
 *
 * This module strips the base domain and returns the left-most label as the
 * alias. Unknown aliases and the root / `www` hostnames return `null`, which
 * the proxy maps to the portfolio fallback.
 */

export interface HostnameParseResult {
  alias: Alias | null;
  isRoot: boolean;
  isWww: boolean;
  isLocalhost: boolean;
}

/**
 * Resolve the redirect alias from a hostname.
 *
 * @param hostname  Raw `request.hostname` (no port).
 * @param baseDomain  Value of `REDIRECT_BASE_DOMAIN` from the environment.
 */
export function parseHostname(
  hostname: string,
  baseDomain: string
): HostnameParseResult {
  const clean = hostname.toLowerCase().trim();

  const isLocalhost = clean === "localhost" || clean.startsWith("127.0.0.1");
  const isRoot = clean === baseDomain.toLowerCase();
  const isWww = clean === `www.${baseDomain.toLowerCase()}`;

  if (isLocalhost || isRoot || isWww) {
    return { alias: null, isRoot, isWww, isLocalhost };
  }

  const suffix = `.${baseDomain.toLowerCase()}`;
  if (!clean.endsWith(suffix)) {
    // Not one of our domains at all — fall back to the portfolio.
    return { alias: null, isRoot: false, isWww: false, isLocalhost };
  }

  const subdomain = clean.slice(0, -suffix.length);

  // Reject empty subdomains (e.g. a trailing dot) and anything that is not a
  // single label. Multi-label subdomains are not part of the alias scheme.
  if (!subdomain || subdomain.includes(".")) {
    return { alias: null, isRoot: false, isWww: false, isLocalhost };
  }

  return {
    alias: subdomain as Alias,
    isRoot: false,
    isWww: false,
    isLocalhost,
  };
}

/**
 * Development override. When running locally there is no DNS for
 * `*.manojgowda.qzz.io`, so a request header can force a specific alias.
 *
 * This is only honoured when `NODE_ENV !== "production"` and the hostname is
 * localhost. It cannot override production routing and is never used to
 * derive a destination — the destination still comes from the allowlist.
 */
export function devOverrideAlias(request: {
  headers: Headers;
  hostname: string;
}): Alias | null {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const hostname = request.hostname.toLowerCase();
  if (hostname !== "localhost" && !hostname.startsWith("127.0.0.1")) {
    return null;
  }

  const override = request.headers.get("x-manoj-alias");
  if (!override) {
    return null;
  }

  const alias = override.toLowerCase().trim() as Alias;
  return alias;
}