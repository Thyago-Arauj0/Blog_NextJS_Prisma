"use client"

import Image from "next/image"
import { Calendar, Tag, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Post } from "@/types/types"
import Link from "next/link"

interface PostViewerProps {
  post: Post
  allPosts: Post[]
}

export function PostViewer({ post, allPosts }: PostViewerProps) {
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

  const smallPosts = allPosts.slice(0, 5).map(post => ({
    id: post.id,
    title: post.title,
    date: new Date(post.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
    image: post.imageUrl
  }))


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
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


          <div className="w-24" /> {/* Espaço vazio para centralizar título */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-none shadow-none rounded-none">
          <CardHeader className="space-y-4">
                        {/* Image */}
            <div className="flex flex-col-reverse md:flex-row gap-3">
              {post.imageUrl && (
                <div className="w-full md:max-w-[200px]">
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
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{post.title}</h1>
                    {/* Meta information */}
                <div className="flex flex-col flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Criado em {formatDate(post.createdAt.toString())}</span>
                  </div>

                  <div className="flex gap-4">
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
                </div>
              </div>
            </div>
            <hr />
          </CardHeader>
          <CardContent className="space-y-6">
            <div
                className="prose prose-lg text-justify max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
              />
            <hr />
  
          {post.audioUrl && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg p-4 rounded">
                <div className="space-y-2">
                  <audio controls src={post.audioUrl} className="w-full max-w-md">
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
              </div>
            )}

            <hr />
              {post.videoUrl && (
                <div className="space-y-2">
                  <video
                    controls
                    src={post.videoUrl}
                    className="w-full max-w-2xl rounded-lg shadow-sm"
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                </div>
              )}
            <hr />
          </CardContent>
        </Card>

        <br />

        <h2 className="text-2xl font-bold text-gray-900">Posts relacionados</h2>
        <br />
        <hr />
        <br />
        <div className="grid md:grid-cols-3 gap-4">
          {smallPosts.map((post, index) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer border-none shadow-none rounded-none py-0 bg-transparent">
                <div className="flex flex-col h-full">
                  {/* Container principal com imagem de fundo */}
                  <div className="relative w-full h-48 rounded-none overflow-hidden">
                    {post.image ? (
                      <>
                        {/* Imagem como fundo */}
                        <div className="absolute inset-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={100}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Overlay escuro gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20"></div>
                        
                        {/* Overlay adicional no hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-800 to-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Conteúdo sobreposto na imagem */}
                    <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                      <div className="space-y-2">
                        <h1 className="text-xl font-bold mb-1 group-hover:text-red-400 transition-colors duration-300 line-clamp-2 drop-shadow-md">
                          {post.title}
                        </h1>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-300 font-medium bg-black/30 px-2 py-1 rounded">
                            {post.date}
                          </p>
                          {/* Ícone indicativo de hover */}
                          <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
