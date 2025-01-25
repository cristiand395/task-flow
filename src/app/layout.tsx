import type { Metadata } from 'next'
import { Cabin } from "next/font/google";
import { cn } from "@/lib/utils";
import { siteConfig } from '../../config/site';

import "./globals.css";

const cabin = Cabin({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-cabin',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`antialiased`, cabin.variable)}
      >
        {children}
      </body>
    </html>
  );
}
