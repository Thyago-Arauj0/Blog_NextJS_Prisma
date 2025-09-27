"use client"

import EditorContent from "@/components/EditorContent"
import findAllCategory from "@/lib/category/findAllCategory"
import Image from "next/image"
import Form from "next/form"
import type { Category } from "@/types/types"
import { useEffect, useState } from "react"
import { useActionState } from "react"
import { AlertModal } from "@/components/alert"
import { useRouter } from "next/navigation"
import type { PostFormProps } from "@/types/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, ImageIcon, Music, Video, Tag, Eye } from "lucide-react"

export default function PostForm({ initialData = {}, action, submitLabel = "Salvar" }: PostFormProps) {
  const [content, setContent] = useState(initialData.content || "")
  const [categories, setCategories] = useState<Category[]>([])
  const [state, formAction, isPending] = useActionState(action, null)
  const router = useRouter()

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

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }, [state, router])

  useEffect(() => {
    async function fetchData() {
      const data = await findAllCategory()
      setCategories(data)
    }
    fetchData()
  }, [])

  console.log(initialData)

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="w-full md:max-w-4xl mx-auto">
        <Card className="shadow-none border-0  w-full">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center font-bold gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {initialData.id ? "Editar Post" : "Criar Novo Post"}
            </CardTitle>
            <CardDescription>Preencha os campos abaixo para criar ou editar seu post</CardDescription>
          </CardHeader>

          <CardContent>
            <Form action={formAction} className="space-y-6">
              <input type="hidden" name="id" value={initialData.id || ""} />

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Título
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  required
                  defaultValue={initialData.title || ""}
                  placeholder="Digite o título do seu post..."
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium">
                  Conteúdo
                </Label>
                <div className="border rounded-lg p-1 bg-background">
                  <EditorContent value={content} onChange={setContent} />
                </div>
                <input type="hidden" name="content" value={content} />
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Image Upload */}
                <div className="space-y-7">
                  <Label
                    htmlFor="image"
                    className="text-base font-semibold flex items-center gap-2"
                  >
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                    Imagem
                  </Label>
                  {initialData.imageUrl && (
                    <div className="relative rounded-xl overflow-hidden border shadow-sm">
                      <Image
                        src={initialData.imageUrl || "/placeholder.svg"}
                        alt="Imagem atual"
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                  />
                </div>

                {/* Audio Upload */}
                <div className="space-y-7">
                  <Label
                    htmlFor="audio"
                    className="text-base font-semibold flex items-center gap-2"
                  >
                    <Music className="h-5 w-5 text-green-500" />
                    Áudio
                  </Label>
                  {initialData.audioUrl && (
                    <audio
                      controls
                      src={initialData.audioUrl}
                      className="w-full rounded-lg border shadow-sm"
                    />
                  )}
                  <Input
                    type="file"
                    id="audio"
                    name="audio"
                    accept="audio/*"
                  />
                </div>

                {/* Video Upload */}
                <div className="space-y-7">
                  <Label
                    htmlFor="video"
                    className="text-base font-semibold flex items-center gap-2"
                  >
                    <Video className="h-5 w-5 text-red-500" />
                    Vídeo
                  </Label>
                  {initialData.videoUrl && (
                    <video
                      controls
                      src={initialData.videoUrl}
                      className="w-full h-40 rounded-xl border shadow-sm"
                    />
                  )}
                  <Input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="categoryId" className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4 text-purple-500" />
                    Categoria
                  </Label>
                  {categories.length > 0 && (
                    <Select name="categoryId" defaultValue={String(initialData.categoryId ?? "0")}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Nenhuma</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4 text-orange-500" />
                    Configurações
                  </Label>
                  <div className="flex items-center space-x-2 bg-muted/50 p-4 rounded-lg">
                    <Checkbox id="published" name="published" defaultChecked={initialData.published ?? false} />
                    <Label htmlFor="published" className="text-sm font-medium cursor-pointer">
                      Publicar imediatamente
                    </Label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Salvando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {submitLabel}
                    </div>
                  )}
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>

      <AlertModal type={modalType} message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
