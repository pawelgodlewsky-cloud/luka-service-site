import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukaservice.pl"),
  title: "Mechanik samochodowy Warszawa-Włochy | Luka Service",
  description: "Mechanik samochodowy Warszawa-Włochy. Diagnostyka, naprawa silnika, hamulców i zawieszenia. Wycena przed naprawą. Zadzwoń: 690 266 302.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "Luka Service - najpierw diagnoza, potem uczciwa naprawa",
    description: "Warsztat samochodowy Warszawa-Włochy: diagnostyka, naprawa silnika, hamulców i zawieszenia. Jasna wycena przed naprawą.",
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Luka Service",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Luka Service - najpierw diagnoza, potem uczciwa naprawa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luka Service - Warszawa-Włochy",
    description: "Najpierw diagnoza i jasna wycena. Potem uczciwa naprawa.",
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
