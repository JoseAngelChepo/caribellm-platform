"use client"

import { Suspense } from "react"
import AuthGuard from "@/components/auth/AuthGuard"
import AuthShell from "@/components/auth/AuthShell"
import SignInForm from "@/components/auth/SignInForm"
import Loader from "@/components/ui/Loader"

export default function SignInPage() {
  return (
    <AuthGuard>
      <AuthShell>
        <Suspense fallback={<Loader compact theme="launch" />}>
          <SignInForm />
        </Suspense>
      </AuthShell>
    </AuthGuard>
  )
}
