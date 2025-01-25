import { Cabin } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const cabin = Cabin({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-cabin',
});

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
