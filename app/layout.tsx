'use client'; // We need this to use usePathname and useEffect

import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"
import ClientCursor from "@/components/ClientCursor" 
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"
import "./globals.css"

// Note: In Next.js 13+, if you use 'use client', you cannot export metadata here.
// You should move the metadata export to a separate 'layout.server.tsx' 
// or just keep this as a client layout if SEO isn't your primary concern for the wrapper.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Logic for Reveal on Scroll (Intersection Observer)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]); // Re-run whenever the URL changes

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientCursor />
        <GoogleAnalyticsTracker />
        <GlobalNavbar />

        {/* 
            The 'key={pathname}' is the most important part. 
            It forces React to treat the content as new on every page change,
            re-triggering the CSS 'page-transition-wrapper' animation.
        */}
        <div 
          key={pathname} 
          className="flex-1 w-full pt-28 md:pt-24 page-transition-wrapper"
        >
          {children}
        </div>

        <Footer />
        <AppToaster />
      </body>
    </html>
  )
}