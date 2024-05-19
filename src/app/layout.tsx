import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import Alerts from "@/components/ui/alerts";
import { Bebas_Neue, Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Bordeable - Next",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-theme="light">
      <body className={clsx(roboto.className, bebas.variable)}>
        {children}
        <Alerts />
      </body>
    </html>
  );
}
