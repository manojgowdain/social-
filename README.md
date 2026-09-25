# socail

A Next.js redirect service that maps short, memorable hostnames to Manoj Gowda's
portfolio and professional links. Each subdomain of the base domain
(`manojgowda.qzz.io`) is an alias that redirects (HTTP 308) to a section of the
canonical site at [`manojgowda.in`](https://manojgowda.in).

## Aliases

| Alias        | Destination                          |
| ------------ | ------------------------------------ |
| `github`     | `manojgowda.in/github`               |
| `linkedin`   | `manojgowda.in/linkedin`             |
| `instagram`  | `manojgowda.in/instagram`            |
| `whatsapp`   | `wa.me/9513849323`                   |
| `resume`     | `cdn.manojgowda.qzz.io/manojgowda.in.pdf` |
| `skills`     | `manojgowda.in/skills`               |
| `experience` | `manojgowda.in/experience`           |
| `projects`   | `manojgowda.in/projects`             |
| `contact`    | `manojgowda.in/contact`              |

Portfolio routes preserve the request path, e.g.
`github.manojgowda.qzz.io/foo` → `https://manojgowda.in/github/foo`. Social
links and the resume redirect to their plain root URL.

Hostnames that are not a recognized alias (the bare root, `www`, or an unknown
subdomain) serve a lightweight landing page pointing people at the canonical
portfolio.

## Repository layout

```
.
├── proxy.ts                 # Next.js middleware that performs the redirects
├── src/
│   ├── app/                 # landing page + layout
│   ├── config/redirects.ts  # alias → destination allowlist
│   └── lib/hostname.ts      # hostname parsing & dev overrides
├── next.config.mjs
└── package.json
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). During local development,
`*.manojgowda.qzz.io` does not resolve, so a request header can force a
specific alias (see [`src/lib/hostname.ts`](src/lib/hostname.ts)) — this only
applies on localhost and never in production, and the destination still comes
from the allowlist.

## Configuration

The base domain and canonical URL are set via environment variables:

```env
NEXT_PUBLIC_CANONICAL_URL=https://manojgowda.in
REDIRECT_BASE_DOMAIN=manojgowda.qzz.io
```

See [`.env.example`](.env.example) for the full set.

## Deploy

```bash
npm run build
npm start
```

The redirect logic lives entirely in the `proxy` middleware, so the service can
run behind any HTTP front end (Vercel, a VPS, or a reverse proxy).