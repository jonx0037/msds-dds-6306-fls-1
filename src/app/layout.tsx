import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unit 1 Presentation',
  description: 'DDS 6306: Unit 1 Analysis Presentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-900 text-white">{children}</body>
    </html>
  )
}
