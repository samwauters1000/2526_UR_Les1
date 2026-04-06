"use client"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-background text-center py-4 text-sm text-foreground/40 mt-auto">
      <div className="mb-2">
        &copy; {currentYear} Sam Wauters. All rights reserved.
      </div>
      <div className="flex justify-center space-x-4">
        <Link href="/terms-of-agreement" className="underline hover:text-primary">
          Terms of Agreement
        </Link>
        <Link href="/copyright-regulations" className="underline hover:text-primary">
          Copyright Regulations
        </Link>
        <Link href="/cookie-settings" className="underline hover:text-primary">
          Cookie Settings
        </Link>
      </div>
    </footer>
  )
}