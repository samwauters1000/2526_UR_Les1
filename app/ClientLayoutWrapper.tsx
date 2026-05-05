'use client';

import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"
import ClientCursor from "@/components/ClientCursor" 
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  useEffect(() => {
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
  }, [pathname]);

  return (
    <>
      <ClientCursor />
      <GoogleAnalyticsTracker />
      <GlobalNavbar />
      <div 
        key={pathname} 
        className="flex-1 w-full pt-28 md:pt-24 page-transition-wrapper"
      >
        {children}
      </div>
      <Footer />
      <AppToaster />
    </>
  )
}