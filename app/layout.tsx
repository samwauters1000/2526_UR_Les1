import { Metadata } from "next"
import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"
import ClientCursor from "@/components/ClientCursor" 
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
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        {/* De ClientCursor wordt hier aangeroepen */}
        <ClientCursor />
        
        <GoogleAnalyticsTracker />
        <GlobalNavbar />

        {/* pt-20 on mobile adds space between nav and content */}
        <main className="flex-1 w-full pt-20 md:pt-28">
          {children}
        </main>

        <Footer />
        <AppToaster />
      </body>
    </html>
  )
}