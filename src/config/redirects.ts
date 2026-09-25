/**
 * Single source of truth for every subdomain alias under
 * `*.manojgowda.qzz.io`.
 *
 * Adding a new alias (e.g. `blog.manojgowda.qzz.io`) is a one-line change:
 *
 *   blog: "https://manojgowda.in/blog",
 *
 * No other file needs to be edited.
 */

/**
 * Canonical personal website. Overridable via `NEXT_PUBLIC_CANONICAL_URL`
 * so the portfolio target can be changed without touching code.
 */
export const CANONICAL_PORTFOLIO =
  process.env.NEXT_PUBLIC_CANONICAL_URL ?? "https://manojgowda.in";

/**
 * Each value is a fully-qualified, absolute URL. Nothing here is built from
 * request input — this is the internal allowlist that the proxy consults, so
 * there is no open-redirect surface.
 */
export const REDIRECTS = {
  github: "https://manojgowda.in/github",
  linkedin: "https://manojgowda.in/linkedin",
  instagram: "https://manojgowda.in/instagram",
  whatsapp: "https://wa.me/9513849323",
  resume: "https://cdn.manojgowda.qzz.io/manojgowda.in.pdf",
  skills: "https://manojgowda.in/skills",
  experience: "https://manojgowda.in/experience",
  projects: "https://manojgowda.in/projects",
  contact: "https://manojgowda.in/contact",
} as const;

export type Alias = keyof typeof REDIRECTS;

/**
 * Aliases whose destination is a social/profile URL rather than a portfolio
 * path. These do not support path preservation — the plain root URL is the
 * only supported route.
 */
export const NO_PATH_PRESERVATION_ALIASES: readonly Alias[] = [
  "linkedin",
  "instagram",
  "whatsapp",
  "resume",
];

/**
 * Aliases whose destination is a portfolio path. These preserve any
 * additional path segments, e.g. `github.manojgowda.qzz.io/foo/bar`
 * → `https://manojgowda.in/github/foo/bar`.
 */
export const PATH_PRESERVATION_ALIASES: readonly Alias[] = [
  "github",
  "skills",
  "experience",
  "projects",
  "contact",
];

export const FALLBACK_URL = CANONICAL_PORTFOLIO;