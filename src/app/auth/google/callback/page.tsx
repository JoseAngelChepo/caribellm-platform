"use client"

import { Suspense, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/lib/toast"
import AuthGuard from "@/components/auth/AuthGuard"
import AuthShell from "@/components/auth/AuthShell"
import Loader from "@/components/ui/Loader"
import { useServices } from "@/data/providers/ServicesProvider"

function GoogleCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    services: { loginGoogle },
  } = useServices()
  const processedRef = useRef(false)

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (processedRef.current) return
      processedRef.current = true

      const token = searchParams.get("token")
      const refresh = searchParams.get("refresh")
      const role = searchParams.get("role")
      if (!token || !refresh) {
        toast.error("No se recibieron tokens de Google")
        router.push("/sign-in")
        return
      }

      await loginGoogle({
        access_token: token,
        refresh_token: refresh,
        role,
      })

      const redirect = searchParams.get("redirect")
      const stateParam = searchParams.get("state")
      let finalRedirect = "/dashboard"
      if (stateParam) {
        try {
          const decodedState = JSON.parse(atob(stateParam)) as { redirect?: string }
          if (decodedState.redirect) finalRedirect = decodedState.redirect
        } catch {
          // Keep default redirect when state cannot be parsed.
        }
      } else if (redirect) {
        finalRedirect = redirect
      }
      router.push(finalRedirect)
    }

    void handleGoogleCallback()
  }, [searchParams, router, loginGoogle])

  return (
    <div className="auth-form auth-form--centered">
      <p className="auth-eyebrow">caribellm@archipielago:~$ oauth</p>
      <p className="auth-lede">Iniciando sesión con Google…</p>
      <Loader compact theme="launch" />
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <AuthGuard>
      <AuthShell>
        <Suspense fallback={<Loader compact theme="launch" />}>
          <GoogleCallbackContent />
        </Suspense>
      </AuthShell>
    </AuthGuard>
  )
}
