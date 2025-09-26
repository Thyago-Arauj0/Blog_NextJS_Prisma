
import findAllCategory from "@/lib/category/findAllCategory"
import findAllPost from "@/lib/post/findAllPost"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Calendar, User, ArrowRight, Globe } from "lucide-react"
import slugify from 'slugify'
import SearchComponent from "@/components/searchComponent"

export default async function HomePage() {
  const categories = await findAllCategory()
  const posts = await findAllPost()


  const recentPosts = posts.slice(0, 1).map(post => ({
    id: post.id,
    title: post.title,
   description: (post.content ?? "")
  .substring(0, 150)
  .replace(/<\/?[^>]+(>|$)/g, "") 
  + ((post.content ?? "").length > 150 ? "..." : ""),
    date:  new Date(post.createdAt).toLocaleDateString('pt-BR'),
    image: post.imageUrl,
    category: post.categoryId,
    author: post.authorId
  }))

  const smallPosts = posts.slice(1, 5).map(post => ({
    id: post.id,
    title: post.title,
    date: new Date(post.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
    image: post.imageUrl
  }))


  const categoriesArray = categories.map(category=>({
    id: category.id, name: category.name, icon: Globe, color: "bg-blue-500", posts:  posts.filter(post => post.categoryId === category.id).length
  }))



  return (
    <>
      <section>
        <SearchComponent allPosts={posts}/>
      </section>

      <div className="container mx-auto px-6 pb-12">

        <section className="my-16 bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-5">
            <div >
              <h2 className="text-4xl font-bold text-red-400 mb-2">Destaques</h2>
              <p className="text-slate-100">As notícias mais importantes do momento</p>
            </div>
            <Link href={'/recentes'}>
            <Button variant="ghost" className="bg-black hover:bg-black hover:opacity-80 text-red-400 hover:text-red-400 border border-red-400 rounded-full">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 ">
            {/* Featured Post */}
          <Link href={`/post/${recentPosts[0].id}`} key={recentPosts[0].id} className="lg:col-span-1">
            <Card className="overflow-hidden hover:shadow-2xl max-h-[400px] bg-transparent rounded-xl transition-all duration-300 group border-none shadow-none py-0">
              {/* Container principal com imagem de fundo */}
              <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden">
                {recentPosts[0].image ? (
                  <>
                    {/* Imagem como fundo */}
                    <div className="absolute inset-0">
                      <Image
                        src={recentPosts[0].image || "/placeholder.svg"}
                        alt={recentPosts[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Overlay escuro gradiente para melhor legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80"></div>
                    
                    {/* Overlay adicional no hover */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-100 bg-gradient-to-br from-gray-900 to-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Badge da categoria */}
                {categoriesArray.map((category, index) =>
                  category.id === recentPosts[0].category && (
                    <div key={index} className="absolute top-4 left-4 z-20">
                      <Badge className="bg-red-400 text-black font-bold text-md rounded-full hover:opacity-80 shadow-lg">
                        {category.name}
                      </Badge>
                    </div>
                  )
                )}
                
                {/* Conteúdo sobreposto na imagem */}
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <div className="space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-bold mb-3 group-hover:text-red-400 transition-colors duration-300 drop-shadow-2xl leading-tight">
                      {recentPosts[0].title}
                    </h3>
                    
                    <p className="text-gray-200 text-lg leading-relaxed line-clamp-3 drop-shadow-lg">
                      {recentPosts[0].description}
                    </p>

                    <div className="flex items-center text-sm text-gray-300 space-x-4 pt-3">
                      <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 mr-2 text-red-400" />
                        <span className="font-medium">{recentPosts[0].date}</span>
                      </div>
                      <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                        <User className="h-4 w-4 mr-2 text-red-400" />
                        <span className="font-medium">{recentPosts[0].author}</span>
                      </div>
                    </div>
                    
                    {/* Ícone indicativo de hover */}
                    <div className="flex justify-end pt-2">
                      <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300 flex items-center text-red-400 font-medium">
                        Ler mais
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-2 sm:px-4 ">
              {smallPosts.map((post) => (
                <Link href={`/post/${post.id}`} key={post.id}>
                  <Card className="overflow-hidden hover:shadow-lg bg-transparent transition-all duration-200 group cursor-pointer rounded-xl border-none shadow-none">
                    <div className="flex flex-col">
                      {/* Container principal com imagem de fundo */}
                      <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                        {post.image ? (
                          <>
                            {/* Imagem como fundo com overlay escuro */}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            {/* Overlay adicional no hover */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
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
                            <h1 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-red-400 transition-colors duration-300 line-clamp-2 drop-shadow-lg">
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
        </section>


        <section className="mb-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-red-400 mb-2">Categorias</h2>
            <p className="text-slate-100">Explore nosso conteúdo por temas</p>
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categoriesArray.map((category, index) => {
              // const IconComponent = category.icon
              const nameParams = slugify(category.name)
              return (
                <Card
                  key={index}
                  className="group cursor-pointer border-0 bg-black hover:bg-black/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Link href={`/${nameParams}`}>
                    <CardContent className="p-2 text-center">
                      {/* <div
                        className={`${category.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="h-7 w-7 text-white" />
                      </div> */}
                      <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-red-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium">
                        {category.posts} {category.posts === 1 ? "artigo" : "artigos"}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-red-400 mb-2">Outros Posts</h2>
            <p className="text-slate-100">Explore mais</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(5, 14).map((post) => (
              <Link href={`/post/${post.id}`} key={post.id}>
                <Card className="overflow-hidden hover:shadow-lg bg-transparent transition-all duration-200 group cursor-pointer rounded-xl border-none shadow-none">
                  <div className="flex flex-col h-full">
                    {/* Container principal com imagem de fundo */} 
                    <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden">
                      {post.imageUrl ? (
                        <>
                          {/* Imagem como fundo com overlay escuro */}
                          <div className="absolute inset-0">
                            <Image
                              src={post.imageUrl || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              quality={100}
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          {/* Overlay escuro gradiente */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          {/* Overlay adicional no hover */}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
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
                          <h1 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-red-400 transition-colors duration-300 line-clamp-2 drop-shadow-lg">
                            {post.title}
                          </h1>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-300 font-medium">{new Date(post.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
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
       </section>   

      </div>
    </>
  )
}
