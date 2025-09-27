"use client"

import loginAction from "./loginAction"
import Form from "next/form"
import { useEffect, useState } from "react"
import { useActionState } from "react"
import { AlertModal } from "@/components/alert"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff,Lock} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"success" | "error" | "info">("success")
  const [modalMessage, setModalMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Função para mostrar o alerta
  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setModalType(type)
    setModalMessage(message)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (state?.success === false) {
      showAlert("error", state?.message as string)
    }
    if (state?.success === true) {
      router.push("/dashboard")
    }
  }, [state, router])

  return (
    <>
      <div className="rounded-2xl bg-background flex items-center justify-center p-4">
        <div className="w-full min-w-[400px]">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{"Bem-vindo de volta"}</h1>
            <p className="text-muted-foreground text-pretty">{"Entre na sua conta para continuar"}</p>
          </div>

          {/* Form Card */}
          <Form action={formAction} className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                />
              </div>

             <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="h-12 bg-input border-border focus:border-primary focus:ring-primary/20 transition-all duration-200 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isPending ? "Entrando..." : "Entrar"}
              </Button>
            </div>

            {/* Footer Links */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                {"Não tem uma conta? "}
                <Link
                  href={"/register"}
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
