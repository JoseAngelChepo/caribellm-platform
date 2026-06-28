"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import Button from "@/components/ui/Button"
// import GoogleAuthButton from "@/components/auth/GoogleAuthButton"
import { useServices } from "@/data/providers/ServicesProvider"
import { useMessages } from "@/i18n/client"
// import { NEXT_PUBLIC_API_URL } from "@/config/env"

type FormValues = {
  email: string
  password: string
}

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect")
  const {
    services: { login },
  } = useServices()
  const messages = useMessages()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ defaultValues: { email: "", password: "" } })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const response = await login(data)
      if (!response) {
        setError("root", { type: "manual", message: "Correo o contraseña incorrectos" })
        return
      }
      router.push(redirectPath || "/dashboard")
    } catch {
      setError("root", { type: "manual", message: "Algo salió mal. Intenta de nuevo." })
    } finally {
      setIsLoading(false)
    }
  }

  const signUpPath = redirectPath
    ? `/sign-up?redirect=${encodeURIComponent(redirectPath)}`
    : "/sign-up"

  // const onGoogleLogin = () => {
  //   const state = btoa(JSON.stringify({ redirect: redirectPath || "/dashboard" }))
  //   window.location.assign(
  //     `${NEXT_PUBLIC_API_URL}/auth/google?state=${encodeURIComponent(state)}`,
  //   )
  // }

  return (
    <div className="auth-form">
      <p className="auth-eyebrow">caribellm@archipielago:~$ sign-in</p>
      <h1 className="auth-title">{messages.auth.signIn.title}</h1>
      <p className="auth-lede">{messages.auth.signIn.lede}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-fields">
          <div>
            <input
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingresa un correo válido",
                },
              })}
              className="auth-input"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
            />
            {errors.email && <p className="auth-error">{errors.email.message}</p>}
          </div>
          <div>
            <div className="auth-password-wrap">
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                className="auth-input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
            {errors.password && <p className="auth-error">{errors.password.message}</p>}
          </div>
          {errors.root && <div className="auth-root-error">{errors.root.message}</div>}
          <Button
            type="submit"
            variant="launch"
            loading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
      {/* Google OAuth — reactivar cuando esté listo
      <div className="auth-divider" role="separator">
        <span>o</span>
      </div>
      <GoogleAuthButton variant="launch" text="Continuar con Google" onClick={onGoogleLogin} />
      */}
      <button type="button" className="auth-footer" onClick={() => router.push(signUpPath)}>
        ¿No tienes cuenta? Crear cuenta
      </button>
    </div>
  )
}
