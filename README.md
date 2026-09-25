# manojgowda.qzz.io Redirect Service

This is a Next.js App Router project that implements a **two-step redirect architecture**.

## Architecture Overview

This project serves ONLY as an alias/link layer. It intercepts incoming requests to subdomains on `manojgowda.qzz.io` and redirects them to the canonical domain (`manojgowda.in`).

```text
┌─────────────────────────┐
│ github.manojgowda.qzz.io│ (This project)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  manojgowda.in/github   │ (Canonical website)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ github.com/manojgowdain │ (External destination)
└─────────────────────────┘
```

This ensures that the `qzz.io` domain is an alias/link layer, the main website is the canonical layer, and the external social platform is the final destination.

## Required Redirect Mappings

| Subdomain | Destination |
| :--- | :--- |
| `github.manojgowda.qzz.io` | `https://manojgowda.in/github` |
| `linkedin.manojgowda.qzz.io` | `https://manojgowda.in/linkedin` |
| `instagram.manojgowda.qzz.io` | `https://manojgowda.in/instagram` |
| `whatsapp.manojgowda.qzz.io` | `https://manojgowda.in/contact` |
| `resume.manojgowda.qzz.io` | `https://manojgowda.in/resume` |
| `skills.manojgowda.qzz.io` | `https://manojgowda.in/skills` |
| `experience.manojgowda.qzz.io` | `https://manojgowda.in/experience` |
| `projects.manojgowda.qzz.io` | `https://manojgowda.in/projects` |
| `contact.manojgowda.qzz.io` | `https://manojgowda.in/contact` |
| `*.manojgowda.qzz.io` (unknown) | `https://manojgowda.in/` |
| `manojgowda.qzz.io` | `https://manojgowda.in/` |
| `www.manojgowda.qzz.io` | `https://manojgowda.in/` |

**Security Note:**
Redirection destinations are hardcoded. This application does not accept dynamic redirect destinations via URL parameters, preventing open redirect vulnerabilities.

## Technical Implementation

- **Next.js Middleware:** Used for parsing hostnames and returning HTTP 308 permanent redirects directly from the edge/server (`src/middleware.ts`). No client-side code is used for the redirection.
- **Centralized Configuration:** The subdomain to destination mapping is stored in `src/config/redirects.ts`.

## DNS Configuration

To deploy this correctly, the following DNS records must be configured to point to this Next.js deployment:

1. A wildcard record for subdomains: `*.manojgowda.qzz.io`
2. The apex domain: `manojgowda.qzz.io`
3. The www subdomain: `www.manojgowda.qzz.io`

Ensure HTTPS/TLS is configured correctly for all these subdomains to avoid security warnings.

## Deployment Instructions

1. Configure DNS as detailed above.
2. Build the project: `npm run build`
3. Start the server: `npm start` (Or deploy via Vercel/Netlify/etc.)

## Testing

After deployment, test every subdomain using `curl`:

```bash
curl -I https://github.manojgowda.qzz.io
curl -I https://linkedin.manojgowda.qzz.io
curl -I https://instagram.manojgowda.qzz.io
curl -I https://whatsapp.manojgowda.qzz.io
curl -I https://resume.manojgowda.qzz.io
curl -I https://skills.manojgowda.qzz.io
curl -I https://experience.manojgowda.qzz.io
curl -I https://projects.manojgowda.qzz.io
curl -I https://contact.manojgowda.qzz.io
curl -I https://unknown.manojgowda.qzz.io
curl -I https://manojgowda.qzz.io
curl -I https://www.manojgowda.qzz.io
```

**Expected Output:**
You should see a `308 Permanent Redirect` with the `Location` header pointing to the correct `https://manojgowda.in/` path.
Example:
```
HTTP/2 308
location: https://manojgowda.in/github
```