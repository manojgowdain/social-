import type { Metadata } from "next";
import "./globals.css";

/**
 * This application is a redirect service. The single page that ever
 * renders an HTTP 200 is the fallback landing page (see `page.tsx`).
 *
 * The canonical source of all portfolio content is
 * `https://manojgowda.in/`. This service exists to provide memorable
 * subdomain aliases that redirect there — it must not be treated as a
 * duplicate of the portfolio.
 */
export const metadata: Metadata = {
  title:
    "Manoj Gowda — Full Stack Developer, DevOps Engineer & IoT Specialist",
  description:
    "Manoj Gowda is a Full Stack Developer, DevOps Engineer and IoT specialist working with React, Node.js, MongoDB, AWS, BLE, IoT and modern web technologies.",
  keywords: [
    "Manoj Gowda",
    "Manoj Gowda developer",
    "Manoj Gowda Bangalore",
    "Full Stack Developer",
    "MERN Developer",
    "React Developer",
    "Node.js Developer",
    "DevOps Engineer",
    "IoT Developer",
    "BLE Developer",
    "AWS Developer",
    "JavaScript Developer",
  ].join(", "),
  authors: [{ name: "Manoj Gowda" }],
  creator: "Manoj Gowda",
  metadataBase: new URL("https://manojgowda.qzz.io"),
  alternates: {
    // The portfolio is the canonical source. This redirect service must not
    // be canonicalized to its own subdomains.
    canonical: "https://manojgowda.in/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title:
      "Manoj Gowda — Full Stack Developer, DevOps Engineer & IoT Specialist",
    description:
      "Explore Manoj Gowda's portfolio, projects, skills, experience and professional links.",
    url: "https://manojgowda.in/",
    siteName: "Manoj Gowda Portfolio",
    images: [
      {
        url: "https://manojgowda.in/manojgowdaimg.jpg",
        width: 1200,
        height: 630,
        alt: "Manoj Gowda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Manoj Gowda — Full Stack Developer, DevOps Engineer & IoT Specialist",
    description:
      "Portfolio, projects, experience, skills and professional links of Manoj Gowda.",
    images: ["https://manojgowda.in/manojgowdaimg.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}