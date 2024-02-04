import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import '@/services/firebase'

import { AOSInit } from '@/app/aos'

import { AuthContextProvider } from '@/contexts/AuthContext'

// import { Header } from '@/components/Header'

import 'react-toastify/ReactToastify.css'

import './globals.css'

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
          {/* <Header /> */}
          <main className="max-w-7xl mx-auto py-2">{children}</main>
          <ToastContainer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
