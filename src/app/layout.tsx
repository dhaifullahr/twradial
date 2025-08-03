import type { Metadata } from "next";
import "../app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twradial - Tailwind Radial Gradient Generator",
  description: "Create your radial background easier with Twradial.",
  metadataBase: new URL("https://twradial.vercel.app"),
  openGraph: {
    title: "Twradial - Tailwind Radial Gradient Generator",
    description: "Create stunning radial backgrounds for your UI effortlessly.",
    url: "https://twradial.vercel.app",
    siteName: "Twradial",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Twradial preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twradial – Tailwind Radial Gradient Generator",
    description: "Create stunning radial backgrounds for your UI effortlessly.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
