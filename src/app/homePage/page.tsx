
import findAllCategory from "@/lib/category/findAllCategory"
import findAllPost from "@/lib/post/findAllPost"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight, Globe } from "lucide-react"

export default async function HomePage() {

  
  const categories = await findAllCategory()
  const posts = await findAllPost()


  const recentPosts = posts.slice(0, 1).map(post => ({
    id: post.id,
    title: post.title,
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
    id: category.id, name: category.name, icon: Globe, color: "bg-blue-500", posts: 24
  }))



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-red-500 font-bold text-lg">M</span>
              </div>
              <h1 className="text-white text-2xl font-bold">marketilize</h1>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Redes sociais
            </Button>
          </div>
        </div>
      </header>


      <main className="container mx-auto px-6 py-12">
        {/* Recentes Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recentes</h2>
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Post */}
            <Link href={`/post/${recentPosts[0].id}`} key={recentPosts[0].id} className="lg:col-span-1">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group rounded-none py-0">
                <CardHeader className="relative h-64 w-full">
                  {recentPosts[0].image ? (
                    <Image
                      src={recentPosts[0].image || "/placeholder.svg"}
                      alt={recentPosts[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {categoriesArray.map((category, index) =>
                    category.id === recentPosts[0].category && (
                      <div key={index} className="absolute top-4 left-4">
                        <Badge className="bg-red-500 hover:bg-red-600">{category.name}</Badge>
                      </div>
                    )
                  )}
                      
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {recentPosts[0].title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {recentPosts[0].date}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {recentPosts[0].author}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>


            {/* Small Posts */}
            <div className="grid md:grid-cols-2 gap-2">
              {smallPosts.map((post, index) => (
                <Link href={`/post/${post.id}`} key={post.id} >
                <Card
                  key={index}
                  className="overflow-hidden  hover:shadow-lg transition-all duration-200 group cursor-pointer rounded-none py-0"
                >
                  <div className="flex flex-col">
                    <div className="relative h-35 w-full">
                      {post.image ? (
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={100}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-amber-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 flex-1">
                      <h1 className=" text-gray-900 text-xl font-bold mb-1 group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h1>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </CardContent>
                  </div>
                </Card>
                </Link>  
              ))}
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl px-8 py-16 text-center shadow-xl">
            <h2 className="text-white text-3xl font-bold mb-4">Pesquise aqui</h2>
            <p className="text-red-100 mb-8 max-w-md mx-auto">
              Encontre artigos, tutoriais e dicas sobre marketing digital e desenvolvimento web
            </p>
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Digite sua busca..."
                className="bg-white border-0 h-14 pl-12 pr-4 text-lg shadow-lg focus:shadow-xl transition-shadow"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Categorias Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Categorias</h2>
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              Ver todas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesArray.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.posts} artigos</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white min-w-full">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h3 className="text-2xl font-bold">marketilize</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Sua fonte confiável para estratégias de marketing digital, desenvolvimento web e crescimento de negócios
                online.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-red-500 hover:border-red-500 bg-transparent"
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-red-500 hover:border-red-500 bg-transparent"
                >
                  Twitter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-red-500 hover:border-red-500 bg-transparent"
                >
                  LinkedIn
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Marketing Digital
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Desenvolvimento Web
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    SEO
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Redes Sociais
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marketilize. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
