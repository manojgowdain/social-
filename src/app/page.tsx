import type { Metadata } from "next";

/**
 * The single HTTP-200 page this service ever renders. It is served only for
 * hostnames that are not a recognized redirect alias (e.g. the bare root
 * `manojgowda.qzz.io`, `www.manojgowda.qzz.io`, or an unknown subdomain).
 *
 * Every known alias (github, linkedin, instagram, …) is redirected by
 * `proxy.ts` before this page is ever reached, so this page must not
 * duplicate portfolio content. It is a lightweight entry point whose job is
 * to point people at the canonical portfolio.
 */

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manoj Gowda",
  url: "https://manojgowda.in/",
  jobTitle: "Full Stack Developer / DevOps Engineer / IoT Developer",
  sameAs: [
    "https://github.com/manojgowdain",
    "https://www.linkedin.com/in/manojgowdain",
    "https://www.instagram.com/manojgowda.in",
  ],
  knowsAbout: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "MERN",
    "AWS",
    "DevOps",
    "IoT",
    "BLE",
    "React Native",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
};

export const metadata: Metadata = {
  title:
    "Manoj Gowda — Full Stack Developer, DevOps Engineer & IoT Specialist",
  description:
    "Manoj Gowda is a Full Stack Developer, DevOps Engineer and IoT specialist working with React, Node.js, MongoDB, AWS, BLE, IoT and modern web technologies.",
  openGraph: {
    title:
      "Manoj Gowda — Full Stack Developer, DevOps Engineer & IoT Specialist",
    description:
      "Explore Manoj Gowda's portfolio, projects, skills, experience and professional links.",
    url: "https://manojgowda.in/",
    images: [
      {
        url: "https://manojgowda.in/manojgowdaimg.jpg",
        width: 1200,
        height: 630,
        alt: "Manoj Gowda",
      },
    ],
  },
};

const aliases = [
  { label: "GitHub", href: "https://github.manojgowda.qzz.io" },
  { label: "LinkedIn", href: "https://linkedin.manojgowda.qzz.io" },
  { label: "Instagram", href: "https://instagram.manojgowda.qzz.io" },
  { label: "WhatsApp", href: "https://whatsapp.manojgowda.qzz.io" },
  { label: "Resume", href: "https://resume.manojgowda.qzz.io" },
  { label: "Skills", href: "https://skills.manojgowda.qzz.io" },
  { label: "Experience", href: "https://experience.manojgowda.qzz.io" },
  { label: "Projects", href: "https://projects.manojgowda.qzz.io" },
  { label: "Contact", href: "https://contact.manojgowda.qzz.io" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Manoj Gowda
        </h1>
        <p className="mt-3 max-w-xl text-balance text-muted-foreground">
          Full Stack Developer, DevOps Engineer &amp; IoT Specialist.
        </p>
        <p className="mt-6 max-w-2xl text-balance text-sm text-muted-foreground">
          This domain is a short, memorable entry point for Manoj Gowda&#39;s
          portfolio and professional links. The canonical content lives at{" "}
          <a
            href="https://manojgowda.in/"
            className="underline underline-offset-4"
          >
            manojgowda.in
          </a>
          .
        </p>
        <nav
          aria-label="Professional links"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
        >
          {aliases.map((alias) => (
            <a
              key={alias.href}
              href={alias.href}
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {alias.label}
            </a>
          ))}
        </nav>
      </main>
    </>
  );
}