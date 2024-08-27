import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peunajoh",
  description: "",
};

import { Inter as FontSans } from "next/font/google";
import Head from "next/head";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
