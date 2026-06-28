"use client"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardView from "@/components/dashboard/DashboardView"
import DashboardShell from "@/components/layout/DashboardShell"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardView />
      </DashboardShell>
    </AuthGuard>
  )
}
