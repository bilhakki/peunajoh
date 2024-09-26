import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

import { Inter as FontSans } from "next/font/google";
import Head from "next/head";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Peunajoh",
  description: "",
  generator: "Peunajoh",
  manifest: "/manifest.json",
  keywords: ["peunajoh"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "STIKES Medika Seuramoe Barat",
      url: "https://stikesmsb.ac.id/index.html",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/ios/128.png" },
    { rel: "icon", url: "icons/ios/128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=0.1" /> */}
        <meta name="viewport" content="width=368, initial-scale=0.1" />
      </Head>
      <body className={fontSans.className}>{children}</body>
    </html>
  );
}
