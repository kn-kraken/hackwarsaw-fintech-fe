import Nav from "@/components/nav";
import { MapProvider } from "@/contexts/map.context";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/contexts/query.context";
import Providers from "./providers";
import { ResultsProvider } from "@/contexts/results.context";
import { RangeProvider } from "@/contexts/range.context";

const inter = Inter({ subsets: ["latin"] });

const nano = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Right Road",
  description: "Find the right road for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("flex h-full w-full flex-col", nano.className)}>
        <Providers>
          <MapProvider>
            <QueryProvider>
              <ResultsProvider>
                <RangeProvider>
                  <Nav />
                  {children}
                </RangeProvider>
              </ResultsProvider>
            </QueryProvider>
          </MapProvider>
        </Providers>
      </body>
    </html>
  );
}
