import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { DirectionProvider } from "@/lib/direction-context";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { site } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Flagpole & Signage Manufacturer, Abu Dhabi`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "flagpole manufacturer Abu Dhabi",
    "signage manufacturer UAE",
    "flagpole supplier Dubai",
    "signboard manufacturer Abu Dhabi",
    "ISO 9001 signage company UAE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Flagpole & Signage Manufacturer, Abu Dhabi`,
    description: site.description,
    url: site.url,
    locale: "en_AE",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Flagpole & Signage Manufacturer, Abu Dhabi`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${jakarta.variable} ${plexSans.variable} ${plexSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <DirectionProvider>
          <ScrollProgressBar />
          {children}
        </DirectionProvider>
      </body>
    </html>
  );
}
