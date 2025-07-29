"use client"

import Image from "next/image"
import { Calendar, Tag, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Post } from "@/types/types"

interface PostViewerProps {
  post: Post
}

export function PostViewer({ post }: PostViewerProps) {
  const router = useRouter()
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
            aria-label="Voltar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>

          <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">Visualização do Post</h1>

          <div className="w-24" /> {/* Espaço vazio para centralizar título */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="space-y-4">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{post.title}</h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Criado em {formatDate(post.createdAt.toString())}</span>
              </div>

              {post.category && (
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <Badge variant="outline">{post.category.name}</Badge>
                </div>
              )}

              <Badge variant={post.published ? "default" : "secondary"}>
                {post.published ? (
                  <>
                    <Eye className="w-3 h-3 mr-1" />
                    Publicado
                  </>
                ) : (
                  "Rascunho"
                )}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Image */}
            {post.imageUrl && (
              <div className="w-full">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto max-w-[300px] rounded-lg shadow-sm"
                  priority
                />
              </div>
            )}

            {/* Content */}
          <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
                className="text-gray-700 leading-relaxed"
              />
            </div>



            {/* Audio */}
            {post.audioUrl && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Áudio</h3>
                <audio controls src={post.audioUrl} className="w-full max-w-md">
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              </div>
            )}

            {/* Video */}
            {post.videoUrl && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Vídeo</h3>
                <video
                  controls
                  src={post.videoUrl}
                  className="w-full max-w-2xl rounded-lg shadow-sm"
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
