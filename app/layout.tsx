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
    // Let op: 'public' weglaten, begin direct vanaf de map onder public
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

        <div className="p-20 mx-auto mt-10 flex-1 w-full">
          {children}
        </div>

        <Footer />
        <AppToaster />
      </body>
    </html>
  )
}