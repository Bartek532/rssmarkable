import "@rssmarkable/config/ui/css/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/ui/theme";

import { TOASTER_CONFIG } from "../config";
import { DEFAULT_METADATA, DEFAULT_VIEWPORT } from "../lib/metadata";
import "../styles/globals.css";
import { TRPCReactProvider } from "../trpc/react";

export const metadata = DEFAULT_METADATA;
export const viewport = DEFAULT_VIEWPORT;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster
              position="bottom-right"
              containerStyle={{ padding: "20px" }}
              gutter={13}
              toastOptions={TOASTER_CONFIG}
            />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
