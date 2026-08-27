import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InviteDialog from "@/components/InviteDialog";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tapitout Maroc — Tapis sur mesure, du relevé à la pose",
    template: "%s",
  },
  description:
    "Tapis sur mesure au Maroc. Relevé sur place, essayage chez vous, façonnage au millimètre, finitions maîtrisées en interne, livraison et pose.",
  keywords: [
    "tapis sur mesure",
    "tapis Casablanca",
    "tapis Maroc",
    "moquette sur mesure",
    "tapis salon marocain",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "Tapitout Maroc",
    title: "Tapitout Maroc — Tapis sur mesure, du relevé à la pose",
    description:
      "On ne vend pas des tapis · On installe une ambiance. Relevé sur place, façonnage au millimètre, pose partout au Maroc.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Intérieur habillé par un tapis Tapitout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapitout Maroc — Tapis sur mesure",
    description:
      "Relevé sur place, façonnage au millimètre, pose partout au Maroc.",
    images: ["/images/hero.jpg"],
  },
  alternates: { canonical: "/" },
};

/* Fiche établissement pour Google : c'est ce qui permet d'apparaître dans
   le bloc Maps sur une recherche « tapis sur mesure Casablanca ». */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: "Tapitout Maroc",
  image: `${site.url}/images/hero.jpg`,
  url: site.url,
  telephone: site.phoneIntl,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "408, 410 Bd Oued Edaoura",
    addressLocality: site.city,
    postalCode: site.postalCode,
    addressCountry: site.country,
  },
  priceRange: "$$",
  areaServed: "MA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Premier element atteint par la touche Tab : permet de sauter la
            navigation, qui est longue, pour aller droit au contenu. */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
        >
          Aller au contenu
        </a>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <PageTransition />
        <Cursor />
        <SmoothScroll />
        <InviteDialog />
      </body>
    </html>
  );
}
