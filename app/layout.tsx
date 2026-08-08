import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
  subsets: [
    "latin",
    "cyrillic",
  ],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "STORE — MODS",
  description: "Моды, сборки и уникальные дополнения",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">

      <body
        className={`
          ${inter.variable}
          antialiased
        `}
      >
        {children}
      </body>

    </html>
  );
}