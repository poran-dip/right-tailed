'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useAuthGuard = () => {
  const router = useRouter()

  useEffect(() => {
    const studentId = localStorage.getItem('studentId')

    if (!studentId) {
      router.replace('/')
    }
  }, [])
}
