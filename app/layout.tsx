import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="bg-primary h-screen flex-1 p-4 text-white">
          {children}
      </div>
    </body>
    </html>
  );
}
