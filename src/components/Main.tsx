'use client'

import { useWindowSize } from '@/hooks/useWindowsSize'

type MainProps = {
  children: React.ReactNode
}

export function Main({ children }: MainProps) {
  const size = useWindowSize()

  return (
    <main className={`py-14 ${size.width <= 375 ? 'px-3' : 'px-8'}`}>
      <div className="wrapper max-w-7xl mx-auto w-full">{children}</div>
    </main>
  )
}
