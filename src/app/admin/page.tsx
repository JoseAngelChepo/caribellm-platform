"use client"

import { Suspense } from "react"
import AdminView from "@/components/admin/AdminView"
import AdminGuard from "@/components/auth/AdminGuard"
import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/DashboardShell"
import Loader from "@/components/ui/Loader"

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminGuard>
        <DashboardShell>
          <Suspense fallback={<Loader compact theme="launch" />}>
            <AdminView />
          </Suspense>
        </DashboardShell>
      </AdminGuard>
    </AuthGuard>
  )
}
