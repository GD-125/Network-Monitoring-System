import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Network Monitoring System',
  description: 'The Network Monitoring System (NMS) is a sophisticated web-based application designed to simulate and visualize network traffic in real-time. It provides network administrators and security professionals with an intuitive interface to monitor, analyze, and understand network behavior through various visualization tools and educational components.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
