import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const personName = "Maleesha Dewshan";
const description =
  "Premium developer portfolio for Maleesha Dewshan, a Software Engineering undergraduate focused on AI, backend systems, and modern full-stack development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maleesha Dewshan | Software Engineering Undergraduate",
    template: "%s | Maleesha Dewshan"
  },
  description,
  applicationName: "Maleesha Dewshan Portfolio",
  authors: [{ name: personName }],
  creator: personName,
  publisher: personName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Maleesha Dewshan | Software Engineering Undergraduate",
    description,
    siteName: "Maleesha Dewshan Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 1200,
        alt: "Maleesha Dewshan portfolio preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Maleesha Dewshan | Software Engineering Undergraduate",
    description,
    images: ["/images/profile.jpg"]
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personName,
  jobTitle: ["Software Engineering Undergraduate", "Backend Engineer", "AI Enthusiast", "Full Stack Developer"],
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressCountry: "Sri Lanka"
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Central Lancashire (UCLan) via Universal College Lanka (UCL)"
    }
  ],
  sameAs: [
    "https://github.com/Dewshan905",
    "https://www.linkedin.com/in/maleesha-dewshan-945873370/"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
