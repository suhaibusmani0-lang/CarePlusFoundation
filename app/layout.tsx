import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Care Plus Foundation Trust | Together, We Create Change",
  description: "Care Plus Foundation Trust is a registered NGO in New Delhi dedicated to empowering communities through education, health, and collective action. Donate to make a difference.",
  keywords: ["NGO in Delhi", "Care Plus Foundation", "Donate", "Education NGO", "Delhi Trust", "Non-profit Organization", "Child Education", "80G Exemption"],
  authors: [{ name: "Care Plus Foundation" }],
  openGraph: {
    title: "Care Plus Foundation Trust | Together, We Create Change",
    description: "Empowering communities through education, health, and collective action. Join us in making a difference.",
    url: "https://careplusfoundation.in",
    siteName: "Care Plus Foundation",
    images: [
      {
        url: "/careplus-logo-final.png",
        width: 800,
        height: 600,
        alt: "Care Plus Foundation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Plus Foundation Trust | Together, We Create Change",
    description: "Empowering communities through education, health, and collective action.",
    images: ["/careplus-logo-final.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.5355;77.2591", 
    "ICBM": "28.5355, 77.2591",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/careplus-logo-final.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        <main className="flex-grow w-full overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
