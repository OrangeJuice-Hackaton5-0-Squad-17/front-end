import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

// import { Header } from './components/Header'

import { AOSInit } from '@/app/aos'

import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Orange Portfolios',
  description: 'The better way to grow your ideas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <AOSInit />
      <body className={roboto.className}>
        <main className="max-w-7xl mx-auto py-2 px-4">
          {/* <Header /> */}
          {children}
        </main>
      </body>
    </html>
  )
}
