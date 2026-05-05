import { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper"; // Zelfde map!

export const metadata: Metadata = {
  title: "Portfolio - Sam Wauters",
  description: "Welkom op mijn portfolio",
  icons: {
    icon: "./images/icon.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}