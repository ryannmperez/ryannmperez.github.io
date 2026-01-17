import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ryann Perez | Computational Biochemist",
  description: "Computational biochemist specializing in machine learning, protein science, and generative AI. Building impactful AI systems at the intersection of deep learning and biology.",
  openGraph: {
    title: "Ryann Perez | Computational Biochemist",
    description: "Machine learning, protein science, and generative AI at the intersection of deep learning and biology.",
    url: "https://ryannmperez.github.io",
    siteName: "Ryann Perez",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Ryann Perez - Computational Biochemist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryann Perez | Computational Biochemist",
    description: "Machine learning, protein science, and generative AI at the intersection of deep learning and biology.",
    images: ["/og-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased animated-gradient min-h-screen`}
      >
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
