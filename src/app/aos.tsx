'use client'

import { useEffect } from 'react'
import AOS from 'aos'

import 'aos/dist/aos.css'

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 0,
      duration: 500,
    })
  }, [])

  return null
}
