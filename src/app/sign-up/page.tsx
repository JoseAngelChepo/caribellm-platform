"use client"

import { Suspense } from "react"
import AuthGuard from "@/components/auth/AuthGuard"
import AuthShell from "@/components/auth/AuthShell"
import SignUpForm from "@/components/auth/SignUpForm"
import Loader from "@/components/ui/Loader"

export default function SignUpPage() {
  return (
    <AuthGuard>
      <AuthShell>
        <Suspense fallback={<Loader compact theme="launch" />}>
          <SignUpForm />
        </Suspense>
      </AuthShell>
    </AuthGuard>
  )
}
