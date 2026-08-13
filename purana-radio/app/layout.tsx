import type { Metadata, Viewport } from "next";
import { Yeseva_One, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const yeseva = Yeseva_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yeseva",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "पुराना रेडियो — Purana Radio",
  description:
    "A nostalgia radio streaming old Hindi film music from a bazaar frozen at golden hour.",
};

export const viewport: Viewport = {
  themeColor: "#150f0a",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className={`${yeseva.variable} ${inter.variable}`}>
      <body className="font-ui antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
