"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { toast } from "@/lib/toast"
import Button from "@/components/ui/Button"
import GoogleAuthButton from "@/components/auth/GoogleAuthButton"
import { useServices } from "@/data/providers/ServicesProvider"
import { useMessages } from "@/i18n/client"
import { NEXT_PUBLIC_API_URL } from "@/config/env"
import {
  isUsernameFormatValid,
  normalizeUsername,
  USERNAME_MAX,
  USERNAME_MIN,
} from "@/lib/username"
import type { UsernameAvailabilityResponse } from "@/data/api/server"

type FormValues = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect")
  const {
    services: { signUp, checkUsernameAvailability },
  } = useServices()
  const messages = useMessages()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormValues>({ defaultValues: { username: "" } })

  const password = watch("password")
  const usernameRaw = watch("username") ?? ""
  const usernameNorm = normalizeUsername(usernameRaw)

  const [availability, setAvailability] = useState<UsernameAvailabilityResponse | null>(null)
  const [availabilityChecking, setAvailabilityChecking] = useState(false)

  useEffect(() => {
    if (usernameNorm.length < USERNAME_MIN || !isUsernameFormatValid(usernameNorm)) {
      setAvailability(null)
      setAvailabilityChecking(false)
      return
    }

    let cancelled = false
    const timer = window.setTimeout(() => {
      if (cancelled) return
      setAvailabilityChecking(true)
      void checkUsernameAvailability(usernameNorm)
        .then((res) => {
          if (!cancelled) setAvailability(res)
        })
        .catch(() => {
          if (!cancelled) setAvailability(null)
        })
        .finally(() => {
          if (!cancelled) setAvailabilityChecking(false)
        })
    }, 420)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      setAvailabilityChecking(false)
    }
  }, [usernameNorm, checkUsernameAvailability])

  const onSubmit = async (data: FormValues) => {
    const username = normalizeUsername(data.username)
    if (!isUsernameFormatValid(username)) {
      setError("username", {
        type: "manual",
        message: `Usa ${USERNAME_MIN}–${USERNAME_MAX} caracteres: a–z minúsculas, dígitos y guion bajo`,
      })
      return
    }

    setIsLoading(true)
    try {
      const check = await checkUsernameAvailability(username)
      if (!check.valid) {
        setError("username", {
          type: "manual",
          message: check.reason || "Nombre de usuario inválido",
        })
        setIsLoading(false)
        return
      }
      if (!check.available) {
        setError("username", {
          type: "manual",
          message: check.reason || "Ese nombre de usuario ya está en uso",
        })
        setIsLoading(false)
        return
      }

      const response = await signUp({
        username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      if (response) {
        toast.success("Cuenta creada")
        router.push(redirectPath || "/dashboard")
      }
    } catch {
      setError("root", {
        type: "manual",
        message: "No se pudo crear tu cuenta. Intenta de nuevo.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signInPath = redirectPath
    ? `/sign-in?redirect=${encodeURIComponent(redirectPath)}`
    : "/sign-in"

  const onGoogleSignUp = () => {
    const state = btoa(JSON.stringify({ redirect: redirectPath || "/dashboard" }))
    window.location.assign(
      `${NEXT_PUBLIC_API_URL}/auth/google?state=${encodeURIComponent(state)}`,
    )
  }

  return (
    <div className="auth-form">
      <p className="auth-eyebrow">caribellm@archipielago:~$ sign-up</p>
      <h1 className="auth-title">{messages.auth.signUp.title}</h1>
      <p className="auth-lede">{messages.auth.signUp.lede}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-fields">
          <div className="auth-row">
            <div>
              <input
                {...register("firstName", { required: "Obligatorio" })}
                className="auth-input"
                placeholder="Nombre"
                autoComplete="given-name"
              />
              {errors.firstName && <p className="auth-error">{errors.firstName.message}</p>}
            </div>
            <div>
              <input
                {...register("lastName", { required: "Obligatorio" })}
                className="auth-input"
                placeholder="Apellido"
                autoComplete="family-name"
              />
              {errors.lastName && <p className="auth-error">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <input
              {...register("username", {
                required: "El usuario es obligatorio",
                validate: (value) => {
                  const u = normalizeUsername(value)
                  if (u.length < USERNAME_MIN) {
                    return `Mínimo ${USERNAME_MIN} caracteres`
                  }
                  if (u.length > USERNAME_MAX) {
                    return `Máximo ${USERNAME_MAX} caracteres`
                  }
                  if (!isUsernameFormatValid(u)) {
                    return "Solo a–z minúsculas, dígitos y guion bajo (a–z, 0–9, _)"
                  }
                  return true
                },
                onChange: () => clearErrors("username"),
              })}
              className="auth-input"
              placeholder="usuario"
              autoComplete="username"
              spellCheck={false}
            />
            {errors.username && <p className="auth-error">{errors.username.message}</p>}
            {!errors.username && usernameNorm.length > 0 && usernameNorm.length < USERNAME_MIN && (
              <p className="auth-hint auth-hint--muted">
                {USERNAME_MIN}–{USERNAME_MAX} · a–z 0–9 _
              </p>
            )}
            {!errors.username &&
              usernameNorm.length >= USERNAME_MIN &&
              !isUsernameFormatValid(usernameNorm) && (
                <p className="auth-hint auth-hint--warn">
                  Caracteres inválidos — usa a–z, dígitos y guion bajo
                </p>
              )}
            {!errors.username && isUsernameFormatValid(usernameNorm) && availabilityChecking && (
              <p className="auth-hint auth-hint--muted">Comprobando disponibilidad…</p>
            )}
            {!errors.username &&
              isUsernameFormatValid(usernameNorm) &&
              !availabilityChecking &&
              availability &&
              normalizeUsername(availability.username) === usernameNorm &&
              availability.valid &&
              availability.available && (
                <p className="auth-hint auth-hint--ok">Usuario disponible</p>
              )}
            {!errors.username &&
              isUsernameFormatValid(usernameNorm) &&
              !availabilityChecking &&
              availability &&
              normalizeUsername(availability.username) === usernameNorm &&
              (!availability.valid || !availability.available) && (
                <p className="auth-hint auth-hint--warn">
                  {availability.reason ||
                    (!availability.available ? "Usuario en uso" : "Usuario inválido")}
                </p>
              )}
          </div>
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
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
                className="auth-input"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                autoComplete="new-password"
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
          <div>
            <div className="auth-password-wrap">
              <input
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (value) => value === password || "Las contraseñas no coinciden",
                })}
                className="auth-input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="auth-error">{errors.confirmPassword.message}</p>
            )}
          </div>
          {errors.root && <div className="auth-root-error">{errors.root.message}</div>}
          <Button
            type="submit"
            variant="launch"
            loading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            Crear cuenta
          </Button>
        </div>
      </form>
      <div className="auth-divider" role="separator">
        <span>o</span>
      </div>
      <GoogleAuthButton variant="launch" text="Registrarse con Google" onClick={onGoogleSignUp} />
      <button type="button" className="auth-footer" onClick={() => router.push(signInPath)}>
        ¿Ya tienes cuenta? Iniciar sesión
      </button>
    </div>
  )
}
