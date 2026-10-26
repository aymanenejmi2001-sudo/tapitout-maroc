import type { Metadata, Viewport } from "next";
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
import JsonLd from "@/components/JsonLd";
import { donneesEntreprise, PARTAGE_DEFAUT } from "@/lib/seo";
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
    images: [PARTAGE_DEFAUT],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapitout Maroc — Tapis sur mesure",
    description:
      "Relevé sur place, façonnage au millimètre, pose partout au Maroc.",
    images: [PARTAGE_DEFAUT.url],
  },
  /* Pas de canonique ici : héritée, elle ferait de chaque page une copie de
     l'accueil. Chaque page déclare la sienne (voir lib/seo.ts). */
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* La feuille de police vit sur un autre domaine : sans ces deux
            préconnexions, le navigateur attend d'avoir lu la page pour
            seulement commencer à le joindre, et le texte s'affiche plus
            tard. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={donneesEntreprise()} />
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
