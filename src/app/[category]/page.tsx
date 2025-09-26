import { Card, CardContent } from "@/components/ui/card"
import findAllPost from "@/lib/post/findAllPost"
import Link from "next/link"
import Image from "next/image"
import slugify from 'slugify'

export default async function Founds({ params }: { params: {category: string } }){

  const posts = await findAllPost()
  const smallPosts = posts
   .filter(post => {
      if (!post.category?.name) return false
      const slugFromDB = slugify(post.category.name, { lower: true, strict: true })
      return slugFromDB === params.category.toLowerCase()
    })
    .map(post => ({
      id: post.id,
      title: post.title,
      date: new Date(post.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      image: post.imageUrl
    }))

  return(
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-100">Categoria: {params.category}</h2>
      </div>
      <br />
      <div className="grid md:grid-cols-4 gap-4">
        {smallPosts.map((post, index) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer rounded-none border-none shadow-none py-0 bg-transparent">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      
                      {/* Overlay adicional no hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
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
                      <h1 className="text-xl font-bold mb-1 group-hover:text-red-400 transition-colors duration-300 line-clamp-2 drop-shadow-lg">
                        {post.title}
                      </h1>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-300 font-medium">{post.date}</p>
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
  )
}