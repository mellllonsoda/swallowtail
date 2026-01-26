import type { Metadata } from "next";
import { Jost, M_PLUS_1_Code } from "next/font/google";
import "./globals.css";

const fontSans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = M_PLUS_1_Code({
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "SWALLOWTAIL | Inventory",
  description: "Minimalist archive system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-white text-black`}>
        {/* ここに各ページのコンテンツ（page.tsxの内容）が注入されます */}
        {children}
      </body>
    </html>
  );
}