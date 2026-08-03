import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukaservice.pl"),
  title: "Mechanik Warszawa Włochy | Warsztat Luka Service",
  description: "Warsztat samochodowy na warszawskich Włochach. Diagnostyka, hamulce, zawieszenie, rozrząd i naprawy silnika. Zadzwoń: 690 266 302.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "Luka Service | Mechanik na warszawskich Włochach",
    description: "Diagnostyka, serwis i naprawy samochodów przy ul. Pianistów 10B. Zakres prac i koszt ustalamy przed naprawą.",
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Luka Service",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Luka Service, warsztat samochodowy na warszawskich Włochach" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luka Service | Warszawa Włochy",
    description: "Diagnostyka, serwis i naprawy samochodów przy ul. Pianistów 10B.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b23",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
