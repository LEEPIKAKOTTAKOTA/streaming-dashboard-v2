import './globals.css'
import type { ReactNode } from 'react'
import Link from 'next/link'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-red-500">
              Flowflix
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6 text-sm text-gray-300">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/movie/1054867" className="hover:text-white">Trending</Link>
              <Link href="/movie/1117857" className="hover:text-white">Upcoming</Link>
              <Link href="/search" className="hover:text-white">Search</Link>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
