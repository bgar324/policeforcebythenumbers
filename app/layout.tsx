import type { Metadata } from "next";
import PageTransition from "@/app/components/PageTransition";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import SiteFooter from "@/app/components/SiteFooter";
import SiteNavbar from "@/app/components/SiteNavbar";
import "./globals.css";

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
    <html lang="en">
      <body className={`${masthead.variable} ${navSans.variable} bg-white text-black antialiased`}>
        <ViewTransitions>
          <div className="flex min-h-screen flex-col">
            <SiteNavbar />
            <div className="flex-1">
              <PageTransition>{children}</PageTransition>
            </div>
            <SiteFooter />
          </div>
        </ViewTransitions>
      </body>
    </html>
  );
}
