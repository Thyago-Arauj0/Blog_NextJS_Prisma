"use client"

import Form from "next/form"
import registerAction from "./registerAction"
import { useEffect, useState } from "react"
import { useActionState } from "react"
import { AlertModal } from "@/components/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock, ArrowRight } from "lucide-react"

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"success" | "error" | "info">("success")
  const [modalMessage, setModalMessage] = useState("")

  // Função para mostrar o alerta
  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setModalType(type)
    setModalMessage(message)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (state?.success === false) {
      showAlert("error", state?.message)
    }
    if (state?.success === true) {
      showAlert("success", state?.message)
    }
  }, [state])

  return (
    <>
      <div className="bg-background rounded-2xl flex items-center justify-center p-4">
        <div className="w-full min-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-2 text-balance">Crie sua conta</h1>
            <p className="text-muted-foreground text-lg">Junte-se a nós hoje mesmo</p>
          </div>

          <Card className="border-border shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center text-card-foreground">Cadastro</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Preencha os dados abaixo para criar sua conta
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="h-12 bg-input border-border focus:border-primary focus:ring-primary/20 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="h-12 bg-input border-border focus:border-primary focus:ring-primary/20 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Senha
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Crie uma senha segura"
                    className="h-12 bg-input border-border focus:border-primary focus:ring-primary/20 transition-all duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 group"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Cadastrando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Cadastrar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Entrar aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Ao se cadastrar, você concorda com nossos{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
