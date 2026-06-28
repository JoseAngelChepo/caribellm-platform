"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/Loader"
import { useServices } from "@/data/providers/ServicesProvider"
import { isAdminRole } from "@/lib/roles"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { role, stateService, isLoggedIn } = useServices()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!stateService) return

    if (!isLoggedIn) {
      router.replace("/sign-in?redirect=/admin")
      return
    }

    if (!isAdminRole(role)) {
      router.replace("/dashboard")
      return
    }

    setChecking(false)
  }, [stateService, isLoggedIn, role, router])

  if (checking) {
    return <Loader theme="launch" />
  }

  return <>{children}</>
}
