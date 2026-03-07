import type { Metadata } from "next";
import { Newsreader, Source_Sans_3, Geist } from "next/font/google";
import TransitionProvider from "@/app/components/transition/TransitionProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const masthead = Newsreader({
  variable: "--font-masthead",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const navSans = Source_Sans_3({
  variable: "--font-nav",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Police Force by the Numbers",
  description: "Research and news-style data narrative site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.cdnfonts.com/css/chomsky"
        />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/chomsky" />
      </head>
      <body
        className={`${masthead.variable} ${navSans.variable} bg-white text-black antialiased`}
      >
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
