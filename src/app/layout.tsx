import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog de Marketing Digital e Desenvolvimento Web - marketilize",
  description: "Sua fonte confiável para estratégias de marketing digital, desenvolvimento web e crescimento de negócios online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <div className="flex flex-col  justify-center h-screen gap-4">
            <div className="min-h-screen ">
             <Header/>
              <main className="min-h-screen bg-gray-900">
              {children}
              </main>
             <Footer/>
            </div>
          </div>
      </body>
    </html>
  );
}
