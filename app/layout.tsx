import type { Metadata } from 'next'
import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: 'Miners Online Authentication',
  description: 'Authentication server for Miners Online',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='flex min-h-svh flex-col antialiased'>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
