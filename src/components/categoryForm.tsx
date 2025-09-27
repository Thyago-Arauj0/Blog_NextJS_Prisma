"use client"

import Form from "next/form"
import createCategory from "@/lib/category/createCategory"
import updateCategory from "@/lib/category/updateCategory"
import destroyCategory from "@/lib/category/destroyCategory"
import findCategory from "@/lib/category/findCategory"
import { useEffect, useState } from "react"
import { useActionState } from "react"
import { AlertModal } from "@/components/alert"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2, Edit, Trash2 } from "lucide-react"
import type { Category } from "@/types/types"

interface CategoryFormProps {
  mode?: "create" | "edit"
  categoryName?: string
}

export default function CategoryForm({ mode , categoryName }: CategoryFormProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [state, formAction, isPending] = useActionState(mode === "create" ? createCategory : updateCategory, null)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"success" | "error" | "info">("success")
  const [modalMessage, setModalMessage] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Função para mostrar o alerta
  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setModalType(type)
    setModalMessage(message)
    setIsModalOpen(true)
  }

  // Buscar categoria se estiver no modo de edição
  useEffect(() => {
    if (mode === "edit" && categoryName) {
      async function fetchData() {
        const data = await findCategory(categoryName ?? "")
        setCategory(data)
      }
      fetchData()
    }
  }, [mode, categoryName])

  // Função para deletar categoria
  async function handleDelete() {
    if (!category || !category.id) return

    setIsDeleting(true)
    try {
      await destroyCategory(category.id)
      showAlert("success", "Categoria excluída com sucesso!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch {
      showAlert("error", "Erro ao excluir a categoria.")
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    if (state?.success === false) {
      showAlert("error", state?.message)
    }
    if (state?.success === true) {
      showAlert("success", state?.message)

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }, [state, router])

  const isCreate = mode === "create"
  const title = isCreate ? "Nova Categoria" : "Editar Categoria"
  const description = isCreate
    ? "Crie uma nova categoria para organizar seus itens"
    : "Edite as informações da categoria"
  const buttonText = isCreate ? "Criar Categoria" : "Salvar Alterações"
  const loadingText = isCreate ? "Criando..." : "Salvando..."

  return (
    <div className="flex items-center min-h-screen justify-center py-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md shadow-none border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {isCreate ? <Plus className="w-6 h-6 text-primary" /> : <Edit className="w-6 h-6 text-primary" />}
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={formAction} className="space-y-6">
            {!isCreate && <input type="hidden" name="id" defaultValue={category?.id} />}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Nome da Categoria
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Digite o nome da categoria..."
                className="h-11 bg-background border-input focus:border-primary focus:ring-primary/20 transition-all duration-200"
                disabled={isPending}
                defaultValue={category?.name || ""}
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {loadingText}
                </>
              ) : (
                <>
                  {isCreate ? <Plus className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {buttonText}
                </>
              )}
            </Button>
          </Form>

          {!isCreate && (
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
              className="w-full h-11 mt-3 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Categoria
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
