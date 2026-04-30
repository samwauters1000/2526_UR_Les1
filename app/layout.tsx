import { Metadata } from "next"
import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"
import ClientCursor from "@/components/ClientCursor" 

import Script from "next/script"
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"

import "./globals.css"

export const metadata: Metadata = {
  title: "Mijn Portfolio",
  description: "Welkom op mijn website",
  icons: {
    icon: "/images/icon.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientCursor />
        <GoogleAnalyticsTracker />
        <GlobalNavbar />

        {/* pt-28 mobile geeft meer ruimte onder de fixed navbar */}
        <div className="flex-1 w-full pt-28 md:pt-24">
          {children}
        </div>

        <Footer />
        <AppToaster />
      </body>
    </html>
  )
}