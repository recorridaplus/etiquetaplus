import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etiqueta+ | Tu intérprete de alimentos",
  description: "Entiende lo que comes con claridad. Escanea etiquetas y obtén una traducción sencilla de ingredientes y valores nutricionales.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  manifest: "/manifest.json",
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
