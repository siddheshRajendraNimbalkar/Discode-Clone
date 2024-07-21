import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { EdgeStoreProvider } from "../lib/edgestore";

import { Inter } from "next/font/google";

const roboto = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "One Of The Best Social Media Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="discode-theme"
          >
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
