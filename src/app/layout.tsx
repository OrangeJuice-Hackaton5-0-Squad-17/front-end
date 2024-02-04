import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import '@/services/firebase'

import { AOSInit } from '@/app/aos'

import { AuthContextProvider } from '@/contexts/AuthContext'

import './globals.css'

import { Header } from '@/components/Header'
import { Main } from '@/components/Main'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Orange Portfolio',
  description: 'The best way to grow your ideas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <AOSInit />
      <body className={roboto.className}>
        <AuthContextProvider>
          <Header />
          <Main>{children}</Main>
        </AuthContextProvider>
      </body>
    </html>
  )
}
