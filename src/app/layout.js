import { Inter } from "next/font/google";
import "./globals.css";
import PwaRegistry from "@/components/PwaRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etiqueta+ | Tu intérprete de alimentos",
  description: "Entiende lo que comes con claridad. Escanea etiquetas y obtén una traducción sencilla de ingredientes y valores nutricionales.",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <PwaRegistry />
        {children}
      </body>
    </html>
  );
}
