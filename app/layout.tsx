import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rent Management",
  icons:'/record-rec.svg',
  description: "this is rent management web app which you can use to record your tenant rent info with google spreadsheet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-[700px] mx-auto mt-4 sm:mt-8 mb-4 sm:mb-8 px-4">
          <Link href='/' className="text-5xl font-bold text-white uppercase  sm:text-center">
            Rent Managment
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
